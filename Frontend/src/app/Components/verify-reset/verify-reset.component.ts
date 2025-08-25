import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../Models/iuser';

@Component({
  selector: 'app-verify-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify-reset.component.html',
  styleUrls: ['./verify-reset.component.css']
})
export class VerifyResetComponent {
  form!: FormGroup;
  email: string = '';
  isSubmitting = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    this.form = this.fb.group({
      code: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z]).{8,}$/)]],
      cPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const p = group.get('password')?.value;
    const c = group.get('cPassword')?.value;
    return p === c ? null : { passwordMismatch: true };
  }

  submit() {
    if (this.form.invalid || !this.email) {
      this.form.markAllAsTouched();
      if (!this.email) {
        this.message = 'Missing email. Return to Forgot Password to start again.';
        this.messageType = 'error';
      }
      return;
    }

    this.isSubmitting = true;
    const body: IUser = {
      email: this.email,
      code: this.form.get('code')?.value,
      password: this.form.get('password')?.value,
      cPassword: this.form.get('cPassword')?.value
    } as any;

    this.authService.forgetPassword(body).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.message = 'Password reset successfully. Redirecting to login...';
        this.messageType = 'success';
         localStorage.setItem('token', res.token);
          localStorage.setItem('refresh_token', res.refresh_token);
        setTimeout(() => this.router.navigate(['/profile']), 1200);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.message = err.error?.message || 'Invalid code. Please try again.';
        this.messageType = 'error';
      }
    });
  }

  backToForgot() {
    this.router.navigate(['/forget-password']);
  }
}
