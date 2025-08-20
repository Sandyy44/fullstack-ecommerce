import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

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
  images: string[];
  specifications: { [key: string]: string };
  reviews: Review[];
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product = {
    id: '',
    name: 'Loading...',
    description: '',
    price: 0,
    stock: 0,
    image: '',
    category: '',
    rating: 0,
    images: [],
    specifications: {},
    reviews: []
  };
  selectedImage: string = '';
  quantity: number = 1;
  selectedSize: string = '';
  selectedColor: string = '';
  isLoading = false;
  activeTab: string = 'description';
  relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(pm => {
      const productId = pm.get('id');
      if (!productId) {
        // missing id → go back
        this.router.navigate(['/products']);
        return;
      }
      this.loadProduct(productId);
      this.loadRelatedProducts(productId);
      window.scrollTo({ top: 0 });
    });
  }

  private getCatalog(): Product[] {
    return [
      {
        id: '1',
        name: 'MacBook Pro M3',
        description: 'The most powerful MacBook Pro ever is here...',
        price: 45000,
        stock: 15,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop',
        category: 'Laptops',
        rating: 4.8,
        discount: 10,
        isNew: true,
        isFeatured: true,
        images: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop'
        ],
        specifications: {
          Processor: 'Apple M3, 8‑core CPU, 10‑core GPU',
          Memory: '16GB unified memory',
          Storage: '512GB SSD',
          Display: '14.2" Liquid Retina XDR'
        },
        reviews: [
          { id: 'r1', userName: 'Ahmed', rating: 5, comment: 'Amazing!', date: new Date('2024-01-15'), verified: true },
          { id: 'r2', userName: 'Sarah', rating: 4, comment: 'Great performance.', date: new Date('2024-01-10'), verified: true }
        ]
      },
      {
        id: '2',
        name: 'iPhone 15 Pro Max',
        description: 'Premium smartphone with A17 Pro and 48MP camera.',
        price: 38000,
        stock: 25,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop',
        category: 'Smartphones',
        rating: 4.9,
        isFeatured: true,
        images: [
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=400&fit=crop'
        ],
        specifications: {
          Chip: 'A17 Pro',
          Display: '6.7" Super Retina XDR',
          Camera: '48MP main',
          Battery: 'All‑day battery life'
        },
        reviews: [
          { id: 'r3', userName: 'Omar', rating: 5, comment: 'Camera is insane!', date: new Date('2024-02-01'), verified: true }
        ]
      },
      {
        id: '3',
        name: 'Sony WH‑1000XM5',
        description: 'Premium noise‑canceling wireless headphones.',
        price: 8500,
        stock: 30,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
        category: 'Audio',
        rating: 4.7,
        discount: 15,
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop'
        ],
        specifications: {
          ANC: 'Industry‑leading noise canceling',
          Battery: 'Up to 30 hours',
          Charge: 'USB‑C fast charging'
        },
        reviews: [
          { id: 'r4', userName: 'Mona', rating: 5, comment: 'Best ANC!', date: new Date('2024-03-12'), verified: true }
        ]
      },
      {
        id: '4',
        name: 'iPad Pro 12.9"',
        description: 'M2 power with stunning Liquid Retina XDR.',
        price: 28000,
        stock: 12,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop',
        category: 'Tablets',
        rating: 4.6,
        isNew: true,
        images: [
          'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop'
        ],
        specifications: {
          Chip: 'Apple M2',
          Display: '12.9" Liquid Retina XDR',
          Pencil: 'Apple Pencil support'
        },
        reviews: []
      }
    ];
  }

  loadProduct(productId: string) {
    const catalog = this.getCatalog();
    const found = catalog.find(p => p.id === productId);
    if (!found) {
      // unknown id → go back (no silent fallback to first product)
      alert('Details not available for this product.');
      this.router.navigate(['/products']);
      return;
    }
    this.product = found;
    this.selectedImage = this.product.images[0] || this.product.image;
    this.quantity = 1;
  }

  loadRelatedProducts(currentId: string) {
    const catalog = this.getCatalog().filter(p => p.id !== currentId);
    this.relatedProducts = catalog.slice(0, 3);
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  updateQuantity(change: number) {
    const newQ = this.quantity + change;
    const max = this.product.stock || 1;
    if (newQ >= 1 && newQ <= max) this.quantity = newQ;
  }

  addToCart() {
    this.isLoading = true;
    setTimeout(() => {
      alert(`${this.product.name} has been added to cart!`);
      this.isLoading = false;
    }, 800);
  }

  addToWishlist() {
    alert(`${this.product.name} has been added to wishlist!`);
  }

  shareProduct() {
    if (navigator.share) {
      navigator.share({
        title: this.product.name,
        text: this.product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }

  getDiscountedPrice(): number {
    if (this.product.discount) {
      return this.product.price - (this.product.price * this.product.discount / 100);
    }
    return this.product.price;
  }

  getStarRating(rating: number): string[] {
    const stars: string[] = [];
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    for (let i = 0; i < full; i++) stars.push('★');
    if (half) stars.push('☆');
    while (stars.length < 5) stars.push('☆');
    return stars;
  }

  getAverageRating(): number {
    if (!this.product.reviews.length) return 0;
    const total = this.product.reviews.reduce((s, r) => s + r.rating, 0);
    return total / this.product.reviews.length;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}