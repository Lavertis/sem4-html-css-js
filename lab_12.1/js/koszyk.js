window.onload = function () {
    let basket = new Basket();

    document.getElementById("saveBtn").addEventListener("click", function () {
        document.getElementById("error").innerHTML = "";
        const productName = document.getElementById("product-name").value;
        const productPrice = document.getElementById("product-price").value;
        const productColour = document.getElementById("product-colour").value;
        const productQuantity = document.getElementById("product-quantity").value;
        const product = new Product(productName, productPrice, productColour, productQuantity);
        if (!basket.addProduct(product))
            document.getElementById("error").innerHTML = "Nie podano wystarczającej ilości danych";
        clearInputs();
    });

    document.getElementById("showBtn").addEventListener("click", function () {
        document.getElementById("error").innerHTML = "";
        document.getElementById("product-search").value = "";
        document.getElementById("basket-container").innerHTML = "";
        if (!basket.showAllProductsInBasket())
            document.getElementById("error").innerHTML = "Brak produktów w koszyku";
        addCallbacksToRemoveButtons();
    });

    document.getElementById("clearBtn").addEventListener("click", function () {
        document.getElementById("error").innerHTML = "";
        document.getElementById("basket-container").innerHTML = "";
        basket.clearBasket();
        clearInputs();
    });

    document.getElementById("searchBtn").addEventListener("click", function () {
        document.getElementById("basket-container").innerHTML = "";
        const searchedName = document.getElementById("product-search").value;
        basket.searchProductByName(searchedName);
        addCallbacksToRemoveButtons();
    });

    document.getElementById("editBtn").addEventListener("click", function () {
        document.getElementById("error").innerHTML = "";
        const productName = document.getElementById("product-name").value;
        const newProductPrice = document.getElementById("product-price").value;
        const newProductColour = document.getElementById("product-colour").value;
        const newProductQuantity = document.getElementById("product-quantity").value;
        if ([newProductPrice, newProductColour, newProductQuantity].every(el => el === "")) {
            document.getElementById("error").innerHTML = "Nie podano żadnych nowych danych";
            return;
        }
        const product = new Product(productName, newProductPrice, newProductColour, newProductQuantity);
        if (!basket.editProduct(product))
            document.getElementById("error").innerHTML = "Brak produktu o podanej nazwie";
    });

    function addCallbacksToRemoveButtons() {
        const removeButtons = document.getElementsByClassName("removeItemBtn");
        for (let button of removeButtons) {
            button.addEventListener("click", function () {
                basket.deleteProductByID(parseInt(button.getAttribute("data-productID")));
                const searchedName = document.getElementById("product-search").value;
                document.getElementById("basket-container").innerHTML = "";
                if (searchedName !== "")
                    basket.searchProductByName(searchedName);
                else
                    basket.showAllProductsInBasket();
                addCallbacksToRemoveButtons();
            });
        }
    }

    function clearInputs() {
        document.getElementById("product-name").value = "";
        document.getElementById("product-price").value = "";
        document.getElementById("product-colour").value = "";
        document.getElementById("product-quantity").value = "";
    }
};

class Product {
    constructor(name, price, colour, quantity) {
        this.name = name;
        this.price = price;
        this.colour = colour;
        this.quantity = quantity;
        this.id = null;
    }
}

class Basket {
    constructor() {
        this.productsID = 0;
        this.productList = [];
        this.#initializeProductsID();
        this.updateCurrentProductList();
    }

    #initializeProductsID() {
        if (localStorage.getItem("products") === null)
            localStorage.setItem("products", JSON.stringify([]));
        else {
            const localStorageTableLength = JSON.parse(localStorage.getItem("products")).length
            if (localStorageTableLength !== 0)
                this.productsID = JSON.parse(localStorage.getItem("products"))[localStorageTableLength - 1].id + 1;
        }
    }

    updateCurrentProductList() {
        this.productList = JSON.parse(localStorage.getItem("products"));
    }

    addProduct(product) {
        if ([product.name, product.price, product.colour, product.quantity].some(el => el === ""))
            return false;
        product.id = this.productsID++;
        this.productList.push(product);
        localStorage.setItem("products", JSON.stringify(this.productList));
        return true;
    }

    editProduct(product) {
        const productIndex = this.findProductListIndexByName(product.name);
        if (productIndex === -1)
            return false;
        if (product.price !== "") this.productList[productIndex].price = product.price;
        if (product.colour !== "") this.productList[productIndex].colour = product.colour;
        if (product.quantity !== "") this.productList[productIndex].quantity = product.quantity;
        localStorage.setItem("products", JSON.stringify(this.productList));
        return true;
    }

    searchProductByName(searchedName) {
        const productList = JSON.parse(localStorage.getItem("products"));
        let products = [];
        for (let i = 0; i < productList.length; i++) {
            const productAsObj = productList[i];
            if (productAsObj.name.includes(searchedName))
                products.push(productAsObj);
        }

        if (products.length === 0 || searchedName === "") {
            document.getElementById("error").innerHTML = "Brak produktów zawierających podany ciąg znaków";
            return false;
        } else this.showProductArrayInBasket(products);
    }


    findProductListIndexByName(productName) {
        for (let i = 0; i < this.productList.length; i++) {
            if (this.productList[i].name === productName)
                return i
        }
        return -1;
    }

    deleteProductByID(productID) {
        for (let i = 0; i < this.productList.length; i++) {
            if (this.productList[i].id === productID) {
                this.productList.splice(i, 1);
                localStorage.setItem("products", JSON.stringify(this.productList));
                if (document.getElementById("product-name").value !== "")
                    this.searchProductByName();
                else
                    this.showAllProductsInBasket();
                return true;
            }
        }
        return false;
    }

    showProductArrayInBasket(productArray) {
        const basketContainer = document.getElementById("basket-container");
        let content = `<table><tr><th>Nazwa</th><th>Cena</th><th>Kolor</th><th>Liczba sztuk</th><th></th></tr>`;
        for (let i = 0; i < productArray.length; i++) {
            const productAsObj = productArray[i];
            content += `<tr>
                        <td>${productAsObj.name}</td>
                        <td>${productAsObj.price}</td>
                        <td>${productAsObj.colour}</td>
                        <td>${productAsObj.quantity}</td>
                        <td><button class="removeItemBtn" data-productID="${productAsObj.id}">Usuń</button></td>
                        </tr>`;
        }
        content += `</table>`;
        basketContainer.innerHTML = content;
    }

    showAllProductsInBasket() {
        if (this.productList.length === 0)
            return false;

        let products = [];
        for (let i = 0; i < this.productList.length; i++) {
            const productAsJson = this.productList[i];
            products.push(productAsJson);
        }
        this.showProductArrayInBasket(products);
        return true;
    }

    clearBasket() {
        this.productList = [];
        localStorage.setItem("products", JSON.stringify([]));
        this.productsID = 0;
    }
}