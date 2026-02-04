"use client";

import React from "react";
import { Search, SlidersHorizontal, Bell, Receipt } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MobileMenuButton } from "./Sidebar";
import { useCartStore } from "@/store/useStore";

interface TopBarProps {
  title?: string;
  showSearch?: boolean;
  showFilter?: boolean;
  onMenuClick?: () => void;
  onCartClick?: () => void;
  showCartButton?: boolean;
}

export function TopBar({
  title,
  showSearch = true,
  showFilter = true,
  onMenuClick,
  onCartClick,
  showCartButton = false,
}: TopBarProps) {
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-2 sm:gap-4 bg-cream/80 backdrop-blur-sm px-3 sm:px-4 lg:px-6 border-b border-border">
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        {onMenuClick && <MobileMenuButton onClick={onMenuClick} />}
        
        {title && (
          <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-text-primary truncate">
            {title}
          </h1>
        )}
        
        {showSearch && (
          <div className="relative flex-1 max-w-xs hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              type="text"
              placeholder="Search menu..."
              className="pl-10 h-9"
            />
          </div>
        )}

        {showFilter && (
          <Button variant="default" size="sm" className="gap-1.5 hidden sm:flex">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Filter</span>
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Mobile search button */}
        {showSearch && (
          <Button variant="ghost" size="icon-sm" className="sm:hidden">
            <Search className="h-4 w-4 text-text-muted" />
          </Button>
        )}

        {/* Mobile order panel button - only on small screens */}
        {showCartButton && (
          <Button
            variant="default"
            size="sm"
            className="md:hidden relative gap-1.5"
            onClick={onCartClick}
          >
            <Receipt className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="text-xs font-bold">
                ({itemCount})
              </span>
            )}
          </Button>
        )}

        <Button variant="ghost" size="icon-sm" className="relative hidden sm:flex">
          <Bell className="h-4 w-4 text-text-muted" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
        </Button>
        
        <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-medium text-text-primary">Albert Flores</p>
            <p className="text-xs text-text-muted">Cashier</p>
          </div>
          <div className="h-8 w-8 overflow-hidden rounded-full bg-surface-secondary flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
