
let pokemonRepository = (function () {
  pokemonList= [];

  let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //modal info

  /*
  let pokedexList= document.querySelector('.pokemon-list');
  let pokedexScreen= document.querySelector('.pokedex-screen');
  let modalContainer = document.querySelector('#modal-container');
  let modal= document.querySelector('.modal');
  let modalClose= document.createElement('button');
    modalClose.classList.add('modal-close');
    modalClose.classList.add('btn');
    modalClose.classList.add('btn-outline-light');
  let pokeName= document.createElement('h1');
    pokeName.classList.add('Pokename');
  let pokeHeight= document.createElement('p');
    pokeHeight.classList.add('Pokeheight');
  let pokeImage= document.createElement('img');
    pokeImage.classList.add('PokeImage');
  let imageContainer = document.createElement('div');
    imageContainer.classList.add('img-container');
  let pokeType=document.createElement('p');
    pokeType.classList.add('Poketype'); */

  function getAll(){
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListpokemon(pokemon){
    let pokemonList= document.querySelector(".pokemon-list");
    let listpokemon= document.createElement('li');
    listpokemon.classList.add('grid-item');
    listpokemon.classList.add('list-group-item', 'list-group-item-action');
    let button= document.createElement('button');
    button.innerText= pokemon.name.toUpperCase();
    button.classList.add('pokemon-name-button', 'btn', 'btn-outline-warning');
    button.setAttribute('data-target', '#pokemonModal')
    button.setAttribute('data-toggle', 'modal')
    button.addEventListener('click', function (event){
      showDetails(pokemon);
    })
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      showModal(pokemon);
    });
  }
    /*loadDetails(pokemon).then(function (){
      pokeName.innerHTML = pokemon.name.toUpperCase();
      pokeHeight.innerHTML = 'Height: ' + pokemon.height;
      pokeType.innerHTML = 'Type: ' + pokemon.types.toUpperCase();
      pokeImage.src = pokemon.imageUrl;
      modalClose.innerHTML ="Close";
      showModal();
    }); */


  function loadList(){
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails (pokemon) {
    let url= pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details){
      //adding details to the item:
      pokemon.imageUrlFront = details.sprites.front_default;
      pokemon.imageUrlBack= details.sprites.back_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch (function (e) {
      console.error(e);
    });
  }

//adding all the modal code
  function showModal() {
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

  //  modalContainer.classList.add('is-visible');
    modalTitle.empty();
    modalBody.empty();

  }

/*  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  modalClose.addEventListener('click', hideModal);

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer){
      hideModal();
    }
  });*/

  let pokeName= $("<h1>" + pokemon.name + "</h1>");

  let pokeImageFront= $('<img class="modal-img" alt="Front of ' + pokemon.name + '" ' + 'style="width:60%">');
  pokeImageFront.attr("src", pokemon.imageUrlFront);

  let pokeImageBack= $('<img class="modal-img" alt="Back of ' + pokemon.name + '" ' + 'style="width:60%">');
  pokeImageBack.attr("src", pokemon.imageUrlBack);

  let pokeHeight= $("<p>" + "Height: " + pokemon.height + "</p>")

  let pokeTypeDiv= document.createElement("div");
  pokeTypeDiv.classList.add("type-wrapper", "row");

  pokemon.types.forEach((type) => {
    let pokeTypeElement= document.createElement("span");
    let pokeTypeText= document.createElememt("p");
    pokeTypeText.innerText= type.type.name;
    pokeTypeElement.classList.add("type", "col");
    pokeTypeElement.classList.add(type.type.name);
    pokeTypeElement.appendChild(pokeTypeText);
    pokeTypeDiv.appendChild(pokeTypeElement);
  });


  modalTitle.appendChild(modalClose);
  modalTitle.appendChild(pokeName);
  modalBody.appendChild(pokeHeight);
  modalBody.appendChild(pokeType);
  modalBody.appendChild(pokeImageFront);
  modalBody.appendChild(pokeImageBack);

  $("#pokemonModal").modal("toggle");


  return {
    getAll: getAll,
    add: add,
    addListpokemon: addListpokemon,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    


  };
})();




pokemonRepository.loadList().then( function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListpokemon(pokemon);
  });
});

/*
pokemonList.forEach(function(pokemon){
  let ul=document.querySelector('ul');
  let listpokemon= document.createElement('li');
  let button= document.createElement('button');
  button.innerText= pokemon.name;
  button.classList.add('pokemon-name-button');
  listpokemon.appendChild(button);
  ul.appendChild(listpokemon);
});





/*
for (let i=0; i<pokemonList.length; i++){
  if (pokemonList[i].height> 6){
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")- Wow, that's big! " +"<br>" );
  } else {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") "+"<br>");
  }
}*/
//test on website in the console with console.log(pokemonList)

// emptied from forEach loop: document.write(pokemon.name + ' is ' + pokemon.height + ' tall and a ' + pokemon.types + ' type pokemon.' + '<br>')
