import { Router } from "express";
import ProductController from "./Controller/ProductController";

const router = Router();
const productController = new ProductController();

router.get('/produto', productController.getAll);
router.get('/produto/:id', productController.getById);
router.post('/produto', productController.addProduct);

export default router;