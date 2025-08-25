import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../../Models/iuser';
import { AuthService } from '../../services/auth.service';
import { IAuthSignup } from '../../Models/iauthRes';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userRegisterForm: FormGroup
  signupRes!: IAuthSignup
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {

    this.userRegisterForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.pattern(/^[a-z]{3,20}$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
      gender: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      role: new FormControl('User'),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z]).{8,}$/)]),
      cPassword: new FormControl('', [Validators.required])
    })

  }

  register() {
    const user: IUser = this.userRegisterForm.value as IUser;
    console.log(user);

    this.authService.signup(user).subscribe({
      next: (res) => {
        this.signupRes = res;
        console.log(this.signupRes)
        this.router.navigate(['/login'])

      },
      error: (err) => {
        console.error("Error fetching product:", err);
        console.log(err.error.errMass)
        this.errorMessage=err.error.errMass;
      }
    });

  }

}


