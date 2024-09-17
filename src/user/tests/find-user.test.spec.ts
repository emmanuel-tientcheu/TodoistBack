import { InMemoryUserRepository } from "../adapters/in-memory-user.repository"
import { User } from "../entities/user";

describe("Feature: Find User", () => {
    let repository: InMemoryUserRepository;
    const johndoe = new User(
        "johndoe-1",
        "johndoe@gmail.com",
        "password"
    );

    beforeEach(async () => {
        repository = new InMemoryUserRepository();
        await repository.create(johndoe);
    });



    describe("Scenario: By Email",  () => {
        it("should get user", async () => {
            const result = await repository.findByEmail("johndoe@gmail.com");
            expect(result).toEqual(johndoe)
        });

        it("should get nothing", async () => {
            const result = await repository.findByEmail("johndoe1@gmail.com");
            expect(result).toEqual(undefined)
        });
    });
})