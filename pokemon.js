const MAX_POKEMON = 150;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

document.addEventListener("DOMContentLoaded", () => {
  const numberFilter = document.querySelector("#number");
  console.log(numberFilter); // Make sure it's selecting the right element
  console.log(numberFilter.checked); // Should log true if checked
  getPokehom();
});
// console.log(numberFilter);
// console.log(numberFilter.checked);
let allPokemons = [];
// fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
//   .then((response) => response.json())
//   .then((data) => {
//     allPokemons = data.results;
//     displayPokemons(allPokemons);
//   })
//   .catch((err) => {
//     console.log(err.message);

//     notFoundMessage.style.display = "block";
//     notFoundMessage.innerText = "try again later";
//   });
async function getPokehom() {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`
    );
    const data = await response.json();
    allPokemons = data.results;
    displayPokemons(allPokemons);
  } catch (e) {
    console.log(e);
  }
}
async function fetchPpokemon(id) {
  // return Promise.all([
  //   fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
  //     response.json()
  //   ),
  //   fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((response) =>
  //     response.json()
  //   ),
  // ])
  //   .then(([pokemon, species]) => {
  //     return true;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return false;
  //   });
  //   console.log(pokemon);

  try {
    const [pokemon, species] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
        response.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(
        (response) => response.json()
      ),
    ]);
    return true;
  } catch (err) {
    console.log(err, "error fetch data");
    return false;
  }
}

function displayPokemons(pokemon) {
  listWrapper.innerHTML = "";
  pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
      <div class="number-wrap">
          <p class="caption-fonts">${pokemonID}</p>
      </div>
      <div class="img-wrap">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" class="caption-fonts"/>
      </div>
          <div class="name-wrap">
          <p class="caption-fonts">${pokemon.name}</p>
      </div>
    `;
    // listItem.addEventListener("click", () => {
    //   fetchPpokemon(pokemonID).then((success) => {
    //     console.log(success);
    //     if (success) {
    //       window.location.href = `./detail.html?id=${pokemonID}`;
    //     }
    //   });
    // });
    listItem.addEventListener("click", async () => {
      const success = await fetchPpokemon(pokemonID);
      if (success) {
        window.location.href = `./detail.html?id=${pokemonID}`;
      }
    });
    listWrapper.appendChild(listItem);
  });
}

searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  let filteredPokemon;
  if (numberFilter.checked) {
    filteredPokemon = allPokemons.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];
      return pokemonID.startsWith(searchTerm);
    });
  } else if (nameFilter.checked) {
    filteredPokemon = allPokemons.filter((pokemon) => {
      return pokemon.name.toLowerCase().startsWith(searchTerm);
    });
  } else {
    filteredPokemon = allPokemons;
  }

  displayPokemons(filteredPokemon);
  if (filteredPokemon.length === 0) {
    notFoundMessage.style.display = "block";
  } else {
    notFoundMessage.style.display = "none";
  }
}

const closeButton = document.querySelector(".search-close-icon");
closeButton.addEventListener("click", clearSearch);
function clearSearch() {
  searchInput.value = "";
  displayPokemons(allPokemons);
  notFoundMessage.style.display = "none";
}
