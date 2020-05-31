class Model {
    constructor(url) {
        this.url = url;
        this.cart = this.loadLocalStorage("shoppingCart") || [];
        this.orderData = this.loadSessionStorage("order");
        this.totalPrice = 0;
        this.nbItemCart = this.cart.length;
    }

    //=========
    //REQUESTS=
    //=========

    //get all products
    async getProductsAsync() {
        let response = await fetch(this.url);
        return await response.json();
    }

    //get one product
    async getProductAsync(id) {
        let response = await fetch(this.url + id);
        return await response.json();
    }

    //post order
    async postOrderAsync(data) {
        let response = await fetch(this.url + "order", {
            method : 'POST',
            body : JSON.stringify(data),
            headers: {'Content-type': 'application/json'}
        });
        return await response.json();
    }

    //load local storage
    loadLocalStorage(key){
        return JSON.parse(localStorage.getItem(key));
    }

    //load session storage
    loadSessionStorage(key){
        return JSON.parse(sessionStorage.getItem(key));
    }

    //add item to shopping Cart
    addToCart(id) {
        this.getProductAsync(id)
            .then(data => {
                this.cart.push(data);
                this.saveCart(this.cart);
            });
        this.nbItemCart++;
        this.displayNbCart(this.nbItemCart);
    }

    //delete one item of localstorage
    deleteItemLocalStorage(item) {
        localStorage.removeItem(item);
    }

    //delete item to cart
    deleteToCart(id) {
        let elementSuppr = this.cart.splice(id,1);

        if(elementSuppr) {
            this.saveCart(this.cart);
            elementSuppr.forEach(data => {
                this.totalPrice = this.totalPrice - data.price;
            });
        }
        if(this.cart.length === 0) {
            this.deleteItemLocalStorage("shoppingCart");
        }

        this.nbItemCart--;

        this.onCartChanged(this.cart, this.totalPrice, this.nbItemCart);
    }

    //=======
    //Getter=
    //=======
    getCart() {
        return this.cart;
    }

    getTotal() {
        this.cart.forEach(product => {
            this.totalPrice = this.totalPrice + product.price;
        });
        return this.totalPrice;
    }

    getOrder() {
        return this.orderData;
    }

    getNbItemCart() {
        return this.nbItemCart;
    }

    //=====
    //SAVE=
    //=====

    //save cart
    saveCart(cart) {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    //save order to session storage
    saveOrder(order) {
        sessionStorage.setItem("order", JSON.stringify(order));
        this.deleteItemLocalStorage("shoppingCart");
    }

    // send order to api
    sendOrder(form) {
        if(this.cart.length > 0) {
            const contact = {};
            const products = [];
            form.childNodes.forEach(node => {
                if(node.nodeName === "INPUT") {
                    let id = node.id;
                    contact[id] = node.value;
                }
            });
            this.cart.forEach(product => {
                products.push(product._id);
            });
            const order = {contact,products};
            this.postOrderAsync(order)
                .then(response => {
                    this.orderData = response;
                    this.saveOrder(this.orderData);
                    this.displayConfirmPage();
                });
        }
    }

    //=====
    //BIND=
    //=====
    bindDisplayNbCart(callback) {
        this.displayNbCart = callback;
    }
    bindOnOrderConfirm(callback) {
        this.displayConfirmPage = callback;
    }

    bindOnCartChanged(callback) {
        this.onCartChanged = callback;
    }
}