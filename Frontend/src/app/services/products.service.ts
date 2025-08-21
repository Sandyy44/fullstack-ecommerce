import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iproduct.js';
import { IProductRes, IProductsRes, IProductMessageRes, IProductWithMessageRes } from '../Models/iproductRes.js';
let URL: string = "http://localhost:5000"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) {


  }

  getAllProducts(): Observable<IProductsRes> {
    return this.httpClient.get<IProductsRes>(`${URL}/product`)
  }

  getProductById(id: string): Observable<IProductRes> {
    return this.httpClient.get<IProductRes>(`${URL}/product/${id}`)
  }

  createProduct(body: IProduct): Observable<IProductRes> {
    return this.httpClient.post<IProductRes>(`${URL}/product`, body)

  }
  updateProduct(id: string, body: IProduct): Observable<IProductWithMessageRes> {
    return this.httpClient.put<IProductWithMessageRes>(`${URL}/product/${id}`, body)

  }
  deleteProduct(id: string): Observable<IProductMessageRes> {
    return this.httpClient.delete<IProductMessageRes>(`${URL}/product/${id}`)

  }

}
