const MAX_POKEMON = 150;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector(".search-input");
const numberFilter = document.querySelector("#number");
const nameeFilter = document.querySelector("#name");
const notFound = document.querySelector("#not-founf-meddage");

let allPokemon = [];
fetch(`https://pokeapi.co/api/v2/pokemon?Limit=${MAX_POKEMON}`)
  .then((response) => response.json())
  .then((data) => {
    allPokemon = data.results;
  });

function fetchPpokemon(id) {
  Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
      response.json()
    ),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((response) =>
      response.json()
    ),
  ]).then(([pokemon, species]) => console.log(pokemon, species));
  //   console.log(pokemon);
}
fetchPpokemon(1);

function displayPokemon(pokemon) {
  listWrapper.innerHTML = "";
  const listItem = document.createElement("div");
  listItem.className("list-item");
  listItem.innerHTML = `
    <div class="number-wrap">
        <p class="caption-fonts">${pokemonID}</p>
    </div>
        <div class="img-wrap">
        <img src class="caption-fonts">${pokemonID}</p>
    </div>
  `;
}
