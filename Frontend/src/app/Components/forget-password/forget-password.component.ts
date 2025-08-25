import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../Models/iuser';
import { IAuthSignin } from '../../Models/iauthRes';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  forgetPasswordForm!: FormGroup;
  codeForm!: FormGroup;
  isLoading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';
  showCodeModal = false;
  emailAddress: string = '';
  signinRes!: IAuthSignin
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
      const user: IUser = { email: this.forgetPasswordForm.get('email')?.value }
      this.emailAddress = this.forgetPasswordForm.get('email')?.value

      this.authService.sendCode(user).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.message = 'Verification code sent to your email successfully! Check your inbox.';
          this.messageType = 'success';
          this.showCodeModal = false;
          this.router.navigate(['/verify-reset'], { queryParams: { email: this.emailAddress } });
        },
        error: (error) => {
          this.isLoading = false;
          this.message = error.error?.errMass || error.error?.message || 'Failed to send verification code. Please try again.';
          this.messageType = 'error';
        }
      });
    }
  }

 

  goToVerify() {
    if (this.emailAddress) {
      this.router.navigate(['/verify-reset'], { queryParams: { email: this.emailAddress } });
    }
  }




  closeCodeModal() {
    this.showCodeModal = false;
    this.codeForm.reset();
  }
  closeModal(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeCodeModal();
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }

  get email() {
    return this.forgetPasswordForm.get('email');
  }
 }
