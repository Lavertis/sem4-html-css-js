window.onload = function () {

    document.getElementById("saveBtn").addEventListener("click", function () {
        const colorCode = document.getElementById("color-code").value;
        const colorName = document.getElementById("color-name").value;
        sessionStorage.setItem(colorCode, colorName);
    });

    document.getElementById("showBtn").addEventListener("click", function () {
        const coloursContainer = document.getElementById("colours-container");
        let content = "";
        for (let i = 0; i < sessionStorage.length; i++) {
            const colourCode = sessionStorage.key(i);
            const colourName = sessionStorage.getItem(colourCode);
            content += `<div style="background: #${colourCode}">${colourName}, kod koloru: ${colourCode}</div><br>`
        }
        coloursContainer.innerHTML = content;
    });

    document.getElementById("clearBtn").addEventListener("click", function () {
        sessionStorage.clear();
    });
};