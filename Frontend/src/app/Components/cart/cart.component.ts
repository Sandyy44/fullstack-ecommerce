import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  isLoading = false;

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    // Sample cart items for testing
    this.cartItems = [
      {
        id: '1',
        name: 'Gaming Laptop Pro',
        price: 15000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
        stock: 10
      },
      {
        id: '2',
        name: 'Samsung Galaxy S23',
        price: 10000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        stock: 15
      },
      {
        id: '3',
        name: 'Sony Wireless Headphones',
        price: 2500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        stock: 20
      }
    ];
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity > 0 && newQuantity <= item.stock) {
      item.quantity = newQuantity;
    }
  }

  removeItem(itemId: string) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getTotalItems() {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  checkout() {
    // Here you can add checkout logic
    alert('You will be redirected to checkout page');
  }

  continueShopping() {
    // Here you can add logic to return to shopping
    alert('You will be redirected to products page');
  }
}