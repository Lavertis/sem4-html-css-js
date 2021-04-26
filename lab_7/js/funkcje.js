window.onload = function () {
    pokaz(1);
};

function pokaz(id) {
    let tresc = "";
    switch (id) {
        case 1:
            tresc += pokazO();
            break;
        case 2:
            tresc += pokazGalerie();
            break;
        case 3:
            tresc += pokazPost();
            break;
        case 4:
            tresc += pokazKontakt();
            break;
    }
    tresc += '<br>';
    //pobierz element o wskazanym id i ustaw jego nową zawartość:
    document.getElementById('blok').innerHTML = tresc;
}

function pokazO() {
    let tresc = '<h2><br>Pierwsze kroki</h2> ';
    //operator += uzupełnia łańcuch kolejną porcją znaków:
    tresc += '<p> W aplikacjach typu SPA (ang. Single Page Application) po przesłaniu pierwszego żądania, również' +
        ' dochodzi do odesłania początkowego dokumentu HTML do przeglądarki, jednak po zakończeniu inicjalizacji' +
        ' wszelkie działania użytkownika prowadzą tylko do wysłania żądań asynchronicznie (w tle za pomocą AJAX).' +
        ' Odpowiedziami na te żądania zwykle są tylko fragmenty kodu HTML (zamiast całych dokumentów), a niekiedy' +
        ' wyłącznie dane, które następnie są wstawiane/zamieniane w ramach istniejących elementów dokumentu HTML.' +
        ' Nigdy nie dochodzi do zamiany całego dokumentu HTML.</p>' +
        ' <p class="srodek"><img src="images/baner.jpg" alt="Zdjęcie" /></p>' +
        ' <article><h2>Wady SPA</h2><p>' +
        ' Czas wytworzenia oraz nakład pracy włożony w stworzenie aplikacji jest większy, co wiąże ze sobą dodatkowe' +
        ' koszta, dlatego tworzenie małych stron jest nieopłacalne — efekt dla strony z jedną zakładką jest' +
        ' niezauważalny. Pozycjonowanie stron wymaga większego nakładu pracy. Obecne roboty indeksujące Google nie' +
        ' radzą sobie ze stronami tego typu, co wiąże się z koniecznością tworzenia rozwiązań przystosowanych dla' +
        ' robotów. </p></article>';
    //przekaż wynik – gotową zawartość – do miejsca wywołania funkcji:
    return tresc;
}

function pokazGalerie() {
    let tresc = '<h2><br>Moja galeria</h2>';
    tresc += ' <div class="galeria">';
    //wygeneruj kod HTML z obrazami za pomocą pętli for:
    for (let i = 1; i <= 10; i++) {
        tresc += '<div class="slajd"><img alt="Zdjęcie ' + i + '" src="miniaturki/obraz' + i + '.jpg"/></div>';
    }
    return tresc + '</div>';
}

function pokazKontakt() {
    let tresc = '<h2><br>Kontakt</h2>';
    tresc += '<article class="srodek" >' + "Email: rafal.kuzmiczuk@pollub.edu.pl" + '<br>';
    tresc += "Telefon: +48 123 456 789" + '</article>';
    return tresc;
}

function pokazPost() {
    //funkcja generuje kod formularza – dane wpisane w odpowiednie pola przez
    //użytkownika zostaną przekazane mailem na wskazany adres, ale najpierw po
    //zajściu zdarzenia submit (wyślij) – zostanie wywołana funkcja pokazDane()
    let tresc = '<h2><br>Dodaj post</h2>';
    tresc += ' <article class="srodek" >' +
        ' <form action="mailto:rafal.kuzmiczuk@pollub.edu.pl" method="post" onsubmit="pokazDane()">' +
        ' Twój email:<br> <input type="email" name="email" id="email" required /> <br>' +
        ' Nazwisko i imie:<br> <input type="text" name="name-surname" id="name-surname" required /> <br>' +
        ' Telefon:<br> <input type="tel" name="phone" id="phone" required /> <br><br>' +
        ' Zainteresowania: <br> <input type="checkbox" name="interest" id="interest-sport" value="sport"> Sport' +
        ' <input type="checkbox" name="interest" id="interest-music" value="muzyka"> Muzyka' +
        ' <input type="checkbox" name="interest" id="interest-movie" value="film"> Film' +
        ' <input type="checkbox" name="interest" id="interest-other" value="inne"> Inne <br><br>' +
        ' Wiek: <br> <input type="radio" name="age" id="10-" required> Mniej niż 10' +
        ' <input type="radio" name="age" value="10-20"> 10-20' +
        ' <input type="radio" name="age" id="21-30"> 21-30' +
        ' <input type="radio" name="age" id="31-40"> 31-40' +
        ' <input type="radio" name="age" id="41-50"> 41-50' +
        ' <input type="radio" name="age" id="50+"> Więcej niż 50 <br><br>' +
        ' <label for="cars">Choose a car:</label><br>' +
        ' <select name="cars" id="cars" multiple required>' +
        ' <option name="car" value="volvo">Volvo</option>' +
        ' <option name="car" value="saab">Saab</option>' +
        ' <option name="car" value="opel">Opel</option>' +
        ' <option name="car" value="audi">Audi</option>' +
        ' </select><br><br>' +
        ' Wiadomość: <br> <textarea rows="3" cols="20" id="wiadomosc" name="wiadomosc" required></textarea> <br>' +
        ' <input type="submit" name="wyslij" value="Wyślij" />' +
        ' </form>' +
        ' </article>';
    return tresc;
}

function pokazDane() {
    //Funkcja zbiera dane wpisane w pola formularza i wyświetla okienko
    //typu confirm do zatwierdzenia przez użytkownika:
    const email = document.getElementById('email').value;
    const nameSurname = document.getElementById('name-surname').value;
    const phoneNumber = document.getElementById('phone').value;
    const comment = document.getElementById('wiadomosc').value
    const interests = document.getElementsByName('interest');
    const ageRadioButtons = document.getElementsByName('age');
    const cars = document.getElementsByName('car');
    let age;
    ageRadioButtons.forEach(element => element.checked ? age = element.id : {});
    let dane = "Następujące dane zostaną wysłane:\n";
    dane += "Email: " + email + "\n";
    dane += "Nazwisko i imię: " + nameSurname + "\n";
    dane += "Telefon: " + phoneNumber + "\n";
    dane += "Zainteresowania: ";
    interests.forEach(element => element.checked ? dane += element.value + ", " : {});
    if (dane.endsWith(", "))
        dane = dane.slice(0, -2);
    dane += "\n";
    dane += "Samochody: ";
    cars.forEach(element => element.selected ? dane += element.value + ", " : {});
    if (dane.endsWith(", "))
        dane = dane.slice(0, -2);
    dane += "\n";
    dane += "Wiek: " + age + "\n";
    dane += "Wiadomość: " + comment + "\n";
    return window.confirm(dane);
}