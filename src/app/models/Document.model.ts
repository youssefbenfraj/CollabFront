import { User } from "./user.model";


export class Document {
    idDoc!: number;
    titleDoc!: string;
    price!: number;
    module!: string;
    content!: string;
    idUser!:number;
    user!:User;
}