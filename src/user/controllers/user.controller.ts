import { Controller, Post, Get, Body, Param } from "@nestjs/common"
import { CreateUserDto } from "../dto/create-user.dto";
import { CreateUser } from "../useCases/create-user";
import { FindUserByEmail } from "../useCases/find-user-by-email";

@Controller()
export class UserController {
    constructor(
        private readonly createUser: CreateUser,
        private readonly findUserByEmail: FindUserByEmail,
    ) {}

    @Get("/users/:email")
    async handleFindUserByEmail(
        @Param("email") email: string
    ) {
       return await this.findUserByEmail.execute(email);
    }
    
    @Post("/register")
    async handleCreateUser(
        @Body() body: CreateUserDto
    ) {
       return await this.createUser.execute(body);
    }

}