"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { OrderPanel } from "@/components/layout/CartPanel";
import { useAuthStore } from "@/store/useStore";
import { LockScreen } from "@/components/auth/LockScreen";

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
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  
  const { isAuthenticated, lock, isLocked } = useAuthStore();

  const showOrderPanel = pathname === "/";

  // Auth Guard
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  // Idle Timer logic
  useEffect(() => {
    if (!isAuthenticated || isLocked) return;

    let timeoutId: NodeJS.Timeout;

    const handleActivity = () => {
      clearTimeout(timeoutId);
      // Set to 300 seconds (5 minutes)
      timeoutId = setTimeout(() => {
        lock();
      }, 300 * 1000); 
    };

    // Attach event listeners for activity tracking
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("touchstart", handleActivity);

    // Initial load
    handleActivity();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
    };
  }, [isAuthenticated, isLocked, lock]);

  if (!isAuthenticated) {
    return null; // Return nothing while redirecting
  }

  return (
    <LayoutContext.Provider
      value={{
        openSidebar: () => setSidebarOpen(true),
        openOrder: () => setOrderOpen(true),
        showOrderPanel,
      }}
    >
      <LockScreen />
      <div className="min-h-screen bg-cream relative">
        {/* Centered Watermark Logo */}
        <div 
          className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.33] dark:opacity-[0.33]"
        >
          <img 
            src="/logo.png" 
            alt="" 
            className="w-[30rem] h-auto grayscale object-contain"
          />
        </div>

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main
          className={`relative z-10 min-h-screen transition-all duration-300 lg:ml-16 ${
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
