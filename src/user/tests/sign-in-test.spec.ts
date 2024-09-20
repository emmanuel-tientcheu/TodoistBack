import { JwtService } from "@nestjs/jwt";
import { InMemoryUserRepository } from "../adapters/in-memory-user.repository"
import { User } from "../entities/user";
import { BcryptPassword } from "../services/bcryptPassword";
import { SignIn } from "../useCases/sign-in";

describe("Feature: SignIn", () => {
    let repository: InMemoryUserRepository;
    let passwordHasher: BcryptPassword;
    let jwtService: JwtService;
    let johndoe: User;
    let usecase: SignIn;

    beforeEach(async () => {
        passwordHasher = new BcryptPassword();
        repository = new InMemoryUserRepository();
        jwtService = new JwtService({
            secret: 'test-secret',
            signOptions: { expiresIn: '60s' },
        });
        usecase = new SignIn(passwordHasher, repository, jwtService);

         johndoe = new User(
            "johndoe-1",
            "johndoe@gmail.com",
            await passwordHasher.encode("password")  
        );
        await repository.create(johndoe);
    });

    const payload = {
        email:  "johndoe@gmail.com",
        password: "password"
    }

    describe("Scenario: happy path",  () => {
        it("should signin", async () => {
            const result = await usecase.execute(payload)
            expect(result.result.id).toEqual(johndoe.id);
            expect(result.result.email).toEqual(johndoe.email);
            expect(result.result.name).toEqual(johndoe.name);
            expect(result.access_token).toBeDefined();
        });
    });

    describe("Scenario: should throw",  () => {
        it("user not found", async () => {
            await expect(
                usecase.execute(
                    { email: "johndoe1@gmail.com",
                      password: payload.password
                    })
                ).rejects.toThrow("User not found")
           
        });

        it("incorrect password", async () => {
            await expect(
                usecase.execute(
                    { email: payload.email,
                      password: "qwerty"
                    })
                ).rejects.toThrow("Incorrect password")
           
        });
    });
})