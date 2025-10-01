import { User } from "../Model/User";
import { v4 as uuidv4 } from "uuid";

class UserRepository{

    private db: User[] = [
        {
            "id": "f8ad7b73-b1b2-4b62-bfd4-09d4b2b34e59",
            "name": "Alice Silva",
            "password": "senha123",
            "userRole": "ADMIN"
        },
        {
            "id": "0f9a6a02-5585-471d-b6a4-8f176cb1cf70",
            "name": "Bruno Costa",
            "password": "bruno456",
            "userRole": "USER"
        },
        {
            "id": "d7e47d9f-2448-4a46-8456-31371ccf22b0",
            "name": "Carla Mendes",
            "password": "carla789",
            "userRole": "MODERATOR"
        },
        {
            "id": "e5e8c60c-4b1a-4c37-a214-5b403567c7e0",
            "name": "Diego Lima",
            "password": "diego321",
            "userRole": "USER"
        },
        {
            "id": "b26b2b55-d71e-4db3-99e3-013cb80d814a",
            "name": "Eduarda Rocha",
            "password": "edu123",
            "userRole": "ADMIN"
        }
    ]

    getAll(): User[]{
        return this.db;
    }

    getById(id: string): User{
        const foundUser: User[] | undefined = this.db.filter((item: User) => {
            return item.id === id;
        });
        return foundUser[0];
    }

    getByRole(role: string): User[]{
        const foundUser: User[] | undefined = this.db.filter((item: User) => {
            return item.userRole == role.toLocaleUpperCase();
        });
        return foundUser;
    }

    addUser(user: User | undefined): string{
        if(user){
            const url = require("url");
            user.id = uuidv4();
            this.db.push(user);
            
            return url.parse(`http://localhost:3000/produto/${user.id}`);
        }

        return "Não foi possível realizar o cadastro";
    }

    updateUser(id: string, user: User): string{
        const foundUser: User = this.getById(id);
        
        if(foundUser){
            const url = require("url");
            user.id = uuidv4();

            const UserIndex = this.db.indexOf(foundUser);
            this.db.splice(UserIndex);

            user.id = foundUser.id;+
            this.db.push(user);
            
            return url.parse(`http://localhost:3000/produto/${id}`);
        }

        return `User ${id} não enontrado`;
    }

    deleteUser(id: string): string{
        const user: User = this.getById(id);
        if(user){
            const UserIndex = this.db.indexOf(user);
            this.db.splice(UserIndex);
            return `Produto ${user.name} removido com sucesso!`;
        }
        
        return `Produto ${id} não encontrado!`;
    }

}

export default UserRepository;