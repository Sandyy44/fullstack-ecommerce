import { ICategory } from "./icategory";

export interface ICategoryRes {
message?: string;
category?: ICategory;
}

export interface ICategoriesRes {
message?: string;
categories?: ICategory[];
}
export interface ICategoryMessRes {
message?: string;
}