const number_array = [];
const numberOfFacts = 4;

async function addFacts(url) {

    let res = await axios.get(url);

    console.log(res);

    if (number_array.length > 1) {
        number_array.forEach(ele => {
            $(`#${ele}`).append(`<p>${res.data[ele]}</p>`);
        })
    }
    else if (number_array == 1) {
        number_array.forEach(ele => {
            $(`#${ele}`).append(`<p>${res.data}</p>`);
        })
    }
}


$("#add").on("click", function (evt) {
    evt.preventDefault();
    const value = $("#number").val();
    if (value && !number_array.includes(value)) {
        number_array.push(value);
        $("ul").append(`<li id="${value}">${value}</li>`)
    }
});

$("#clear").on("click", function (evt) {
    evt.preventDefault();

    number_array.length = 0;
    $("ul").empty();
});

$("#find_fact").on("submit", function (evt) {
    evt.preventDefault();

    const url = "http://numbersapi.com/".concat(number_array.join());

    $("li").empty();

    console.log(url);

    for (let i = 0; i < numberOfFacts;i++) {
        addFacts(url);
    }
});

