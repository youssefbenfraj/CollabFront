import { Component ,OnInit} from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint } from '../../models/complaint.model';
import { Traitement } from '../../models/traitement.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-comp-add',
  templateUrl: './comp-add.component.html',
  styleUrls: ['./comp-add.component.css']
})
export class CompAddComponent implements OnInit {
  userData: any;

  currentUser: { id: number } | null = null; 
 
  newComplaint: Complaint = {
     

    idComplaint: 0,
    dateComplaint: new Date(),
    comment: '',
    traitement: null,
    createdDate: new Date(),

  };

  traitementValues = Object.values(Traitement);

  constructor(private router: Router, private complaintService: ComplaintService,) { }
  ngOnInit(): void {
    this.newComplaint.dateComplaint = new Date();
    this.getCurrentUser();

  }

  //addComplaint(): void {
    //this.complaintService.addComplaint(this.newComplaint).subscribe(
     // (addedComplaint: Complaint) => {
       // console.log('Complaint added successfully:', addedComplaint);
        //this.router.navigate(['/listc']);
      //},
      //(error) => {
        //console.error('Error adding complaint:', error);
      //}
    //);
 // }
 addComplaint(complaint: Complaint): void {
  if (!this.currentUser) {
    console.error('No user logged in');
    return;
  }


  const complaintData = {
    userId: this.currentUser.id,  
    comment: complaint.comment,
    traitement: complaint.traitement || 'NONTRAITE',  
  };

  this.complaintService.addComplaint(complaintData).subscribe({
    next: (response) => {
      console.log('Complaint added successfully', response);
      this.router.navigate(['/listc']); 
    },
    error: (error) => {
      console.error('Failed to add complaint', error);
    }
  });
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
  

 
  getCurrentDate(): string {
    return new Date().toISOString().substring(0, 10); // Format: YYYY-MM-DD
  }

}
