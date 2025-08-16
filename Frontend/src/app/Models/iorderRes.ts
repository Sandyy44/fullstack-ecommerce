import { IOrder } from "./iorder";

export interface IOrderRes{
  message:string;
  order:IOrder
}
export interface IOrdersRes{
  message:string;
  orders:IOrder[]
}
export interface IOrderMessageRes{
  message:string;
}