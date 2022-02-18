//Deck API from http://deckofcardsapi.com/
let deckID;

async function getDeckID() {

    const resp = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");

    return resp;
}

getDeckID().then(resp => {
    deckID = resp.data.deck_id;

    console.log(`Cards Remaining: ${resp.data.remaining}`);
});

$("#deck").on("submit", async function (evt) {
    evt.preventDefault();

    const URL = `http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`;

    const resp = await axios.get(URL);

    const card_img = resp.data.cards[0].image;

    console.log(`Cards Remaining: ${resp.data.remaining}`);
    $("#discard").html(`<img src="${card_img}">`);

    if (resp.data.remaining <= 0) {
        $("#draw").addClass("hide");
    }
});

$("#reshuffle").on("click", async function (evt) {
    evt.preventDefault();

    const URL = `http://deckofcardsapi.com/api/deck/${deckID}/return/`;

    const resp = await axios.get(URL);

    console.log(`Cards Remaining: ${resp.data.remaining}`);
    $("#discard").html("");
    $("#draw").removeClass("hide");
});

