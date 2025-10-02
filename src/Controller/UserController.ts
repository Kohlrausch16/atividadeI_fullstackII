import UserService from "../Service/UserService";
import { Request, Response } from "express";
import { User } from "../Model/User";
import { userValidator } from "./Schema/UserSchema";

const userService = new UserService();

class UserController {

    async getAll(req: Request, res: Response) {
        const { name, userRole } = req.query;
        let result: User | User[] | undefined;

        try {
            if (name || userRole) {
                result = await userService.getByParam(name as string, userRole as string);
            } else {
                result = await userService.getAll();
            }

            res.status(200).json(result);
        } catch (err: any) {
            res.status(400).json({ erro: err.message });
        }
    }

    async getById(req: Request, res: Response) {
        const id: string = req.params.id;

        try {
            const result: User = await userService.getById(id);
            res.status(200).json(result);
        } catch (err: any) {
            res.status(404).json({ erro: `Usuário ${id} não encontrado` });
        }
    }

    async addUser(req: Request, res: Response) {
        try {
            await userValidator.validate(req.body, { stripUnknown: true });
            const result = await userService.addUser(req.body);
            res.status(201).json(result);
        } catch (err: any) {
            res.status(400).json({ erro: err.message });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            await userValidator.validate(req.body, { stripUnknown: true });
            const result = await userService.updateUser(req.params.id as string, req.body as User);
            res.status(200).json(result);
        } catch (err: any) {
            res.status(400).json({ erro: err.message });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const result = await userService.deleteUser(req.params.id);
            res.status(200).json({ message: result });
        } catch (err: any) {
            res.status(404).json({ erro: err.message });
        }
    }
}

export default UserController;
