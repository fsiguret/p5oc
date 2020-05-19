//==================================
//=============MODEL================
//==================================
class TeddyModel {
    constructor(url) {
        this.url = url;
    }

    //get all products
    async getProductsAsync() {
        let response = await fetch(this.url);
        return await response.json();
    }

    //get one product if ID is present
    async getProductAsync(id) {

        let ifId = false;

        //detect if ID is present
        await this.getProductsAsync()
            .then(data => {
                data.forEach(product => {
                    if(product._id.includes(id)) {
                        ifId = true;
                    }
                })
            });

        // if ID is present
        if (ifId) {
            let response = await fetch(this.url + id);
            return await response.json();
        } else {
            teddyView.productDoesNotExist();
        }
    }

    //private properties
    cart = [];

    //Save cart
    saveCart(cart) {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    //load cart
    loadCart() {
        this.cart = JSON.parse(localStorage.getItem('shoppingCart'));
        return this.cart;
    }

    //add to cart
    addToCart(data) {
        this.cart.forEach(item => {
            if(item._id.includes(data._id)) {
                if(item.nb) {
                    item.nb ++;
                    this.saveCart(this.cart);
                }
            }
        })
        if (!data.nb) {
            data.nb = 1;
            this.cart.push(data)
            this.saveCart(this.cart);
        }
        //localStorage.clear();
    }
    removeItemFromCartAll() {
        localStorage.clear();
    }

    getCart() {
        return this.cart;
    }
}

const teddyModel = new TeddyModel("http://localhost:3000/api/teddies/");

//==================================
//=============VIEW=================
//==================================
class TeddyView {
    init() {
        let str = window.location.href;//current str URL.
        let url = new URL(str);
        let searchParams = new URLSearchParams(url.search);
        let id = '';//product id after search.

        let cart = document.getElementById('cart');
        let product = document.getElementById('product');

        if(localStorage.getItem("shoppingCart") != null) {
            teddyModel.loadCart();
        }

        if(cart) {
            this.renderCart();
        }

        if(searchParams.has('id')) {
            id = searchParams.get('id');
            this.renderProduct(id);
        } else if (product){
            this.renderProductList();
        }
    }

    //display all products
    renderProductList() {
        teddyApp.getProducts()
            .then(data => {
                data.forEach(product => {
                    const idSection = 'product';
                    let href = "html/product.html?id=" + product._id;
                    this.generateElementById('article', idSection);
                    this.generateElementText('h2', product.name, idSection);
                    this.generateLinkImg(href, product.imageUrl, 'images', idSection);
                    this.generateElementText('p', 'Prix : ' + this.transformPrice(product), idSection);
                    this.generateElementText('p', 'Description : ' + product.description, idSection);
                    this.generateLinkButton('Détail du produit', 'product', href);
                })
            })
            .catch(function (error) {
                let h2 = document.createElement('h2');
                let text = document.createTextNode('Le Site est en maintenance ! Revenez plus tard !');
                h2.appendChild(text);
                document.getElementById('product').appendChild(h2);
            })
    }

    //display one product
    renderProduct(id) {
        teddyApp.getProduct(id)
            .then(data => {
                const idSection = 'product';
                let article = this.generateElementById('article', idSection);
                article.id = data.name;
                this. generateElementText('h2', data.name, idSection);
                this.generateOnLastChild('product', this.generateImg(data.imageUrl, 'images'));
                this.generateDropdown('product', data.colors, 'Couleurs');
                this.generateElementText('p', 'Prix : ' + this.transformPrice(data), idSection);
                this.generateElementText('p', 'Description : ' + data.description, idSection);
                let btnCart = this.generateButton('Ajouter au panier', data.name);
                btnCart.addEventListener("click", function () {
                    teddyApp.addItemToCart(data);
                })
                document.title = data.name + ' - Orinoco';
            })
    }

    renderCart() {
        let cart = teddyModel.getCart();
        console.log(cart);
        cart.forEach(data => {
            let article = this.generateElementById('article', 'cart');
            article.id = data._id;
            let img = this.generateImg(data.imageUrl,"images");
            document.getElementById(data._id).appendChild(img);

            //form nb article
            let form = document.createElement('form');
            let paragraph = document.createElement('label');
            paragraph.htmlFor = "nbItem";
            let textLabel = document.createTextNode("Nombre d'article : ");
            paragraph.appendChild(textLabel);

            form.appendChild(paragraph);

            let input = document.createElement('input');
            input.type = "number";
            input.id = "nbItem";
            input.value = data.nb;

            form.appendChild(input);

            document.getElementById(data._id).appendChild(form);

            //button delete article
           let btnDelete = this.generateButton("Supprimer", data._id);


        })
    }

    //======methodes======
    transformPrice(product) {
        return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(product.price / 100);
    }

    generateElementById(tagName, id) {
        let element = document.createElement(tagName);
        document.getElementById(id).appendChild(element);
        return element;
    }

    generateElementText(tagName, text, id) {
        let tag = document.createElement(tagName);
        let textNode = document.createTextNode(text);
        tag.appendChild(textNode);
        this.generateOnLastChild(id, tag);
    }

    generateLinkImg(href, src, className, id) {
        let linkElem = document.createElement('a');
        let imgElem = this.generateImg(src, className);

        linkElem.href = href;
        linkElem.appendChild(imgElem);
        this.generateOnLastChild(id, linkElem);
    }

    generateImg(src,className) {
        let img = document.createElement('img');
        img.src = src;
        img.className = className;
        return img
    }

    generateOnLastChild(id, element) {
        let elem = document.getElementById(id).lastElementChild;
        elem.appendChild(element);
    }

    generateDropdown(id, colors, textDropDown) {
        let dropDown = document.createElement('div');
        dropDown.className = "dropdown";

        let btnDrop = document.createElement('button');
        let btnText = document.createTextNode(textDropDown);

        btnDrop.className = "btnDrop";
        btnDrop.addEventListener("click", function () {
            teddyApp.showDropDown()
        });
        btnDrop.appendChild(btnText);
        dropDown.appendChild(btnDrop);

        let myDropDown = document.createElement('div');
        myDropDown.id = "myDropDown";
        myDropDown.className = "dropdown-content"

        dropDown.appendChild(myDropDown);

        colors.forEach(data => {
            let btnColor = document.createElement('button');
            let btnText = document.createTextNode(data);
            btnColor.appendChild(btnText);

            myDropDown.appendChild(btnColor);
        })

        this.generateOnLastChild(id, dropDown);
    }

    generateButton(text, id) {
        let btn = document.createElement('button');
        let btnText = document.createTextNode(text);
        btn.appendChild(btnText);
        document.getElementById(id).appendChild(btn);
        return btn;
    }

    generateLinkButton(textButton, id, href) {
        let btn = this.generateButton(textButton, id);
        let a = document.createElement('a');
        a.href = href;
        a.appendChild(btn);
        this.generateOnLastChild(id, a);
    }

    productDoesNotExist() {
        let h2 = document.createElement('h2');
        let text = document.createTextNode("Ce produit n'éxiste pas ou n'éxiste plus. Vous allez être redirigé vers la page principale !");
        h2.appendChild(text);
        document.getElementById('product').appendChild(h2);
        setTimeout(() => document.location.href = "../index.html", 4000);
    }
}

const teddyView = new TeddyView();

//==================================
//==========CONTROLLER==============
//==================================
class TeddyController {
    constructor(teddyView) {
        this.teddyView = teddyView;
    }

    init() {
        this.teddyView.init();
    }

    getProducts() {
        return teddyModel.getProductsAsync();
    }

    getProduct(id) {
        return teddyModel.getProductAsync(id);
    }

    showDropDown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    addItemToCart(data) {
        teddyModel.addToCart(data);
    }

    deleteItem() {
        teddyModel.removeItem();
    }
}

const teddyApp = new TeddyController(teddyView);
teddyApp.init();