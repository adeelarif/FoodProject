let searchbar = document.querySelector("#recipe");
let button = document.querySelector(".button");
let container = document.querySelector(".recipe-result");//this was changed from .container to #resultRow

var globalData;//global data variable of the xhttprquest so length and data can be used between methods without parameters
var start = 0;
var length = 0;

button.addEventListener("click", function search() {

  

  if($('input[name="radioBtn"]:checked').val() == 'name'){

  start = 0;
  length = 0;
  
  container.innerHTML = "";

    var data;
    var xhttp = new XMLHttpRequest();

    var url = "http://www.recipepuppy.com/api/?q=" + searchbar.value;
    //url = "https://crossorigin.me/" + url;//append crossorigin to the url cross origin
    //url = 'http://anyorigin.com/go?url=' + url;//append crossorigin to the url

  xhttp.addEventListener("load", whenLoaded);
  xhttp.open("GET", url, true);     //Asynchronous
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
      console.log(length);
      //console.log(data.results[0].ingredients);

      addRecipes();//This adds the recipes to the 

      $(".result-container").removeClass('hidden');
      $("#shuffle-btn").removeClass('hidden');

    $("html,body").delay(100).animate({
      scrollTop: $('#resultsScroll').offset().top
    }, 500);

    }//whenLoaded end

  }//end if statement
  
})//end button click event

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
            <a href="${link}" target="_blank">
            <h3>${title}<h3>
            </a>
            </div>`;

        resultCols +=
          `<div class="col-sm-3"> 
        <a href="${link}" target="_blank">
        <img src="${imagesource}" onError="this.src='img/dinner plate.png'">
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

      $("html,body").delay(100).animate({
    scrollTop: $('#resultsScroll').offset().top
  }, 500);

}//addRecipes end

$('#shuffle-btn').click(function(){

 if($('input[name="radioBtn"]:checked').val() == 'name'){
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
