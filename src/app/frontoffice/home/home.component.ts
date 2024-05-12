import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Call the GitHub OAuth handler method
    this.handleGitHubCallback();
  }
  handleGitHubCallback(): void {
    // Extract the code from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
  
    if (code) {
      // Exchange the GitHub code for an access token
      this.authService.getGitHubAccessToken(code).subscribe(
        (accessTokenResponse: any) => {
          // Use the access token to fetch user data from GitHub
          this.authService.getGitHubUserData(accessTokenResponse.access_token).subscribe(
            (userData: any) => {
              const registerData = {
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                password: userData.email, // Use email as password
                username: userData.email, // Use email as username
              };
  
              // Register the user
              this.authService.register(registerData).subscribe(
                (registrationResponse: any) => {
                  console.log('Registration Response:', registrationResponse);
  
                  // After successful registration, proceed with login
                  this.authService.login(userData.email, userData.email).subscribe( // Use email as both username and password
                    (loginResponse: any) => {
                      console.log('Login Response:', loginResponse);
  
                      // Navigate the user to the home page
                      this.router.navigate(['/home']);
                      this.toastr.success('Registration and Login Successful');
                    },
                    (loginError: any) => {
                      console.error('Login Error:', loginError);
                      this.toastr.error('Login Error');
                    }
                  );
                },
                (registrationError: any) => {
                  console.error('Registration Error:', registrationError);
                  this.toastr.error('Registration Error');
                }
              );
            },
            (userDataError: any) => {
              console.error('Error fetching GitHub user data:', userDataError);
              this.toastr.error('Error fetching GitHub user data');
            }
          );
        },
        (accessTokenError: any) => {
          console.error('Error exchanging GitHub code for access token:', accessTokenError);
          this.toastr.error('Error exchanging GitHub code for access token');
        }
      );
    } else {
      console.error('Error: Code not found in URL');
      this.toastr.error('Error: Code not found in URL');
    }
  }
    
 
}
