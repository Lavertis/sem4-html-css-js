window.onload = function () {
    let productsID = 0;
    if (localStorage.getItem("products") === null)
        localStorage.setItem("products", JSON.stringify([]));
    else {
        const localStorageTableLength = JSON.parse(localStorage.getItem("products")).length
        if (localStorageTableLength !== 0)
            productsID = JSON.parse(localStorage.getItem("products"))[localStorageTableLength - 1].id + 1;
    }

    document.getElementById("saveBtn").addEventListener("click", function () {
        document.getElementById("error").innerHTML = "";
        let currentProductList = JSON.parse(localStorage.getItem("products"));
        const productName = document.getElementById("product-name").value;
        const productPrice = document.getElementById("product-price").value;
        const productColour = document.getElementById("product-colour").value;
        const productQuantity = document.getElementById("product-quantity").value;
        if ([productName, productPrice, productColour, productQuantity].some(el => el === "")) {
            document.getElementById("error").innerHTML = "Nie podano wystarczającej ilości danych";
            return false;
        }
        let product = {};
        product.name = productName;
        product.price = productPrice;
        product.colour = productColour;
        product.quantity = productQuantity;
        product.id = productsID++;
        currentProductList.push(product);
        localStorage.setItem("products", JSON.stringify(currentProductList));
        clearInputs();
    });

    document.getElementById("showBtn").addEventListener("click", function () {
        document.getElementById("error").innerHTML = "";
        document.getElementById("product-search").value = "";
        showAllProductsInBasket();
    });

    document.getElementById("clearBtn").addEventListener("click", function () {
        document.getElementById("error").innerHTML = "";
        localStorage.setItem("products", JSON.stringify([]));
        clearBasket();
        clearInputs();
        productsID = 0;
    });

    document.getElementById("searchBtn").addEventListener("click", function () {
        searchProductByName();
    });

    function searchProductByName() {
        clearBasket();
        const productList = JSON.parse(localStorage.getItem("products"));
        const searchedName = document.getElementById("product-search").value;
        let products = [];
        for (let i = 0; i < productList.length; i++) {
            const productAsObj = productList[i];
            if (productAsObj.name.includes(searchedName))
                products.push(productAsObj);
        }

        if (products.length === 0 || searchedName === "") {
            document.getElementById("error").innerHTML = "Brak produktów zawierających podany ciąg znaków";
            return false;
        } else showProductArrayInBasket(products);
    }

    document.getElementById("editByIdBtn").addEventListener("click", function () {
        document.getElementById("error").innerHTML = "";
        const productID = document.getElementById("product-id").value;
        const productIndex = findProductListIndexByID(productID);
        if (productIndex === -1) {
            document.getElementById("error").innerHTML = "Brak produktu o podanym ID";
            return false;
        }
        let productList = JSON.parse(localStorage.getItem("products"));
        const newProductName = document.getElementById("product-name").value;
        const newProductPrice = document.getElementById("product-price").value;
        const newProductColour = document.getElementById("product-colour").value;
        const newProductQuantity = document.getElementById("product-quantity").value;
        if (newProductName !== "") productList[productIndex].name = newProductName;
        if (newProductPrice !== "") productList[productIndex].price = newProductPrice;
        if (newProductColour !== "") productList[productIndex].colour = newProductColour;
        if (newProductQuantity !== "") productList[productIndex].quantity = newProductQuantity;
        localStorage.setItem("products", JSON.stringify(productList));
    });

    function findProductListIndexByID(productID) {
        const productList = JSON.parse(localStorage.getItem("products"));
        for (let i = 0; i < productList.length; i++) {
            if (parseInt(productList[i].id) === parseInt(productID))
                return i
        }
        return -1;
    }

    function deleteProductByID(productID) {
        let productList = JSON.parse(localStorage.getItem("products"));
        for (let i = 0; i < productList.length; i++) {
            const productAsObj = productList[i];
            if (productAsObj.id === productID) {
                productList.splice(i, 1);
                localStorage.setItem("products", JSON.stringify(productList));
                if (document.getElementById("product-name").value !== "")
                    searchProductByName();
                else
                    showAllProductsInBasket();
                return true;
            }
        }
        return false;
    }

    function addCallbacksToRemoveButtons() {
        const removeButtons = document.getElementsByClassName("removeItemBtn");
        for (let button of removeButtons) {
            button.addEventListener("click", function () {
                deleteProductByID(parseInt(button.getAttribute("data-productID")));
                const searchedName = document.getElementById("product-search").value;
                if (searchedName !== "")
                    searchProductByName();
                else
                    showAllProductsInBasket();
            });
        }
    }

    function showProductArrayInBasket(productArray) {
        const basketContainer = document.getElementById("basket-container");
        let content = `<table><tr><th>Nazwa</th><th>Cena</th><th>Kolor</th><th>Liczba sztuk</th><th>ID</th><th></th></tr>`;
        for (let i = 0; i < productArray.length; i++) {
            const productAsObj = productArray[i];
            content += `<tr>
                        <td>${productAsObj.name}</td>
                        <td>${productAsObj.price}</td>
                        <td>${productAsObj.colour}</td>
                        <td>${productAsObj.quantity}</td>
                        <td>${productAsObj.id}</td>
                        <td><button class="removeItemBtn" data-productID="${productAsObj.id}">Usuń</button></td>
                        </tr>`;
        }
        content += `</table>`;
        basketContainer.innerHTML = content;
        addCallbacksToRemoveButtons();
    }

    function showAllProductsInBasket() {
        const productList = JSON.parse(localStorage.getItem("products"));
        if (productList.length === 0) {
            document.getElementById("error").innerHTML = "Brak produktów w koszyku";
            return clearBasket();
        }

        let products = [];
        for (let i = 0; i < productList.length; i++) {
            const productAsJson = productList[i];
            products.push(productAsJson);
        }
        showProductArrayInBasket(products);
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