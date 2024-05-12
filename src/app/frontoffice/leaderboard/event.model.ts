export class Event {
    idEvent: number;
    titleEvent: string;
    dateEvent: Date;
    description: string;
    nbMaxInscrits: number;
    location: string;
    category: string;
    duree: string;
    formateurs: string;
    modalitesParticipation: string;
    cout: number;
    prerequis: string;
    photoUrl: string;
    latitude: number;
    longitude: number;
    averageRating: number;  // Ensure this is included to match your backend

    constructor(
        idEvent: number,
        titleEvent: string,
        dateEvent: Date,
        description: string,
        nbMaxInscrits: number,
        location: string,
        category: string,
        duree: string,
        formateurs: string,
        modalitesParticipation: string,
        cout: number,
        prerequis: string,
        photoUrl: string,
        latitude: number,
        longitude: number,
        averageRating: number
    ) {
        this.idEvent = idEvent;
        this.titleEvent = titleEvent;
        this.dateEvent = dateEvent;
        this.description = description;
        this.nbMaxInscrits = nbMaxInscrits;
        this.location = location;
        this.category = category;
        this.duree = duree;
        this.formateurs = formateurs;
        this.modalitesParticipation = modalitesParticipation;
        this.cout = cout;
        this.prerequis = prerequis;
        this.photoUrl = photoUrl;
        this.latitude = latitude;
        this.longitude = longitude;
        this.averageRating = averageRating;
    }
}
