import { IUser } from "./iuser"

export interface IUserRes{
  message:string
  user:IUser
}
export interface IUsersRes{
  message:string
  user:IUser[]
}
export interface IUserMessageRes{
  message:string
}