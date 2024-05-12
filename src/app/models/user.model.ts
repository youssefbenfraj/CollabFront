export interface User {
    userId: number;
    username: string;
    cycleCount: number;
    imageUrl?: string;  
    idUser: number;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: string;
    imageUser: string;
    role: string;
    level: string;
    classNumber: number;
    major: string;
    active: boolean;
    badge?: {  
        id: number;
        name: string;
        imageUrl: string;
        threshold: number;
    } | null;  
}
