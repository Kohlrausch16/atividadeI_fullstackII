import { v4 as uuidv4 } from 'uuid';

import { Product } from "../Model/Product";
import ProductRepository from "../Repository/ProductRepository";

const productRepository = new ProductRepository();

class ProductService{

    async getAll(): Promise<Product[]>{
        return await productRepository.getAll();
    }

    async getById(id: string): Promise<Product> {
        return await productRepository.getById(id);
    }

    async getByParam(name: string, min: string, max: string, color: string, material: string): Promise<Product | Product[]>{
        
        if(name){
            return await productRepository.getByName(name);

        } else if (min || max){
            const queryMin: number = Number(min);
            const queryMax: number = Number(max);

            return await productRepository.getByPrice(queryMin, queryMax);

        } else if (material){
            return await productRepository.getByMaterial(material);
        }
        
        throw new Error();
    }

    async addProduct(product: Product): Promise<Product>{
        product.id = uuidv4();
        return await productRepository.addProduct(product);
    }

    updateProduct(id: string, product: Product){
        return productRepository.updateProduct(id, product);
    }

    deleteProduct(id: string){
        return productRepository.deleteProduct(id);
    }
}

export default ProductService;