export interface ICart {
  userId: string;
  products:[ {
    id: string,
    quantity: number
  }];
  finalPrice: number;
  createdAt: Date;
  updatedAt: Date;

}