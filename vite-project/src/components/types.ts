export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    img:string;
    description:string;
  }

export interface CartItem extends Product {
    quantity: number;
  }