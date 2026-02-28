"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BarChart3,
  ShoppingBag,
  ClipboardList,
  History,
  Settings,
  LogOut,
  Coffee,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useThemeStore, useAuthStore } from "@/store/useStore";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Summary", href: "/booking-summary", icon: BarChart3 },
  { label: "Online", href: "/online-bookings", icon: ShoppingBag },
  // { label: "Orders", href: "/orders", icon: ClipboardList, badge: 13 },
  { label: "History", href: "/history", icon: History },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { isDark, toggle } = useThemeStore();
  const { logout } = useAuthStore();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Icon only */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-16 flex-col border-r border-border bg-surface transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-14 items-center justify-center border-b border-border">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="Caffissimo" 
              className="h-full w-full object-contain drop-shadow-sm transition-all duration-300"
              style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    title={item.label}
                    className={cn(
                      "group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 mx-auto",
                      isActive
                        ? "bg-accent text-white"
                        : "text-text-muted hover:bg-surface-hover hover:text-text-primary"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-medium text-white">
                        {item.badge}
                      </span>
                    )}
                    
                    {/* Tooltip */}
                    <span className="absolute left-full ml-2 px-2 py-1 rounded bg-text-primary text-surface text-xs font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap z-50">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-border py-3 px-2 space-y-1">
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggle}
            title={isDark ? "Light mode" : "Dark mode"}
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-text-muted hover:bg-surface-hover hover:text-text-primary transition-all duration-200 mx-auto"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Sun className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Moon className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Tooltip */}
            <span className="absolute left-full ml-2 px-2 py-1 rounded bg-text-primary text-surface text-xs font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap z-50">
              {isDark ? "Light mode" : "Dark mode"}
            </span>
          </button>

          {/* Logout */}
          <button 
            onClick={logout}
            title="Log out"
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-text-muted hover:bg-surface-hover hover:text-text-primary transition-all duration-200 mx-auto"
          >
            <LogOut className="h-5 w-5" />
            
            {/* Tooltip */}
            <span className="absolute left-full ml-2 px-2 py-1 rounded bg-text-primary text-surface text-xs font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap z-50">
              Log out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

// Mobile menu button component
export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-1.5 -ml-1 text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface-hover"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
