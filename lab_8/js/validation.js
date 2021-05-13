function isFieldValid(fieldID, regexPattern) {
    const field = document.getElementById(fieldID);
    return regexPattern.test(field.value);
}

function isRadioChecked(radioGroupName) {
    const radioButtons = document.getElementsByName(radioGroupName);
    for (const radioButton of radioButtons)
        if (radioButton.checked) return true;
    return false;
}

function getCheckedRadio(radioGroupName) {
    const radioButtons = document.getElementsByName(radioGroupName);
    for (const radioButton of radioButtons)
        if (radioButton.checked) return radioButton;
    return null
}

function isAnyCheckboxChecked(checkboxGroupName) {
    const checkboxes = document.getElementsByName(checkboxGroupName);
    for (const checkbox of checkboxes)
        if (checkbox.checked) return true;
    return false;
}

function getCheckedCheckboxes(checkboxGroupName) {
    const checkboxes = document.getElementsByName(checkboxGroupName);
    let checkedCheckboxes = [];
    for (const checkbox of checkboxes)
        if (checkbox.checked) checkedCheckboxes.push(checkbox);
    return checkedCheckboxes;
}

function confirmData() {
    let data = "Dane z wypełnionego przez Ciebie formularza:\n";
    const surname = document.getElementById("surname").value;
    const age = document.getElementById("age").value;
    const country = document.getElementById("country").value;
    const email = document.getElementById("email").value;
    let tutorials = "";
    getCheckedCheckboxes("product").forEach(tutorial => tutorials += `${tutorial.value}, `)
    tutorials = tutorials.slice(0, -2);
    const payment = getCheckedRadio("payment").value;
    data += `Nazwisko: ${surname}\n`;
    data += `Wiek: ${age}\n`;
    data += `Kraj: ${country}\n`;
    data += `E-mail: ${email}\n`;
    data += `Wybrane produkty: ${tutorials}\n`;
    data += `Sposób zapłaty: ${payment}\n`;
    return window.confirm(data);
}

function isFormValid() {
    let valid = true;
    const patternSurname = /^[A-ZŁŚ][a-ząęółśżźćń]{1,20}(-[A-ZŁŚ][a-ząęółśżźćń]{1,20}){0,2}$/;
    const patternEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;
    const patternAge = /^[1-9][0-9]$/;

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
        document.getElementById("visa").checked = "checked";
        document.getElementById("payment-error").innerHTML = "Wybrano domyślny sposób płatności";
    } else document.getElementById("payment-error").innerHTML = "";

    if (!isAnyCheckboxChecked("product")) {
        valid = false;
        document.getElementById("product-error").innerHTML = "Nie wybrałeś żadnego produktu";
    } else document.getElementById("product-error").innerHTML = "";

    if (!valid)
        return false;

    return confirmData();
}

function clearErrorMessages() {
    document.getElementById("surname-error").innerHTML = "";
    document.getElementById("email-error").innerHTML = "";
    document.getElementById("age-error").innerHTML = "";
    document.getElementById("payment-error").innerHTML = "";
    document.getElementById("product-error").innerHTML = "";
}