export interface IUser {
  userName: string
  email: string
  password: string
  phone: string
  address: string
  role: string
  accountType: string
  socialId: string
  gender: string
  DOB: Date
  age: number
  status: string
  confirmEmail: string
  deleted: boolean
  code: number
  image: { secure_url: string, public_id: string }
  wishList:string[] 
  createdAt: Date;
  updatedAt: Date;
}