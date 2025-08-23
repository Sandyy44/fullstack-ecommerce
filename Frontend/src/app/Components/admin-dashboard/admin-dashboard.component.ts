import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { IProduct } from '../../Models/iproduct';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  products: IProduct[] = [];
  isLoading = true;
  error = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        this.products = response.products || response;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.error = 'Failed to load products';
        this.isLoading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  addNewProduct() {
    this.router.navigate(['/admin/create-product']);
  }

  editProduct(productId: string) {
    this.router.navigate(['/admin/edit-product', productId]);
  }

  deleteProduct(productId: string, productName: string) {
    if (confirm(`Are you sure you want to delete "${productName}"?`)) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(p => p._id !== productId);
          console.log('Product deleted successfully');
        },
        error: (error: any) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product. Please try again.');
        }
      });
    }
  }

  getImageUrl(product: IProduct): string {
    if (product.mainImage?.secure_url) {
      return product.mainImage.secure_url;
    }
    if (product.subImages && product.subImages.length > 0) {
      return product.subImages[0].secure_url;
    }
    return 'assets/default-product.png';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  getCategoryName(categoryId: any): string {
    if (!categoryId) return 'No Category';
    if (typeof categoryId === 'object' && categoryId.name) {
      return categoryId.name;
    }
    return 'No Category';
  }

}
