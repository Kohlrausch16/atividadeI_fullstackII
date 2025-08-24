import ProductService from "../Service/ProductService";
import { Request, Response } from "express";
import { Product } from "../Model/Product";
import { productValidator } from "./Schema/ProductSchema";

const productService = new ProductService();

class ProductController {

    getAll(req: Request, res: Response){
        const {name, color, material, min, max} = req.query;
        let result: Product | Product [] | undefined;

        if(name || color || material || min || max){
            result = productService.getByParam(name as string, min as string, max as string, color as string, material as string);
        } else {
            result = productService.getAll();
        }
        
        res.json(result).status(200);
    }

    getById(req: Request, res: Response){
        const id: string = req.params.id;

        try{
            const result: Product = productService.getById(id);
            res.json(result).status(200);
        }catch (err: any){
            res.json(`Produto ${id} nao encontrado`).status(404);
        }
    }

    addProduct(req: Request, res: Response){
        try{
            productValidator.validate(req.body, {stripUnknown: true});
            res.json(productService.addProduct(req.body));
        } catch (err: any){
            res.json({"erro": err.message}).status(400);
        }
    }

    updateProduct(req: Request, res: Response){
        try{
            productValidator.validate(req.body, {stripUnknown: true});
            res.json(productService.updateProduct(req.params.id as string, req.body as Product));
        } catch (err: any){
            res.json({"erro": err.message}).status(400);
        }
    }

    deleteProduct(req: Request, res: Response){
        res.json(productService.deleteProduct(req.params.id));
    }
}

export default ProductController;