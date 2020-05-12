class Request {
    constructor(url) {
        this.url = url;
    }

    async getProductAsync() {
        let response = await fetch(this.url);
        return await response.json();
    }
}