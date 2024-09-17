import { Module } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { PrismaUserRepository } from './adapters/Prisma-user.repository';
import { RandomIdGenerator } from './adapters/random-id-generator';
import { UserController } from './controllers/user.controller';
import { BcryptPassword } from './services/bcryptPassword';
import { CreateUser } from './useCases/create-user';

@Module({
    controllers: [UserController],
    providers: [
        PrismaService,
        RandomIdGenerator,
        BcryptPassword,
        PrismaUserRepository,
        {
            provide: CreateUser,
            inject: [RandomIdGenerator, BcryptPassword, PrismaUserRepository],
            useFactory: (idGenerator, passwordHasher, repository) => {
                return new CreateUser(idGenerator, passwordHasher, repository)
            }
        }
    ]
})
export class UserModule {}
