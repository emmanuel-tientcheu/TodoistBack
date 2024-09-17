import { IDgenerator } from "../ports/id-generator.interface";

export class FixedIdGenerator implements IDgenerator {
    
    generate(): string {
        return "id-1";
    }

}