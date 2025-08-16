export interface IProduct {
  id: string;
  name: string;
  slug: string;
  image: {
    type: {
      secure_url: String,
      public_id: String
    }
  }
  description:string,
  price: number;
  stock:number;
  isDeleted:boolean,
  createdAt: Date;
  updatedAt: Date;
}