import { FixedIdGenerator } from "../adapters/fixed-id-generator";
import { InMemoryUserRepository } from "../adapters/in-memory-user.repository";
import { IDgenerator } from "../ports/id-generator.interface";
import { IUserRepository } from "../ports/user-repository.interface";
import { BcryptPassword } from "../services/bcryptPassword";
import { PasswordHasher } from "../services/passwordHasher";
import { CreateUser } from "../useCases/create-user";

describe("Feature: Create user", () => {

    let useCase: CreateUser;
    let idGenerator: IDgenerator;
    let passWordHasher: PasswordHasher;
    let repository: IUserRepository;

    beforeEach(() => {
        idGenerator = new FixedIdGenerator();
        passWordHasher = new BcryptPassword();
        repository = new InMemoryUserRepository();
        useCase = new CreateUser(
            idGenerator,
            passWordHasher,
            repository
        );
    });

    it("happy path", async () => {
        const payload = {
            email: "johnDoe@gmail.com",
            password: "password",
            name: "john Doe"
        };

        const result = await useCase.execute(payload);
        expect(result.id).toBe("id-1");
    });

    it("Create user without name", async () => {
        const payload = {
            email: "johnDoe@gmail.com",
            password: "password",
        };

        const result = await useCase.execute(payload);
        expect(result.id).toBe("id-1");
    });
})