/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NavigateFunction } from "react-router-dom";

/* ---------------------------------- Productos --------------------------------- */
/** Representa un producto disponible en la tienda */
export interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
  size: string;
  quantity: number;
}

/* ---------------------------------- Carrito --------------------------------- */
/** Estructura del carrito: itemId -> talla -> cantidad */
export interface CartItemType {
    [itemId: string]: {
        [size: string]: number
    }
}

/* ---------------------------- Item de un pedido ---------------------------- */
/** Estructura de un item de un pedido */
export interface OrderItemType extends ProductType{
  size: string;
  quantity: number;
  paymentMethod: "COD" | "STRIPE" | "RAZORPAY";
  payment: boolean;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  date: number;
}

/* ---------------------------------- Pedido --------------------------------- */
/** Estructura de un pedido */
export interface OrderType {
    _id: string;
    userId: string;
    items: OrderItemType[];
    amount: number;
    address: string;
    paymentMethod: "COD" | "STRIPE" | "RAZORPAY";
    payment: boolean;
    status: "pending" | "shipped" | "delivered" | "cancelled";
    date: number;
}

/* ---------------------------------- Context --------------------------------- */
/** Contexto de la tienda */
export interface ShopContextType {
  products: ProductType[];
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: (search: string) => void;
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
  cartItems: CartItemType;
  addToCart: (itemId: string, size: string) => void;
  getCartCount: () => number;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  getCartAmount: () => number;
  navigate: NavigateFunction;
  token: string;
  setToken: (token: string) => void;
  setCartItems: (cartItems: CartItemType) => void;
  logout: () => void
  backendUrl: string
  getUserCart: (token: string) => void
}

