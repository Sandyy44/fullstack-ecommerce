// import { Component } from '@angular/core';
// import { IProduct } from '../../Models/iproduct';
// import { ProductsService } from '../../Services/products.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IProductsRes } from '../../Models/iproductRes';

// @Component({
//   selector: 'app-products',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './products.component.html',
//   styleUrl: './products.component.css'
// })

// export class ProductsComponent {
//   products: IProduct[] = []
//   constructor(private productService: ProductsService) {
//   }
//   ngOnInit() {
//     this.productService.getAllProducts().subscribe(
//       (data: IProductsRes) => {
//         console.log(data)
//         this.products = data.products
//         console.log(this.products)
//         return this.products
//       }

//     )

//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // ✅ عشان NgIf و NgFor
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../Models/iproduct';

@Component({
  selector: 'app-products',
  standalone: true,                // ✅ لازم طالما شغال standalone
  imports: [CommonModule],         // ✅ هنا
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: IProduct[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res.products;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
      }
    });
  }
}
