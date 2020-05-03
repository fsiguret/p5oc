class Display {
    printAllProducts(products) {
        let html = '';
        products.forEach(data => {
            html += `
           <article>    
                <h2>${data.name}</h2>
                <a class="link" href="html/product.html?id=${data._id}"><img class="images" src="${data.imageUrl}"/></a>              
                <ul>
                    <li>Prix : ${data.price.toString()}</li>
                    <li>Description : ${data.description}</li>
                </ul>
            </article>`;
        });
        this.printHTML('product', html);
    }

    printProduct(product) {
        let html = '';
        html = `
            <article>
                <h2>${product.name}</h2>
                <img class="images" src="${product.imageUrl}" alt="photo d un ours">
                <div id="colors">                     
                </div>
                <ul>
                    <li>Descripstion : ${product.description}</li>
                    <li>Prix : ${product.price}</li>
                </ul>
                <button>Ajouter au panier</button>
            </article>`;

        this.printHTML('product', html);
        this.printColorsProduct(product);
    }

    printColorsProduct(product) {
        product.colors.forEach(data => {
                let btn = document.createElement("button");
                let color = document.createTextNode(data);
                btn.appendChild(color);
                document.getElementById('colors').appendChild(btn);
        });
    }

    printHTML(id, html) {
        document.getElementById(id).innerHTML = html;
    }

    changeTitle(title) {
        document.title = title;
    }
}