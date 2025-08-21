export interface IProduct {
  id?: string;
  name: string;
  slug?: string;
  image?: {
      secure_url: String,
      public_id?: String,
      id?:string
    
  }
  description?:string,
  price?: number;
  stock?:number;
  totalAmount?:number;
  isDeleted?:boolean,
  createdAt?: Date;
  updatedAt?: Date;
}