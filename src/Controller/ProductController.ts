import ProductService from "../Service/ProductService";
import { Request, Response } from "express";

const productService = new ProductService();

class ProductController {

    async getAll(req: Request, res: Response){
        const result = await productService.getAll();
        res.json(result).status(200);
    }


}

export default ProductController;