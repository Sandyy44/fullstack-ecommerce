export interface IProduct {
  _id?: string;
  name: string;
  slug?: string;
  image?: {
    secure_url: String,
    public_id?: String,
    id?: string

  }
  description?: string,
  price?: number;
  stock?: number;
  totalAmount?: number;
  isDeleted?: boolean,
  createdBy?: string;
  catId?: string;
  discount?: number;
}