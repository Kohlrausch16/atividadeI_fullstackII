import { Product } from "../Model/Product";

const db: Product [] = require('../../InMemoryDB.json');

class ProductRepository{

    getAll(): Product[]{
        return db;
    }

    getById(id: string): Product{
        const foundProduct: Product[] | undefined = db.filter((item: Product) => {
            return item.id === id;
        });
        return foundProduct[0];
    }

    getByName(name: string): Product[]{
        const foundProduct: Product[] | undefined = db.filter((item: Product) => {
            return item.name.includes(name);
        });
        return foundProduct;
    }

    getByPrice(min: number, max: number): Product[]{
        const foundProduct: Product[] | undefined = db.filter((item: Product) => {
            return min <= item.unitPrice && max >= item.unitPrice;
        });
        return foundProduct;
    }

    getByColor(color: string): Product[]{
        const foundProduct: Product[] | undefined = db.filter((item: Product) => {
            return item.color.includes(color);
        });
        return foundProduct;
    }

    getByMaterial(material: string): Product[]{
        const foundProduct: Product[] | undefined = db.filter((item: Product) => {
            return item.material.includes(material);
        });
        return foundProduct;
    }

}

export default ProductRepository;