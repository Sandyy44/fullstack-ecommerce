import { Component } from '@angular/core';
import { IProduct } from '../../Models/iproduct';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products:IProduct[]=[]
  constructor(private productService:ProductsService){
    }
     ngOnInit() {
   this.productService.getAllProducts().subscribe({
  
    next: (data) => {
      console.log(data)
      return this.products = data},
    error: (err) => console.error(err)
  });
}

}
