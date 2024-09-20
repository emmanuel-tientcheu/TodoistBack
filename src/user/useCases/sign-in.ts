import { IUserRepository } from "../ports/user-repository.interface";
import { PasswordHasher } from "../services/passwordHasher";
import { JwtService } from '@nestjs/jwt';

export class SignIn {
    constructor(
        private readonly passwordHasher: PasswordHasher,
        private readonly repository: IUserRepository,
        private readonly jwtService: JwtService,
    ){}

    async execute(
        data: {
            email: string,
            password: string
        }
    ) {

        const user = await this.repository.findByEmail(data.email);
        if(!user) throw new Error("User not found");

        const match = await this.passwordHasher.decode(data.password, user.password);
        if(!match) throw new Error("Incorrect password");
        
        const {password, ...result} = user;
        const access_token = await this.jwtService.signAsync(result);
        return {access_token, result};
    }
}