class ConfirmationController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.displayConfirmationOrder(this.model.getOrder(), this.model.getProductsAsync());
        this.view.displayNbItemCart(this.model.getNbItemCart());
    }

    displayConfirmationOrder = (data, responseServer) => {
        if(data != null ) {
            responseServer.then(response=> {

                this.view.createConfirmationOrder(data);

            }).catch(error => {
                console.log(data)
                this.view.displayErrorServer("confirmOrder")
            });
        } else {
            this.view.redirectToIndex();
        }
    }
}