import { v4 as uuidv4 } from 'uuid';
import { User } from "../Model/User";
import UserRepository from "../Repository/UserRepository";

const userRepository = new UserRepository();

class UserService {

    async getAll(): Promise<User[]> {
        return await userRepository.getAll();
    }

    async getById(id: string): Promise<User> {
        return await userRepository.getById(id);
    }

    async getByParam(name: string, userRole: string): Promise<User | User[]> {
        if (name) {
            return await userRepository.getByName(name);

        } else if (userRole) {
            return await userRepository.getByRole(userRole);
        }

        throw new Error("Parâmetros inválidos para consulta de usuário");
    }

    async addUser(user: User): Promise<User> {
        user.id = uuidv4();
        return await userRepository.addUser(user);
    }

    updateUser(id: string, user: User) {
        return userRepository.updateUser(id, user);
    }

    deleteUser(id: string) {
        return userRepository.deleteUser(id);
    }
}

export default UserService;
