let url =  "https://api.thecatapi.com/v1/images/search?mime_types=jpg,png";
let index = 0;

function getTheCats(numberOfCats){
	for (var i = 0; i < numberOfCats; i++) {
		ajaxGet(url, function(reponse) {
		  let listeLiens = JSON.parse(reponse);
		    listeLiens.forEach(function(lien) {
		    	let link = document.createElement('a');
		     	let el = document.createElement('img');
		     	el.src = lien.url;
 						console.log('get new cats');
				el.className += "imgCats";

		     	if (index == 0) {
		     		el.style.background = '#0288d1';
		     		el.style.opacity = "1";
			     	document.getElementById('hiddenInputInscription').value = el.src;
		     		index++;
		     	} 
		     	link.appendChild(el);
				el.addEventListener("click", function(){chooseACat()}, false);

		     	document.getElementById('boxImg').appendChild(link);
		    });
		})
	}	
}

function chooseACat(){
	let images = document.getElementsByClassName('imgCats');
	for (var i = images.length - 1; i >= 0; i--) {
		images[i].style.background = 'transparent';
		images[i].style.opacity = "0.85";
	}
    var choosedCat = event.target;
	choosedCat.style.background = '#0288d1';
	choosedCat.style.opacity = "1";
	document.getElementById('hiddenInputInscription').value = choosedCat.src;
}