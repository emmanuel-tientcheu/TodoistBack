import { User } from "../entities/user";
import { IUserRepository } from "../ports/user-repository.interface";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../core/prisma.service";

@Injectable()
export class PrismaUserRepository implements IUserRepository {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async create(user: User): Promise<void> {
       await this.prisma.user.create({
        data: user
       })
    }

    async findByEmail(email: string): Promise<User | undefined> {
       return await this.prisma.user.findUnique({
            where: {email}
        })
    }
    
}