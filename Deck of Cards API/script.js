//Deck API from http://deckofcardsapi.com/

let deckID;

axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(resp => {
        deckID = resp.data.deck_id;
        console.log(`Cards Remaining: ${resp.data.remaining}`)
    });


$("#deck").on("submit", function(evt) {
    evt.preventDefault();

    const URL = `http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`;
    
    axios.get(URL)
        .then(resp => {
            const card_img = resp.data.cards[0].image;
            console.log(`Cards Remaining: ${resp.data.remaining}`);
            $("#discard").html(`<img src="${card_img}">`);

            if (resp.data.remaining <= 0) {
                $("#draw").addClass("hide");
            }
        });
});

$("#reshuffle").on("click", function(evt) {
    evt.preventDefault();

    const URL = `http://deckofcardsapi.com/api/deck/${deckID}/return/`;

    axios.get(URL)
        .then(resp => {
            console.log(`Cards Remaining: ${resp.data.remaining}`);
            $("#discard").html("");
            $("#draw").removeClass("hide");
        });
})

