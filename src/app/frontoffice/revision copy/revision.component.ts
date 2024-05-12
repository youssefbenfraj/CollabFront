import { Component, OnInit } from '@angular/core';
//import { RevisionService } from '../revision.service';
import { Revision } from '../../../models/revision.model';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
//import { PopupMComponent } from '../popup-m/popup-m.component';
import { ToastrService } from 'ngx-toastr';
import { RevisionService } from '../../services/revision.service';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css'],
})
export class RevisionComponent implements OnInit {
   revisions: Revision[] = [];
  newRevision: Revision = {} as Revision;
  selectedRevision: Revision | null = null;
  displayedRevisions: Revision[] = [];
  startIndex = 0;
  batchSize = 1; // Nombre de révisions à afficher à chaque fois
  showAllRevisions = false;
  pagedRevisions: Revision[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; // Nombre d'éléments par page
//Pour timeer Pomodoro
timer: any;
showAlert: boolean = false;
   constructor(private revisionService: RevisionService, public dialog: MatDialog, private toastr: ToastrService
   ) {} // Injectez MatDialog

  ngOnInit(): void {
    this.loadRevisions();
  }

  //Pomodoro
  

  /*openUpdateRevisionPopup(revision: Revision | null): void {
    const dialogRef = this.dialog.open(PopupMComponent, {
      width: '500px',
      data: { revision } // Passer la révision au popup, ou null si aucune révision n'est sélectionnée
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Popup fermé', result);
      // Mettre à jour les données ou effectuer d'autres actions si nécessaire
    });
  }
  */
  
  loadRevisions(): void {
    this.revisionService.getAllRevisions().subscribe(revisions => {
      this.revisions = revisions;
      this.updatePage();
    });
  }
  openAddRevisionPopup(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '500px' // Définissez la largeur du popup selon vos préférences
    });

    // Vous pouvez écouter les événements du popup si nécessaire
    dialogRef.afterClosed().subscribe(result => {
      console.log('Popup fermé', result);
      // Mettre à jour les données ou effectuer d'autres actions si nécessaire
    });
  }

 

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.revisions.length);
    this.pagedRevisions = this.revisions.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.revisions.length / this.itemsPerPage);
  }
  addRevision(): void {
    this.revisionService.addRevision(this.newRevision).subscribe({
      next: (newRevision) => {
        this.revisions.push(newRevision);
        this.newRevision = {} as Revision; // Réinitialise le formulaire
        this.showAlert = true;
        setTimeout(() => this.showAlert = false, 3000); // Cache l'alerte après 3 secondes
        this.toastr.success('Login Successful');

      },
      
    });
  }
  addRevision44(): void {
    this.revisionService.addRevision(this.newRevision).subscribe((newRevision) => {
      this.revisions.push(newRevision);
      this.newRevision = {} as Revision; // Réinitialise le formulaire
      this.toastr.success('Login Successful');

      
    });
 
  }
  addRevision2(): void {
    this.revisionService.addRevision(this.newRevision).subscribe((newRevision) => {
      this.revisions.push(newRevision);
      this.newRevision = {} as Revision; // Réinitialise le formulaire
      this.showAlert = true; // Affiche l'alerte après l'ajout réussi
    });
  }
  updateRevision(revision: Revision): void {
    this.revisionService.updateRevision(revision.idRev, revision).subscribe((updatedRevision) => {
      const index = this.revisions.findIndex((r) => r.idRev === updatedRevision.idRev);
      if (index !== -1) {
        this.revisions[index] = updatedRevision;
        this.selectedRevision = null; // Cache le formulaire après la mise à jour
      }
    });
  }   
 
  deleteRevision(id: number): void {
    this.revisionService.deleteRevision(id).subscribe(() => {
      // Filtrer les révisions supprimées de pagedRevisions
      this.pagedRevisions = this.pagedRevisions.filter((r) => r.idRev !== id);
  
      // Mettre à jour également la liste complète des révisions si nécessaire
      this.revisions = this.revisions.filter((r) => r.idRev !== id);
    });
  }
  

  selectRevision(revision: Revision): void {
    this.selectedRevision = revision;
  }

}
