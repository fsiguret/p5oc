class CartController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.firstDisplayCart(this.model.getCart(), this.model.getTotal(), this.model.getProductsAsync());
        this.model.bindOnCartChanged(this.onCartChanged);
        this.view.displayNbItemCart(this.model.getNbItemCart());
        this.view.bindSendOrder(this.handleSendOrder);
        this.model.bindOnOrderConfirm(this.displayConfirmPage);
    }

    firstDisplayCart = (data, totalPrice, responseServer) => {
        if(data.length > 0) {
            responseServer.then(response => {
                this.view.createShoppingCart(data, totalPrice);
                this.view.createFormOrder();
                data.forEach(product => {
                    this.view.generateCart(product);
                    this.view.bindDeleteToCart(this.handleDeleteToCart);
                });
            }).catch(error => {
                this.view.displayErrorServer("product");
            });
        }else {
            this.view.displayCartError();
            this.view.deleteDisplayCart("total");
        }
    }

    onCartChanged = (data, totalPrice) => {
        if(data.length > 0) {
            this.view.deleteDisplayCart("cart");
            data.forEach(product => {
                this.view.generateCart(product);
                this.view.bindDeleteToCart(this.handleDeleteToCart);
                this.view.displayTotal(totalPrice);
            });

        }else {
            this.view.deleteDisplayCart("product");
            this.view.deleteDisplayCart("formSection");
            this.view.displayCartError();
        }
        this.view.displayNbItemCart(this.model.getNbItemCart());
    }

    displayConfirmPage = id => {
        this.view.redirectConfirmOrder();
    }

    handleDeleteToCart = id => {
        this.model.deleteToCart(id);
    }

    handleSendOrder = (form) => {
        this.model.sendOrder(form);
    }
}