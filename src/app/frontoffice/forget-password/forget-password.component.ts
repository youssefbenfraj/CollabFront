import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  email: string = '';
  constructor(private authService: AuthService, private toastr: ToastrService) {}

  onSubmit() {
    console.log('Email:', this.email); // Log the email value

    this.authService.forgotPassword(this.email).subscribe(
      () => {
        this.toastr.success('Password reset instructions sent successfully');
        console.log('Password reset instructions sent successfully');
      },
      (error: any) => {
        this.toastr.error('Failed to send password reset instructions');
        console.error('Failed to send password reset instructions:', error);
      }
    );
  }
  
  }
    
  

