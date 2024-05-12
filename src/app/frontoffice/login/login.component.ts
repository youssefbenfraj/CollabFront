import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isCaptchaResolved: boolean = false;


  user: SocialUser | undefined;
  loggedIn: boolean | undefined;
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
   
  });
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  google: any;
  constructor(private authService: AuthService,  private formBuilder: FormBuilder,
    private service:UserService,
     private socialAuthService: SocialAuthService,
     private router: Router,
     private ngZone : NgZone,
     private route: ActivatedRoute,
     private toastr: ToastrService,
     private http: HttpClient) {}

     onSubmit() {
      if (this.isCaptchaResolved) {
        this.authService.login(this.username, this.password).subscribe(
          (response: any) => {
            console.log('Login Response:', response);
            if (response && response.roles.includes('STUDENT')) { 
              console.log('Navigating to frontend...');
              this.router.navigate(['/home']);
              this.toastr.success('Login Successful');
            } else if (response.roles.includes('ADMIN')) {
              console.log('Navigating to dashboard...');
              this.router.navigate(['/dashboard']);
              this.toastr.success('Login Successful');
            }
          },
          (error: any) => {
            console.error('Login Error:', error);
            this.toastr.error('Incorrect username or password!');
          }
        );
      } else {
        this.toastr.error('Please verify reCAPTCHA!');
      }
      
    }
    exchangeCodeForAccessToken(code: string) {
      const url = 'http://localhost:8080/api/github/callback'; // Your backend endpoint
      return this.http.get<any>(`${url}?code=${code}`);
    }
    
    getUserDetails(accessToken: string) {
 
      return of({ email: 'test@example.com', firstName: 'John', lastName: 'Doe' }); // Mock user data
    }
    onCaptchaResolved(captchaResponse: string | null) {
      if (captchaResponse !== null) {
        console.log('reCAPTCHA resolved with response:', captchaResponse);
        this.isCaptchaResolved = true;
      }
    }
  
    
    
    signInWithFB(): void {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
        (userData: SocialUser) => {
          // Handle successful sign-in with Facebook
          console.log('Facebook user signed in: ', userData);
      
          const registerData = {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: userData.email,
            username: userData.email, 
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
        (error: any) => {
          // Handle sign-in error with Facebook
          console.error('Error signing in with Facebook: ', error);
          this.toastr.error('Error signing in with Facebook');
        }
      );
    }
    

    
    
    
  applyValidationStyles() {
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach((form: any) => {
      form.addEventListener('submit', (event: Event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      });
    });
  }
  ngOnInit() {
    this.applyValidationStyles();
  

}

handleCredentialResponse1(response: any) {
  console.log('Encoded JWT ID token:', response.credential);
 
}

ngAfterViewInit() {
    // Render Google Sign-In button
    this.google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      { theme: "outline", size: "large" } // customize as needed
    );
}

handleCredentialResponse(response: any) {
  console.log('handleCredentialResponse called with response:', response);

  if (response && response.credential) {
      const credential = response.credential;
      const jwtToken = response.credential;
      console.log('Encoded JWT ID token:', jwtToken);

      // Assuming you have the token stored in a variable called 'googleToken'
      this.authService.validateToken(jwtToken).subscribe(
          (validationResponse: any) => {
              if (validationResponse.valid) {
                  // Register the user with the received credential
                  this.authService.register(credential).subscribe(
                      (registrationResponse: any) => {
                          console.log('Registration Response:', registrationResponse);

                          // If registration is successful, log in the user using the same credential
                          this.authService.login(credential.username, credential.password).subscribe(
                              (loginResponse: any) => {
                                  console.log('Login Response:', loginResponse);

                                  // Navigate the user to the home page
                                  this.router.navigate(['/home']);
                                  this.toastr.success('Login Successful');
                              },
                              (loginError: any) => {
                                  console.error('Login Error:', loginError);
                              }
                          );
                      },
                      (registrationError: any) => {
                          console.error('Registration Error:', registrationError);
                          this.toastr.error('Registration Error');
                      }
                  );
              } else {
                  console.error('Token validation failed:', validationResponse.error);
                  this.toastr.error('Token validation failed');
              }
          },
          (validationError: any) => {
              console.error('Token validation error:', validationError);
              this.toastr.error('Token validation error');
          }
      );
  } else {
      console.error('Credential not received:', response);
      this.toastr.error('Credential not received');
  }
}



 

  passwordVisible: boolean = false;  // Keeps track of password visibility

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  }
  



