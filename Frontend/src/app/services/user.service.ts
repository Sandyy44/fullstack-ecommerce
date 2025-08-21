import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../Models/iuser';
import { IUserMessageRes, IUserRes, IUsersRes } from '../Models/iuserRes';
let URL: string = "http://localhost:5000"

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) { }

  getProfile(): Observable<IUserRes> {
    return this.httpClient.get<IUserRes>(`${URL}/user/profile`);
  }

  getProfileById(id: string): Observable<IUserRes> {
    return this.httpClient.get<IUserRes>(`${URL}/user/${id}`);
  }

  getAllUsers(): Observable<IUsersRes> {
    return this.httpClient.get<IUsersRes>(`${URL}/user`);
  }

  updateUser(body: IUser): Observable<IUserMessageRes> {
    return this.httpClient.put<IUserMessageRes>(`${URL}/user`, body);
  }

  editProfilePic(body: IUser): Observable<IUserMessageRes> {
    return this.httpClient.patch<IUserMessageRes>(`${URL}/user/profilePic`, body);
  }

  deleteProfilePic(): Observable<IUserMessageRes> {
    return this.httpClient.patch<IUserMessageRes>(`${URL}/user/deleteProfilePic`, {});
  }

  updatePassword(body: IUser): Observable<IUserMessageRes> {
    return this.httpClient.patch<IUserMessageRes>(`${URL}/user/updatePassword`, body);
  }
}
