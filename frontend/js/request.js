class Request {
    constructor(url) {
        this.url = url;
    }
    requestHttpGet() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", this.url);
            xhr.responseType = 'json';
            xhr.onload = () => resolve(xhr.response);
            xhr.onerror = () => reject(xhr.status);
            xhr.send();
        });
    }
}



/*exports.request = (url) => {
    fetch(url).then(function (response) {
        if(response.ok) {
            response.json().then(function (json) {
                console.log(json);

            })
        }
    })
}*/