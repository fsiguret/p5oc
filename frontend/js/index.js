const url = "http://localhost:3000/api/teddies/";
let request = new Request(url);

request.requestHttpGet()
    .then(data => {
        displayProducts(data);
       //Storage.saveProducts(data);
    })
    .catch(function (error) {
        console.log('Il y a eu un problème avec la génération des articles' + error.message);
    });

function displayProducts(products) {
    let html = '';
    products.forEach(data => {
        html += `
           <article>    
                <h2>${data.name}</h2>
                <a class="link" href="html/product.html?id=${data._id}"><img class="images" src="${data.imageUrl}"/></a>              
                <ul>
                    <li>Prix : ${data.price.toString()}</li>
                    <li>Description : ${data.description}</li>
                </ul>
            </article>`;
    });
    document.getElementById('product').innerHTML = html;
}

/**CLASS**/

//local storage
/*class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
}*/