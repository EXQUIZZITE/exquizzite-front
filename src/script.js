// https://opentdb.com/api.php?amount=15&type=boolean

axios.get('https://opentdb.com/api.php?amount=15&type=boolean').then(function (response) {
    console.log(response.data);

}).catch(function (response) {
    console.log(response);
});
