/**
 * @license
 * Copyright 2019 Victor Dibia.
 * Handtrack.js - A library for prototyping realtime hand tracking using neural networks.
 * Licensed under the MIT License (the "License"); 
 * Code snippets from the tensorflow coco-ssd example are reused here - https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd
 * =============================================================================
 */


import * as tf from '@tensorflow/tfjs';

const basePath = "https://cdn.jsdelivr.net/npm/handtrackjs/models/web/"

const defaultParams = {
  flipHorizontal: true,
  outputStride: 16,
  imageScaleFactor: 0.7,
  maxNumBoxes: 20,
  iouThreshold: 0.5,
  scoreThreshold: 0.99,
  modelType: "ssdlitemobilenetv2"
}

export async function load(params) {
  let modelParams = Object.assign({}, defaultParams, params);
  // console.log(modelParams) 
  const objectDetection = new ObjectDetection(modelParams);
  await objectDetection.load();
  return (objectDetection);
}

export function startVideo(video) {
  // Video must have height and width in order to be used as input for NN
  // Aspect ratio of 3/4 is used to support safari browser.
  video.width = video.width || 640;
  video.height = video.height || video.width * (3 / 4)

  return new Promise(function (resolve, reject) {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "user"
        }
      })
      .then(stream => {
        window.localStream = stream;
        video.srcObject = stream
        video.onloadedmetadata = () => {
          video.play()
          resolve(true)
        }
      }).catch(function (err) {
        resolve(false)
      });
  });

}

export async function stopVideo() {
  if (window.localStream) {
    window.localStream.getTracks().forEach((track) => {
      track.stop();
      return true;
    });
  } else {
    return false;
  }
}

export class ObjectDetection {
  constructor(modelParams) {
    this.modelPath = basePath + modelParams.modelType + "/tensorflowjs_model.pb";
    this.weightPath = basePath + modelParams.modelType + "/weights_manifest.json";
    this.modelParams = modelParams
  }

  async load() {
    this.fps = 0
    this.model = await tf.loadFrozenModel(this.modelPath, this.weightPath);

    // Warmup the model.
    const result = await this.model.executeAsync(tf.zeros([1, 300, 300, 3]));
    result.map(async (t) => await t.data());
    result.map(async (t) => t.dispose());
    // console.log("model loaded and warmed up")
  }

  async detect(input) {

    let timeBegin = Date.now()
    const [height, width] = getInputTensorDimensions(input);
    const resizedHeight = getValidResolution(this.modelParams.imageScaleFactor, height, this.modelParams.outputStride);
    const resizedWidth = getValidResolution(this.modelParams.imageScaleFactor, width, this.modelParams.outputStride);

    const batched = tf.tidy(() => {
      const imageTensor = tf.fromPixels(input)
      if (this.modelParams.flipHorizontal) {
        return imageTensor.reverse(1).resizeBilinear([resizedHeight, resizedWidth]).expandDims(0);
      } else {
        return imageTensor.resizeBilinear([resizedHeight, resizedWidth]).expandDims(0);
      }
    })

    // const result = await this.model.executeAsync(batched);
    self = this
    return this.model.executeAsync(batched).then(function (result) {


      const scores = result[0].dataSync()
      const boxes = result[1].dataSync()

      // clean the webgl tensors
      batched.dispose()
      tf.dispose(result)

      // console.log("scores result",scores, boxes)

      const [maxScores, classes] = calculateMaxScores(scores, result[0].shape[1], result[0].shape[2]);
      const prevBackend = tf.getBackend()
      // run post process in cpu
      tf.setBackend('cpu')
      const indexTensor = tf.tidy(() => {
        const boxes2 = tf.tensor2d(boxes, [
          result[1].shape[1],
          result[1].shape[3]
        ])
        return tf.image.nonMaxSuppression(
          boxes2,
          scores,
          self.modelParams.maxNumBoxes, // maxNumBoxes
          self.modelParams.iouThreshold, // iou_threshold
          self.modelParams.scoreThreshold // score_threshold
        )
      })
      const indexes = indexTensor.dataSync()
      indexTensor.dispose()
      // restore previous backend
      tf.setBackend(prevBackend)

      const predictions = self.buildDetectedObjects(
        width,
        height,
        boxes,
        scores,
        indexes,
        classes
      )
      let timeEnd = Date.now()
      self.fps = Math.round(1000 / (timeEnd - timeBegin))

      return predictions

    })

  }

  buildDetectedObjects(width, height, boxes, scores, indexes, classes) {
    const count = indexes.length
    const objects = []
    for (let i = 0; i < count; i++) {
      const bbox = []
      for (let j = 0; j < 4; j++) {
        bbox[j] = boxes[indexes[i] * 4 + j]
      }
      const minY = bbox[0] * height
      const minX = bbox[1] * width
      const maxY = bbox[2] * height
      const maxX = bbox[3] * width
      bbox[0] = minX
      bbox[1] = minY
      bbox[2] = maxX - minX
      bbox[3] = maxY - minY
      objects.push({
        bbox: bbox,
        class: classes[indexes[i]],
        score: scores[indexes[i]]
      })
    }
    return objects
  }

  getFPS() {
    return this.fps;
  }

  setModelParameters(params) {
    this.modelParams = Object.assign({}, this.modelParams, params);
  }

  getModelParameters() {
    return this.modelParams;
  }

  renderPredictions(predictions, canvas, context, mediasource) {

    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = mediasource.width;
    canvas.height = mediasource.height;
    // console.log("render", mediasource.width, mediasource.height)

    context.save();
    if (this.modelParams.flipHorizontal) {
      context.scale(-1, 1);
      context.translate(-mediasource.width, 0);
    }
    context.drawImage(mediasource, 0, 0, mediasource.width, mediasource.height);
    context.restore();
    context.font = '10px Arial';

    // console.log('number of detections: ', predictions.length);
    for (let i = 0; i < predictions.length; i++) {
      context.beginPath();
      context.fillStyle = "rgba(255, 255, 255, 0.6)";
      context.fillRect(predictions[i].bbox[0], predictions[i].bbox[1] - 17, predictions[i].bbox[2], 17)
      context.rect(...predictions[i].bbox);

      // draw a dot at the center of bounding box


      context.lineWidth = 1;
      context.strokeStyle = '#0063FF';
      context.fillStyle = "#0063FF" // "rgba(244,247,251,1)";
      context.fillRect(predictions[i].bbox[0] + (predictions[i].bbox[2] / 2), predictions[i].bbox[1] + (predictions[i].bbox[3] / 2), 5, 5)

      context.stroke();
      context.fillText(
        predictions[i].score.toFixed(3) + ' ' + " | hand",
        predictions[i].bbox[0] + 5,
        predictions[i].bbox[1] > 10 ? predictions[i].bbox[1] - 5 : 10);
    }

    // Write FPS to top left
    context.font = "bold 12px Arial"
    context.fillText("[FPS]: " + this.fps, 10, 20)
  }

  dispose() {
    if (this.model) {
      this.model.dispose();
    }
  }

}



function getValidResolution(imageScaleFactor, inputDimension, outputStride) {
  const evenResolution = inputDimension * imageScaleFactor - 1;
  return evenResolution - (evenResolution % outputStride) + 1;
}

function getInputTensorDimensions(input) {
  return input instanceof tf.Tensor ? [input.shape[0], input.shape[1]] : [input.height, input.width];
}

function calculateMaxScores(scores, numBoxes, numClasses) {
  const maxes = [];
  const classes = [];
  for (let i = 0; i < numBoxes; i++) {
    let max = Number.MIN_VALUE;
    let index = -1;
    for (let j = 0; j < numClasses; j++) {
      if (scores[i * numClasses + j] > max) {
        max = scores[i * numClasses + j];
        index = j;
      }
    }
    maxes[i] = max;
    classes[i] = index;
  }
  // console.log([maxes, classes])
  return [maxes, classes];
}


// // The Synth
//     var synth = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext)(),
//         osc = synth.createOscillator(),
//         gain = synth.createGain(),
//         output = document.getElementById('output')
//     osc.type = 'sawtooth'
//     osc.connect(gain)
//     gain.gain.value = 0
//     gain.connect(synth.destination)
//     osc.start()
//     // Variables
//     var active = false,
//         volume = 0,
//         freq = 0
//     // Mouse Controls
//     document.addEventListener('mousedown',function(e){capture(e)})
//     document.addEventListener('mousemove',function(e){drag(e)})
//     document.addEventListener('mouseup',function(e){release(e)})
//     // Touch Controls
//     document.addEventListener('touchstart',function(e){capture(e)})
//     document.addEventListener('touchmove',function(e){drag(e)})
//     document.addEventListener('touchend',function(e){release(e)})
//     // Start the Note
//     function capture(e){
//       e.preventDefault()
//       active = true
//       volume = ~~((e.clientX||e.touches[0].clientX)/window.innerWidth*100)/100
//       freq = ~~(1000*(1-((e.clientY||e.touches[0].clientY)/window.innerHeight)))
//       osc.frequency.value = freq
//       gain.gain.value = volume
//       output.innerHTML = 'Frequency = '+freq+'hz, Volume = '+~~(volume*100)+'%'
//     }
//     // Update the properties of the note
//     function drag(e){
//       e.preventDefault()
//       if (active) {
//         volume = ~~((e.clientX||e.touches[0].clientX)/window.innerWidth*100)/100
//         freq = ~~(1000*(1-((e.clientY||e.touches[0].clientY)/window.innerHeight)))
//         osc.frequency.value = freq
//         gain.gain.value = volume
//         output.innerHTML = 'Frequency = '+freq+'hz, Volume = '+~~(volume*100)+'%'
//       }
//     }
//     // Release The Note
//     function release(e){
//       active = false
//       gain.gain.value = 0
//       output.innerHTML = ''
//     }
//     // Make UI buttons control type
//     var button = document.getElementsByTagName('input')
//     for (i=0;i<button.length;i++){
//       button[i].addEventListener('click',function(){switchType(this.value)})
//       button[i].addEventListener('touchstart',function(){switchType(this.value)})
//     }
//     function switchType(type){
//       osc.type = type
//     }