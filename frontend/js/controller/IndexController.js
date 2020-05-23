class IndexController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.displayListItem(this.model.getProductsAsync());
    }

    //display list item
    displayListItem(response) {
        response.then(data => {
            data.forEach(product => {
                this.view.createListItem(product);
                this.view.bindAddToCart(this.handleAddToCart, product);
            })
        }).catch(error =>
            //display error server
            this.view.displayErrorServer()
        );
    }

    handleAddToCart = data => {
        this.model.addToCart(data);
    }
}