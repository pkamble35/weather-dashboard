var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q={cityname}&appid={APIkey}&units=imperial'
var cities = ['Hartford'];
var icons = 'http://openweathermap.org/img/wn/'
$(document).ready(function () {

    $('#button-addon2').on("click", function () {

        clear();
        var cityName = $('#basic-url').val();
        var local = JSON.parse(localStorage.getItem('cities'));
        $("#cityList").append('<li class="list-group-item"><a class="nav-link history" href="#">' + data.city.name + '<a></li>');
       
        if(local){
            if(local.length==10){
                local.pop();
            }
            local.push(cityName);
            localStorage.setItem('cities',JSON.stringify(local));
        }else{
            cities.push(cityName);
            localStorage.setItem('cities',JSON.stringify(cities));
        }
        
        fetchData(cityName);
    });
    $('#cityList').on("click",'li.list-group-item', function () {

        clear();
        var cityName = $( this ).text();
        fetchData(cityName,true);
    });
    var initialize = function () {
        var local = JSON.parse(localStorage.getItem('cities'));
        if(local){
            local.forEach(element => {
                $("#cityList").append('<li class="list-group-item"><a class="nav-link history" href="#">' + element + '<a></li>');
           
            });
            fetchData(local[0]);
        }else{            
            fetchData('Hartford');
        }
        
        
    }
    var clear = function () {
        $("#currentData").children().empty();
        $(".card-body").children().empty();
    }
    var fetchData = function (cityName,updateList) {
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
               
                var weatherData = data.list[0];
                var currentDate = weatherData.dt_txt.split(" ")[0];
                var city = $("#currentData");
                city.append('<h5>' + data.city.name + ' (' + currentDate + ')</h5><img alt="'+icons+weatherData.weather[0].main+'" src="'+icons+weatherData.weather[0].icon+'@2x.png"/>');
                city.append('<p>Temperature: ' + weatherData.main.temp + ' F</p>');
                city.append('<p>Humidity: ' + weatherData.main.humidity + '%</p>');
                city.append('<p>Wind Speed: ' + weatherData.wind.speed + 'MPH</p>');
                var j = 1;
                for (var i = 1; i < data.list.length; i++) {

                    var dayData = data.list[i];
                    var nextDay = dayData.dt_txt.split(" ")[0];

                    if (currentDate === nextDay) {

                    } else {
                        var day = $("#day" + j);
                        currentDate = nextDay;
                        day.append('<h6>' + nextDay + '</h6>');
                        day.append('<img src="'+icons+dayData.weather[0].icon+'@2x.png"/>')
                        day.append('<p>Temperature: ' + dayData.main.temp + ' F</p>');
                        day.append('<p>Humidity: ' + dayData.main.humidity + '%</p>');
                        j++;
                    }

                }
            }).catch(error => console.error(error));
    }
    initialize();
});