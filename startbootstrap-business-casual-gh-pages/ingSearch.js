
$(document).ready(function(){

let searchbar = document.querySelector("#recipe");
let button = document.querySelector(".button");
let container = document.querySelector(".recipe-result");//container of recipe search result

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

	if($('input[name="radioBtn"]:checked').val() == 'ingredients'){//make sure ingredients is the selected radio button. if not do nothing - it is handled in another script file

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

container.innerHTML = "";

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

	start = 0;
	$('#shuffle-btn').html('Show More Recipes');

	//document.getElementById("resultsScroll").scrollIntoView();
	//$(".result-container").scrollIntoView();

	data = JSON.parse(xhttp.responseText);
	globalData = data;

	length = data.results.length;

	console.log(data);
	console.log(globalData);
	//console.log(data.results[0].ingredients);

	addRecipes();//This adds the recipes to the 

	$(".result-container").removeClass('hidden');
	$("#shuffle-btn").removeClass('hidden');

	$("html,body").delay(100).animate({
		scrollTop: $('#resultsScroll').offset().top
	}, 500);

}//whenLoaded end

})//q-btn click end

/*Shuffle button event*/
$('#shuffle-btn').click(function(){

 if($('input[name="radioBtn"]:checked').val() == 'ingredients'){
  if(start+4>length){
    $('#shuffle-btn').html('NO MORE RECIPES');
  }
  if(start>length){
   
  }//reset to the first result (-4 because it gives parameter of start+4 -- therefore -4 = 0)
  else{
    addRecipes(); 
  }
}
  
})//end shuffle button

function addRecipes(){

	var titleCols = '';
	var resultCols = '';

	for(var i = start; i < start+4; i++){//add 4 recipes at a time
		
		if(i < length){//if i will go out of bounds, don't do anything because it will cause error otherwise

		let imagesource = globalData.results[i].thumbnail
    	let title = globalData.results[i].title
    	let link = globalData.results[i].href

		titleCols += 
			`<div class="col-sm-3">
          	<h3>${title}<h3>
            </div>`;

        resultCols +=
        	`<div class="col-sm-3"> 
    		<a href="${link}">
    		<img src="${imagesource}" onError="this.src='dinner plate.png'">
    		</a>
    		</div>`
		}//end iff statement
	}//end for loop

			var titleResult = `
				<div class="row titleRow">`
            	+ titleCols +
            	`</div>`;

   	 		var result = 
   	 			`<div class="row resultRow">`
            	+ resultCols +
            	`</div>`;

			
			container.innerHTML += titleResult;
			container.innerHTML += result;

			start+=4;

}//addRecipes end
	

})//document ready end
