import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = [
    {
      name: 'Laptop Dell',
      description: 'Core i7, 16GB RAM, 512GB SSD',
      price: 25000,
      stock: 5,
      image: 'assets/images/laptop.jpg'
    },
    {
      name: 'Smartphone Samsung',
      description: 'Galaxy S23 Ultra, 256GB',
      price: 32000,
      stock: 8,
      image: 'assets/images/phone.jpg'
    },
    {
      name: 'Headphones Sony',
      description: 'Noise Cancelling Wireless',
      price: 6000,
      stock: 0,
      image: 'assets/images/headphones.jpg'
    },
    {
      name: 'Smartwatch Apple',
      description: 'Series 9, 45mm, GPS',
      price: 18000,
      stock: 3,
      image: 'assets/images/watch.jpg'
    },
    {
      name: 'Tablet iPad',
      description: 'iPad Pro M2, 128GB',
      price: 22000,
      stock: 4,
      image: 'assets/images/ipad.jpg'
    },
    {
      name: 'Camera Canon',
      description: 'EOS 90D DSLR, 24.1MP',
      price: 27000,
      stock: 2,
      image: 'assets/images/camera.jpg'
    }
  ];
}
