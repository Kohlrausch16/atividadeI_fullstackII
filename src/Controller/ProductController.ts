import ProductService from "../Service/ProductService";
import { Request, Response } from "express";
import { Product } from "../Model/Product";
import { productValidator } from "./Schema/ProductSchema";

const productService = new ProductService();

class ProductController {

    async getAll(req: Request, res: Response){
        const {name, color, material, min, max} = req.query;
        let result: Product | Product [] | undefined;

        if(name || color || material || min || max){
            result = await productService.getByParam(name as string, min as string, max as string, color as string, material as string);
        } else {
            result = await productService.getAll();
        }
        
        res.json(result).status(200);
    }

    async getById(req: Request, res: Response){
        const id: string = req.params.id;

        try{
            const result: Product = await productService.getById(id);
            res.json(result).status(200);
        }catch (err: any){
            res.json(`Produto ${id} nao encontrado`).status(404);
        }
    }

    async addProduct(req: Request, res: Response){
        try{
            productValidator.validate(req.body, {stripUnknown: true});
            res.json(await productService.addProduct(req.body));
        } catch (err: any){
            res.json({"erro": err.message}).status(400);
        }
    }

    async updateProduct(req: Request, res: Response){
        try{
            productValidator.validate(req.body, {stripUnknown: true});
            res.json(await productService.updateProduct(req.params.id as string, req.body as Product));
        } catch (err: any){
            res.json({"erro": err.message}).status(400);
        }
    }

    async deleteProduct(req: Request, res: Response){
        res.json(await productService.deleteProduct(req.params.id));
    }
}

export default ProductController;