

export interface IProducts {
    productsId: number;
    name: string;
    description: string;
    price: number;
    isOnSale: boolean;
    isAvailable: boolean;
    categoryDTO?:string;
    brandDTO?:string;
    photosDTO?:string
}