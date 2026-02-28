"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Product,
  CartItem,
  OrderType,
  Size,
  AddOn,
  OnlineOrder,
  OrderStatus,
} from "@/types";
import { mockOnlineOrders, generateRandomOnlineOrder } from "@/data/mockOrders";

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
}

interface AuthState {
  isAuthenticated: boolean;
  isLocked: boolean;
  login: () => void;
  logout: () => void;
  lock: () => void;
  unlock: () => void;
}

interface OrderState {
  items: CartItem[];
  orderType: OrderType;
  
  // Order actions
  addItem: (product: Product, size?: Size, addOns?: AddOn[]) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateSize: (itemId: string, size: Size) => void;
  toggleAddOn: (itemId: string, addOn: AddOn) => void;
  clearCart: () => void;
  setOrderType: (type: OrderType) => void;
  
  // Computed
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
}

interface OnlineOrdersState {
  orders: OnlineOrder[];
  
  // Actions
  addOrder: (order: OnlineOrder) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  simulateNewOrder: () => void;
}

function calculateItemPrice(product: Product, size?: Size, addOns: AddOn[] = []): number {
  let price = product.price;
  
  if (size === "Medium") {
    price += 0.50;
  } else if (size === "Large") {
    price += 1.00;
  }
  
  const addOnsTotal = addOns.reduce((sum, addOn) => sum + addOn.price, 0);
  
  return price + addOnsTotal;
}

function generateCartItemId(product: Product, size?: Size, addOns: AddOn[] = []): string {
  const addOnIds = addOns.map(a => a.id).sort().join(",");
  return `${product.id}-${size || "none"}-${addOnIds}`;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggle: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: "theme-storage",
    }
  )
);

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLocked: false,
      login: () => set({ isAuthenticated: true, isLocked: false }),
      logout: () => set({ isAuthenticated: false, isLocked: false }),
      lock: () => set({ isLocked: true }),
      unlock: () => set({ isLocked: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export const useCartStore = create<OrderState>((set, get) => ({
  items: [],
  orderType: "Dine in",
  
  addItem: (product, size, addOns = []) => {
    const itemId = generateCartItemId(product, size, addOns);
    const existingItem = get().items.find(item => item.id === itemId);
    
    if (existingItem) {
      set((state) => ({
        items: state.items.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + 1, totalPrice: calculateItemPrice(product, size, addOns) * (item.quantity + 1) }
            : item
        ),
      }));
    } else {
      const newItem: CartItem = {
        id: itemId,
        product,
        quantity: 1,
        size,
        selectedAddOns: addOns,
        totalPrice: calculateItemPrice(product, size, addOns),
      };
      set((state) => ({ items: [...state.items, newItem] }));
    }
  },
  
  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },
  
  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity,
              totalPrice: calculateItemPrice(item.product, item.size, item.selectedAddOns) * quantity,
            }
          : item
      ),
    }));
  },
  
  updateSize: (itemId, size) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              size,
              totalPrice: calculateItemPrice(item.product, size, item.selectedAddOns) * item.quantity,
            }
          : item
      ),
    }));
  },
  
  toggleAddOn: (itemId, addOn) => {
    set((state) => ({
      items: state.items.map((item) => {
        if (item.id !== itemId) return item;
        
        const hasAddOn = item.selectedAddOns.some((a) => a.id === addOn.id);
        const newAddOns = hasAddOn
          ? item.selectedAddOns.filter((a) => a.id !== addOn.id)
          : [...item.selectedAddOns, addOn];
        
        return {
          ...item,
          selectedAddOns: newAddOns,
          totalPrice: calculateItemPrice(item.product, item.size, newAddOns) * item.quantity,
        };
      }),
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  setOrderType: (type) => {
    set({ orderType: type });
  },
  
  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.totalPrice, 0);
  },
  
  getDiscount: () => {
    const subtotal = get().getSubtotal();
    // Apply 10% discount for orders over $20
    return subtotal > 20 ? subtotal * 0.1 : 0;
  },
  
  getTotal: () => {
    return get().getSubtotal() - get().getDiscount();
  },
}));

export const useOnlineOrdersStore = create<OnlineOrdersState>((set) => ({
  orders: mockOnlineOrders,
  
  addOrder: (order) => {
    set((state) => ({
      orders: [order, ...state.orders],
    }));
  },
  
  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
    }));
  },
  
  simulateNewOrder: () => {
    const newOrder = generateRandomOnlineOrder();
    set((state) => ({
      orders: [newOrder, ...state.orders],
    }));
  },
}));
