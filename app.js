console.log("pokemon");
const input = document.querySelector(".search-input");
const btn = document.querySelector(".search-btn");

btn.addEventListener("click", () => {
  console.log("click");
  // if (input.value === "" || input.value.length < 4) {
  //   alert("please enter request");
  //   return;
  // }
  fetchPokemon(input.value);
});

const fetchPokemon = (params = "") => {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const div = document.querySelector(".result");
  div.innerHTML = "";
  if (!params) {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
      promises.push(
        fetch(`${url}${i}`)
          .then((respond) => respond.json())
          .then((data) => data.name)
          .catch((error) => {
            console.log(error);
          })
      );
    }
    Promise.all(promises)
      .then((names) => {
        names.forEach((name) => {
          const p = document.createElement("p");
          p.innerText = data.name;
          div.appendChild(p);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        const p = document.createElement("p");
        p.innerText = "Error, please try another request";
        div.appendChild(p);
      });
  } else {
    const p = document.createElement("p");
    console.log(p);
    const name = fetch(`${url}${params}`)
      .then((respond) => respond.json())
      .then((data) => data.name)
      .then((name) => {
        console.log(name);
        p.innerText = name;
        div.appendChild(p);
      })
      .catch((error) => {
        p.innerText = "Ошибка, попробуйте другой запрос";
        div.appendChild(p);
      });
  }
  // fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //   });
};
console.log("pokemon");
