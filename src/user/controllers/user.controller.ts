import { Controller, Post, Body } from "@nestjs/common"
import { CreateUserDto } from "../dto/create-user.dto";
import { CreateUser } from "../useCases/create-user";

@Controller()
export class UserController {
    constructor(
        private readonly createUser: CreateUser
    ) {}

    @Post("/register")
    async handleCreateUser(
        @Body() body: CreateUserDto
    ) {
       return await this.createUser.execute(body)

    }
}