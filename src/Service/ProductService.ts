import { Product } from "../Model/Product";
import ProductRepository from "../Repository/ProductRepository";

const productRepository = new ProductRepository();

class ProductService{

    getAll(): Product[]{
        return productRepository.getAll();
    }

    getById(id: string): Product {
        const foundProduct: Product | undefined = productRepository.getById(id);

        if(!foundProduct){
            throw new Error();
        }

        return foundProduct;
    }

    getByParam(name: string, min: string, max: string, color: string, material: string): Product[] | undefined{
        
        if(name){
            return productRepository.getByName(name);

        } else if (color){
            return productRepository.getByColor(color);

        } else if (min || max){
            const queryMin: number = Number(min);
            const queryMax: number = Number(max);

            return productRepository.getByPrice(queryMin, queryMax);

        } else if (material){
            return productRepository.getByMaterial(material);
        }
        
        throw new Error();
    }

    addProduct(product: Product | undefined): string{
        return productRepository.addProduct(product);
    }

    updateProduct(id: string, product: Product){
        return productRepository.updateProduct(id, product);
    }

    deleteProduct(id: string){
        return productRepository.deleteProduct(id);
    }
}

export default ProductService;