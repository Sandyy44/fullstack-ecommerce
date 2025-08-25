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
      getCategoryById(id:string): Observable<ICategoryRes> {
      return this.httpClient.get<ICategoryRes>(`${URL}/category/${id}`)
    }
  
    deleteCategory( id: string): Observable<ICategoryMessRes> {
      return this.httpClient.delete<ICategoryMessRes>(`${URL}/category/${id}`)
    }
  
    updateCategory(body: ICategory,id:string): Observable<ICategoryRes> {
      return this.httpClient.patch<ICategoryRes>(`${URL}/category/${id}`, body)
    }
  
    addCategory( body: ICategory, id: string): Observable<ICategoryRes> {
      return this.httpClient.post<ICategoryRes>(`${URL}/product/${id}/cart`, body)
    }
  
}
