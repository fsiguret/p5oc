const url = "http://localhost:3000/api/teddies/";

let request = new Request(url);
let displayProducts = new DisplayProducts();

request.getProductAsync()
    .then(data => {
        data.forEach(product => {
            let teddy = new Teddy(product._id, product.imageUrl, product.price, product.description, product.name, product.colors);
            displayProducts.printAllProducts(teddy);
        })
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec la génération des articles ' + error.message);
    });