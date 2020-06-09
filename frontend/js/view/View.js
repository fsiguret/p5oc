class View {
    constructor() {
        this.btnAdd = this.createElement("button", "addCart");
        this.btnDelete = this.createElement("button", "deleteItem");
        this.form = this.createElement("form");
        this.inputFirstName = this.createElement("input");
        this.inputLastName = this.createElement("input");
        this.inputAddress = this.createElement("input");
        this.inputCity = this.createElement("input");
        this.inputEmail = this.createElement("input");
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

    //Set the price to local region
    transformPrice(data) {
        return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(data / 100);
    }

    //======
    //INDEX=
    //======

    //structure
    createStructure() {
        let app = this.getElementById("sectionProduct");
        let divProduct = this.createElement("div", "divProduct");
        divProduct.id = "product";
        let title = this.createElement("h1", "titleIndex");
        title.textContent = "NOS PRODUITS";
        app.append(title, divProduct);
    }

    //create List of items
    createListItem(data) {

        //the root element
        let app = this.getElementById("product");

        //The article of item
        let article = this.createElement("article");

        //append article to root
        app.append(article);

        //The name of item
        let name = this.createElement("h2");
        name.textContent = data.name;

        //the link of image
        let imgA = this.createElement("a");
        let img = this.createElement("img","images");
        imgA.href = "html/product.html?id=" + data._id;
        img.src = data.imageUrl;
        img.alt = "photo d'ours en peluche";
        imgA.append(img);

        //The price of item
        let price = this.createElement("p");
        price.textContent = "Prix : " + this.transformPrice(data.price);

        //The description of item
        let description = this.createElement("p", "description");
        description.textContent = "Description : " + data.description;

        //the button detail
        let detailA = this.createElement("a", "btnLink");
        detailA.textContent = "Détail du produit";
        detailA.href = "html/product.html?id=" + data._id;

        //add text to button Add
        this.btnAdd = this.createElement("button", "btnLink");
        this.btnAdd.textContent = "Ajouter au panier";

        //append all element in article
        article.append(name, imgA, price, description, detailA, this.btnAdd);
    }


    //========
    //PRODUCT=
    //========

    //create Item
    createItem(data) {
        //the root element
        let product = this.getElementById("product");

        //the title of the page
        let title = this.createElement("h1");
        title.textContent = "Ours en peluche";
        //The article of item
        let article = this.createElement("article", "articleProduct");

        //append article in root
        product.append(title, article);

        //The name of item
        let name = this.createElement("h2");
        name.textContent = data.name;

        //the image of item
        let img = this.createElement("img");
        img.src = data.imageUrl;
        img.alt = "photo d'ours en peluche";

        //create div btn
        let divBtn = this.createElement("div", "btnProduct");

        //generate dropdown
        this.generateDropDown(data);

        //The price of item
        let price = this.createElement("p");
        price.textContent = "Prix : " + this.transformPrice(data.price);

        //The description of item
        let description = this.createElement("p");
        description.textContent = "Description : " + data.description;

        //The button add shopping cart
        this.btnAdd.textContent = "Ajouter au panier";

        divBtn.append(this.dropDown, this.btnAdd);

        //append all element in article
        article.append(name, img, divBtn, price, description);

        document.title = "Orinoco - " + data.name;
    }

    //Generate a button dropdown
    generateDropDown(data) {
        this.dropDown = this.createElement("div", "dropdown");
        let btnDrop = this.createElement("button", "btnDrop");
        btnDrop.textContent = "Couleurs";
        btnDrop.addEventListener("click", function () {
            document.getElementById("myDropdown").classList.toggle("show");
        });

        let myDropDown = this.createElement("div", "dropdown-content");
        myDropDown.id = "myDropdown";

        //append element in root
        this.dropDown.append(btnDrop, myDropDown);

        data.colors.forEach(color => {
            let btnColor = this.createElement("button");
            btnColor.textContent = color;

            myDropDown.append(btnColor);
        });
    }

    //==============
    //SHOPPING CART=
    //==============

    //create the shopping cart
    createShoppingCart(data, totalPrice) {

        //the element root
        let cart = this.getElementById("product");

        //the title
        let title = this.createElement("h1");
        title.textContent = "Mon Panier";


        //the array
        let table = this.createElement("table", "responsiveTable");
        let thead = this.createElement("thead");
        let tbody = this.createElement("tbody");
        tbody.id = "cart";
        table.append(thead, tbody);
        let textPrice = this.createElement("p");
        textPrice.id = "total";
        //the line head element
        let trHead = this.createElement("tr");
        //the row head elements
        let thImg = this.createElement("th");
        thImg.textContent = "Image de l'article";
        let thName = this.createElement("th");
        thName.textContent = "Nom de l'article";
        let thPrice = this.createElement("th");
        thPrice.textContent = "Prix";
        let thAction = this.createElement("th");
        thAction.textContent = "Actions";
        //append all th in trhead
        trHead.append(thImg, thName, thPrice, thAction);
        //append thead and tbody on table
        thead.append(trHead);
        //append all in cart
        cart.append(title, table, textPrice);

        //display total
        this.displayTotal(totalPrice);
    }

    createFormOrder() {
        //the root element
        let sectionForm = this.getElementById("formSection");

        let title = this.createElement("h2");
        title.textContent = "Passer commande !";

        let divForm = this.createElement("div", "myForm");

        this.form.id = "myForm";

        divForm.append(this.form);

        //append h2 and form in section
        sectionForm.append(title, divForm);

        //the labels
        let labelFirstName = this.createElement("label");
        labelFirstName.htmlFor = "firstName";
        labelFirstName.textContent = "Prénom";

        let labelLastName = this.createElement("label");
        labelLastName.htmlFor = "lastName";
        labelLastName.textContent = "Nom";

        let labelAddress = this.createElement("label");
        labelAddress.htmlFor = "address";
        labelAddress.textContent = "Adresse";

        let labelCity = this.createElement("label");
        labelCity.htmlFor = "city";
        labelCity.textContent = "Ville";

        let labelEmail = this.createElement("label");
        labelEmail.htmlFor = "email";
        labelEmail.textContent = "Adresse électronique";

        //the inputs

        this.inputFirstName.id = "firstName";
        this.inputFirstName.type = "text";
        this.inputFirstName.required = true;

        this.inputLastName.id = "lastName";
        this.inputLastName.type = "text";
        this.inputLastName.required = true;


        this.inputAddress.id = "address";
        this.inputAddress.type = "text";
        this.inputAddress.required = true;

        this.inputCity.id = "city";
        this.inputCity.type = "text";
        this.inputCity.required = true;

        this.inputEmail.id = "email";
        this.inputEmail.type = "email";
        this.inputEmail.required = true;

        //the button submit
        let btnOrder = this.createElement("input", "btnOrder");
        btnOrder.type = "submit";
        btnOrder.value = "Commander";

        //append all elements in form
        this.form.append(
            labelFirstName, this.inputFirstName, labelLastName,
            this.inputLastName, labelAddress, this.inputAddress,
            labelCity, this.inputCity , labelEmail, this.inputEmail , btnOrder
        );
    }

    generateCart(product) {
        let tbody = this.getElementById("cart");

        //the line body element
        let trBody = this.createElement("tr");
        trBody.id = this.nbItem++;

        //the row body elements
        let tdImg = this.createElement("td");

        //img of article
        let imgArticle = this.createElement("img", "imagesCart");
        imgArticle.src = product.imageUrl;
        imgArticle.alt = "photo d'ours en peluche";
        tdImg.append(imgArticle);

        let tdName = this.createElement("td");
        tdName.textContent = product.name;

        let tdPrice = this.createElement("td");
        tdPrice.textContent = this.transformPrice(product.price);

        let tdDelete = this.createElement("td");
        this.btnDelete = this.createElement("button", "deleteItem");
        this.btnDelete.textContent = "Supprimer";
        tdDelete.append(this.btnDelete);

        //append all td in trBody
        trBody.append(tdImg, tdName, tdPrice, tdDelete);

        //append trbody in tbody
        tbody.append(trBody);
    }

    displayNbItemCart(nbItem) {
        let textCart = this.getElementById("myCart");
        textCart.textContent = "Panier (" + nbItem + ")";
    }

    displayTotal(totalPrice) {
        const total = this.getElementById("total");

        if(total) {
            total.textContent = "Total de votre commande : " + this.transformPrice(totalPrice);
        }
    }

    //=============
    //CONFIRMATION=
    //=============

    //create confirmation order
    createConfirmationOrder(data) {
        let article = this.getElementById("confirmOrder");
        let thxTitle = this.createElement("h1");
        let numOrder = this.createElement("p");
        let table = this.createElement("table", "responsiveTable");
        let thead = this.createElement("thead");
        let trThead = this.createElement("tr");
        let imgThead = this.createElement("th");
        let nameProduct = this.createElement("th");
        let priceProduct = this.createElement("th");
        let tbody = this.createElement("tbody");
        let totalOrder = this.createElement("p", "totalOrder");
        let titleCoord = this.createElement("h2");
        let divCoord = this.createElement("div", "coord");
        let listContact = this.createElement("ul");
        let liFirstName = this.createElement("li");
        let liLastName = this.createElement("li");
        let liAddress = this.createElement("li");
        let liCity = this.createElement("li");
        let liEmail = this.createElement("li");

        thxTitle.textContent = "Merci pour votre commande " + data.contact.firstName + " " + data.contact.lastName + " !";
        numOrder.textContent = "Numéro de la commande : " + data.orderId;
        totalOrder.textContent = "Total de la commande : " + this.transformPrice(this.getTotalPrice(data));
        titleCoord.textContent = "Coordonnées";

        //append h2/p and table in article
        article.append(thxTitle, numOrder, table, totalOrder, titleCoord, divCoord);

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
            imgArticle.alt = "photo d'ours en peluche";

            //append img in tdImg
            tdImg.append(imgArticle);

            tdName.textContent = product.name;
            tdPrice.textContent = this.transformPrice(product.price);

            //append TR in tbody for each article;
            tbody.append(tr);
        });

        //append thead and tbody in table
        table.append(thead, tbody);

        liFirstName.textContent = "Prénom : " + data.contact.firstName;
        liLastName.textContent = "Nom : " + data.contact.lastName;
        liAddress.textContent = "Adresse : " + data.contact.address;
        liCity.textContent = "Ville : " + data.contact.city;
        liEmail.textContent = "E-Mail : " + data.contact.email;

        listContact.append(liFirstName,liLastName, liAddress, liCity, liEmail);

        divCoord.append(listContact);
    }

    getTotalPrice(data) {
        let totalPrice = 0;

        data.products.forEach(id => {
            totalPrice = totalPrice + id.price;
        });

        return totalPrice;
    }

    //=======
    //ERRORS=
    //=======

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
        this.msg.textContent = "Ce produit n'éxiste pas ou n'existe plus. vous allez être redirigé vers la page principale.";

        //append message in article
        this.article.append(this.msg);
    }

    //display error message when the cart is empty
    displayCartError() {
        let app = this.getElementById("product");
        let p = this.createElement("p");
        p.textContent = "Votre panier est vide !";
        app.append(p);
    }

    //=======
    //DELETE=
    //=======

    //suppr all item
    deleteDisplayCart(id) {
        let cart = this.getElementById(id);

        if(cart != null) {
            if(id === "cart") {
                this.nbItem = 0;
            }

            while(cart.firstChild) {
                cart.removeChild(cart.firstChild);
            }
        }
    }

    //============
    //REDIRECTION=
    //============

    //redirect to confirmation page
    redirectConfirmOrder() {
        document.location.href = "../html/confirmation.html";
    }

    //redirect to index page
    redirectToIndex() {
        let root = this.getElementById("confirmOrder");
        let textError = this.createElement("p");
        textError.textContent = "Vous n'avez pas de commandes ! Vous serez redirigé vers la page principale dans quelques secondes.";
        root.append(textError);
        setTimeout(() => document.location.href = "../index.html", 4000);
    }

    //=========
    //==EVENT==
    //=========

    //add product to cart
    bindAddToCart(handler, product) {
        this.btnAdd.addEventListener("click", event => {
            if(product._id) {
                handler(product._id);
            }
        });
    }

    //delete product to cart
    bindDeleteToCart(handler) {
        this.btnDelete.addEventListener("click", event => {
            if(event.target.className === "deleteItem") {
                handler(parseInt(event.target.parentElement.parentElement.id));
            }
        });
    }

    //send order
    bindSendOrder(handler) {
        this.form.addEventListener("submit", event => {
            event.preventDefault();
            if(this.validateForm()) {
                handler(this.form);
                this._resetInput();
            }
        });
    }

    validateForm() {
        const regexNameAndCity = /^[a-zâäàéèùêëîïôöçñ/]+[-]?(\s?[a-zâäàéèùêëîïôöçñ/]+)*$/i;
        const regexAddress = /^[^@&"()!_$*€£`+=\/;?#^¨]+?$/;
        const inputBlankLettering = /^\s+$/;
        const regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
        let isFirstName = false;
        let isLastName = false;
        let isAddress = false;
        let isCity = false;
        let isEmail = false;

        if (this.validInput(regexNameAndCity, this.inputFirstName, inputBlankLettering)) {
            isFirstName = true;
        }
        if(this.validInput(regexNameAndCity, this.inputLastName, inputBlankLettering)) {
            isLastName = true;
        }
        if(this.validInput(regexAddress, this.inputAddress, inputBlankLettering)) {
            isAddress = true;
        }
        if(this.validInput(regexNameAndCity, this.inputCity, inputBlankLettering)) {
            isCity = true;
        }
        if(this.validInput(regexEmail, this.inputEmail, inputBlankLettering)) {
            isEmail = true;
        }

        if(isFirstName && isLastName && isAddress && isCity && isEmail) {
            return true;
        }
    }

    validInput(regex, input, regexBlank) {
        if(regex.test(input.value) && !regexBlank.test(input.value)) {
            input.className = input.id;
            return true;
        }else {
            input.className = "error";
            return false;
        }
    }

    //=================
    //PRIVATES METHODS=
    //=================
    _resetInput() {
        this.form.childNodes.forEach(node => {
            if(node.nodeName === "INPUT") {
                node.value = '';
            }
        });
    }
}