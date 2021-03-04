var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q={cityname}&appid={APIkey}&units=imperial'
var cities = ['Hartford'];
var icons = 'http://openweathermap.org/img/wn/'
$(document).ready(function () {
    /**
     * This is event triggered every time some one enters city name
     */
    $('#button-addon2').on("click", function () {

        clear();
        var cityName = $('#basic-url').val();
        var local = JSON.parse(localStorage.getItem('cities'));
        $("#cityList").append('<li class="list-group-item"><a class="nav-link history" href="#">' + cityName + '<a></li>');
       
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
    /**
     * Initialize weather app
     * Default city is Hartford
     */
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
    /**
     * Clear data for weather on refresh
     */
    var clear = function () {
        $("#currentData").children().empty();
        $(".card-body").children().empty();
    }
    /**
     * Fetch data from open weather API
     * @param {*} cityName 
     * @param {*} updateList 
     */
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
                currentWeather(data, currentDate, weatherData);
                currentDate = nextDays(data, currentDate);
            }).catch(error => console.error(error));
    }
    /**
     * This function gets data for current day weather
     * @param {*} data 
     * @param {*} currentDate 
     * @param {*} weatherData 
     */
    var currentWeather = function currentWeather(data, currentDate, weatherData) {
        var city = $("#currentData");
        city.append('<h5>' + data.city.name + ' (' + currentDate + ')</h5><img alt="' + icons + weatherData.weather[0].main + '" src="' + icons + weatherData.weather[0].icon + '@2x.png"/>');
        city.append('<p>Temperature: ' + weatherData.main.temp + ' F</p>');
        city.append('<p>Humidity: ' + weatherData.main.humidity + '%</p>');
        city.append('<p>Wind Speed: ' + weatherData.wind.speed + 'MPH</p>');
    }

    /**
     * This function maps weather data for next 4 days
     * @param {*} data 
     * @param {*} currentDate 
     */
    var nextDays = function nextDays(data, currentDate) {
        var j = 1;
        for (var i = 1; i < data.list.length; i++) {
    
            var dayData = data.list[i];
            var nextDay = dayData.dt_txt.split(" ")[0];
    
            if (currentDate === nextDay) {
            } else {
                var day = $("#day" + j);
                currentDate = nextDay;
                day.append('<h6>' + nextDay + '</h6>');
                day.append('<img src="' + icons + dayData.weather[0].icon + '@2x.png"/>');
                day.append('<p>Temperature: ' + dayData.main.temp + ' F</p>');
                day.append('<p>Humidity: ' + dayData.main.humidity + '%</p>');
                j++;
            }
    
        }
        return currentDate;
    }
    initialize();
});




