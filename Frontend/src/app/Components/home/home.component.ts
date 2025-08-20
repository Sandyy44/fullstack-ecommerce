import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  isNew?: boolean;
  discount?: number;
}

interface Category {
  name: string;
  image: string;
  count: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('categoriesSection') categoriesSection!: ElementRef<HTMLElement>;

  featuredProducts: Product[] = [];
  categories: Category[] = [];

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.loadCategories();
  }

  private getHeaderOffset(): number {
    const header = document.querySelector('app-navbar') as HTMLElement | null;
    return header ? header.offsetHeight + 8 : 0;
  }

  scrollToCategories(): void {
    setTimeout(() => {
      const el = this.categoriesSection?.nativeElement || document.getElementById('categories');
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.pageYOffset - this.getHeaderOffset();
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 0);
  }

  loadFeaturedProducts(): void {
    this.featuredProducts = [
      {
        id: '1',
        name: 'MacBook Pro M3',
        description: 'Latest laptop with powerful M3 processor',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
        rating: 4.8,
        isNew: true
      },
      {
        id: '2',
        name: 'iPhone 15 Pro Max',
        description: 'Premium smartphone with advanced camera',
        price: 38000,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
        rating: 4.9,
        discount: 10
      },
      {
        id: '3',
        name: 'Sony WH-1000XM5',
        description: 'Premium noise-canceling headphones',
        price: 8500,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        rating: 4.7,
        discount: 15
      },
      {
        id: '4',
        name: 'iPad Pro 12.9"',
        description: 'Professional tablet for creative work',
        price: 28000,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
        rating: 4.6,
        isNew: true
      }
    ];
  }

  loadCategories(): void {
    this.categories = [
      {
        name: 'Laptops',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop',
        count: 25
      },
      {
        name: 'Smartphones',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
        count: 30
      },
      {
        name: 'Audio',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
        count: 20
      },
      {
        name: 'Tablets',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop',
        count: 15
      }
    ];
  }

  getStarRating(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) stars.push('★');
    if (hasHalfStar) stars.push('☆');
    while (stars.length < 5) stars.push('☆');
    return stars;
  }

  getOriginalPrice(product: Product): number {
    if (product.discount) {
      return Math.round(product.price / (1 - product.discount / 100));
    }
    return product.price;
  }
}