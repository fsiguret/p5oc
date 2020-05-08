class Display {

    printAllProducts(products) {
        products.forEach(data => {
            this.generateArticle();
            this.printNameOfProduct(data);
            this.printImgOfProduct(data);
            this.printParagraphToProduct(data.price, 'Prix : ');
            this.printParagraphToProduct(data.description, 'Description : ');
        });
    }

    //Print One Product
    printProduct(product) {
        this.generateArticle();
        this.printNameOfProduct(product);
        this.printImgOfProduct(product);
        this.printColorsProduct(product);
        this.printParagraphToProduct(product.price, 'Prix : ');
        this.printParagraphToProduct(product.description, 'Description : ');
    }

    generateArticle() {
        let article = document.createElement('article');
        document.getElementById('product').appendChild(article);
    }

    printNameOfProduct(product) {
        let title = document.createElement('h2');
        let name = document.createTextNode(product.name);
        title.appendChild(name);
        this.printOnArticle(title);
    }

    printImgOfProduct(product) {
        let link = document.createElement('a');
        let img = document.createElement('img');
        link.href = "html/product.html?id="+product._id;
        link.appendChild(img);
        img.src = product.imageUrl;
        img.className = 'images';
        this.printOnArticle(link);
    }

    printParagraphToProduct(product, text) {
        let paragraph = document.createElement('p');
        let textNode = document.createTextNode(text + product);
        paragraph.appendChild(textNode);
        this.printOnArticle(paragraph);
    }

    printOnArticle(element) {
        let article = document.getElementById('product').lastElementChild;
        article.appendChild(element);
    }

    printColorsProduct(product) {
        let div = document.createElement('div');
        div.id = 'colors';
        this.printOnArticle(div);

        product.colors.forEach(data => {
                let btn = document.createElement("button");
                let color = document.createTextNode(data);
                btn.appendChild(color);
                document.getElementById('colors').appendChild(btn);
        });
    }

    changeTitle(title) {
        document.title = title;
    }
}