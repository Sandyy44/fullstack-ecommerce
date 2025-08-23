import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../Models/iproduct';
import { ProductService } from '../../services/products.service';
import { IProductRes, IProductsRes } from '../../Models/iproductRes';
import { ICategory } from '../../Models/icategory';
import { CategoryService } from '../../services/category.service';
import { ICategoriesRes } from '../../Models/icategoryRes';


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
  product!: IProduct
  selectedImage: string = '';
  quantity: number = 1;
  selectedSize: string = '';
  selectedColor: string = '';
  isLoading = false;
  activeTab: string = 'description';
  relatedProducts: IProduct[] = [];
    categories?: ICategory[] = [];


  catalog: IProduct[] = []
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {

     this.categoryService.getAllCategories().subscribe(
          (data: ICategoriesRes) => {
            console.log(data)
            this.categories = data.categories
            console.log(this.categories)
            return this.categories
          }
    
        )
    
    this.productService.getAllProducts().subscribe(
      (data: IProductsRes) => {
        console.log(data)
        this.catalog = data.products
        return this.catalog
      }

    )

    

    this.route.paramMap.subscribe(pm => {
      const productId = pm.get('id');
      if (!productId) {
        // missing id → go back
        this.router.navigate(['/products']);
        return;
      }
     this.productService.getProductById(productId).subscribe(
      (data: IProductRes) => {
        console.log(data)
        this.product = data.product
         this.loadRelatedProducts(productId);
        return this.product
      }

    )

      window.scrollTo({ top: 0 });
    });
  }



  loadProduct(productId: string) {

    const found = this.catalog.find(p => p._id === productId);
    if (!found) {
      // unknown id → go back (no silent fallback to first product)
      alert('Details not available for this product.');
      this.router.navigate(['/products']);
      return;
    }
    this.product = found;
  }

  loadRelatedProducts(currentId: string) {
    const catalog = this.catalog.filter(p => p.catId == this.product.catId && p._id !== currentId);
    console.log(catalog);
    this.relatedProducts = catalog.slice(0, 3);
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
    const price = this.product.price ?? 0;
    if (this.product.discount) {
      return price - (price * this.product.discount / 100);
    }
    return price;
  }



  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  getCategoryName(catId: string): string {
  const category = this.categories?.find(c => c._id === catId);
  return category ? (category.name ?? 'Unknown') : 'Unknown';
}

}