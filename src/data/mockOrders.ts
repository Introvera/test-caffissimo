import { OnlineOrder, SalesData, Order, OrderStatus } from "@/types";

const coffeeItems = [
  { name: "Cappuccino", quantity: 1 },
  { name: "Coffee Latte", quantity: 2 },
  { name: "Americano", quantity: 1 },
  { name: "V60", quantity: 1 },
  { name: "Espresso", quantity: 2 },
  { name: "Mocha", quantity: 1 },
];

const foodItems = [
  { name: "Avocado Toast", quantity: 1 },
  { name: "Club Sandwich", quantity: 1 },
  { name: "Butter Croissant", quantity: 2 },
  { name: "Tiramisu", quantity: 1 },
];

const customerNotes = [
  "Please ring doorbell",
  "Leave at door",
  "Extra napkins please",
  "No ice in drinks",
  "Allergic to nuts",
  undefined,
  undefined,
  undefined,
];

export function generateRandomOnlineOrder(): OnlineOrder {
  const platforms: ("UBER_EATS" | "DOORDASH")[] = ["UBER_EATS", "DOORDASH"];
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  
  const numItems = Math.floor(Math.random() * 3) + 1;
  const allItems = [...coffeeItems, ...foodItems];
  const items: { name: string; quantity: number; notes?: string }[] = [];
  
  for (let i = 0; i < numItems; i++) {
    const item = allItems[Math.floor(Math.random() * allItems.length)];
    items.push({
      ...item,
      notes: Math.random() > 0.7 ? "No sugar" : undefined,
    });
  }
  
  const total = items.reduce((sum, item) => sum + item.quantity * (4 + Math.random() * 6), 0);
  
  return {
    id: `online-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    platform,
    orderId: platform === "UBER_EATS" 
      ? `UE-${Math.floor(10000 + Math.random() * 90000)}`
      : `DD-${Math.floor(10000 + Math.random() * 90000)}`,
    time: new Date(),
    items,
    customerNotes: customerNotes[Math.floor(Math.random() * customerNotes.length)],
    total: Math.round(total * 100) / 100,
    status: "New",
  };
}

export const mockOnlineOrders: OnlineOrder[] = [
  {
    id: "online-1",
    platform: "UBER_EATS",
    orderId: "UE-45821",
    time: new Date(Date.now() - 1000 * 60 * 5),
    items: [
      { name: "Cappuccino", quantity: 2, notes: "Extra hot" },
      { name: "Butter Croissant", quantity: 1 },
    ],
    customerNotes: "Please ring doorbell",
    total: 13.94,
    status: "New",
  },
  {
    id: "online-2",
    platform: "DOORDASH",
    orderId: "DD-78234",
    time: new Date(Date.now() - 1000 * 60 * 12),
    items: [
      { name: "Coffee Latte", quantity: 1 },
      { name: "Avocado Toast", quantity: 1 },
    ],
    total: 15.96,
    status: "Preparing",
  },
  {
    id: "online-3",
    platform: "UBER_EATS",
    orderId: "UE-45820",
    time: new Date(Date.now() - 1000 * 60 * 25),
    items: [
      { name: "Mocha", quantity: 2 },
      { name: "Tiramisu", quantity: 2 },
    ],
    customerNotes: "Leave at door",
    total: 28.92,
    status: "Ready",
  },
];

export const mockSalesData: SalesData[] = [
  { date: "Mon", sales: 1245, orders: 42 },
  { date: "Tue", sales: 1398, orders: 48 },
  { date: "Wed", sales: 1567, orders: 52 },
  { date: "Thu", sales: 1234, orders: 41 },
  { date: "Fri", sales: 1890, orders: 63 },
  { date: "Sat", sales: 2345, orders: 78 },
  { date: "Sun", sales: 2012, orders: 67 },
];

export const mockHistoryOrders: Order[] = [
  {
    id: "#3243",
    items: [],
    orderType: "Dine in",
    subtotal: 20.92,
    discount: 3.00,
    total: 17.92,
    status: "Completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "#3242",
    items: [],
    orderType: "Take away",
    subtotal: 15.46,
    discount: 0,
    total: 15.46,
    status: "Completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: "#3241",
    items: [],
    orderType: "Delivery",
    subtotal: 32.94,
    discount: 5.00,
    total: 27.94,
    status: "Completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 90),
  },
  {
    id: "#3240",
    items: [],
    orderType: "Dine in",
    subtotal: 24.96,
    discount: 0,
    total: 24.96,
    status: "Completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: "#3239",
    items: [],
    orderType: "Take away",
    subtotal: 8.96,
    discount: 0,
    total: 8.96,
    status: "Cancelled",
    createdAt: new Date(Date.now() - 1000 * 60 * 150),
  },
];
