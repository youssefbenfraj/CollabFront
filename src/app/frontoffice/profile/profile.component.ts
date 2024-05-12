import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User;  // The user property is declared as non-nullable but no initial value is provided
  badges = [
    { name: 'Nerd', imageUrl: 'http://localhost:8087/uploads/Nerd.png', threshold: 96 },
    { name: 'Performer', imageUrl: 'http://localhost:8087/uploads/Preformer.png', threshold: 48 },
    { name: 'Acrobat', imageUrl: 'http://localhost:8087/uploads/Acrobat.png', threshold: 24 },
    { name: 'Ice Breaker', imageUrl: 'http://localhost:8087/uploads/icebreaker.png', threshold: 12 },
    { name: 'Amateur', imageUrl: 'http://localhost:8087/uploads/Amateur.png', threshold: 4 },
    { name: 'Newbie', imageUrl: 'http://localhost:8087/uploads/Newbie.png', threshold: 1 },
  
];
  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUserData();
  }
  
  fetchUserData(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.user = JSON.parse(storedUserData);
      console.log('User data from localStorage:', this.user);
      if (!this.user.badge) { 
        this.fetchUserData(); 
    }
    }

    const userId = this.authService.userId; // Make sure this value is being correctly set
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (response) => {
          this.user = response;
          localStorage.setItem('userData', JSON.stringify(response));
          console.log('User data from API:', this.user);
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    } 
  }
}
