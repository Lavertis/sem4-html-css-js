window.onload = function () {
    let productsID = localStorage.length;

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
        product.quantity = productQuantity;
        product.id = productsID++;
        localStorage.setItem(`Product ${localStorage.length + 1}`, JSON.stringify(product));
        clearInputs();
    });

    document.getElementById("showBtn").addEventListener("click", function () {
        clearInputs();
        clearBasket();
        showAllItemsInBasket();
    });

    document.getElementById("clearBtn").addEventListener("click", function () {
        localStorage.clear();
        clearBasket();
        clearInputs();
        productsID = 0;
    });

    document.getElementById("searchBtn").addEventListener("click", function () {
        clearBasket();
        const searchedName = document.getElementById("product-name").value;
        if (localStorage.length === 0 || searchedName === "")
            return;
        let products = [];
        for (let i = 0; i < localStorage.length; i++) {
            const itemKey = localStorage.key(i);
            const productAsJson = localStorage.getItem(itemKey);
            if (!JSON.parse(productAsJson).name.includes(searchedName))
                continue;
            products.push(productAsJson);
        }
        if (products.length !== 0)
            showInBasket(products);
    });

    function deleteItem(productID) {
        for (let i = 0; i < localStorage.length; i++) {
            const itemKey = localStorage.key(i);
            const productAsJson = localStorage.getItem(itemKey);
            const itemID = JSON.parse(productAsJson).id;
            if (itemID === productID) {
                localStorage.removeItem(itemKey);
                return;
            }
        }
    }

    function addCallbacksToRemoveButtons() {
        const removeButtons = document.getElementsByClassName("removeItemBtn");
        for (let button of removeButtons) {
            button.addEventListener("click", function () {
                deleteItem(parseInt(button.id));
                showAllItemsInBasket();
            });
        }
    }

    function showInBasket(jsonArray) {
        const basketContainer = document.getElementById("basket-container");
        let content = `<table><tr><th>Nazwa</th><th>Cena</th><th>Kolor</th><th>Liczba sztuk</th><th></th></tr>`;
        for (let i = 0; i < jsonArray.length; i++) {
            const itemAsObject = JSON.parse(jsonArray[i]);
            content += `<tr>
                        <td>${itemAsObject.name}</td>
                        <td>${itemAsObject.price}</td>
                        <td>${itemAsObject.colour}</td>
                        <td>${itemAsObject.quantity}</td>
                        <td><button class="removeItemBtn" id="${itemAsObject.id}">Usuń</button></td>
                        </tr>`;
        }
        content += `</table>`;
        basketContainer.innerHTML = content;
        addCallbacksToRemoveButtons();
    }

    function showAllItemsInBasket() {
        if (localStorage.length === 0)
            return clearBasket();
        let products = [];
        for (let i = 0; i < localStorage.length; i++) {
            const itemKey = localStorage.key(i);
            const productAsJson = localStorage.getItem(itemKey);
            products.push(productAsJson);
        }
        showInBasket(products);
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