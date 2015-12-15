// MY API KEY: 943239fa0e94ea682b788f358aa0a448 

var weatherData;
var city = 'Salt Lake City'
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var request = new XMLHttpRequest();

$.ajax({
    url: "http://www.google.com/finance/info?q=goog,msft,aapl,flws,nke,ko,lnkd,p,dis,rad",
    dataType: "jsonp",

    success: function (data) {
        console.log(data);
        $.each(data, function (i, e) {
            document.getElementById('scroll').innerHTML += e.t + " : " + e.c + " ";
        });
    }
});

function loadWeather() {
    request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + ',us&units=imperial&APPID=943239fa0e94ea682b788f358aa0a448');
    request.onload = loadComplete;
    request.send();
}

function setCity(cityName) {
    city = cityName;
    loadWeather();
    console.log(cityName);
    console.log(city);

}

function loadComplete(evt) {
    weatherData = JSON.parse(request.responseText);
    console.log(weatherData);
    document.getElementById("curCity").innerHTML = weatherData.city.name;
    document.getElementById('weather').innerHTML = "";
    for (i = 0; i < 5; i++) {
        var so = new Date(weatherData.list[i].dt * 1000);
        var dayDiv = document.createElement('div');
        
        var wd = document.createTextNode(weatherData.list[i].weather[0].description);
        var d = document.createTextNode(months[so.getMonth()] + " " + so.getDate());
        var hum = document.createTextNode('Humidity: ' + weatherData.list[i].humidity + "%");
        var tem = document.createTextNode('Temp: ' + weatherData.list[i].temp.max + "F°");
        
        dayDiv.appendChild(wd);
        dayDiv.appendChild(d);
        dayDiv.appendChild(hum);
        dayDiv.appendChild(tem);
        
        document.getElementById('weather').appendChild(dayDiv);
        
    }
}

function clockTicker() {
    var now = new Date();
    time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    date = months[now.getMonth()] + ", " + now.getDate() + " " + now.getFullYear();

    document.getElementById('time').innerHTML = time + " " + date;
}
//-----------------------------------------------------------------------
var winHeight = $(window).width();

function scroll() {
    winHeight -= 1;
    var scroller = document.getElementById('scroll');
    var scrollerSize = getComputedStyle(scroller).width;
    scroller.style.left = winHeight + 'px';
    scroller.style.whiteSpace = 'nowrap';
    scroller.style.position = 'absolute';
    if (scroller.style.left == '-1000px') {
        winHeight = $(window).width();
        scroller.style.left = winHeight + 'px';
    }
}
//-----------------------------------------------------------------------
var scroller = setInterval(scroll, 10);
var clock = setInterval(clockTicker, 1000);
var weatherTicker = setInterval(loadWeather, 60000);

loadWeather();