class Model {
    constructor(url) {
        this.url = url;
        this.cart = this.loadCart() || [];
        this.totalPrice = 0;

        this.orderData = this.loadOrder() || {};
    }

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
        })
        return await response.json();
    }

    //add item to shopping Cart
    addToCart(id) {
        this.getProductAsync(id)
            .then(data => {
                this.cart.push(data);
                this.saveCart(this.cart);
            })
    }

    //load shopping cart
    loadCart(){
        return JSON.parse(localStorage.getItem("shoppingCart"));
    }

    //save cart
    saveCart(cart) {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
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
            })
        }
        if(this.cart.length === 0) {
            this.deleteItemLocalStorage("shoppingCart");
        }

        this.onCartChanged(this.cart, this.totalPrice);
    }

    getCart() {
        return this.cart;
    }

    getTotal() {
        this.cart.forEach(product => {
            this.totalPrice = this.totalPrice + product.price;
        })
        return this.totalPrice;
    }

    //save order to local storage
    saveOrder(order) {
        localStorage.setItem("order", JSON.stringify(order));
        this.deleteItemLocalStorage("shoppingCart");
    }

    loadOrder() {
        return JSON.parse(localStorage.getItem("order"));
    }

    getOrder() {
        return this.orderData;
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
            })
            this.cart.forEach(product => {
                products.push(product._id);
            })

            const order = {contact,products};

            this.postOrderAsync(order)
                .then(response => {
                    this.orderData = response;
                    console.log(this.orderData)
                    this.saveOrder(this.orderData);
                    this.displayConfirmPage();
                })
        }
    }

    //BIND
    bindOnOrderConfirm(callback) {
        this.displayConfirmPage = callback;
    }
    bindOnCartChanged(callback) {
        this.onCartChanged = callback;
    }
}