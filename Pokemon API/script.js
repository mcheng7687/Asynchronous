//Pokemon API located here: https://pokeapi.co/

const URL = "https://pokeapi.co/api/v2/pokemon/?limit=10000";
const num_of_pokemon = 3;


$("#find_pokemon").on("submit", function (evt){
    evt.preventDefault();

    $("#board").empty();
    const selected_pokemon = [];

    axios.get(URL)
    .then(resp => {
        // console.log(resp.data);
        // selected_pokemon.length = 0;

        for (let i = 0; i < num_of_pokemon; i++) {
            let pokemon_id = Math.round(Math.random()*898/*resp.data.count*/);
            selected_pokemon.push(resp.data.results[pokemon_id]);
        
            // console.log(selected_pokemon[i])
        }
        return selected_pokemon;
    })
    .then(selected_pokemon => {
        for (let pokemon of selected_pokemon) {
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}/`)
                .then(resp => {
                    // console.log(resp);
                    for (let flavor_text of resp.data.flavor_text_entries) {
                        if (flavor_text.language.name == 'en')
                            return flavor_text.flavor_text;
                    }
                })
                .then(resp => {
                    pokemon.text = resp;
                    return axios.get(pokemon.url);
                })
                .then(resp => {
                    pokemon.imageURL = resp.data.sprites.front_default;
                    return;
                })
                .then(resp => {
                    $("#board").append(`<div class="col center">
                                    <h1>${pokemon.name}</h1>
                                    <img src="${pokemon.imageURL}">
                                    <h5>${pokemon.text}</h5>
                                    </div>`);
                    console.log(pokemon)
                })
                .catch(err => console.log(err));
        }

    })
    .catch(err => {
        console.log(err);
    });
});