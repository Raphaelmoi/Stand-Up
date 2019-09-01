var url = "https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";


function getUrlImg(){
  let imgUrl;

  $.ajax({
    url: url,
    success: function(result){
       imgUrl = result.url;
        console.log(imgUrl);
    }
  });
  return imgUrl;

}
