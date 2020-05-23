class View {
    constructor() {
        this.btnAdd = this.createElement("button", "addCart");
        this.btnDelete = this.createElement("button", "deleteItem");
        this.nbItem = 0;
    }

    //create element with optional CSS class
    createElement(tag, className) {
        const element = document.createElement(tag);
        if(className) {
            element.classList.add(className);
        }
        return element;
    }

    //get element by ID
    getElementById(id) {
        return document.getElementById(id);
    }

    //create List of items
    createListItem(data) {

        //the root element
        this.app = this.getElementById("product");

        //The article of item
        this.article = this.createElement("article");

        //append article to root
        this.app.append(this.article);

        //The name of item
        this.name = this.createElement("h2");
        this.name.textContent = data.name;

        //the link of image
        this.imgA = this.createElement("a");
        let img = this.createElement("img","images");
        this.imgA.href = "html/product.html?id=" + data._id ;
        img.src = data.imageUrl;
        this.imgA.append(img);

        //The price of item
        this.price = this.createElement("p");
        this.price.textContent = "Prix : " + this.transformPrice(data);

        //The description of item
        this.description = this.createElement("p");
        this.description.textContent = "Description : " + data.description;

        //the button detail
        this.detailA = this.createElement("a");
        let detail = this.createElement("button");
        detail.textContent = "Détail du produit";
        this.detailA.href = "html/product.html?id=" + data._id ;
        this.detailA.append(detail);

        //add text, id and href to button Add
        this.addA = this.createElement("a");
        this.btnAdd = this.createElement("button", "addCart");
        this.btnAdd.textContent = "Ajouter au panier";
        //this.addA.href = "html/panier.html" ;
        this.addA.append(this.btnAdd);

        //append all element in article
        this.article.append(this.name, this.imgA, this.price, this.description, this.detailA, this.addA);
    }

    //create Item
    createItem(data) {
        //the root element
        this.product = this.getElementById("product");

        //The article of item
        this.article = this.createElement("article");

        //append article in root
        this.product.append(this.article);

        //The name of item
        this.name = this.createElement("h2");
        this.name.textContent = data.name;

        //the image of item
        this.img = this.createElement("img", "images");
        this.img.src = data.imageUrl;

        //generate dropdown
        this.generateDropDown(data);

        //The price of item
        this.price = this.createElement("p");
        this.price.textContent = "Prix : " + this.transformPrice(data);

        //The description of item
        this.description = this.createElement("p");
        this.description.textContent = "Description : " + data.description;

        //The button add shopping cart
        this.addA = this.createElement("a");
        this.btnAdd.textContent = "Ajouter au panier";
        //this.addA.href = "html/panier.html" ;
        this.addA.append(this.btnAdd);

        //append all element in article
        this.article.append(this.name, this.img, this.dropDown, this.price, this.description, this.addA);
    }

    createShoppingCart(data) {
        //the element root
        let cart = this.getElementById("cart");

        //the line element
        let tr = this.createElement("tr");
        tr.id = this.nbItem++;

        //append line on tbody
        cart.append(tr);

        //the row elements
        let tdImg = this.createElement("td");
        let tdName = this.createElement("td");
        let tdPrice = this.createElement("td");
        let tdDelete = this.createElement("td");

        //img of article
        let imgArticle = this.createElement("img", "images");
        imgArticle.src = data.imageUrl;
        tdImg.append(imgArticle);

        tdName.textContent = data.name;
        tdPrice.textContent = this.transformPrice(data);

        this.btnDelete = this.createElement("button", "deleteItem");
        this.btnDelete.textContent = "Supprimer";
        tdDelete.append(this.btnDelete);

        //append all elements
        tr.append(tdImg, tdName, tdPrice, tdDelete);
    }

    //Set the price to local region
    transformPrice(data) {
        return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(data.price / 100);
    }

    //the Error message when server error
    displayErrorServer() {
        //the root element
        this.err = this.getElementById("product");

        //the article element
        this.article = this.createElement("article");

        //append article on root
        this.err.append(this.article);

        //the message
        this.msg = this.createElement("h2");
        this.msg.textContent = "Nous sommes désolé. Le site est en maintenance. Réessayez dans 5 minutes !";

        //append message in article
        this.article.append(this.msg);
    }

    //The Error message when ID not found or unknown
    displayErrorId() {
        //the root element
        this.err = this.getElementById("product");

        //the article element
        this.article = this.createElement("article");

        //append article in root
        this.err.append(this.article);

        //the message
        this.msg = this.createElement("h2");
        this.msg.textContent = "Ce produit n'éxiste pas ou n'existe plus. vous allez être redérigé vers la page principale.";

        //append message in article
        this.article.append(this.msg);
    }

    //diplay error message when the cart is empty
    displayCartError() {
        let app = this.getElementById("cart");
        let tr = this.createElement("tr");
        tr.textContent = "Votre panier est vide !";
        app.append(tr);
    }

    //suppr all item
    deleteDisplayCart() {
        let cart = this.getElementById("cart");
        while(cart.firstChild) {
            cart.removeChild(cart.firstChild);
        }
        this.nbItem = 0;
    }

    //Generate a button dropdown
    generateDropDown(data) {
        this.dropDown = this.createElement("div", "dropdown");
        this.btnDrop = this.createElement("button", "btnDrop");
        this.btnDrop.textContent = "Couleurs";
        this.btnDrop.addEventListener("click", function () {
            document.getElementById("myDropdown").classList.toggle("show");
        })

        this.myDropDown = this.createElement("div", "dropdown-content");
        this.myDropDown.id = "myDropdown";

        //append element in root
        this.dropDown.append(this.btnDrop, this.myDropDown);

        data.colors.forEach(color => {
            this.btnColor = this.createElement("button");
            this.btnColor.textContent = color;

            this.myDropDown.append(this.btnColor);
        })
    }


    //=========
    //==EVENT==
    //=========
    bindAddToCart(handler, product){
        this.btnAdd.addEventListener("click", event => {
            if(product._id) {
                const id = product._id;

                handler(id);
                console.log(id)
            }
        })
    }

    bindDeleteToCart(handler) {
        this.btnDelete.addEventListener("click", event => {
            if(event.target.className === "deleteItem") {
                const id = parseInt(event.target.parentElement.parentElement.id);
                handler(id);
            }
        })
    }
}