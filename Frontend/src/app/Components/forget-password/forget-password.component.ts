import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  forgetPasswordForm!: FormGroup;
  isLoading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgetPasswordForm.valid) {
      this.isLoading = true;
      const email = this.forgetPasswordForm.get('email')?.value;
      
      this.userService.sendForgetPasswordCode(email).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.message = 'Verification code sent to your email successfully! Check your inbox.';
          this.messageType = 'success';
        },
        error: (error) => {
          this.isLoading = false;
          this.message = error.error?.errMass || error.error?.message || 'Failed to send verification code. Please try again.';
          this.messageType = 'error';
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  get email() {
    return this.forgetPasswordForm.get('email');
  }
}
