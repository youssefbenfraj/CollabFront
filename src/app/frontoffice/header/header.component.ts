import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userData: any;

  constructor(private userService: UserService,private authService: AuthService,private router: Router ,private toastr: ToastrService) {}
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
  logout(): void {
    this.authService.logout().subscribe(
      () => {
        console.log('Logged out successfully');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Logout error:', error);
      }
    );
  }
}
