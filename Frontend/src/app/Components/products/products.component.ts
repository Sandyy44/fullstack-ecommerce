import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  rating: number;
  discount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';
  searchTerm: string = '';
  sortBy: string = 'name';
  isLoading = false;

  ngOnInit() {
    this.loadProducts();
    this.filteredProducts = [...this.products];
  }

  // ... inside class ProductsComponent
  hasDetails(p: Product): boolean {
    return ['1', '2', '3', '4'].includes(p.id);
  }

  loadProducts() {
    this.products = [
      {
        id: '1',
        name: 'MacBook Pro M3',
        description: 'Latest laptop from Apple with powerful M3 processor, 16GB RAM, 512GB SSD, 14-inch Retina display',
        price: 45000,
        stock: 15,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop',
        category: 'Laptops',
        rating: 4.8,
        discount: 10,
        isNew: true,
        isFeatured: true
      },
      {
        id: '2',
        name: 'iPhone 15 Pro Max',
        description: 'Latest smartphone from Apple with 48MP camera, A17 Pro processor, 6.7-inch display',
        price: 38000,
        stock: 25,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=400&fit=crop',
        category: 'Smartphones',
        rating: 4.9,
        isFeatured: true
      },
      {
        id: '3',
        name: 'Sony WH-1000XM5',
        description: 'Wireless headphones with noise cancellation, exceptional sound, 30-hour battery life',
        price: 8500,
        stock: 30,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop',
        category: 'Audio',
        rating: 4.7,
        discount: 15
      },
      {
        id: '4',
        name: 'iPad Pro 12.9"',
        description: 'Professional tablet with M2 processor, Liquid Retina XDR display, Apple Pencil support',
        price: 28000,
        stock: 12,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=400&fit=crop',
        category: 'Tablets',
        rating: 4.6,
        isNew: true
      },
      {
        id: '5',
        name: 'Apple Watch Series 9',
        description: 'Smartwatch with advanced health tracking, Always-On display, built-in GPS',
        price: 12000,
        stock: 20,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=400&fit=crop',
        category: 'Wearables',
        rating: 4.5
      },
      {
        id: '6',
        name: 'Canon EOS R6 Mark II',
        description: 'Professional camera with 24.2MP sensor, 4K video recording, built-in image stabilization',
        price: 35000,
        stock: 8,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=400&fit=crop',
        category: 'Cameras',
        rating: 4.8,
        discount: 20
      },
      {
        id: '7',
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Smartphone with S Pen, 200MP camera, Snapdragon 8 Gen 3 processor',
        price: 32000,
        stock: 18,
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=400&fit=crop',
        category: 'Smartphones',
        rating: 4.7,
        isNew: true
      },
      {
        id: '8',
        name: 'Dell XPS 13 Plus',
        description: 'Premium laptop with Intel Core i7 processor, 32GB RAM, 13.4-inch OLED display',
        price: 42000,
        stock: 10,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=400&fit=crop',
        category: 'Laptops',
        rating: 4.6,
        discount: 12
      },
      {
        id: '9',
        name: 'AirPods Pro 2',
        description: 'Wireless earbuds with improved noise cancellation, spatial audio, water resistant',
        price: 6500,
        stock: 35,
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf0?w=500&h=400&fit=crop',
        category: 'Audio',
        rating: 4.8,
        isFeatured: true
      },
      {
        id: '10',
        name: 'Microsoft Surface Pro 9',
        description: '2-in-1 tablet with Intel Core i7 processor, 16GB RAM, 13-inch display',
        price: 25000,
        stock: 14,
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=400&fit=crop',
        category: 'Tablets',
        rating: 4.5
      },
      {
        id: '11',
        name: 'GoPro Hero 11 Black',
        description: 'Action camera with 27MP sensor, 5.3K video recording, water resistant',
        price: 9500,
        stock: 22,
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=400&fit=crop',
        category: 'Cameras',
        rating: 4.7,
        discount: 18
      },
      {
        id: '12',
        name: 'Garmin Fenix 7',
        description: 'Advanced sports watch with built-in GPS, sleep tracking, water resistant',
        price: 15000,
        stock: 16,
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=400&fit=crop',
        category: 'Wearables',
        rating: 4.6
      }
    ];

    // Extract categories
    this.categories = ['all', ...new Set(this.products.map(p => p.category))];
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    this.sortProducts();
  }

  sortProducts() {
    switch (this.sortBy) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
      default:
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  onCategoryChange() {
    this.filterProducts();
  }

  onSearchChange() {
    this.filterProducts();
  }

  onSortChange() {
    this.sortProducts();
  }

  addToCart(product: Product) {
    // Here you can add logic to add product to cart
    alert(`${product.name} has been added to cart!`);
  }

  getDiscountedPrice(product: Product): number {
    if (product.discount) {
      return product.price - (product.price * product.discount / 100);
    }
    return product.price;
  }

  getStarRating(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆');
    }
    return stars;
  }
}