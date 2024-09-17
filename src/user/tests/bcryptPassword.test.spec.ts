import { BcryptPassword } from "../services/bcryptPassword";
import { PasswordHasher } from "../services/passwordHasher";

describe("Encode and Decode password", () => {
    const clearPassword = "password";
    let bcryptPassword: PasswordHasher;

    beforeEach(() => {
        bcryptPassword = new BcryptPassword();
    });
    describe("Encode password", () => {
        it("Should Encode", async () => {
            const hasPassword = await bcryptPassword.encode(clearPassword);
            const result = hasPassword === clearPassword;
            expect(result).toBe(false)
        });
    });

    describe("decode password", () => {
        it("Should Encode", async () => {
            const hasPassword = await bcryptPassword.encode(clearPassword);
            const match = await bcryptPassword.decode(clearPassword, hasPassword);
            expect(match).toBe(true)
        });
    });

});