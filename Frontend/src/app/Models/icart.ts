export interface ICart {
  _id?: string;
  userId?: string;
  products?:[ {
    id?: string,
    quantity?: number
  }];
  finalPrice?: number;


}

export interface ICartQuantity {
    quantity?: number
}