import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // لازم عشان *ngFor و | currency

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products = [
    { id: 1, name: 'Laptop Gold', description: 'This is a Dell laptop', price: 600, image: 'assets/laptop.jpg' },
    { id: 2, name: 'Phone', description: 'This is a phone', price: 6000, image: 'assets/phone.jpg' },
    { id: 3, name: 'Headphones', description: 'Noise cancelling headphones', price: 1200, image: 'assets/headphones.jpg' },
    { id: 4, name: 'Smart Watch', description: 'Track your fitness', price: 2000, image: 'assets/watch.jpg' }
  ];
}

