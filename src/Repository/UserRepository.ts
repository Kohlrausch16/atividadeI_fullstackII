import { User } from "../Model/User";
import { v4 as uuidv4 } from "uuid";

const db: User [] = require('../../InMemoryDB.json');

class UserRepository{

    getAll(): User[]{
        return db;
    }

    getById(id: string): User{
        const foundUser: User[] | undefined = db.filter((item: User) => {
            return item.id === id;
        });
        return foundUser[0];
    }

    getByRole(role: string): User[]{
        const foundUser: User[] | undefined = db.filter((item: User) => {
            return item.userRole == role.toLocaleUpperCase();
        });
        return foundUser;
    }

    addUser(user: User | undefined): string{
        if(user){
            const url = require("url");
            user.id = uuidv4();
            db.push(user);
            
            return url.parse(`http://localhost:3000/produto/${user.id}`);
        }

        return "Não foi possível realizar o cadastro";
    }

    updateUser(id: string, user: User): string{
        const foundUser: User = this.getById(id);
        
        if(foundUser){
            const url = require("url");
            user.id = uuidv4();

            const UserIndex = db.indexOf(foundUser);
            db.splice(UserIndex);

            user.id = foundUser.id;+
            db.push(user);
            
            return url.parse(`http://localhost:3000/produto/${id}`);
        }

        return `User ${id} não enontrado`;
    }

    deleteUser(id: string): string{
        const user: User = this.getById(id);
        if(user){
            const UserIndex = db.indexOf(user);
            db.splice(UserIndex);
            return `Produto ${user.name} removido com sucesso!`;
        }
        
        return `Produto ${id} não encontrado!`;
    }

}

export default UserRepository;