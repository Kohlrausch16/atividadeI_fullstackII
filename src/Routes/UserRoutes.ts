import { Router } from "express";
import UserController from "../Controller/UserController";

const router = Router();
const userController = new UserController();

router.get('/usuario', userController.getAll);
router.get('/usuario/:id', userController.getById);
router.post('/usuario', userController.addUser);
router.put('/usuario/:id', userController.updateUser);
router.delete('/usuario/:id', userController.deleteUser);

export default router;