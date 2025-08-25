import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { CategoryService } from '../../services/category.service';
import { IProduct } from '../../Models/iproduct';
import { ICategory } from '../../Models/icategory';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  products: IProduct[] = [];
  categories: ICategory[] = [];
  isLoading = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        this.products = response.products || response;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response.categories || response;
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  goToProductsManagement() {
    this.router.navigate(['/admin/dashboard']);
  }

  goToAddProduct() {
    this.router.navigate(['/admin/create-product']);
  }

  goToOrders() {
    // Navigate to orders management when implemented
    console.log('Orders management not implemented yet');
  }

  goToUsers() {
    // Navigate to users management when implemented
    console.log('Users management not implemented yet');
  }

  goToCategories() {
    // Navigate to categories management when implemented
    console.log('Categories management not implemented yet');
  }

  goToReports() {
    // Navigate to reports when implemented
    console.log('Reports not implemented yet');
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
}
