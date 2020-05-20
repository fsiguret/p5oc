class IndexController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        //if itemList return true display item list
        if(this.model.itemList) {
            this.displayListItem(this.model.itemList);
        } else {
            this.errorServer();
        }
    }

    //display list item
    displayListItem(response) {
        response.then(data => {
            data.forEach(product => {
                this.view.createListItem(product);
            })
        })
    }

    //display error server
    errorServer() {
        this.view.displayErrorServer();
    }
}