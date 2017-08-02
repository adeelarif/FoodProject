let searchbar = document.querySelector("#recipe");
let button = document.querySelector(".button");
let container = document.querySelector(".container");


button.addEventListener("click", function search() {
  container.innerHTML = "";
  fetch("https://crossorigin.me/http://www.recipepuppy.com/api/?q=" + searchbar.value)
    .then(function(response) {

      if (response.status !== 200) {
        console.log(response.status);
        return;
      }
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
})
