//==================================
//=============MODEL================
//==================================
class TeddyModel {
    constructor(url) {
        this.url = url;
    }
    async getProductsAsync() {
        let response = await fetch(this.url);
        return await response.json();
    }

    async getProductAsync(id) {
        let response = await fetch(this.url + id);
        return await response.json();
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

        if( searchParams.has('id')) {
            id = searchParams.get('id');
            this.renderProduct(id);
        } else {
            this.renderProductList();
        }
    }

    renderProductList() {
        teddyApp.getProducts()
            .then(data => {
                data.forEach(product => {
                    const idSection = 'product';
                    let href = "html/product.html?id=" + product._id;
                    this.generateElementById('article', idSection);
                    this. generateElementText('h2', product.name, idSection);
                    this.generateLinkImg(href, product.imageUrl, 'images', idSection);
                    this.generateElementText('p', 'Prix : ' + this.transformPrice(product), idSection);
                    this.generateElementText('p', 'Description : ' + product.description, idSection);
                    this.generateLinkButton('Détail du produit', 'product', href);

                })
            })
    }

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
                this.generateButton('Ajouter au panier', data.name);
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
        btnDrop.addEventListener("click", function () {teddyApp.showDropDown()});
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

}

const teddyApp = new TeddyController(teddyView);
teddyApp.init();