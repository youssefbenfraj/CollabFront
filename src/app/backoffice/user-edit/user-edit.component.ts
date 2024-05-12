import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userEdit: any = { 
    idUser: 0,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    birthdate: '', 
    classNumber: 0,
    description: '',
    level: '',
    major: '',
    facebookUsername: '',
    instagramUsername: '',
    youtubeProfileUrl: '',
    linkedinProfileUrl: '',
    events: [],
    complaints: [],
    revisions: [],
    exchanges: [],
    documents: []
};
  options = ['DS', 'Infini', 'ERP-BI', 'GL', 'SIM', 'TWIN', 'SLEAM', 'NIDS', 'SE', 'ArcTIC', 'Commun'];
  levels: string[] = ['1', '2', '3A', '3B', '4', '5'];
  classNumbers: number[] = Array.from({ length: 70 }, (_, i) => i + 1); 
   constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['userId']; // Assuming you're passing userId in the route
    this.userService.getUserById(userId).subscribe(
      (userData) => {
        this.userEdit = userData;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  updateUser(): void {
    // Call your service method to update the user
    this.userService.updateUser(this.userEdit.idUser, this.userEdit).subscribe(
      (updatedUserData) => {
        console.log('User updated successfully:', updatedUserData);
        this.toastr.success('User  successfully', 'Success');
      },
      (error) => {
       
        this.toastr.error('Failed to update user', 'Error');

        console.error('Error updating user:', error);
      }
    );
  }
  
}
