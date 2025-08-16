import { Component } from '@angular/core';
import { IProduct } from '../../Models/iproduct';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent {
  products: IProduct[] = []
  constructor(private productService: ProductsService) {
  }
  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (data:ProductsResponse) => {
        console.log(data)
        this.products = data.products
        console.log(this.products)
        return this.products
      }

    )

  }
}
interface ProductsResponse {
  products: IProduct[];
}