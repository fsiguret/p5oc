class CartController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.displayCart(this.model.getCart(), this.model.getTotal());
        this.model.bindOnCartChanged(this.displayCart);
        this.view.bindSendOrder(this.handleSendOrder);
    }

    displayCart = (data, totalPrice) => {

        this.view.deleteDisplayCart();
        if(data.length > 0) {
            data.forEach(product => {
                this.view.createShoppingCart(product, totalPrice);
                this.view.bindDeleteToCart(this.handleDeleteToCart);
            })
        }else {
            this.view.displayCartError();
            this.view.deleteDisplayCart("total");
        }
    }

    displayConfirmPage = data => {
        this.view.redirectConfirmOrder(data);
    }

    handleDeleteToCart = (id) => {
        this.model.deleteToCart(id);
    }

    handleSendOrder = form => {
        console.log(form);
        this.model.sendOrder(form);
    }
}