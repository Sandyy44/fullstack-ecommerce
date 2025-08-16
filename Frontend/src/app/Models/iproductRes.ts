import { IProduct } from "./iproduct";

export interface IProductRes{
message:string;
product:IProduct
}
export interface IProductsRes{
products:IProduct[]
}
export interface IProductRes{
products:IProduct
}
export interface IProductMessageRes{
message:string
}