// MY API KEY: 943239fa0e94ea682b788f358aa0a448 

var weatherData;

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
    request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?id=5780993&units=imperial&APPID=943239fa0e94ea682b788f358aa0a448');
    request.onload = loadComplete;
    request.send();
}

function loadComplete(evt) {
    weatherData = JSON.parse(request.responseText);
    console.log(weatherData);
    var so = new Date(weatherData.list[0].dt * 1000);
    document.getElementById("date").innerHTML = weatherData.list[0].weather[0].description;
    document.getElementById("wDescription").innerHTML = so.getHours();
    document.getElementById("humidity").innerHTML = weatherData.list[0].main.humidity + "%";
    document.getElementById("temp").innerHTML = weatherData.list[0].main.temp + "F";
}

function clockTicker() {
    var now = new Date();
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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