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
  X,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: "Home page", href: "/", icon: Home },
  { label: "Booking Summary", href: "/booking-summary", icon: BarChart3 },
  { label: "Online Bookings", href: "/online-bookings", icon: ShoppingBag },
  { label: "Orders", href: "/orders", icon: ClipboardList, badge: 13 },
  { label: "History", href: "/history", icon: History },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

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

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-100 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between gap-3 px-4 lg:px-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light">
              <Coffee className="h-5 w-5 text-accent" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Caffissimo</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 -mr-2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-accent"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 rounded-xl bg-accent-light"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                    <Icon
                      className={cn(
                        "relative z-10 h-5 w-5 transition-colors",
                        isActive ? "text-accent" : "text-gray-400 group-hover:text-gray-600"
                      )}
                    />
                    <span className="relative z-10">{item.label}</span>
                    {item.badge && (
                      <span className="relative z-10 ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-medium text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-gray-100 p-3">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
            <LogOut className="h-5 w-5 text-gray-400" />
            <span>Log out</span>
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
      className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900"
    >
      <Menu className="h-6 w-6" />
    </button>
  );
}
