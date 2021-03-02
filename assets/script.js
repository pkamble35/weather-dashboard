var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q={cityname}&appid={APIkey}'

$(document).ready(function () {

    $('#button-addon2').on("click", function () {


        var cityName = $('#basic-url').val();
        $("#cityList").append('<li class="list-group-item">' + cityName + '</li>');
        var href = new URL (requestURL);
        href.searchParams.set('q',cityName);
        href.searchParams.set('appid', 'a81c592b6949fce4f178158ff0a7378d');
        fetch(href.toString())
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log('Fetch Response \n-------------');
                console.log(data);
            });
    });



});