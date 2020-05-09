class Teddy extends Products {
    constructor(id, img, price, description, name, colors) {
        super(id, img, price, description);
        this.name = name;
        this.colors = colors;
    }
}