import { IsAvailable } from "./IsAvailable.model";

export interface Book {
    idBook: number;
    titleBook: string;
    description: string;
    language: string;
    coverPicture: string;
    isAvailable: IsAvailable;  // Cette propriété indique la disponibilité du livre
    phoneNumber:string;
    likes:number;
    dislikes:number;



    // Les échanges sont facultatifs, décommentez si vous voulez les inclure dans le modèle du livre.
    // exchanges?: Exchange[];
  }
  

