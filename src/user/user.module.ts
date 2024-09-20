import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from '../core/prisma.service';
import { PrismaUserRepository } from './adapters/Prisma-user.repository';
import { RandomIdGenerator } from './adapters/random-id-generator';
import { jwtConstants } from './constants';
import { UserController } from './controllers/user.controller';
import { BcryptPassword } from './services/bcryptPassword';
import { CreateUser } from './useCases/create-user';
import { FindUserByEmail } from './useCases/find-user-by-email';
import { SignIn } from './useCases/sign-in';

@Module({
    controllers: [UserController],
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresAt },
          }),
    ],
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
        },
        {
            provide: FindUserByEmail,
            inject: [PrismaUserRepository],
            useFactory: (repository) => {
                return new FindUserByEmail(repository)
            }
        },
        {
            provide: SignIn,
            inject: [BcryptPassword, PrismaUserRepository, JwtService],
            useFactory: (passwordHasher, repository, jwtService) => {
                return new SignIn(passwordHasher, repository, jwtService)
            }
        },
    ],
})
export class UserModule {}