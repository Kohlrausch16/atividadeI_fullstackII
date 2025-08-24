import { Product } from "../Model/Product";
import { v4 as uuidv4 } from "uuid";

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

    addProduct(product: Product | undefined): string{
        if(product){
            const url = require("url");
            product.id = uuidv4();
            db.push(product);
            
            return url.parse(`http://localhost:3000/produto/${product.id}`);
        }

        return "Não foi possível realizar o cadastro";
    }

    updateProduct(id: string, product: Product): string{
        const foundProduct: Product = this.getById(id);
        
        if(foundProduct){
            const url = require("url");
            product.id = uuidv4();

            const productIndex = db.indexOf(foundProduct);
            db.splice(productIndex);

            product.id = foundProduct.id;+
            db.push(product);
            
            return url.parse(`http://localhost:3000/produto/${id}`);
        }

        return `Producto ${id} não enontrado`;
    }

    deleteProduct(id: string): string{
        const product: Product = this.getById(id);
        if(product){
            const productIndex = db.indexOf(product);
            db.splice(productIndex);
            return `Produto ${product.name} removido com sucesso!`;
        }
        
        return `Produto ${id} não encontrado!`;
    }

}

export default ProductRepository;