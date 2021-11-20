import { IAddress } from "./Address";
export interface IOrders {
    cartId: string;
    specialDeliveryID: number;
    shiptoAddress: IAddress;
}

export interface OrderedItem {
    itemsId: number;
    productName: string;
    imageUrl: string;
    price: number;
    amount: number;
}

export interface IActualOrder {
    actualOrderId: number;
    email: string;
    orderDate: Date;
    shippingAddress: IAddress;
    speaiclDelivery: string;
    subtotal: number;
    total: number;
    orderedItems: OrderedItem[];
    status: string;
    paymentId: string;
}