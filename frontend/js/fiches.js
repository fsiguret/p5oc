const urlProducts = "http://localhost:3000/api/teddies/";
let str = window.location.href;//current str URL.
let url = new URL(str);
let searchParams = new URLSearchParams(url.search);
let id = '';//product id after search.
let display = new Display();

//set id.
if(searchParams.has('id')) {
    id = searchParams.get('id');
}

let request = new Request(urlProducts + id);

request.getProductAsync()
    .then(product => {
        //display an article according to its id
        display.printProduct(product);
        display.changeTitle(product.name + ' - Orinoco');
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec la génération de l\'article' + error.message);
    });