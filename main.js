"use strict";

let latitude, longitude, city;

function XHRWeather(){
    
    const xhrWeather = new XMLHttpRequest();

    xhrWeather.open('get', `https://api.open-meteo.com/v1/meteofrance?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,snowfall&current_weather=true&timezone=Europe%2FLondon`);

    xhrWeather.addEventListener('load', function() {

        // console.log('Statut de la réponse: '+ xhrWeather.status + ' - ' + xhrWeather.statusText);
        // console.log('content-type: '+ xhrWeather.getResponseHeader('Content-type'));

        const jsonData = xhrWeather.responseText;

        const data = JSON.parse(jsonData)

        const tempActual = data.current_weather.temperature

        document.querySelector('.temperature').innerHTML = tempActual + ' °C';
        // console.log(tempActual);


        //CHANGER API GEOCODING CAR PAS ASSER PRECIS POUR OBTENIR LE WEATHERCODE DE L'API METEO
        const weatherCode = data.current_weather.weatherCode;
        console.log(`${weatherCode}weatherCode`);
    });

    xhrWeather.addEventListener('error', function(){
        console.log('La requête à échoué.');
    });

    xhrWeather.send();
};

function cityToLatLong(){
    city = document.querySelector('.city').textContent;
    const xhrCityLatLong = new XMLHttpRequest();
    xhrCityLatLong.open('get', `https://api.api-ninjas.com/v1/geocoding?city=${city}/`);
    xhrCityLatLong.setRequestHeader('X-Api-Key', 'FJr6+xTIKd3pmcyfBZoSvw==vbuT0TGpT9bfJcUt');

    xhrCityLatLong.addEventListener('load', function() {
        // console.log('LOAD'+ xhrCityLatLong.status);
        const jsonData = xhrCityLatLong.responseText;
        const data = JSON.parse(jsonData)
        latitude = data[0].latitude;
        longitude = data[0].longitude;
        console.log(latitude, longitude);
        XHRWeather();
    });

    xhrCityLatLong.addEventListener('error', function(){
        console.log('La requête à échoué.');
    });

    xhrCityLatLong.send();

    
};

function getCityUser(){
    let btnChangeCity = document.querySelector('.btn-change-city');
    
    btnChangeCity.addEventListener('click', ()=>{
        let cityUser = prompt('Indiqué votre ville :');
        document.querySelector('.city').textContent = cityUser;
        cityToLatLong();
    });

}

// remove & add class in DOM HTML




document.addEventListener('DOMContentLoaded', function() {
    cityToLatLong();
    getCityUser();
    console.log("LANCEMENT DE L'APP");
});