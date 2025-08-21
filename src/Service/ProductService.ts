import { Product } from "../Model/Product";
import ProductRepository from "../Repository/ProductRepository";

const productRepository = new ProductRepository();

class ProductService{

    getAll(){
        return productRepository.getAll();
    }

    getById(id: string){
        const foundProduct: Product | undefined = productRepository.getById(id);

        if(!foundProduct){
            throw new Error();
        }

        return foundProduct;
    }

}

export default ProductService;