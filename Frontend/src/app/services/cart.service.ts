import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICartRes } from '../Models/IcartRes';
import { Observable } from 'rxjs';
import { ICartQuantity } from '../Models/icart';
let URL: string = "http://localhost:5000"

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }
  getCartData(): Observable<ICartRes> {
    return this.httpClient.get<ICartRes>(`${URL}/cart`)
  }


  deleteItemFromCart( id: string): Observable<ICartRes> {
    return this.httpClient.delete<ICartRes>(`${URL}/cart/${id}`)
  }

  clearCart(): Observable<ICartRes> {
    return this.httpClient.delete<ICartRes>(`${URL}/cart`)
  }

  addToCart( body: ICartQuantity, id: string): Observable<ICartRes> {
    return this.httpClient.post<ICartRes>(`${URL}/product/${id}/cart`, body)
  }

}
