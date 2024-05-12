import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'] // Use styleUrls instead of styleUrl
})
export class ResetPasswordComponent implements OnInit
 {
  token: string = ''; // Define token property
  newPassword: string = ''; // Define newPassword property
  confirmPassword: string = ''; // Define confirmPassword property

  constructor(private authService: AuthService, 
    private route: ActivatedRoute,private toastr: ToastrService) {}
  ngOnInit(): void {
    // Get the token from the query parameters in the URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }
  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.toastr.error('Passwords do not match');

      console.error('Passwords do not match');
      return;
    }
    this.authService.resetPassword(this.token, this.newPassword).subscribe(
      response => {
        this.toastr.success('Password reset successfully');

        console.log('Password reset successful!');
      },
      error => {
        this.toastr.error('Failed to reset password:');

        console.error('Failed to reset password:', error);
      }
    );
  }
  newPasswordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  // Toggles for each password field
  toggleNewPasswordVisibility(): void {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }
}
