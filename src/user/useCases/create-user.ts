import { User } from "../entities/user";
import { IDgenerator } from "../ports/id-generator.interface";
import { IUserRepository } from "../ports/user-repository.interface";
import { PasswordHasher } from "../services/passwordHasher";

export class CreateUser {

    constructor(
        private readonly idGenerator: IDgenerator,
        private readonly passWordHasher: PasswordHasher,
        private readonly repository: IUserRepository,
    ) {}

    async execute(
        data: {
            email: string,
            password: string,
            name?: string,
        }
    ) {

        const id = this.idGenerator.generate();
        const passwordHash = await this.passWordHasher.encode(data.password);

        const user = new User(
            id, 
            data.email, 
            passwordHash, 
            data.name
        );

        await this.repository.create(user);

        return {id};
    }
}