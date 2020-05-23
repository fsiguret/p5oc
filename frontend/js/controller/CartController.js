class CartController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.displayCart(this.model.getCart());
        this.model.bindOnCartChanged(this.displayCart);

    }

    displayCart = data => {
        this.view.deleteDisplayCart();
        if(data.length > 0) {
            data.forEach(product => {
                this.view.createShoppingCart(product);
                this.view.bindDeleteToCart(this.handleDeleteToCart);
            })
        }else {
            this.view.displayCartError();
        }
    }

    handleDeleteToCart = id => {
        this.model.deleteToCart(id);
    }
}