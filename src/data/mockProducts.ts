import { Product, AddOn } from "@/types";

// Coffee Add-ons
export const milkOptions: AddOn[] = [
  { id: "whole-milk", name: "Whole Milk", price: 0 },
  { id: "oat-milk", name: "Oat Milk", price: 0.60 },
  { id: "almond-milk", name: "Almond Milk", price: 0.60 },
  { id: "soy-milk", name: "Soy Milk", price: 0.50 },
  { id: "coconut-milk", name: "Coconut Milk", price: 0.60 },
  { id: "skim-milk", name: "Skim Milk", price: 0 },
];

export const extraOptions: AddOn[] = [
  { id: "extra-shot", name: "Extra Shot", price: 0.75 },
  { id: "double-shot", name: "Double Shot", price: 1.25 },
  { id: "decaf", name: "Decaf", price: 0 },
];

export const syrupOptions: AddOn[] = [
  { id: "vanilla-syrup", name: "Vanilla", price: 0.50 },
  { id: "caramel-syrup", name: "Caramel", price: 0.50 },
  { id: "hazelnut-syrup", name: "Hazelnut", price: 0.50 },
  { id: "mocha-syrup", name: "Mocha", price: 0.50 },
  { id: "sugar-free-vanilla", name: "Sugar-Free Vanilla", price: 0.50 },
];

export const toppingOptions: AddOn[] = [
  { id: "whipped-cream", name: "Whipped Cream", price: 0.50 },
  { id: "caramel-drizzle", name: "Caramel Drizzle", price: 0.50 },
  { id: "chocolate-drizzle", name: "Chocolate Drizzle", price: 0.50 },
  { id: "cinnamon", name: "Cinnamon", price: 0 },
  { id: "cocoa-powder", name: "Cocoa Powder", price: 0 },
];

export const coffeeAddOns = {
  milk: milkOptions,
  extras: extraOptions,
  syrups: syrupOptions,
  toppings: toppingOptions,
};

export const nonCoffeeAddOns = {
  milk: milkOptions.filter(m => m.id !== "whole-milk"),
  toppings: toppingOptions,
};

export const mockProducts: Product[] = [
  // Coffee
  {
    id: "cappuccino",
    name: "Cappuccino",
    description: "The combination of coffee, milk, and palm sugar makes this drink have a delicious",
    price: 4.98,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop",
    category: "Coffee",
    hasSizes: true,
    addOns: [...extraOptions, ...syrupOptions.slice(0, 2), ...toppingOptions.slice(0, 2)],
  },
  {
    id: "coffee-latte",
    name: "Coffee Latte",
    description: "This caffe latte or coffee latte is one of the popular types of milk coffee",
    price: 5.98,
    image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=200&h=200&fit=crop",
    category: "Coffee",
    hasSizes: true,
    addOns: [...extraOptions, ...syrupOptions.slice(0, 2), ...toppingOptions.slice(0, 2)],
  },
  {
    id: "americano",
    name: "Americano",
    description: "Americano coffee is espresso drinks combined with hot water",
    price: 5.98,
    image: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=200&h=200&fit=crop",
    category: "Coffee",
    hasSizes: true,
    addOns: [...extraOptions, ...syrupOptions.slice(0, 2)],
  },
  {
    id: "v60",
    name: "V60",
    description: "The V60 technique is one of the most used techniques by barista",
    price: 5.98,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
    category: "Coffee",
    hasSizes: true,
    addOns: [...extraOptions],
  },
  {
    id: "espresso",
    name: "Espresso",
    description: "A concentrated form of coffee served in small, strong shots",
    price: 3.98,
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=200&h=200&fit=crop",
    category: "Coffee",
    hasSizes: true,
    addOns: [...extraOptions],
  },
  {
    id: "mocha",
    name: "Mocha",
    description: "A chocolate-flavoured variant of a caffè latte with cocoa powder",
    price: 6.48,
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=200&h=200&fit=crop",
    category: "Coffee",
    hasSizes: true,
    addOns: [...extraOptions, ...syrupOptions.slice(0, 2), ...toppingOptions],
  },
  // Non Coffee
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    description: "Creamy and smooth Japanese green tea latte",
    price: 5.48,
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=200&h=200&fit=crop",
    category: "Non Coffee",
    hasSizes: true,
    addOns: [...toppingOptions.slice(0, 2)],
  },
  {
    id: "chai-latte",
    name: "Chai Latte",
    description: "Spiced tea concentrate combined with steamed milk",
    price: 4.98,
    image: "https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?w=200&h=200&fit=crop",
    category: "Non Coffee",
    hasSizes: true,
    addOns: [...syrupOptions.slice(0, 2), ...toppingOptions.slice(0, 2)],
  },
  {
    id: "hot-chocolate",
    name: "Hot Chocolate",
    description: "Rich and creamy chocolate drink topped with marshmallows",
    price: 4.48,
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=200&h=200&fit=crop",
    category: "Non Coffee",
    hasSizes: true,
    addOns: [...toppingOptions],
  },
  {
    id: "fresh-orange-juice",
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice, no added sugar",
    price: 4.98,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=200&fit=crop",
    category: "Non Coffee",
    hasSizes: false,
  },
  // Food
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    description: "Smashed avocado on sourdough with cherry tomatoes and feta",
    price: 9.98,
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=200&h=200&fit=crop",
    category: "Food",
    hasSizes: false,
  },
  {
    id: "eggs-benedict",
    name: "Eggs Benedict",
    description: "Poached eggs on English muffin with hollandaise sauce",
    price: 12.98,
    image: "https://images.unsplash.com/photo-1608039829572-f0a9ccba7dc9?w=200&h=200&fit=crop",
    category: "Food",
    hasSizes: false,
  },
  {
    id: "club-sandwich",
    name: "Club Sandwich",
    description: "Triple decker with turkey, bacon, lettuce, and tomato",
    price: 11.48,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&h=200&fit=crop",
    category: "Food",
    hasSizes: false,
  },
  {
    id: "caesar-salad",
    name: "Caesar Salad",
    description: "Crisp romaine, parmesan, croutons, and caesar dressing",
    price: 10.48,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&h=200&fit=crop",
    category: "Food",
    hasSizes: false,
  },
  // Snacks
  {
    id: "croissant",
    name: "Butter Croissant",
    description: "Flaky, buttery French pastry baked fresh daily",
    price: 3.98,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=200&fit=crop",
    category: "Snack",
    hasSizes: false,
  },
  {
    id: "almond-croissant",
    name: "Almond Croissant",
    description: "Croissant filled with almond cream and topped with sliced almonds",
    price: 4.48,
    image: "https://images.unsplash.com/photo-1623334044303-241021148842?w=200&h=200&fit=crop",
    category: "Snack",
    hasSizes: false,
  },
  {
    id: "banana-bread",
    name: "Banana Bread",
    description: "Moist banana bread slice with walnuts",
    price: 3.48,
    image: "https://images.unsplash.com/photo-1605090930428-796f0deafc67?w=200&h=200&fit=crop",
    category: "Snack",
    hasSizes: false,
  },
  {
    id: "cookie",
    name: "Chocolate Chip Cookie",
    description: "Freshly baked cookie with dark chocolate chips",
    price: 2.98,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=200&fit=crop",
    category: "Snack",
    hasSizes: false,
  },
  // Desserts
  {
    id: "tiramisu",
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee-soaked ladyfingers",
    price: 7.98,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop",
    category: "Dessert",
    hasSizes: false,
  },
  {
    id: "cheesecake",
    name: "New York Cheesecake",
    description: "Creamy cheesecake with graham cracker crust",
    price: 6.98,
    image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=200&h=200&fit=crop",
    category: "Dessert",
    hasSizes: false,
  },
  {
    id: "brownie",
    name: "Fudge Brownie",
    description: "Rich chocolate brownie with a fudgy center",
    price: 4.98,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=200&fit=crop",
    category: "Dessert",
    hasSizes: false,
  },
  {
    id: "affogato",
    name: "Affogato",
    description: "Vanilla gelato drowned in a shot of hot espresso",
    price: 5.98,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=200&h=200&fit=crop",
    category: "Dessert",
    hasSizes: false,
  },
];

export const categories = ["Coffee", "Non Coffee", "Food", "Snack", "Dessert"] as const;
