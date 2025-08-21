import ProductRepository from "../Repository/ProductRepository";

const productRepository = new ProductRepository();

class ProductService{

    getAll(){
        return productRepository.getAll();
    }

}

export default ProductService;