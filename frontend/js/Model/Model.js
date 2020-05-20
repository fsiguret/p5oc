class Model {
    constructor(url) {
        this.url = url;
        this.itemList = this.getProductsAsync();
    }

    //get all products
    async getProductsAsync() {
        let response = await fetch(this.url);
        return await response.json();
    }

    //get one product
    async getProductAsync(id) {
        let ifID = false;
        await this.itemList.then(data => {
            data.forEach(product => {
                if(product._id.includes(id)) {
                    ifID = true;
                }
            })
        })

        if (ifID) {
            let response = await fetch(this.url + id);
            return await response.json();
        }
    }
}