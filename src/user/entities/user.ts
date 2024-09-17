export class User {
    id: string;
    name?: string;
    email: string;
    password: string;

    constructor(
        id: string,
        email: string,
        password: string,
        name?: string | undefined,
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name !== undefined ? name : "";
    }
}