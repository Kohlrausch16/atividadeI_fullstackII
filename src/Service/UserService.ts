import { User } from "../Model/User";
import UserRepository from "../Repository/UserRepository";

const userRepository = new UserRepository();

class UserService{

    getAll(): User[]{
        return userRepository.getAll();
    }

    getById(id: string): User {
        const foundUser: User | undefined = userRepository.getById(id);
        if(!foundUser){
            throw new Error();
        }

        return foundUser;
    }

    getByRole(role: string): User[] | undefined{
        return userRepository.getByRole(role as string);
    }

    addUser(User: User | undefined): string{
        return userRepository.addUser(User);
    }

    updateUser(id: string, User: User){
        return userRepository.updateUser(id, User);
    }

    deleteUser(id: string){
        return userRepository.deleteUser(id);
    }
}

export default UserService;