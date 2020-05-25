class View {
    constructor() {
        this.btnAdd = this.createElement("button", "addCart");
        this.btnDelete = this.createElement("button", "deleteItem");
        this.form = this.getElementById("myForm");
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
        this.price.textContent = "Prix : " + this.transformPrice(data.price);

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
        this.price.textContent = "Prix : " + this.transformPrice(data.price);

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

    //create the shopping cart
    createShoppingCart(data, totalPrice) {
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
        let tdPrice = this.createElement("td","price");
        let tdDelete = this.createElement("td");

        //img of article
        let imgArticle = this.createElement("img", "images");
        imgArticle.src = data.imageUrl;
        tdImg.append(imgArticle);

        tdName.textContent = data.name;
        tdPrice.textContent = this.transformPrice(data.price);

        this.btnDelete = this.createElement("button", "deleteItem");
        this.btnDelete.textContent = "Supprimer";
        tdDelete.append(this.btnDelete);

        //append all elements
        tr.append(tdImg, tdName, tdPrice, tdDelete);

        this.displayTotal(totalPrice);
    }

    displayTotal(totalPrice) {
        let tfoot = this.getElementById("total");

        this.deleteDisplayCart("total");

        let text = this.createElement("td");
        let price = this.createElement("td");
        text.textContent = "Total de votre commande";

        price.textContent = this.transformPrice(totalPrice);
        tfoot.append(text,price);
    }

    //Set the price to local region
    transformPrice(data) {
        return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(data / 100);
    }

    //the Error message when server error
    displayErrorServer(id) {
        //the root element
        this.err = this.getElementById(id);

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
    deleteDisplayCart(id) {
        let cart = this.getElementById();

        if(id) {
            cart = this.getElementById(id);
        } else{
            cart = this.getElementById("cart");
            this.nbItem = 0;
        }

        while(cart.firstChild) {
            cart.removeChild(cart.firstChild);
        }
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

    redirectConfirmOrder() {
        document.location.href = "../html/confirmation.html";
    }

    //create confirmation order
    createConfirmationOrder(data) {
        let article = this.getElementById("confirmOrder");
        let thxTitle = this.createElement("h2");
        let numOrder = this.createElement("p");
        let table = this.createElement("table");
        let thead = this.createElement("thead");
        let trThead = this.createElement("tr");
        let imgThead = this.createElement("th");
        let nameProduct = this.createElement("th");
        let priceProduct = this.createElement("th");
        let tbody = this.createElement("tbody");
        let totalOrder = this.createElement("p");
        let listContact = this.createElement("ul");
        let liFirstName = this.createElement("li");
        let liLastName = this.createElement("li");
        let liAddress = this.createElement("li");
        let liCity = this.createElement("li");
        let liEmail = this.createElement("li");

        thxTitle.textContent = "Merci pour votre commande " + data.contact.firstName + " " + data.contact.lastName + " !";
        numOrder.textContent = "Numéro de la commande : " + data.orderId;
        totalOrder.textContent = "Total de la commande : " + this.transformPrice(this.getTotalPrice(data));

        //append h2/p and table in article
        article.append(thxTitle, numOrder, table, totalOrder, listContact);

        //append tr in thead
        thead.append(trThead);
        imgThead.textContent = "Image de l'article";
        nameProduct.textContent = "Nom de l'article";
        priceProduct.textContent = "Prix de l'article";

        //append th in tr of thead
        trThead.append(imgThead, nameProduct, priceProduct);

        //generate table for articles
        data.products.forEach(product => {
            let tr = this.createElement("tr");
            let tdImg = this.createElement("td");
            let imgArticle = this.createElement("img", "imgConfirm");
            let tdName = this.createElement("td");
            let tdPrice = this.createElement("td");

            //append all td in tr
            tr.append(tdImg, tdName, tdPrice);

            imgArticle.src = product.imageUrl;

            //append img in tdImg
            tdImg.append(imgArticle);

            tdName.textContent = product.name;
            tdPrice.textContent = this.transformPrice(product.price);

            //append TR in tbody for each article;
            tbody.append(tr);


        })

        //append thead and tbody in table
        table.append(thead, tbody);

        liFirstName.textContent = "Prénom : " + data.contact.firstName;
        liLastName.textContent = "Nom : " + data.contact.lastName;
        liAddress.textContent = "Adresse : " + data.contact.address;
        liCity.textContent = "Ville : " + data.contact.city;
        liEmail.textContent = "E-Mail : " + data.contact.email;

        listContact.append(liFirstName,liLastName, liAddress, liCity, liEmail);
    }

    getTotalPrice(data) {
        let totalPrice = 0;
        data.products.forEach(id => {
            totalPrice = totalPrice + id.price;
        })
        return totalPrice;
    }

    //=========
    //==EVENT==
    //=========

    //add product to cart
    bindAddToCart(handler, product){
        this.btnAdd.addEventListener("click", event => {
            if(product._id) {
                const id = product._id;
                handler(id);
            }
        })
    }

    //delete product to cart
    bindDeleteToCart(handler) {
        this.btnDelete.addEventListener("click", event => {
            if(event.target.className === "deleteItem") {
                const id = parseInt(event.target.parentElement.parentElement.id);
                handler(id);
            }
        })
    }

    //send order
    bindSendOrder(handler) {
        this.form.addEventListener("submit", event => {
            event.preventDefault();
            handler(this.form);
            this._resetInput();
        })
    }

    //Private methods
    _resetInput() {
        this.form.childNodes.forEach(node => {
            if(node.nodeName === "INPUT") {
                node.value = '';
            }
        })
    }
}