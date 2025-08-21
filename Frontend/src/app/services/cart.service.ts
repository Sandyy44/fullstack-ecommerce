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
  getCartData(token: string): Observable<ICartRes> {
    return this.httpClient.get<ICartRes>(`${URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }


  deleteItemFromCart(token: string, id: string): Observable<ICartRes> {
    return this.httpClient.delete<ICartRes>(`${URL}/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  clearCart(token: string): Observable<ICartRes> {
    return this.httpClient.delete<ICartRes>(`${URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  addToCart(token: string, body: ICartQuantity, id: string): Observable<ICartRes> {
    return this.httpClient.post<ICartRes>(`${URL}/product/${id}/cart`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}
