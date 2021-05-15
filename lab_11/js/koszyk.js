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
    });

    document.getElementById("showBtn").addEventListener("click", function () {
        const basketContainer = document.getElementById("basket-container");
        let content = `<div class="koszyk"><table><tr><th>Nazwa</th><th>Cena</th><th>Kolor</th><th>Liczba sztuk</th></tr>`;
        for (let i = 0; i < localStorage.length; i++) {
            const itemName = localStorage.key(i);
            const item = JSON.parse(localStorage.getItem(itemName));
            content += `<tr>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.colour}</td>
                        <td>${item.quantity}</td>
                        </tr>`
        }
        content += `</table></div>`
        basketContainer.innerHTML = content;
    });

    document.getElementById("clearBtn").addEventListener("click", function () {
        localStorage.clear();
    });
};