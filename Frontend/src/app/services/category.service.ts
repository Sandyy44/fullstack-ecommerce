import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoriesRes, ICategoryMessRes, ICategoryRes } from '../Models/icategoryRes';
import { Observable } from 'rxjs';
import { ICategory } from '../Models/icategory';

let URL: string = "http://localhost:5000"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }
    getAllCategories(): Observable<ICategoriesRes> {
      return this.httpClient.get<ICategoriesRes>(`${URL}/category`, )
    }
      getCategoryById(token: string,id:string): Observable<ICategoryRes> {
      return this.httpClient.get<ICategoryRes>(`${URL}/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
  
    deleteCategory(token: string, id: string): Observable<ICategoryMessRes> {
      return this.httpClient.delete<ICategoryMessRes>(`${URL}/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
  
    updateCategory(token: string,id:string): Observable<ICategoryRes> {
      return this.httpClient.patch<ICategoryRes>(`${URL}/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
  
    addCategory(token: string, body: ICategory, id: string): Observable<ICategoryRes> {
      return this.httpClient.post<ICategoryRes>(`${URL}/product/${id}/cart`, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
  
}
