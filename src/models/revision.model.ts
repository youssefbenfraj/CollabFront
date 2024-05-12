import { User } from "./user.model";

export interface Revision {
    idRev: number;
    date_debut: Date;
    date_fin: Date;
    sujetRev: string;
    duree: number;
    notes: string;
    objectif: string;
    breakTime: number;
    status: string;
    user: User;
  }
  