import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthForgetPassword, IAuthSendCode, IAuthSignin, IAuthSignup } from '../Models/iauthRes';
import { IUser } from '../Models/iuser';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

let URL: string = "http://localhost:5000"

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient, private http: HttpClient) { }

  signin(body: IUser): Observable<IAuthSignin> {
    return this.httpClient.post<IAuthSignin>(`${URL}/auth/signin`, body)
  }
  signup(body: IUser): Observable<IAuthSignup> {
    return this.httpClient.post<IAuthSignup>(`${URL}/auth/signup`, body)
  }
  sendCode(body: IUser): Observable<IAuthSendCode> {
    return this.httpClient.patch<IAuthSendCode>(`${URL}/auth/sendCode`, body)

  }
  forgetPassword(body: IUser): Observable<IAuthForgetPassword> {
    return this.httpClient.patch<IAuthForgetPassword>(`${URL}/auth/forgetPassword`, body)

  }


  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }



  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getUserRole(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || 'user';
    } catch (error) {
      return null;
    }
  }
}
