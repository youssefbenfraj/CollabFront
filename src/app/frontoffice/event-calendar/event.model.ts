export interface AppEvent {
    idEvent: number;
    titleEvent: string;
    dateEvent: Date;
    description?: string;
    nbMaxInscrits?: number;
    location?: string;
    category?: string;
    duree?: string;
    formateurs?: string;
    modalitesParticipation?: string;
    cout?: number;
    prerequis?: string;
    averageRating?: number;
    photoUrl?: string;
    latitude?: number;
    longitude?: number;
    userList?: { idUser: number }[];
}
