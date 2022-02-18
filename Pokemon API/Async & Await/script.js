//Pokemon API located here: https://pokeapi.co/

const URL = "https://pokeapi.co/api/v2/pokemon/?limit=10000";
const num_of_pokemon = 3;

// Get 3 random pokemon from API
// Return array of pokemon objects
async function getRandomPokemon() {
    const resp = await axios.get(URL);
    const selected_pokemon = [];

    for (let i = 0; i < num_of_pokemon; i++) {
        let pokemon_id = Math.round(Math.random()*898/*resp.data.count*/);
        selected_pokemon.push(resp.data.results[pokemon_id]);

    }
    return selected_pokemon;
}

// Get specific information of specified pokemon from API
// Return pokemon object with new data 'text'
async function getPokemonInfo(pokemon) {
    const resp_info = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}/`);

    for (let flavor_text of resp_info.data.flavor_text_entries) {
        if (flavor_text.language.name == 'en') {
            pokemon.text = flavor_text.flavor_text;
            return pokemon;
        }
    }
}

// Get sprite of specified pokemon from API
// Return pokemon object with new data 'imageURL'
async function getPokemonImage(pokemon) {
    const resp_image = await axios.get(pokemon.url);

    pokemon.imageURL = resp_image.data.sprites.front_default;

    return pokemon;
}

$("#find_pokemon").on("submit", function (evt){
    evt.preventDefault();

    $("#board").empty();

    getRandomPokemon()
    .then(selected_pokemon => {
        for (let pokemon of selected_pokemon) {
            getPokemonInfo(pokemon)
                .then(getPokemonImage(pokemon))
                .then(pokemon => {
                    console.log(pokemon);

                    $("#board").append(`<div class="col center">
                                    <h1>${pokemon.name}</h1>
                                    <img src="${pokemon.imageURL}">
                                    <h5>${pokemon.text}</h5>
                                    </div>`);
                })
                .catch(err => console.log(err));
        }
    })
    .catch(err => {
        console.log(err);
    });
});