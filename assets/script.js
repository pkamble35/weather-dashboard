var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q={cityname}&appid={APIkey}&units=imperial'

$(document).ready(function () {

    $('#button-addon2').on("click", function () {

        clear();
        var cityName = $('#basic-url').val();
        fetchData(cityName);
    });
    var initialize = function () {
        fetchData('Hartford');
    }
    var clear = function () {
        $("#currentData").children().empty();
        $(".card-body").children().empty();
    }
    var fetchData = function (cityName) {
        var href = new URL(requestURL);
        href.searchParams.set('q', cityName);
        href.searchParams.set('appid', 'a81c592b6949fce4f178158ff0a7378d');

        fetch(href.toString())
            .then(function (response) {
                if (!response || response.status !== 200) {
                    throw new TypeError(response.status);
                }
                return response.json();
            })
            .then(function (data) {
                $("#cityList").append('<li class="list-group-item">' + cityName + '</li>');

                var weatherData = data.list[0];
                var currentDate = weatherData.dt_txt.split(" ")[0];
                var city = $("#currentData");
                city.append('<h5>' + data.city.name + ' (' + currentDate + ')</h5>');
                city.append('<p>Temperature: ' + weatherData.main.temp + ' F</p>');
                city.append('<p>Humidity: ' + weatherData.main.humidity + '%</p>');
                city.append('<p>Wind Speed: ' + weatherData.wind.speed + 'MPH</p>');
                city.append('<p>UV Index: ' + weatherData.wind.speed + '</p>');
                var j = 1;
                for (var i = 1; i < data.list.length; i++) {

                    var dayData = data.list[i];
                    var nextDay = dayData.dt_txt.split(" ")[0];

                    if (currentDate === nextDay) {

                    } else {
                        var day = $("#day" + j);
                        currentDate = nextDay;
                        day.append('<h6>' + nextDay + '</h6>');
                        day.append('<p>Temperature: ' + dayData.main.temp + ' F</p>');
                        day.append('<p>Humidity: ' + dayData.main.humidity + '%</p>');
                        j++;
                    }

                }
            }).catch(error => console.error(error));
    }
    initialize();
});