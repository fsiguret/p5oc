class Model {
    constructor(url) {
        this.url = url;
        this.cart = this.loadCart() || [];
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

    //save shopping Cart
    addToCart(id) {
        this.getProductAsync(id)
            .then(data => {
                this.cart.push(data);
                localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
            })
    }

    loadCart(){
        return JSON.parse(localStorage.getItem("shoppingCart"));
    }

    saveCart(cart) {

        localStorage.setItem("shoppingCart", JSON.stringify(cart));

    }

    deleteCart() {
        localStorage.clear();
    }

    deleteToCart(id) {
        let elementSuppr = this.cart.splice(id,1);

        if(elementSuppr) {
            this.saveCart(this.cart);
        }
        if(this.cart.length === 0) {
            this.deleteCart();
        }
        this.displayCart(this.cart);
    }

    getCart() {
        return this.cart;
    }

    bindOnCartChanged(callback) {
        this.displayCart = callback;
    }
}