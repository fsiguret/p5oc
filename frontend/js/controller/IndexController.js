class IndexController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.displayListItem(this.model.getProductsAsync());
        this.model.bindDisplayNbCart(this.displayNbCart);
    }

    //display list item
    displayListItem(response) {
        response.then(data => {
            data.forEach(product => {
                this.view.createListItem(product);
                this.view.bindAddToCart(this.handleAddToCart, product);
            });
            this.view.displayNbItemCart(this.model.getNbItemCart());
        }).catch(error => {
                //display error server
                this.view.displayErrorServer("product");
        });
    }

    displayNbCart = nbItem => {
        this.view.displayNbItemCart(nbItem);
    }

    handleAddToCart = data => {
        this.model.addToCart(data);
    }
}