// Main script – the statements are not executed until the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();
    let user = new User();

    document.getElementById("form").innerHTML = user.getRegisterFormAsHtml();
    document.getElementById("registerBtn").addEventListener("click", function () {
        const login = document.getElementById("login").value;
        const pass = document.getElementById("pass").value;
        const email = document.getElementById("email").value;
        if ([login, pass, email].some(value => value === "")) {
            document.getElementById("info").innerHTML = "Wprowadź wszystkie dane";
            return false;
        }
        if (localStorage.hasOwnProperty(login)) {
            document.getElementById("info").innerHTML = "Istnieje już użytkownik o podanym loginie";
            return false;
        }
        if (Object.values(localStorage).some(user => JSON.parse(user).email === email)) {
            document.getElementById("info").innerHTML = "Istnieje już użytkownik o podanym adresie email";
            return false;
        }

        user.login = login;
        user.pass = pass;
        user.email = email;
        user.register();
        document.getElementById("info").innerHTML = `Dodano użytkownika ${login}`;
        console.log(user.toString());
    });
});

// User class definition
class User {
    constructor(email = "example@example.com", login = "user", pass = "pass") {
        this.email = email;
        this.login = login;
        this.pass = pass;
    }

    register() {
        localStorage.setItem(this.login, JSON.stringify(this));
        return true;
    }

    getRegisterFormAsHtml() {
        let form = "";
        form += '<div><label for="email">Email: </label><input id="email" type="text"></div>';
        form += '<div><label for="login">Login: </label><input id="login" type="text"></div>';
        form += '<div><label for="pass">Hasło: </label><input id="pass" type="text"></div>';
        form += '<br><button id="registerBtn" type="button">Zarejestruj</button>';
        return form;
    }

    toString() {
        return `Dane użytkownika:\nlogin: ${this.login}\nhasło: ${this.pass}\nemail: ${this.email}`;
    }
}