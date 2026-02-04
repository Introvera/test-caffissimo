"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Check, Coffee, Droplets, Sparkles, Cherry } from "lucide-react";
import { Product, Size, AddOn } from "@/types";
import { useCartStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn, formatCurrency } from "@/lib/utils";
import { milkOptions, extraOptions, syrupOptions, toppingOptions } from "@/data/mockProducts";

interface CustomizeModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const sizes: Size[] = ["Small", "Medium", "Large"];

interface AddOnSection {
  id: string;
  title: string;
  icon: React.ElementType;
  options: AddOn[];
  multiSelect: boolean;
}

export function CustomizeModal({ product, open, onOpenChange }: CustomizeModalProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<Size>("Medium");
  const [selectedMilk, setSelectedMilk] = useState<AddOn | null>(milkOptions[0]);
  const [selectedExtras, setSelectedExtras] = useState<AddOn[]>([]);
  const [selectedSyrups, setSelectedSyrups] = useState<AddOn[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<AddOn[]>([]);

  const isCoffee = product.category === "Coffee";
  const hasAddOns = product.addOns && product.addOns.length > 0;

  // Build sections based on product type
  const sections: AddOnSection[] = useMemo(() => {
    const result: AddOnSection[] = [];
    
    if (isCoffee) {
      result.push({
        id: "milk",
        title: "Milk",
        icon: Droplets,
        options: milkOptions,
        multiSelect: false,
      });
      result.push({
        id: "extras",
        title: "Espresso",
        icon: Coffee,
        options: extraOptions,
        multiSelect: true,
      });
    }
    
    if (hasAddOns || isCoffee) {
      result.push({
        id: "syrups",
        title: "Syrups",
        icon: Sparkles,
        options: syrupOptions,
        multiSelect: true,
      });
      result.push({
        id: "toppings",
        title: "Toppings",
        icon: Cherry,
        options: toppingOptions,
        multiSelect: true,
      });
    }
    
    return result;
  }, [isCoffee, hasAddOns]);

  const calculateTotal = () => {
    let price = product.price;
    
    // Size adjustment
    if (product.hasSizes) {
      if (selectedSize === "Medium") price += 0.50;
      if (selectedSize === "Large") price += 1.00;
    }
    
    // Milk
    if (selectedMilk) price += selectedMilk.price;
    
    // Extras
    selectedExtras.forEach((e) => (price += e.price));
    selectedSyrups.forEach((s) => (price += s.price));
    selectedToppings.forEach((t) => (price += t.price));
    
    return price * quantity;
  };

  const handleAddToOrder = () => {
    const allAddOns = [
      ...(selectedMilk && selectedMilk.price > 0 ? [selectedMilk] : []),
      ...selectedExtras,
      ...selectedSyrups,
      ...selectedToppings,
    ];
    
    addItem(
      product,
      product.hasSizes ? selectedSize : undefined,
      allAddOns
    );
    
    // Reset and close
    onOpenChange(false);
    setQuantity(1);
    setSelectedSize("Medium");
    setSelectedMilk(milkOptions[0]);
    setSelectedExtras([]);
    setSelectedSyrups([]);
    setSelectedToppings([]);
  };

  const toggleOption = (
    option: AddOn,
    selected: AddOn[],
    setSelected: React.Dispatch<React.SetStateAction<AddOn[]>>
  ) => {
    if (selected.some((s) => s.id === option.id)) {
      setSelected(selected.filter((s) => s.id !== option.id));
    } else {
      setSelected([...selected, option]);
    }
  };

  const getSelectedForSection = (sectionId: string): AddOn[] => {
    switch (sectionId) {
      case "extras": return selectedExtras;
      case "syrups": return selectedSyrups;
      case "toppings": return selectedToppings;
      default: return [];
    }
  };

  const getSetterForSection = (sectionId: string) => {
    switch (sectionId) {
      case "extras": return setSelectedExtras;
      case "syrups": return setSelectedSyrups;
      case "toppings": return setSelectedToppings;
      default: return () => {};
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Customize Order</DialogTitle>
        </DialogHeader>

        {/* Product Info */}
        <div className="flex gap-4 pb-4 border-b border-border">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-surface-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary text-lg">{product.name}</h3>
            <p className="text-sm text-text-muted line-clamp-2">{product.description}</p>
            <p className="text-accent font-semibold mt-1">{formatCurrency(product.price)}</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-4 py-2 -mx-6 px-6">
          {/* Size Selection */}
          {product.hasSizes && (
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Size</h4>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "py-2.5 rounded-xl text-sm font-medium transition-all duration-150 border-2",
                      selectedSize === size
                        ? "bg-accent text-white border-accent"
                        : "bg-surface-secondary text-text-secondary border-transparent hover:border-border"
                    )}
                  >
                    {size}
                    {size === "Medium" && <span className="block text-xs opacity-70">+$0.50</span>}
                    {size === "Large" && <span className="block text-xs opacity-70">+$1.00</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Selection (single select) */}
          {isCoffee && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4 text-text-muted" />
                <h4 className="text-sm font-medium text-text-primary">Milk</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {milkOptions.map((milk) => (
                  <button
                    key={milk.id}
                    onClick={() => setSelectedMilk(milk)}
                    className={cn(
                      "flex items-center justify-between py-2 px-3 rounded-xl text-sm transition-all duration-150 border-2",
                      selectedMilk?.id === milk.id
                        ? "bg-accent-light text-accent border-accent"
                        : "bg-surface-secondary text-text-secondary border-transparent hover:border-border"
                    )}
                  >
                    <span>{milk.name}</span>
                    {milk.price > 0 && (
                      <span className="text-xs text-text-muted">+{formatCurrency(milk.price)}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Other Add-on Sections (multi-select) */}
          {sections
            .filter((s) => s.id !== "milk")
            .map((section) => {
              const Icon = section.icon;
              const selected = getSelectedForSection(section.id);
              const setter = getSetterForSection(section.id);
              
              return (
                <div key={section.id}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-text-muted" />
                    <h4 className="text-sm font-medium text-text-primary">{section.title}</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {section.options.map((option) => {
                      const isSelected = selected.some((s) => s.id === option.id);
                      return (
                        <button
                          key={option.id}
                          onClick={() => toggleOption(option, selected, setter)}
                          className={cn(
                            "flex items-center justify-between py-2 px-3 rounded-xl text-sm transition-all duration-150 border-2",
                            isSelected
                              ? "bg-accent-light text-accent border-accent"
                              : "bg-surface-secondary text-text-secondary border-transparent hover:border-border"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            {isSelected && <Check className="h-3.5 w-3.5" />}
                            {option.name}
                          </span>
                          {option.price > 0 && (
                            <span className="text-xs text-text-muted">+{formatCurrency(option.price)}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Footer */}
        <div className="border-t border-border pt-4 space-y-3">
          {/* Quantity */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-secondary text-text-secondary hover:bg-surface-hover transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-semibold text-text-primary">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-secondary text-text-secondary hover:bg-surface-hover transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add Button */}
          <Button onClick={handleAddToOrder} className="w-full" size="lg">
            Add to Order · {formatCurrency(calculateTotal())}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
