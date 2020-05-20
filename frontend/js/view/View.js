class View {
    constructor() {
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

        //The image of item
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

        //The button detail
        this.detailA = this.createElement("a");
        let detail = this.createElement("button");
        detail.textContent = "Détail du produit";
        this.detailA.href = "html/product.html?id=" + data._id ;
        this.detailA.append(detail);

        //append all element in article
        this.article.append(this.name, this.imgA, this.price, this.description, this.detailA);
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
        let add = this.createElement("button");
        add.textContent = "Ajouter au panier";
        this.addA.href = "html/panier.html" ;
        this.addA.append(add);

        //append all element in article
        this.article.append(this.name, this.img, this.dropDown, this.price, this.description, this.addA);
    }

    //Set the price to local region
    transformPrice(data) {
        return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(data.price / 100);
    }

    //the Error message when server error
    displayErrorServer() {
        //TODO
    }

    //The Error message when ID not found or unknown
    displayErrorId() {
        //TODO
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

        console.log(data)
        data.colors.forEach(color => {
            this.btnColor = this.createElement("button");
            this.btnColor.textContent = color;

            this.myDropDown.append(this.btnColor);
        })
    }
}