import { IProduct } from "./iproduct";

export interface IProductWithMessageRes{
message:string;
product:IProduct
}
export interface IProductsRes{
products:IProduct[]
}
export interface IProductRes{
product:IProduct
}
export interface IProductMessageRes{
message:string
}