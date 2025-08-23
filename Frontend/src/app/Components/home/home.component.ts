import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ICategory } from '../../Models/icategory';
import { CategoryService } from '../../services/category.service';
import { ICategoriesRes } from '../../Models/icategoryRes';
import { ProductsService } from '../../services/products.service';
import { IProductsRes } from '../../Models/iproductRes';
import { IProduct } from '../../Models/iproduct';

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

  featuredProducts: IProduct[] = [];
  categories: ICategory[] = [];
  products: IProduct[] = []

  constructor(private categoryService: CategoryService, private productService: ProductsService) {

  }


  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
  (productData: IProductsRes) => {
    this.products = productData.products;

    this.categoryService.getAllCategories().subscribe(
      (categoryData: ICategoriesRes) => {
        this.categories = categoryData.categories ?? [];
        this.updateCategoryCounts(); // now products are already loaded
      }
    );
  }
);



    this.loadFeaturedProducts();
  }
  updateCategoryCounts() {
    this.categories.forEach(category => {
      category.count = this.products.filter(p => p.catId === category._id).length;
    });
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
    this.productService.getAllProducts().subscribe(
      (data: IProductsRes) => {
        //console.log(data)
        this.featuredProducts = this.shuffleArray(data.products).slice(0, 6);
        //console.log(this.products)
        return this.products
      }

    )



  }
  shuffleArray(array: any[]) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
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

  getOriginalPrice(product: IProduct): number {
    if (product.price === undefined) {
      return 0;
    }
    if (product.discount) {
      return Math.round(product.price / (1 - product.discount / 100));
    }
    return product.price;
  }
}