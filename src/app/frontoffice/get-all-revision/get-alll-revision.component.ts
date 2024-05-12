import { Component, OnInit } from '@angular/core';
 import { Revision } from '../../../models/revision.model';
 import { RevisionService } from '../../services/revision.service';
 import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-get-alll-revision',
  templateUrl: './get-alll-revision.component.html',
  styleUrl: './get-alll-revision.component.css'
})
export class GetAlllRevisionComponent implements OnInit  {
  revisions: Revision[] = [];
  newRevision: Revision = {} as Revision;
  selectedRevision: Revision | null = null;
  displayedRevisions: Revision[] = [];
  startIndex = 0;
  batchSize = 1; // Nombre de révisions à afficher à chaque fois
  showAllRevisions = false;
  pagedRevisions: Revision[] = [];
  currentPage: number = 1;
    userData: any;
  itemsPerPage: number = 5; // Nombre d'éléments par page
  currentUser: { id: number } | null = null;   
 
  constructor(private revisionService: RevisionService, public dialog: MatDialog) {} // Injectez MatDialog

 
  ngOnInit(): void {
    this.getCurrentUser();
    if (this.currentUser && this.currentUser.id) {
      this.revisionService.getRevisionsByUserId(this.currentUser.id).subscribe(
        data => {
          this.revisions = data;
        },
        error => {
          console.log('Error:', error);
        }
      );
    }
  }
  getCurrentUser(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        console.log('current user: from get', userData);
        
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
  
  loadRevisionsA(): void {
    this.revisionService.getAllRevisions().subscribe(revisions => {
      this.revisions = revisions;
      this.updatePage();
    });
  }
  loadRevisions(): void {
    // Obtenir l'utilisateur actuel
    this.getCurrentUser();
  
    // Charger les révisions
    this.revisionService.getAllRevisions().subscribe(revisions => {
      this.revisions = revisions;
      this.updatePage();
    });
  }
  
  
  /*loadRevisions(): void {
    this.revisionService.getAllRevisions().subscribe(revisions => {
      this.revisions = revisions;
      this.updatePage();
    });
  } */
 // Assurez-vous que vous avez correctement initialisé this.currentUser dans votre composant

getAllRevisionsForCurrentUser(): void {
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      console.log('current user:', userData);
      
      if ('idUser' in userData) {
          const userId = userData.idUser;
          console.log('User ID for rv:', userId);
          
          // Maintenant, vous avez l'ID de l'utilisateur, vous pouvez appeler votre service pour récupérer les révisions
          this.revisionService.getAllRevisionsForUser(userId)
            .subscribe(revisions => {
              // Faites quelque chose avec les révisions obtenues
              console.log('Revisions for current user:', revisions);
            });
      } else {
          console.log('No user ID found in userData');
      }
  } else {
      console.log('No user data found in localStorage');
  }
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
  goToPage(page: number) {
    this.currentPage = page;
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
    this.revisionService.addRevision(this.newRevision).subscribe((newRevision) => {
      this.revisions.push(newRevision);
      this.newRevision = {} as Revision; // Réinitialise le formulaire
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

  
  loadRevisionsAA(): void {
    if (this.currentUser && this.currentUser.id) {
      // Charger toutes les révisions
      this.revisionService.getAllRevisions().subscribe(revisions => {
        // Filtrer les révisions pour ne garder que celles de l'utilisateur actuel
        this.revisions = revisions.filter(revision => 
          revision.user && revision.user.idUser === this.currentUser?.id
        );
        this.updatePage();
      });
    } else {
      console.log('No user data found.');
    }
  }
  
  // Méthode pour charger les révisions de l'utilisateur connecté
  loadUserRevisions(userId: number): void {
    this.revisionService.getAllRevisions1(userId).subscribe(
      (revisions: Revision[]) => {
        this.revisions = revisions;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des révisions de l\'utilisateur : ', error);
      }
    );
  }
  
}
