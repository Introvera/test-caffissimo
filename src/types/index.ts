export type Category = "Coffee" | "Non Coffee" | "Food" | "Snack" | "Dessert";

export type Size = "Small" | "Medium" | "Large";

export type OrderType = "Delivery" | "Dine in" | "Take away";

export type Platform = "UBER_EATS" | "DOORDASH";

export type OrderStatus =
  | "New"
  | "Preparing"
  | "Ready"
  | "Completed"
  | "Cancelled";

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  hasSizes: boolean;
  addOns?: AddOn[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size?: Size;
  selectedAddOns: AddOn[];
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  orderType: OrderType;
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

export interface OnlineOrder {
  id: string;
  platform: Platform;
  orderId: string;
  time: Date;
  items: {
    name: string;
    quantity: number;
    notes?: string;
  }[];
  customerNotes?: string;
  total: number;
  status: OrderStatus;
}

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}
