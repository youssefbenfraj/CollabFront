import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrl: './delete-profile.component.css'
})
export class DeleteProfileComponent implements OnInit {
  confirmationChecked: boolean = false;


  userData: any;
  constructor(private router: Router ,private userService: UserService, private authService: AuthService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchUserData();
  }
  
  fetchUserData(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      console.log('User data from localStorage:', this.userData);
    }
    
    const userId = this.authService.userId;
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (response) => {
          this.userData = response;
          localStorage.setItem('userData', JSON.stringify(response));
          console.log('User data from API:', this.userData);
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    } 
  }
  onDeleteAccount(): void {
    if (!this.confirmationChecked) {
      console.error('Please confirm deletion by checking the checkbox.');
      this.toastr.error('Please confirm deletion by checking the checkbox.');

      return;
    }

    // Ensure userData contains the user ID
    if (!this.userData || !this.userData.idUser) {
      console.error('User ID is missing in userData');
      return;
    }

    // Retrieve the user ID
    const userId = this.userData.idUser;

    if (userId) {
      this.userService.deleteUser(userId).subscribe(
        (response) => {
          console.log('User account deleted successfully:', response);
          this.toastr.success('User account deleted successfully:');
          this.router.navigate(['/login']);
          
        },
        (error) => {
          console.error('Error deleting user account:', error);
        }
      );
    }
  }
}
