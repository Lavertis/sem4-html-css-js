function initializeMap(position) {
    const coordinates = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    const mapOptions = {
        zoom: 10,
        center: coordinates,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    new google.maps.Map(document.getElementById("map"), mapOptions);
}

function showLocation(position) {
    initializeMap(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const output = document.getElementById("geo");
    output.innerHTML = `<p>Szerokość geograficzna: ${latitude}</p><p>Długość geograficzna: ${longitude}</p>`;
}

function errorHandler(error) {
    const output = document.getElementById("geo");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            output.innerHTML = "Użytkownik nie udostępnił danych.";
            break;
        case error.POSITION_UNAVAILABLE:
            output.innerHTML = "Dane lokalizacyjne niedostępne.";
            break;
        case error.TIMEOUT:
            output.innerHTML = "Przekroczono czas żądania.";
            break;
        case error.UNKNOWN_ERR:
            output.innerHTML = "Wystąpił nieznany błąd.";
            break;
    }
}

function getLocation() {
    if (navigator.geolocation) {
        const options = {timeout: 60000};
        navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
    } else alert("Twoja przeglądarka nie wspiera geolokalizacji!");
}