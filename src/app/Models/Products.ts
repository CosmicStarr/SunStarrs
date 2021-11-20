import { IBrand } from "./Brand";
import { ICategory } from "./Category";
import { IPhoto } from "./Photos";

export interface IProducts {
    productsId: number;
    name: string;
    description: string;
    price: number;
    isOnSale: boolean;
    isAvailable: boolean;
    categoryDTO?:string;
    brandDTO?:string;
    photosDTO?: IPhoto[]
}