import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserRes } from '../../Models/iuserRes';
import { IUser } from '../../Models/iuser';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
user!:IUser
  constructor(private userService:UserService){

  }
  ngOnInit(){

    this.userService.getProfile().subscribe(
      (data: IUserRes) => {
        console.log(data)
        this.user = data.user
        console.log(this.user)
        return this.user
      }

    )

  }


}
