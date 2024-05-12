import { Revision } from "./revision.model";
import { Role } from "./role.models";

export interface User {
    idUser?: number;
    nomUser: string;
    prenomUser: string;
    email: string;
    pwd: string;
    imageUser?: string;
    status?: string;
    role: Role;
    events?: Event[];
    revisions?: Revision[];

}