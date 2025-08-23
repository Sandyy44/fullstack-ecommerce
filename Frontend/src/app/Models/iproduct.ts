export interface IProduct {
  _id?: string;
  name: string;
  slug?: string;
  image?: {
    secure_url: string,
    public_id?: string,
    id?: string
  }
  mainImage?: {
    secure_url: string,
    public_id?: string,
    id?: string
  }
  subImages?: {
    secure_url: string,
    public_id?: string,
    id?: string
  }[]
  description?: string;
  price?: number;
  stock?: number;
  totalAmount?: number;
  isDeleted?: boolean,
  createdBy?: string;
  catId?: string;
  categoryId?: string | {
    _id: string;
    name: string;
  };
  brand?: string;
  discount?: number;
}