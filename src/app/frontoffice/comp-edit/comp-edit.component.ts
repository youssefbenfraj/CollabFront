import { Component,OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';

import { Complaint } from '../../models/complaint.model';
import { Traitement } from '../../models/traitement.model';
import { ComplaintService } from '../../services/complaint.service';


@Component({
  selector: 'app-comp-edit',
  templateUrl: './comp-edit.component.html',
  styleUrls: ['./comp-edit.component.css']
})
export class CompEditComponent implements OnInit{
  selectedComplaint: Complaint | null = null;
  isWithinTimeLimit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private complaintService: ComplaintService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convertir l'ID en nombre
      if (id) {
        this.complaintService.getComplaintById(id).subscribe(
          (complaint: Complaint) => {
            this.selectedComplaint = complaint;
            this.checkTimeLimit(); // Vérifier la contrainte de temps au chargement du composant
          },
          (error) => {
            console.error('Error fetching complaint details:', error);
          }
        );
      }
    });
  }

  checkTimeLimit(): void {
    if (this.selectedComplaint) {
      const creationDate = new Date(this.selectedComplaint.dateComplaint); // Date de création de la réclamation
      const currentDate = new Date(); // Date actuelle
      const timeDiff = currentDate.getTime() - creationDate.getTime(); // Différence de temps en millisecondes

      // Limite de 24 heures (en millisecondes)
      const timeLimit = 24 * 60 * 60 * 1000; // 24 heures * 60 minutes * 60 secondes * 1000 millisecondes

      this.isWithinTimeLimit = timeDiff <= timeLimit; // Mettre à jour le statut de la contrainte de temps
    }
  }

  updateComplaint(complaint: Complaint): void {
    if (!complaint || !this.isWithinTimeLimit) {
      console.error('La modification de la réclamation n\'est pas autorisée après 24 heures.');
      // Afficher un message d'erreur ou rediriger l'utilisateur
      return;
    }

    this.complaintService.updateComplaint(complaint.idComplaint, complaint).subscribe(
      (updatedComplaint: Complaint) => {
        console.log('Complaint updated successfully:', updatedComplaint);
        this.navigateToListPage(); // Rediriger vers la liste des réclamations après la mise à jour
      },
      (error) => {
        console.error('Error updating complaint:', error);
      }
    );
  }

  navigateToListPage(): void {
    // Utiliser le router pour naviguer vers la page list
    this.router.navigate(['/listc']);
  }

}
