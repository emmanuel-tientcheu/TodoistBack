export interface PasswordHasher {
    encode(password: string): Promise<string>;
    decode(clear: string, hash:string):Promise<boolean>;
}