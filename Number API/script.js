const number_array = [];
let url = "http://numbersapi.com/";

// $("#find_fact").on("submit", function(evt) {
//     evt.preventDefault();

//     number_array.forEach(ele => {
//         const url = `http://numbersapi.com/${ele}?json`;

//         axios
//             .get(url)
//             .then(res => {
//                 console.log(res.data);
//                 $(`#${ele}`).text(res.data.text);
//             });
//     });
// });

function addFacts(res) {
    console.log(url);
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
    return axios.get(url);
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

    url = "http://numbersapi.com/".concat(number_array.join());

    $("li").empty();

    axios
        .get(url)
        .then(res => addFacts(res))
        .then(res => addFacts(res))
        .then(res => addFacts(res))
        .then(res => addFacts(res));
});

