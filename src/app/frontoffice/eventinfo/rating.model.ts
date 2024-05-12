export interface Rating {
    idR: number;
    valueR: number;
    event: {
      idEvent: number;
      // Add other properties of the Event object as needed
    };
    user: {
imageUser: any;
lastName: any;
firstName: any;
      idUser: number;
      // Add other properties of the User object as needed
    };
  }
  