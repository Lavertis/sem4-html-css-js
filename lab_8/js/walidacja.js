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

function getCheckedRadio(radioGroupName) {
    const radioButtons = document.getElementsByName(radioGroupName);
    for (const radioButton of radioButtons)
        if (radioButton.checked) return radioButton;
    return null
}

function confirmData() {
    let data = "";
    const surname = document.getElementById("surname").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    let tutorials = "";
    for (const tutorial of document.getElementsByName("product")) {
        if (tutorial.checked)
            tutorials += `${tutorial.value}, `
    }
    document.getElementsByName("product").forEach(checkbox => checkbox.checked)
    if (tutorials.endsWith(", "))
        tutorials = tutorials.slice(0, -2);
    const payment = getCheckedRadio("payment").value;
    data += `Nazwisko: ${surname}\n`;
    data += `Wiek: ${age}\n`;
    data += `E-mail: ${email}\n`;
    data += `Wybrane tutoriale: ${tutorials}\n`;
    data += `Sposób zapłaty: ${payment}\n`;
    return window.confirm(data);
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