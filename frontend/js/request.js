class Request {
    constructor(url) {
        this.url = url;
    }

    async getProductAsync() {
        let response = await fetch(this.url);
        let data = await response.json();
        return data;
    }
}