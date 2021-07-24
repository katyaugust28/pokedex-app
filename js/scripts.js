
let pokemonRepository = (function () {
  pokemonList= [];

  let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //modal info

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
    pokemonRepository.loadDetails(pokemon).then(function(){

      var $pokeNameElement = $('<h1>' + pokemon.name + '</h1>');
      var $pokeHeightElement = $('<p>Height: ' + pokemon.height + '</p>');
      var $pokeWeightElement = $('<p>Weight: ' + pokemon.weight + '</p>');
      var $pokeTypeElement = $('<p>Type: ' + pokemon.types + '</p>');

      $('#pokemon-name').html($pokeNameElement);
      $('#pokemon-height').html($pokeHeightElement);
      $('#pokemon-weight').html($pokeWeightElement);
      $('#pokemon-types').html($pokeTypeElement);
      $('#pokemon-image').attr('src', pokemon.imageUrl);

      modalTitle.append(pokeNameElement);
      modalBody.append(pokeHeightElement);
      modalBody.append(pokeWeightElement);
      modalBody.append(pokeTypeElement);
      modalBody.append(pokeImageFront);
      modalBody.append(pokeImageBack);
      $("#pokemonModal").modal("toggle");
    });
  }


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
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.imageUrlBack = details.sprites.back_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = [];
      for (var i=0; i < details.types.length; i++) {
        pokemon.types.push(details.types[i].type.name);
      }
    }).catch (function (e) {
      console.error(e);
    });
  }

//adding the modal code

  function showModal() {
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");
    let modalFooter = $(".modal-footer");

    modalTitle.empty();
    modalBody.empty();
    modalFooter.empty();
  }

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
