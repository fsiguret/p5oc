class CartController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.displayCart(this.model.getCart(), this.model.getTotal(), this.model.getProductsAsync());
        this.model.bindOnCartChanged(this.displayCart);
        this.view.bindSendOrder(this.handleSendOrder);
        this.model.bindOnOrderConfirm((this.displayConfirmPage));
    }

    displayCart = (data, totalPrice, responseServer) => {
        responseServer.then(response => {
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
        }).catch(error => {
          this.view.displayErrorServer("product");
        })

    }

    displayConfirmPage = data => {
        this.view.redirectConfirmOrder();
    }

    handleDeleteToCart = id => {
        this.model.deleteToCart(id);
    }

    handleSendOrder = form => {
        this.model.sendOrder(form);
    }
}