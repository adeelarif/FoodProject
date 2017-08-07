let searchbar = document.querySelector("#recipe");
let button = document.querySelector(".button");
let container = document.querySelector(".recipe-result");//this was changed from .container to #resultRow
let resultRow = document.querySelector("#resultRow");
let titleRow = document.querySelector("#titleRow");


button.addEventListener("click", function search() {

  if($('input[name="radioBtn"]:checked').val() == 'name'){

    resultRow.innerHTML = '';//clear the three rows
    titleRow.innerHTML = '';
    container.innerHTML = '';
    
    $("#shuffle-btn").addClass('hidden');//the previous three rows clear ingredient search if they use ingredent search and then go back to recipe search
    
    fetch("https://crossorigin.me/http://www.recipepuppy.com/api/?q=" + searchbar.value)
    .then(function(response) {

      if (response.status !== 200) {
        console.log(response.status);
        return;
      }

      $(".result-container").removeClass('hidden');

      response.json().then(function(obj) {


        obj.results.forEach(function(result) {

          let imagesource = result.thumbnail
          let title = result.title
          let link = result.href

          result = `
            <div class="wrapper">
          <h3>${title}<h3>
                         <br>
                         <a href="${link}">
                         <img src="${imagesource}" onError="this.src='dinner plate.png'"></a>
                         </div>`; 



          container.innerHTML += result;

        });
      })

    })
    .catch(function(error) {
      console.log('Fetch Error :-S', err);
    });
  }
  
})
