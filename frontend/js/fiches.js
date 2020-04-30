const urlProducts = "http://localhost:3000/api/teddies/";
let str = window.location.href;//current str URL.
let url = new URL(str);
let searchParams = new URLSearchParams(url.search);
let id = '';//product id after search.

//set id.
if(searchParams.has('id')) {
    id = searchParams.get('id');
}

let request = new Request(urlProducts + id);

request.requestHttpGet()
    .then(product => {
        let html = '';
        html = `
            <article>
                <h2>${product.name}</h2>
                <img src="${product.imageUrl}" alt="photo d un ours">
                <div id="colors">          
                </div>
                <ul>
                    <li>Descripstion : ${product.description}</li>
                    <li>Prix : ${product.price}</li>
                </ul>
                <button>Ajouter au panier</button>
            </article>`;

        document.getElementById('product').innerHTML = html;


        document.title = product.name + ' - Orinoco';
    });
