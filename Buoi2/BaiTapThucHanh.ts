interface Product {
    id: number;
    name: string;
    price: number;
}

class Book implements Product {
    private _id: number;
    private _name: string;
    private _price: number;
    private _author: string;

    constructor(id: number, name: string, price: number, author: string) {
        this._id = id;         
        this._name = name;    
        this._price = price;  
        this._author = author;
    }

    get id(): number {
        return this._id;
    }
    set id(value: number) {
        if (value <= 0) 
            throw new Error("ID phải lớn hơn 0");
        this._id = value;
    }

    get name(): string {
        return this._name;
    }
    set name(value: string) {
        if (!value.trim()) 
            throw new Error("Tên sách không được rỗng");
        this._name = value;
    }

    get price(): number {
        return this._price;
    }
    set price(value: number) {
        if (value < 0) throw new Error("Giá phải >= 0");
        this._price = value;
    }

    get author(): string {
        return this._author;
    }
    set author(value: string) {
        if (!value.trim()) throw new Error("Tên tác giả không được rỗng");
        this._author = value;
    }

    printInfo(): void {
        console.log(`Sách: [ID: ${this._id}, Tên: ${this._name}, Giá: ${this._price}, Tác giả: ${this._author}]`);
    }
}


try {
  const book1 = new Book(1, "TypeScript Cơ Bản", 100000, "Nguyễn Văn A");
  book1.printInfo();

  book1.price = 150000;  
  console.log("Giá mới:", book1.price);

  book1.id = -1;         
  book1.name = " ";   
  book1.price = -50;    
  book1.author = ""; 

} catch (err) {
  console.error((err as Error).message);
}

const book1 = new Book(1, "Digital Image Processing", 441.09, "Rafael C. Gonzalez")
book1.printInfo()