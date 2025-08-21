import { Product } from "../Model/Product";

const db: Product [] = require('../../InMemoryDB.json');

class ProductRepository{

    getAll(){
        return db;
    }

    getById(id: string){
        const foundProduct: Product[] | undefined = db.filter((item: Product) => {
            return item.id === id;
        });

        return foundProduct[0];
    }

}

export default ProductRepository;