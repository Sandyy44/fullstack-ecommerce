import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iproduct.js';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { 


  }

  getAllProducts():Observable<IProduct[]>{
   return this.httpClient.get<IProduct[]>('https://fullstack-ecommerce-ochre.vercel.app/product')
  }
  getProductById(id:number):Observable<IProduct>{
   return this.httpClient.get<IProduct>(`https://fullstack-ecommerce-ochre.vercel.app/product/${id}`)
  }
 
}
