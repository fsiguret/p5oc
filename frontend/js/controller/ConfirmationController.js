class ConfirmationController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.displayConfirmationOrder(this.model.getOrder(), this.model.getProductsAsync());
    }

    displayConfirmationOrder = (data, responseServer) => {
        responseServer.then(response=> {
            this.view.createConfirmationOrder(data);
        }).catch(error => {
            this.view.displayErrorServer("confirmOrder")
        })
    }
}