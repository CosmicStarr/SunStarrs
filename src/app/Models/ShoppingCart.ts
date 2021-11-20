import {v4 as uuidv4} from 'uuid';

export interface IShoppingCartItems {
    cartItemsId: number;
    itemName: string;
    description: string;
    price: number;
    amount: number;
    category: string;
    brand: string;
}

export interface IShoppingCart {
    shopId: string;
    shoppingCartItems: IShoppingCartItems[];
    deliveryId?: number;
    deliveryPrice?: number;
    clientSecret?: string;
    paymentID?: string;
}

export class ShoppingCart implements IShoppingCart{
    shopId = uuidv4();
    shoppingCartItems: IShoppingCartItems[] = [];
}

export interface IShoppingCartTotals{
    shipping:number
    subTotal:number
    total:number
}