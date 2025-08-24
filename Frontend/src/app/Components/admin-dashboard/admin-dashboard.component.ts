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
<<<<<<< HEAD
    console.log('Loading products...');
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        console.log('Products response:', response);
        this.products = response.products || response;
        this.isLoading = false;
        console.log('Products loaded:', this.products.length);
=======
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        this.products = response.products || response;
        this.isLoading = false;
>>>>>>> 76dda69e9c1c91ac722eb28637b3dbb16009bdd2
      },
      error: (error: any) => {
        this.error = 'Failed to load products';
        this.isLoading = false;
        console.error('Error loading products:', error);
<<<<<<< HEAD
        alert('Failed to load products: ' + (error.error?.message || error.message));
=======
>>>>>>> 76dda69e9c1c91ac722eb28637b3dbb16009bdd2
      }
    });
  }

  addNewProduct() {
    this.router.navigate(['/admin/create-product']);
  }

  editProduct(productId: string) {
<<<<<<< HEAD
    if (productId) {
      this.router.navigate(['/admin/edit-product', productId]);
    }
  }

  showProduct(productId: string) {
    if (productId) {
      this.router.navigate(['/product', productId]);
    }
  }

  deleteProduct(productId: string, productName: string) {
    if (productId && confirm(`Are you sure you want to delete "${productName}"?`)) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(p => p._id !== productId);
          alert('Product deleted successfully!');
=======
    this.router.navigate(['/admin/edit-product', productId]);
  }

  deleteProduct(productId: string, productName: string) {
    if (confirm(`Are you sure you want to delete "${productName}"?`)) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(p => p._id !== productId);
>>>>>>> 76dda69e9c1c91ac722eb28637b3dbb16009bdd2
          console.log('Product deleted successfully');
        },
        error: (error: any) => {
          console.error('Error deleting product:', error);
<<<<<<< HEAD
          alert('Failed to delete product: ' + (error.error?.message || 'Please try again.'));
=======
          alert('Failed to delete product. Please try again.');
>>>>>>> 76dda69e9c1c91ac722eb28637b3dbb16009bdd2
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

<<<<<<< HEAD
  trackByProductId(index: number, product: IProduct): string {
    return product._id || index.toString();
  }

  onImageError(event: any) {
    event.target.src = 'assets/default-product.png';
  }

=======
>>>>>>> 76dda69e9c1c91ac722eb28637b3dbb16009bdd2
}
