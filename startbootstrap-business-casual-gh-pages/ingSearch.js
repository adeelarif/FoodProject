
$(document).ready(function(){

let searchbar = document.querySelector("#recipe");
let button = document.querySelector(".button");
let container = document.querySelector(".recipe-result");//container of recipe search result
let resultRow = document.querySelector("#resultRow");//imng and anchor of ingredient search reult
let titleRow = document.querySelector("#titleRow");//title of ingredient search result

var globalData;//global data variable of the xhttprquest so length and data can be used between methods without parameters
var start = 0;
var length = 0;
/*Radio button click*/

$('input:radio').on('click', function(e) {
	
    if(e.currentTarget.value == 'ingredients'){
    	$('.ingSearch').removeClass('hidden');//make the new material visible by removing hidden class
    	$('.result-container').addClass('hidden');

    	searchbar.placeholder = "Add Ingredient";//change the wording on button and search bar
    	button.innerHTML = 'Add Ingredient';

    }else{//change everything back to normal
    	$('.ingSearch').addClass('hidden');
    	$('.result-container').addClass('hidden');

    	searchbar.placeholder = "Search Recipe";
    	button.innerHTML = 'Search';
    } 
    
});


/*This is the Add ingredients/Recipe Search button click event*/

var ingredients = new Array();//array of ingredients to be populated

 button.addEventListener("click", function() {
	
	var radioBtnValue = $('input[name="radioBtn"]:checked').val();

	if(radioBtnValue == 'ingredients'){//make sure ingredients is the selected radio button. if not do nothing - it is handled in another script file

		var ingredient = searchbar.value;
		console.log(ingredient);

		searchbar.value = "";//reset the search bar for nect ingredient

		if(ingredient == ''){//make sure they entered an ingredient
		
		alert("you must enter an ingredient first");
		
		}else{
			
			ingredients.push(ingredient);//add to the array
			$(".ing-list").append('<li>' + ingredient + '</li>')//add to the html list
			console.log(ingredients);
		}
	}
	
	
})


/*This is the search ingredients button click event. This even is only ever possible when the ingredients radio button is selected
otherwise this button is hidden and unclickable*/

$('#q-btn').click(function(){

var data;
var xhttp = new XMLHttpRequest();

var url = "http://www.recipepuppy.com/api/?i="//api link set up for ingredient search

for(var i in ingredients){
	url += ingredients[i] + ","//add all ingredients to the url seperated by commas
}//for loop end

//url = "https://crossorigin.me/" + url;//append crossorigin to the url cross origin
//url = 'http://anyorigin.com/go?url=' + url;//append crossorigin to the url
url = url.substring(0, url.length - 1);//remove the trialing comma from the url -- not actually necessary
	
  xhttp.addEventListener("load", whenLoaded);
  xhttp.open("GET", url, true); 	  //Asynchronous
  xhttp.overrideMimeType("application/json");
  xhttp.send();
	

function whenLoaded(e){

	resultRow.innerHTML = '';//clear the two rows
	titleRow.innerHTML = '';
	container.innerHTML = '';

	//document.getElementById("resultsScroll").scrollIntoView();
	//$(".result-container").scrollIntoView();


	console.log('loaded');
	data = JSON.parse(xhttp.responseText);
	globalData = data;

	length = data.results.length;


	console.log(data);
	console.log(globalData);
	//console.log(data.results[0].ingredients);

	addRecipes(data, 0);//This adds the recipes to the 

	$(".result-container").removeClass('hidden');
	$("#shuffle-btn").removeClass('hidden');

	$("html,body").delay(100).animate({
		scrollTop: $('#resultsScroll').offset().top
	}, 500);

}//whenLoaded end

})//q-btn click end

/*Shuffle button event*/

$('#shuffle-btn').click(function(){
	

	if(start+4>length){//if the index# of the last result is greater than length(doesn't exist)
		start = -4;//reset to the first result (-4 because it gives parameter of start+4 -- therefore -4 = 0)
	}

	addRecipes(globalData, start+4);

	start += 4;//increment global variable start by 4
	console.log(length);

	
})//end shuffle button

/*Method for adding the fetched content to the page
This adds 4 recipes to the page using their order as they are fetched from the api.
Starting point is the index of results(recipes) returned from the api
When startingPoint = 0 this function adds the first 4 recipes, 
when sP = 4 it returns the next 4 recipes*/

function addRecipes(data, startingPoint){

	console.log(startingPoint);

	resultRow.innerHTML = '';//clear the two rows
	titleRow.innerHTML = '';

	var start;

	if(startingPoint>length){
		
	}

	var ingArray = data.results[0].ingredients.split(", ");
	console.log(ingArray);//split the ingredients returned into an array, this is not used yet

	for(var i = startingPoint; i < startingPoint+4; i++){


		if(i < length){//if i will go out of bounds, don't do anything because it will cause error otherwise
			let imagesource = data.results[i].thumbnail
    		let title = data.results[i].title
    		let link = data.results[i].href

			var titleResult = `
            	<div class="col-sm-3">
          		<h3>${title}<h3>
            	</div>`;

   	 		var result = `
    			<div class="col-sm-3"> 
    			<a href="${link}">
    			<img src="${imagesource}" onError="this.src='dinner plate.png'">
    			</a>
    			</div>` 

			resultRow.innerHTML += result;
			titleRow.innerHTML += titleResult;

		}//if statement end
	}//for loop end	


}//addRecipes end

})//document ready end
