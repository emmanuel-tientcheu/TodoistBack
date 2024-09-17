import * as bcrypt from 'bcrypt';
import { PasswordHasher } from "./passwordHasher";

export class BcryptPassword implements PasswordHasher {

    saltRounds = 10;

   async encode(password: string): Promise<string> {
       try {
        const hash = await bcrypt.hash(password, this.saltRounds);
        return hash;
       } catch(err) {
        console.log(err)
        throw new Error("Something went wrong in encode method.");
       }

    }

    async decode(clear: string, hash: string): Promise<boolean> {
        try {
            const isMatch = await bcrypt.compare(clear, hash);
            return isMatch;
           } catch(err) {
            console.log(err)
            throw new Error("Something went wrong in encode method.");
           }
    
    }

}