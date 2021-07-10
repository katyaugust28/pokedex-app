
let pokemonRepository = (function () {
  pokemonList= [];

  let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll(){
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon){
    let pokemonList= document.querySelector(".pokemon-list");
    let listItem= document.createElement('li');
    let button= document.createElement('button');
    button.innerText= pokemon.name;
    button.classList.add('pokemon-name-button');
    button.addEventListener('click', function (event){
      showDetails(pokemon);
    })
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  function showDetails(pokemon){
    console.log(pokemon)
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
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList
  };
})();


let bulbasaur={
  name: 'Bulbasaur',
  height: 2.25,
  types: ['grass','poison']
};

let ivysaur={
  name: 'Ivysaur',
  height: 3,
  types: ['grass','poison']
};

let venusaur={
  name: 'Venusaur',
  height: 6.5,
  types: ['grass','poison']
};

let charmander={
  name: 'Charmander',
  height: 2,
  types: ['fire']
};

let charmeleon={
  name: 'Charmeleon',
  height: 3.5,
  types: ['fire']
};

let charizard={
  name: 'Charizard',
  height: 5.5,
  types: ['fire', 'flying']
};

let squirtle={
  name: 'Squirtle',
  height: 1.5,
  types: ['water']
};

let wartortle={
  name: 'Wartortle',
  height: 3.25,
  types: ['water']
};

let blastoise={
  name: 'Blastoise',
  height: 5.25,
  types: ['water']
};

pokemonList.push(bulbasaur)
pokemonList.push(ivysaur)
pokemonList.push(venusaur)
pokemonList.push(charmander)
pokemonList.push(charmeleon)
pokemonList.push(charizard)
pokemonList.push(squirtle)
pokemonList.push(wartortle)
pokemonList.push(blastoise)

pokemonRepository.loadList().then( function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

/*
pokemonList.forEach(function(pokemon){
  let ul=document.querySelector('ul');
  let listItem= document.createElement('li');
  let button= document.createElement('button');
  button.innerText= pokemon.name;
  button.classList.add('pokemon-name-button');
  listItem.appendChild(button);
  ul.appendChild(listItem);
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
