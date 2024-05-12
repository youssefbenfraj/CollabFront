import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {


  userData: any;
  options = ['DS', 'Infini', 'ERP-BI', 'GL', 'SIM', 'TWIN', 'SLEAM', 'NIDS', 'SE', 'ArcTIC', 'Commun'];
  levels: string[] = ['1', '2', '3A', '3B', '4', '5'];
  classNumbers: number[] = Array.from({ length: 70 }, (_, i) => i + 1);

  constructor(private userService: UserService,
     private authService: AuthService) {}

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

  updateUser(): void {
    console.log('Update user function called');
  
    // Ensure userData contains the user ID
    if (!this.userData || !this.userData.idUser) {
      console.error('User ID is missing in userData');
      return;
    }
  
    // Retrieve the user ID
    const userId = this.userData.idUser;
  
    // Make sure the user ID is valid
    if (!userId) {
      console.error('User ID is invalid');
      return;
    }
  
    // Send the update request
    this.userService.updateUser(userId, this.userData).subscribe(
      (response) => {
        console.log('User data updated successfully:', response);
        
        // Check if the message indicates successful update
        if (response && response.message === 'User updated successfully!') {
          // Optionally, fetch the updated user data
          this.fetchUpdatedUserData();
        } else {
          console.error('Error updating user profile:', response);
        }
      },
      (error) => {
        console.error('Error updating user profile:', error);
      }
    );
  }
  
  // Method to fetch updated user data
  fetchUpdatedUserData(): void {
    const userId = this.userData.idUser;
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (response) => {
          // Update userData object with the updated data
          this.userData = response;
          localStorage.setItem('userData', JSON.stringify(response));
          console.log('Updated userData stored in localStorage:', this.userData);
        },
        (error) => {
          console.error('Error fetching updated user data:', error);
        }
      );
    }
  }
  
  
}
