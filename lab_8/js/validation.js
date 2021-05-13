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
    const surname = $("#surname").val();
    const age = $("#age").val();
    const country = $("#country").val();
    const email = $("#email").val();
    let products = "";
    getCheckedCheckboxes("product").forEach(product => products += `${product.value}, `)
    products = products.slice(0, -2);
    const payment = getCheckedRadio("payment").value;
    data += `Nazwisko: ${surname}\n`;
    data += `Wiek: ${age}\n`;
    data += `Kraj: ${country}\n`;
    data += `E-mail: ${email}\n`;
    data += `Wybrane produkty: ${products}\n`;
    data += `Sposób zapłaty: ${payment}\n`;
    return window.confirm(data);
}

function isFormValid() {
    clearErrorMessages()
    let formValid = true;
    const patternsMap = new Map([
        ["surname", /^[A-ZŁŚ][a-ząęółśżźćń]{1,20}(-[A-ZŁŚ][a-ząęółśżźćń]{1,20}){0,2}$/],
        ["email", /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
        ["age", /^[1-9][0-9]$/]
    ])
    if (!isFieldValid("surname", patternsMap.get("surname"))) {
        formValid = false;
        $("#surname-error").html("Wpisz poprawnie nazwisko");
    }
    if (!isFieldValid("email", patternsMap.get("email"))) {
        formValid = false;
        $("#email-error").html("Wpisz poprawny adres e-mail");
    }
    if (!isFieldValid("age", patternsMap.get("age"))) {
        formValid = false;
        $("#age-error").html("Wpisz poprawny wiek");
    }
    if (!isRadioChecked("payment")) {
        $("#visa").prop("checked", true);
        $("#payment-error").html("Wybrano domyślny sposób płatności");
    }
    if (!isAnyCheckboxChecked("product")) {
        formValid = false;
        $("#product-error").html("Nie wybrałeś żadnego produktu");
    }

    if (!formValid)
        return false;

    return confirmData();
}

function clearErrorMessages() {
    $("[id$='-error']").html("");
}