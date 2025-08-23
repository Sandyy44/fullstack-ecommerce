export interface IOrder {
  _id?: string;
  userId: string;
  updatedBy: string;
  products: [{
    name: string,
    productId: string,
    quantity: number,
    unitePrice: number,
    finalPrice: number
}];
  address: string
  phone: string
  finalPrice: number
  status: string
  note: string
  reason: string
  paymentMethod: string
  createdAt: Date;
  updatedAt: Date;
}