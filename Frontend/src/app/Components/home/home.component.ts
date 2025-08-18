import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component'; // استيراد الـ Navbar

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent], // 👈 هنا ضفنا Navbar
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products = [
    { id: 1, name: 'Laptop', description: 'This is a Dell laptop', price: 600, image: 'assets/laptop.jpg' },
    { id: 2, name: 'Phone', description: 'This is a phone', price: 6000, image: 'assets/phone.jpg' }
  ];
}

