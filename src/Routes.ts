import { Router } from "express";
import ProductController from "./Controller/ProductController";

const router = Router();
const productController = new ProductController();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);

/*
router.get('/:name', productController.getByName);
router.get('/:price', productController.getByPrice);
router.get('/:color', productController.getByColor);
router.get('/:material', productController.getByMaterial);
*/
export default router;