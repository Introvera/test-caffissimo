"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Check } from "lucide-react";
import { Product, Size, AddOn } from "@/types";
import { useCartStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index: number;
}

const sizes: Size[] = ["Small", "Medium", "Large"];

export function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<Size>("Small");
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToOrder = () => {
    addItem(
      product,
      product.hasSizes ? selectedSize : undefined,
      selectedAddOns
    );
    
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1);
      setSelectedAddOns([]);
    }, 1200);
  };

  const toggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.id === addOn.id)
        ? prev.filter((a) => a.id !== addOn.id)
        : [...prev, addOn]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      whileHover={{ y: -2 }}
      className="group relative rounded-xl bg-surface p-2.5 sm:p-3 shadow-card transition-shadow duration-200 hover:shadow-lg"
    >
      {/* Product Image - smaller aspect ratio */}
      <div className="relative mb-2 aspect-[4/3] overflow-hidden rounded-lg bg-surface-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-1">
          <h3 className="font-medium text-text-primary text-xs sm:text-sm leading-tight line-clamp-1">
            {product.name}
          </h3>
          <span className="text-accent font-semibold whitespace-nowrap text-xs sm:text-sm">
            {formatCurrency(product.price)}
          </span>
        </div>
        
        <p className="text-xs text-text-muted line-clamp-1 leading-relaxed hidden sm:block">
          {product.description}
        </p>

        {/* Size Selector - compact */}
        {product.hasSizes && (
          <div className="flex gap-1">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "flex-1 py-1 rounded text-xs font-medium transition-all duration-150",
                  selectedSize === size
                    ? "bg-text-primary text-surface"
                    : "bg-surface-secondary text-text-secondary hover:bg-surface-hover"
                )}
              >
                {size.charAt(0)}
              </button>
            ))}
          </div>
        )}

        {/* Quantity & Add to Order - compact */}
        <div className="flex items-center justify-between pt-1.5 border-t border-border">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-6 w-6 items-center justify-center rounded bg-surface-secondary text-text-secondary hover:bg-surface-hover transition-colors"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-5 text-center font-medium text-xs text-text-primary">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-6 w-6 items-center justify-center rounded bg-surface-secondary text-text-secondary hover:bg-surface-hover transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <motion.div
            initial={false}
            animate={isAdded ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.15 }}
          >
            <Button
              onClick={handleAddToOrder}
              disabled={isAdded}
              variant={isAdded ? "success" : "default"}
              size="sm"
              className={cn(
                "h-7 px-2 text-xs transition-all duration-150",
                isAdded && "bg-success hover:bg-success"
              )}
            >
              {isAdded ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                "Add"
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
