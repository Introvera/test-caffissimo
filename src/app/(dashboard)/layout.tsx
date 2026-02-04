"use client";

import { useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { OrderPanel } from "@/components/layout/CartPanel";

interface LayoutContextType {
  openSidebar: () => void;
  openOrder: () => void;
  showOrderPanel: boolean;
}

export const LayoutContext = createContext<LayoutContextType>({
  openSidebar: () => {},
  openOrder: () => {},
  showOrderPanel: false,
});

export const useLayout = () => useContext(LayoutContext);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  
  const showOrderPanel = pathname === "/";

  return (
    <LayoutContext.Provider
      value={{
        openSidebar: () => setSidebarOpen(true),
        openOrder: () => setOrderOpen(true),
        showOrderPanel,
      }}
    >
      <div className="min-h-screen bg-cream">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main
          className={`min-h-screen transition-all duration-300 lg:ml-64 ${
            showOrderPanel ? "md:mr-72 lg:mr-80" : ""
          }`}
        >
          {children}
        </main>
        {showOrderPanel && (
          <OrderPanel isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
        )}
      </div>
    </LayoutContext.Provider>
  );
}
