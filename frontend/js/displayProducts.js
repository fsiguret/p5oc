class DisplayProducts extends GenerateElements {

    printAllProducts(products) {
        this.generateElementById('article', 'product');
        this.generateElementText('h2', products.name, 'product');
        this.generateLinkImg("html/product.html?id="+products.id, products.img,'images', 'product');
        this.generateElementText('p', 'Prix : '+products.price, 'product');
        this.generateElementText('p', 'Description : '+products.description, 'product');
    }
    //Print One Product
    printProduct(product) {

        let article = this.generateElementById('article', 'product');
        article.id = product.name;
        this.generateElementText('h2', product.name, 'product');
        this.generateOnLastChild('product', this.generateImg(product.img, 'images'));
        this.generateListButton(product.colors, 'colors', 'product');
        this.generateElementText('p', 'Prix : '+product.price, 'product');
        this.generateElementText('p', 'Description : '+product.description, 'product');
        this.generateButton('Ajouter au panier', product.name);
    }
}







