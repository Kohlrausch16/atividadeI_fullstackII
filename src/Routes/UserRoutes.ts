import { Router } from "express";
import UserController from "../Controller/ProductController";

const router = Router();
const userController = new UserController();

router.get('/produto', userController.getAll);
router.get('/produto/:id', userController.getById);
router.post('/produto', userController.addProduct);
router.put('/produto/:id', userController.updateProduct);
router.delete('/produto/:id', userController.deleteProduct);

export default router;