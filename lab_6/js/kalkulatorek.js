function oblicz() {
    const tab = document.getElementsByName("operator");
    let op; //operacja arytmetyczna do wykonania
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].checked) {
            op = tab[i].value;
            break;
        }
    }
    const x = parseFloat(document.getElementById("x").value);
    const y = parseFloat(document.getElementById("y").value);
    let result;

    switch (op) {
        case "+":
            result = x + y;
            break;
        case "-":
            result = x - y;
            break;
        case "*":
            result = x * y;
            break;
        case "/":
            result = x / y;
            break;
    }
    if (!isFinite(result))
        return
    const resultInput = document.getElementById("result");
    resultInput.value = result;
}
