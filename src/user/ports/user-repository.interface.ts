import { User } from "../entities/user";

export interface IUserRepository {
    create(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | undefined>;
}