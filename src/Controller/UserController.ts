import UserService from "../Service/UserService";
import { Request, Response } from "express";
import { User } from "../Model/User";
import { userValidator } from "./Schema/UserSchema";

const userService = new UserService();

class UserController {

    getAll(req: Request, res: Response){
        const {role} = req.query;
        let result: User | User [] | undefined;

        if(role){
            result = userService.getByRole(role as string);
        } else {
            result = userService.getAll();
        }
        
        res.json(result).status(200);
    }

    getById(req: Request, res: Response){
        const id: string = req.params.id;

        try{
            const result: User = userService.getById(id);
            res.json(result).status(200);
        }catch (err: any){
            res.json(`Produto ${id} nao encontrado`).status(404);
        }
    }

    addUser(req: Request, res: Response){
        try{
            userValidator.validate(req.body, {stripUnknown: true});
            res.json(userService.addUser(req.body));
        } catch (err: any){
            res.json({"erro": err.message}).status(400);
        }
    }

    updateUser(req: Request, res: Response){
        try{
            userValidator.validate(req.body, {stripUnknown: true});
            res.json(userService.updateUser(req.params.id as string, req.body as User));
        } catch (err: any){
            res.json({"erro": err.message}).status(400);
        }
    }

    deleteUser(req: Request, res: Response){
        res.json(userService.deleteUser(req.params.id));
    }
}

export default UserController;