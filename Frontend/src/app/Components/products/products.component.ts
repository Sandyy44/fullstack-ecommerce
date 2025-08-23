import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../Models/iproduct';
import { IProductsRes } from '../../Models/iproductRes';
import { CategoryService } from '../../services/category.service';
import { ICategoriesRes } from '../../Models/icategoryRes';
import { ICategory } from '../../Models/icategory';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: IProduct[] = []
  filteredProducts: IProduct[] = [];
  categories?: ICategory[] = [];
  selectedCategory: string = 'all';
  searchTerm: string = '';
  sortBy: string = 'name';

  constructor(private productService: ProductsService, private categoryService: CategoryService, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(
      (data: ICategoriesRes) => {
        //console.log(data)
        this.categories = data.categories

        this.route.queryParams.subscribe(params => {
          const categoryName = params['category'];
          if (categoryName) {
            // Find the category _id by name
            const category = this.categories?.find(c => c.name == categoryName);
            console.log(categoryName)
            console.log(this.categories)
            console.log(category)
            if (category) {
              console.log(category)
              console.log(category._id)
              this.selectedCategory = category._id || 'all';
              this.filterProducts();
            }
          }
        });
        //console.log(this.categories)
        return this.categories
      }

    )














    this.loadProducts();
    this.filteredProducts = [...this.products];












  }

  shuffleArray(array: any[]) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (data: IProductsRes) => {
        //console.log(data)
        this.products = data.products
        this.filteredProducts = this.shuffleArray(data.products)
        //console.log(this.products)
        return this.products
      }

    )



  }



  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory == 'all' || product.catId == this.selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    this.sortProducts();
  }

  sortProducts() {
    switch (this.sortBy) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      // case 'rating':
      //   this.filteredProducts.sort((a, b) => b.rating - a.rating);
      //   break;
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

  addToCart(product: IProduct) {
    // Here you can add logic to add product to cart
    alert(`${product.name} has been added to cart!`);
  }

  getDiscountedPrice(product: IProduct): number {
    const price = product.price ?? 0;
    if (product.discount) {
      return price - (price * product.discount / 100);
    }
    return price;
  }

  getCategoryName(catId: string): string {
    const category = this.categories?.find(c => c._id === catId);
    return category ? (category.name ?? 'Unknown') : 'Unknown';
  }



}
