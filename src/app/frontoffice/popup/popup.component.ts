import { Component, OnInit } from '@angular/core';
import { PopupService } from './popup.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Revision } from '../../../models/revision.model';
  import { RevisionService } from '../../services/revision.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  template: `
    <button (click)="openPopup()">Open Popup</button>
  `,
    templateUrl: './popup.component.html',

})
export class PopupComponent implements OnInit {
  newRevision: Revision = {} as Revision;
  userData: any;
  currentUser: { id: number } | null = null;   
  
  constructor(private popupService: PopupService,
    private toastr: ToastrService,
    private router: Router,

    public dialogRef: MatDialogRef<PopupComponent>,
    private revisionService: RevisionService) {}
    ngOnInit(): void {
      this.getCurrentUser();
    }
  openPopup() {
    this.popupService.openPopupA();
  }
  closePopup() {
    this.dialogRef.close();
  }
getCurrentUser1(): void {
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      console.log('current user:', this.userData);
      
      if ('idUser' in this.userData) {
          const userId = this.userData.idUser; // Extracting idUser from userData
          console.log('User ID:', userId);
          // Assigning idUser to currentUser.id
          this.currentUser = { id: userId }; // assuming currentUser is of type User
      } else {
          console.log('No user ID found in userData');
      }
  } else {
      console.log('No user data found in localStorage');
  }
}

getCurrentUser(): void {
const storedUserData = localStorage.getItem('userData');
if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    console.log('current user:', userData);
    
    if ('idUser' in userData) {
        const userId = userData.idUser;
        console.log('User ID:', userId);
        this.currentUser = { id: userId };
    } else {
        console.log('No user ID found in userData');
    }
} else {
    console.log('No user data found in localStorage');
}
}

addRevision() {
 // Vérifie si currentUser est défini et si currentUser.id est également défini
if (this.currentUser && this.currentUser.id) {
  const revisionData = {
    userId: this.currentUser.id,
    sujetRev: this.newRevision.sujetRev,
    objectif: this.newRevision.objectif,
    date_debut: this.newRevision.date_debut 
    
  };
  this.toastr.success('Revision added successfully');

  this.closePopup();

  this.revisionService.addRevision(revisionData).subscribe(
    response => {
      console.log('Révision ajoutée avec succès §§§§!', response);
    },
    error => {
      console.error('Erreur lors de l\'ajout de la révision :', error);
    }
  );
} else {
  console.error('L\'utilisateur actuel est null ou son ID est null.');
}
}

  addRevisionAN(): void {
    this.revisionService.addRevision(this.newRevision).subscribe((newRevision) => {
      // Fermer le popup et renvoyer la nouvelle révision ajoutée au composant parent
      this.dialogRef.close(newRevision);
      this.toastr.success('Login Successful');

    });
  }
  onSubmit(idUser: number): void {
    
  
    // Call the addEvent service function with the idUser parameter
    this.revisionService.addRevisionid(this.newRevision, idUser).subscribe(
      (addedEvent: any) => {
        console.log('Event added:', addedEvent);
        this.toastr.success('Event added successfully');
             //   this.assignEventToUser(idUser, addedEvent.idEvent);
             //   this.loadEvents();
                this.router.navigate(['/events']);
      },
      (error) => {
        console.error('Failed to add event:', error);
        this.toastr.error('Failed to add event. Please try again later.');
      }
    );
  }

  addRevision1() {
    const revisionData = {
      userId: 1, // Remplacez par l'ID de l'utilisateur réel
      sujetRev: 'Sujet de révision',
      objectif: 'Objectif de révision',
      date_debut: '2024-05-05' // Format de date yyyy-MM-dd
    };

    this.revisionService.addRevision(this.newRevision).subscribe((newRevision) => {
        console.log('Révision ajoutée avec succès:', newRevision);
        // Gérer la réponse ou rediriger vers une autre page, etc.
        this.dialogRef.close(newRevision);
        this.toastr.success('Login Successful');
      },
      error => {
        console.error('Erreur lors de l\'ajout de la révision:', error);
        // Gérer l'erreur, afficher un message d'erreur à l'utilisateur, etc.
         this.toastr.success('Login Successful');
      }
      
    );
  }
  addRevision11() {
    const revisionData = {
      userId: 1, // Remplacez par l'ID de l'utilisateur réel
      sujetRev: 'Sujet de révision',
      objectif: 'Objectif de révision',
      date_debut: '2024-05-05' // Format de date yyyy-MM-dd
    };

    this.revisionService.addRevision(revisionData).subscribe(
      response => {
        console.log('Révision ajoutée avec succès:', response);
        // Gérer la réponse ou rediriger vers une autre page, etc.
      },
      error => {
        console.error('Erreur lors de l\'ajout de la révision:', error);
        // Gérer l'erreur, afficher un message d'erreur à l'utilisateur, etc.
      }
    );
  }

}
