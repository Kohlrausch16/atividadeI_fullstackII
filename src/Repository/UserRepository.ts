import { User } from "../Model/User";

class UserRepository {

    private db = require('../../dbConfig');

    async getAll(): Promise<User[]> {
        return await this.db.exec('SELECT * FROM user');
    }

    async getById(id: string): Promise<User> {
        const foundUser: User[] = await this.db.exec("SELECT * FROM user WHERE id = ?", [id]);

        if (foundUser.length < 1)
            throw new Error(`Usuário ${id} não encontrado`);

        return foundUser[0];
    }

    async getByName(name: string): Promise<User> {
        const foundUser: User[] = await this.db.exec("SELECT * FROM user WHERE name = ?", [name]);

        if (foundUser.length < 1)
            throw new Error(`Usuário ${name} não encontrado`);

        return foundUser[0];
    }

    async getByRole(userRole: string): Promise<User[]> {
        const foundUsers: User[] = await this.db.exec("SELECT * FROM user WHERE userRole = ?", [userRole]);
        return foundUsers;
    }

    async addUser(user: User): Promise<User> {
        await this.db.exec(
            'INSERT INTO user (id, name, password, userRole) VALUES (?, ?, ?, ?)',
            [user.id, user.name, user.password, user.userRole]
        );

        return await this.getById(user.id);
    }

    async updateUser(id: string, user: User): Promise<User> {
        await this.db.exec(
            'UPDATE user SET name = ?, password = ?, userRole = ? WHERE id = ?',
            [user.name, user.password, user.userRole, id]
        );

        return await this.getById(id);
    }

    async deleteUser(id: string): Promise<string> {
        await this.getById(id);
        await this.db.exec('DELETE FROM user WHERE id = ?', [id]);
        return `Usuário ${id} deletado com sucesso!`;
    }
}

export default UserRepository;
