import { User } from "../Model/User";
import { v4 as uuidv4 } from "uuid";

class UserRepository{

    private db: User[] = [
  {
    "id": "1a2b3c",
    "name": "Alice Silva",
    "password": "senha123",
    "userRole": "ADMIN"
  },
  {
    "id": "4d5e6f",
    "name": "Bruno Costa",
    "password": "bruno456",
    "userRole": "USER"
  },
  {
    "id": "7g8h9i",
    "name": "Carla Mendes",
    "password": "carla789",
    "userRole": "MODERATOR"
  },
  {
    "id": "0j1k2l",
    "name": "Diego Lima",
    "password": "diego321",
    "userRole": "USER"
  },
  {
    "id": "3m4n5o",
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