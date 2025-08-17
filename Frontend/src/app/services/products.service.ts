import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iproduct.js';
import { IProductRes, IProductsRes } from '../Models/iproductRes.js';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { 


  }

  getAllProducts():Observable<IProductsRes>{
   return this.httpClient.get<IProductsRes>('https://fullstack-ecommerce-ochre.vercel.app/product')
  }
  getProductById(id:string):Observable<IProductRes>{
   return this.httpClient.get<IProductRes>(`https://fullstack-ecommerce-ochre.vercel.app/product/${id}`)
  }
 
}
