import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IAuthForgetPassword, IAuthSignin } from '../../Models/iauthRes';
import { IUser } from '../../Models/iuser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  signinRes!: IAuthSignin
  userLoginForm: FormGroup
  errorMessage: string = '';
  constructor(private router: Router, private authService: AuthService) {



    this.userLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]),
      password: new FormControl('', [Validators.required]),
    })
  }



  login() {

    const user: IUser = this.userLoginForm.value as IUser;
    console.log(user);

    this.authService.signin(user).subscribe({
      next: (res) => {
        this.signinRes = res;
        localStorage.setItem('token', res.token);
        localStorage.setItem('refresh_token', res.refresh_token);
        console.log(this.signinRes)
        this.router.navigate(['/product'])
      },
      error: (err) => {
        console.error("Error fetching product:", err);
        console.log(err.error.errMass)
        this.errorMessage = "The email or password you entered is incorrect.";
      }
    });




  }

}