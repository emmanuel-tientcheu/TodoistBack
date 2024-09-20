import { 
    Controller, 
    Post, 
    Get, 
    Body, 
    Param,
    Request
 } from "@nestjs/common"
import { User } from "@prisma/client";
import { Public } from "../../core/decorator";
import { CreateUserDto } from "../dto/create-user.dto";
import { CreateUser } from "../useCases/create-user";
import { FindUserByEmail } from "../useCases/find-user-by-email";
import { SignIn } from "../useCases/sign-in";

@Controller()
export class UserController {
    constructor(
        private readonly createUser: CreateUser,
        private readonly findUserByEmail: FindUserByEmail,
        private readonly signIn: SignIn,
    ) {}

    @Public()
    @Post("/register")
    async handleCreateUser(
        @Body() body: CreateUserDto
    ) {
       return await this.createUser.execute(body);
    }

    @Public()
    @Post("/signIn")
    async handeSignIn( @Body() body: any) {
        return await this.signIn.execute({
            email: body.email,
            password: body.password
        });
    }

    @Get("/users/:email")
    async handleFindUserByEmail(
        @Param("email") email: string,
        @Request() req: {user: User}
    ) {
       return await this.findUserByEmail.execute(email);
    }

}