export interface IUser {
  _id?:string;
  userName?: string
  email?: string
  password?: string
  cPassword?:string
  oldPassword?:string
  phone?: string
  address?: string
  role?: string
  accountType?: string
  socialId?: string
  gender?: string
  DOB?: Date
  age?: number
  status?: string
  confirmEmail?: string
  deleted?: boolean
  code?: number
  image?: { secure_url: string, public_id: string }
  wishList?:string[] 
  refresh_token?:string
}
