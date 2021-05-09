$(document).ready(function () {
    $('main').css('background', 'lightgrey');
    $('input').css('font-weight', 'bold');
    $('input:disabled').addClass('green');

    $('#calcBtn').click(function () {
        const amount = parseInt($('#amount').val());
        const annualInterestRate = parseFloat($('#annual-interest-rate').val());
        const numberOfInstallments = parseInt($('#number-of-installments').val());
        const monthlyInterestRate = annualInterestRate / 12;
        const numerator = amount * monthlyInterestRate / 100;
        const denominator = 1 - 1 / Math.pow(1 + monthlyInterestRate / 100, numberOfInstallments);
        const installment = numerator / denominator;
        const finalAmount = numberOfInstallments * installment;
        if (!isFinite(installment) || !isFinite(finalAmount))
            return
        $('#installment').val(installment.toFixed(2));
        $('#final-amount').val(finalAmount.toFixed(2));
    });

    $('#annual-interest-rate').change(function () {
        const annualInterestRate = parseFloat($('#annual-interest-rate').val());
        const monthlyInterestRate = annualInterestRate / 12;
        $('#monthly-interest-rate').val(monthlyInterestRate.toFixed(2))
    });

    $('#clearBtn').click(function () {
        $('input').val('');
    });
});