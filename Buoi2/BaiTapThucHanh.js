var Book = /** @class */ (function () {
    function Book(id, name, price, author) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.author = author;
    }
    Book.prototype.printInfo = function () {
        console.log("ID: ".concat(this.id));
        console.log("Ten sach: ".concat(this.name));
        console.log("Gia: ".concat(this.price));
        console.log("Tac gia: ".concat(this.author));
    };
    return Book;
}());
var book1 = new Book(1, "Digital Image Processing", 441.09, "Rafael C. Gonzalez");
book1.printInfo();
