import { IUserRepository } from "../ports/user-repository.interface";

export class FindUserByEmail {
    constructor(
        private readonly repository: IUserRepository
    ){}

    async execute(email: string) {
        return this.repository.findByEmail(email);
    }
}