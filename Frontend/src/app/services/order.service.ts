import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderMessageRes, IOrderRes, IOrdersRes } from '../Models/iorderRes';
import { Observable } from 'rxjs';
import { IOrder } from '../Models/iorder';
let URL: string = "http://localhost:5000"

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrders(): Observable<IOrdersRes> {
    return this.httpClient.get<IOrdersRes>(`${URL}/order`)
  }

  createOrder(body: IOrder): Observable<IOrderRes> {
    return this.httpClient.post<IOrderRes>(`${URL}/order`, body)
  }
  cancelOrder( id: string): Observable<IOrderMessageRes> {
    return this.httpClient.patch<IOrderMessageRes>(`${URL}/order/${id}`,{})
  }

}
