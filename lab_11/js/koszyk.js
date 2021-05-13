window.onload = function () {

    document.getElementById("saveBtn").addEventListener("click", function () {
        let product = {};
        product.name = document.getElementById("product-name").value;
        product.price = document.getElementById("product-price").value;
        product.colour = document.getElementById("product-colour").value;
        product.quantity = document.getElementById("product-quantity").value;
        localStorage.setItem(`Product ${localStorage.length + 1}`, JSON.stringify(product));
    });

    document.getElementById("showBtn").addEventListener("click", function () {
        const basketContainer = document.getElementById("basket-container");
        let content = "";
        for (let i = 0; i < localStorage.length; i++) {
            const itemName = localStorage.key(i);
            const item = JSON.parse(localStorage.getItem(itemName));
            content += `<div>
                        Nazwa: ${item.name}<br>
                        Cena: ${item.price}<br>
                        Kolor: ${item.colour}<br>
                        Liczba sztuk: ${item.quantity}<br>
                        </div><br>`
        }
        basketContainer.innerHTML = content;
    });

    document.getElementById("clearBtn").addEventListener("click", function () {
        localStorage.clear();
    });
};

