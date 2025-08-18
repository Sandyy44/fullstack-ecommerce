import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  login() {
    // مثال تجريبي
    if (this.username !== 'admin' || this.password !== '123') {
      this.errorMessage = 'Invalid credentials';
    } else {
      this.errorMessage = '';
      alert('Logged in successfully!');
    }
  }
}
