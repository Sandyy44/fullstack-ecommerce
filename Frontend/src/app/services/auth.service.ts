import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthForgetPassword, IAuthSendCode, IAuthSignin, IAuthSignup } from '../Models/iauthRes';
import { IUser } from '../Models/iuser';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IToken } from '../Models/iuserRes';

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
  refreshToken(body: IUser): Observable<IToken> {
    return this.httpClient.post<IToken>(`${URL}/auth/refresh`, body)
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
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveRefreshToken(refreshToken: string) {
    localStorage.setItem('refresh_token', refreshToken);
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  private decodeJwt<T = any>(token: string): T | null {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;
      // Handle unicode-safe base64 decode
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload) as T;
    } catch {
      return null;
    }
  }

  getUserRole(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const payload = this.decodeJwt<any>(token);
    if (!payload) return null;

    const roleClaim =
      payload.role ??
      (Array.isArray(payload.roles) ? payload.roles[0] : payload.roles) ??
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ??
      null;

    return roleClaim ?? null;
  }
}
