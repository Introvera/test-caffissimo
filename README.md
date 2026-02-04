# Caffissimo - Coffee Shop POS System

A modern, aesthetic Point of Sale (POS) system UI for a coffee shop, built with Next.js 16, React 19, TypeScript, and TailwindCSS.

![Caffissimo POS](https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=400&fit=crop)

## Features

- **Home Page**: Browse products by category with a responsive grid layout
- **Cart System**: Add items with size options, quantity controls, and add-ons
- **Order Types**: Toggle between Delivery, Dine-in, and Take-away
- **Booking Summary**: View sales analytics with KPI cards and charts
- **Online Bookings**: Manage Uber Eats and DoorDash orders with status workflow
- **Smooth Animations**: Page transitions, micro-interactions, and list animations

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: Radix UI primitives (shadcn/ui style)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/           # Dashboard layout group
│   │   ├── page.tsx           # Home page
│   │   ├── booking-summary/   # Sales analytics
│   │   ├── online-bookings/   # Uber/DoorDash orders
│   │   ├── orders/            # Active orders
│   │   ├── history/           # Order history
│   │   └── settings/          # App settings
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Design tokens & global styles
├── components/
│   ├── ui/                    # Base UI components (Button, Badge, Tabs, etc.)
│   ├── layout/                # Layout components (Sidebar, TopBar, CartPanel)
│   ├── home/                  # Home page components
│   ├── booking/               # Booking summary components
│   └── online/                # Online orders components
├── data/
│   ├── mockProducts.ts        # Product catalog
│   └── mockOrders.ts          # Sample orders & generators
├── store/
│   └── useStore.ts            # Zustand stores (cart, online orders)
├── types/
│   └── index.ts               # TypeScript interfaces
└── lib/
    └── utils.ts               # Utility functions
```

## Design Tokens

The design system uses a warm, premium color palette:

- **Base**: Cream (#faf8f5) / Beige (#f0ebe3)
- **Accent**: Caramel/Orange (#e07c3f)
- **Surfaces**: White with soft shadows
- **Borders**: Subtle gray (#e5e5e5)
- **Platform Colors**: Uber Eats Green (#06c167), DoorDash Red (#ff3008)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Key Interactions

### Home Page
- Click category pills to filter products
- Select size (Small/Medium/Large) for coffee items
- Toggle add-ons like "Extra Shot" or "Oat Milk"
- Use +/- buttons to adjust quantity
- Click "Add to Cart" to add items

### Cart Panel
- Toggle order type (Delivery/Dine-in/Take-away)
- Adjust item quantities or remove items
- View automatic discounts (10% off orders over $20)
- Click "Place an order" to complete

### Booking Summary
- Switch between Online/On-site sales tabs
- Filter by Today/This Week/This Month
- View KPI cards and sales charts

### Online Bookings
- Click "Simulate New Order" to add random orders
- Progress orders through: New → Preparing → Ready → Completed
- Reject orders if needed

## License

MIT
