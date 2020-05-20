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
            this.displayItem(this.model.getProductAsync(this.id));
        } else {
            this.errorIdNotFound();
        }
    }

    //display item
    displayItem(response) {
        response.then(data => {
            this.view.createItem(data);
        })
    }

    //display error id
    errorIdNotFound() {
        this.view.displayErrorId();
    }
}