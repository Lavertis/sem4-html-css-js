function calculate() {
    const installmentInput = document.getElementById("installment");
    const finalAmountInput = document.getElementById("final-amount");
    const amount = parseInt(document.getElementById('amount').value);
    const monthlyInterestRate = parseFloat(document.getElementById("monthly-interest-rate").value);
    const numberOfInstallments = parseInt(document.getElementById("number-of-installments").value);
    const numerator = amount * monthlyInterestRate / 100;
    const denominator = 1 - 1 / Math.pow(1 + monthlyInterestRate / 100, numberOfInstallments);
    const installment = numerator / denominator;
    const finalAmount = numberOfInstallments * installment;
    if (!isFinite(installment) || !isFinite(finalAmount))
        return
    installmentInput.value = installment.toFixed(2);
    finalAmountInput.value = finalAmount.toFixed(2);
}

function updateMonthlyPercentage() {
    const monthlyInterestRateInput = document.getElementById("monthly-interest-rate");
    const annualInterestRate = parseFloat(document.getElementById("annual-interest-rate").value);
    const monthlyInterestRate = annualInterestRate / 12;
    monthlyInterestRateInput.value = monthlyInterestRate.toFixed(2);
}

function clearInputs() {
    const inputsHtmlCollection = document.getElementsByTagName("input");
    const inputsArray = Array.prototype.slice.call(inputsHtmlCollection);
    inputsArray.forEach(el => el.value = "");
}