export interface IProduct {
  id: string;
  name: string;
  slug: string;
  image: {
    type: {
      secure_url: string;
      public_id: string;
    }
  };
  description: string;
  price: number;
  stock: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
