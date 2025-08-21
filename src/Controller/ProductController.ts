import ProductService from "../Service/ProductService";
import { Request, Response } from "express";

const productService = new ProductService();

class ProductController {

    getAll(req: Request, res: Response){
        const result = productService.getAll();
        res.json(result).status(200);
    }

    getById(req: Request, res: Response){
        const id = req.params.id;

        try{
            const result = productService.getById(id);
            res.json(result).status(200);
        }catch (err: any){
            res.json(`Produto ${id} nao encontrado`).status(404);
        }
    }

}

export default ProductController;