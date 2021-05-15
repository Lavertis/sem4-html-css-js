window.onload = function () {

    document.getElementById("saveBtn").addEventListener("click", function () {
        const productName = document.getElementById("product-name").value;
        const productPrice = document.getElementById("product-price").value;
        const productColour = document.getElementById("product-colour").value;
        const productQuantity = document.getElementById("product-quantity").value;
        if ([productName, productPrice, productColour, productQuantity].some(el => el === ""))
            return;
        let product = {};
        product.name = productName;
        product.price = productPrice;
        product.colour = productColour;
        product.quantity = productQuantity
        localStorage.setItem(`Product ${localStorage.length + 1}`, JSON.stringify(product));
        clearInputs();
    });

    document.getElementById("showBtn").addEventListener("click", function () {
        clearInputs();
        clearBasket();
        if (localStorage.length === 0)
            return;
        let products = [];
        for (let i = 0; i < localStorage.length; i++) {
            const itemName = localStorage.key(i);
            const productAsJson = localStorage.getItem(itemName);
            products.push(productAsJson);
        }
        showInBasket(products);
    });

    document.getElementById("clearBtn").addEventListener("click", function () {
        localStorage.clear();
        clearBasket();
        clearInputs();
    });

    document.getElementById("searchBtn").addEventListener("click", function () {
        clearBasket();
        const searchedName = document.getElementById("product-name").value;
        if (localStorage.length === 0 || searchedName === "")
            return;
        let products = [];
        for (let i = 0; i < localStorage.length; i++) {
            const itemName = localStorage.key(i);
            const productAsJson = localStorage.getItem(itemName);
            if (!JSON.parse(productAsJson).name.includes(searchedName))
                continue;
            products.push(productAsJson);
        }
        if (products.length !== 0)
            showInBasket(products);
    });

    function showInBasket(jsonArray) {
        const basketContainer = document.getElementById("basket-container");
        let content = `<table><tr><th>Nazwa</th><th>Cena</th><th>Kolor</th><th>Liczba sztuk</th></tr>`;
        for (let i = 0; i < jsonArray.length; i++) {
            const itemAsObject = JSON.parse(jsonArray[i]);
            content += `<tr>
                        <td>${itemAsObject.name}</td>
                        <td>${itemAsObject.price}</td>
                        <td>${itemAsObject.colour}</td>
                        <td>${itemAsObject.quantity}</td>
                        </tr>`
        }
        content += `</table>`
        basketContainer.innerHTML = content;
    }

    function clearInputs() {
        document.getElementById("product-name").value = "";
        document.getElementById("product-price").value = "";
        document.getElementById("product-colour").value = "";
        document.getElementById("product-quantity").value = "";
    }

    function clearBasket() {
        document.getElementById("basket-container").innerHTML = "";
    }
};