function isFieldValid(fieldID, regexPattern) {
    const field = document.getElementById(fieldID);
    return regexPattern.test(field.value);
}

function isRadioChecked(radioGroupName) {
    const radioButtons = document.getElementsByName(radioGroupName);
    for (let i = 0; i < radioButtons.length; i++)
        if (radioButtons[i].checked) return true;
    return false;
}

function isAnyCheckboxChecked(checkboxGroupName) {
    const checkboxes = document.getElementsByName(checkboxGroupName);
    for (const checkbox of checkboxes)
        if (checkbox.checked) return true;
    return false;
}

function isFormValid() {
    let valid = true;
    const patternSurname = /^[a-zA-Zęóąśłżźćń]{2,20}$/;
    const patternEmail = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
    const patternAge = /^[1-9][0-9]{1,2}$/;

    if (!isFieldValid("surname", patternSurname)) {
        valid = false;
        document.getElementById("surname-error").innerHTML = "Wpisz poprawnie nazwisko";
    } else document.getElementById("surname-error").innerHTML = "";

    if (!isFieldValid("email", patternEmail)) {
        valid = false;
        document.getElementById("email-error").innerHTML = "Wpisz poprawny adres e-mail";
    } else document.getElementById("email-error").innerHTML = "";

    if (!isFieldValid("age", patternAge)) {
        valid = false;
        document.getElementById("age-error").innerHTML = "Wpisz poprawny wiek";
    } else document.getElementById("age-error").innerHTML = "";

    if (!isRadioChecked("payment")) {
        valid = false;
        document.getElementById("payment-error").innerHTML = "Wybierz sposób płatności";
    } else document.getElementById("payment-error").innerHTML = "";

    if (!isAnyCheckboxChecked("product")) {
        valid = false;
        document.getElementById("product-error").innerHTML = "Nie wybrałeś żadnego produktu";
    } else document.getElementById("product-error").innerHTML = "";

    return valid;
}

function clearErrorMessages() {
    document.getElementById("surname-error").innerHTML = "";
    document.getElementById("email-error").innerHTML = "";
    document.getElementById("age-error").innerHTML = "";
    document.getElementById("payment-error").innerHTML = "";
}