class ShoppingCart {

    constructor(item, price, count) {
        this.item = item;
        this.price = price;
        this.count = count;
    }

    //private properties
    cart = [];

    //Save cart
    saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    }

    //load cart
    loadCart() {
        this.cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
}