const url = "http://localhost:3000/api/teddies/";
let request = new Request(url);
let display = new Display();

request.getProductAsync()
    .then(data => {
        //show all articles
        display.printAllProducts(data);
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec la génération des articles ' + error.message);
    });

