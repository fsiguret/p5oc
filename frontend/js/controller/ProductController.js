class ProductController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.str = window.location.href;//current str URL.
        this.url = new URL(this.str);
        this.searchParams = new URLSearchParams(this.url.search);
        this.id = '';//product id after search.

        //if url has param : id
        if(this.searchParams.has("id")) {
            this.id = this.searchParams.get("id");
            let ifId = false;
            //search if list of id include id url
            this.model.getProductsAsync().then(data =>{
                data.forEach(product => {
                    if (product._id.includes(this.id)) {
                        ifId = true;
                    }
                })
                //ifId is present
                if (ifId) {
                    this.displayItem(this.model.getProductAsync(this.id));
                } else {
                    this.errorIdNotFound();
                }
            }).catch(error =>
                this.displayErrorSystem()
            );
        } else {
            this.errorIdNotFound();
        }
    }

    //display item
    displayItem(response) {
        response.then(data => {
            this.view.createItem(data);
            this.view.bindAddToCart(this.handleAddToCart, data);
        }).catch(error =>
            //display error server
            this.view.displayErrorServer()
        );
    }

    //display error id
    errorIdNotFound() {
        this.view.displayErrorId();
        setTimeout(() => document.location.href = "../index.html", 4000);
    }

    //display error server
    displayErrorSystem() {
        this.view.displayErrorServer();
    }

    handleAddToCart = id => {
        this.model.addToCart(id);
        console.log(id)
    }
}