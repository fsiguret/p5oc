const url = "http://localhost:3000/api/teddies/";

function request(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType ='json';
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(xhr.status);
        xhr.send();
    });
}

request(url)
    .then(data => {
        let html = '';
        data.forEach(data => {
           html += `
           <article>    
                <h2>${data.name}</h2>
                <a class="link" href="${url + data._id}"><img class="images" src="${data.imageUrl}"/></a>              
                <ul>
                    <li>Prix : ${data.price.toString()}</li>
                    <li>Description : ${data.description}</li>
                </ul>
            </article>`;
        });
        document.getElementById('product').innerHTML = html;
    });


