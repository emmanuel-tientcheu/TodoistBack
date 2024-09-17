import { IDgenerator } from "../ports/id-generator.interface";
import { v4 as uuidv4 } from 'uuid';

export class RandomIdGenerator implements IDgenerator {
    generate(): string {
        return uuidv4();
    }
    
}