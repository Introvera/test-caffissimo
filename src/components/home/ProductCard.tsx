"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check, Settings2 } from "lucide-react";
import { Product, Size } from "@/types";
import { useCartStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { CustomizeModal } from "./CustomizeModal";

interface ProductCardProps {
  product: Product;
  index: number;
}

const sizes: Size[] = ["Small", "Medium", "Large"];

export function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState<Size>("Medium");
  const [showCustomize, setShowCustomize] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const hasCustomization = product.addOns && product.addOns.length > 0;
  const isCoffeeOrDrink = product.category === "Coffee" || product.category === "Non Coffee";

  const getPrice = () => {
    let price = product.price;
    if (product.hasSizes) {
      if (selectedSize === "Medium") price += 0.50;
      if (selectedSize === "Large") price += 1.00;
    }
    return price;
  };

  const handleQuickAdd = () => {
    addItem(product, product.hasSizes ? selectedSize : undefined, []);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleCustomize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCustomize(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: index * 0.03 }}
        whileHover={{ y: -2 }}
        className="group relative rounded-xl bg-surface p-2.5 sm:p-3 shadow-card transition-shadow duration-200 hover:shadow-lg"
      >
        {/* Product Image */}
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
              {formatCurrency(getPrice())}
            </span>
          </div>
          
          <p className="text-xs text-text-muted line-clamp-1 leading-relaxed hidden sm:block">
            {product.description}
          </p>

          {/* Size Selector */}
          {product.hasSizes && (
            <div className="flex gap-1">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
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

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 pt-1">
            {/* Customize Button (for items with add-ons) */}
            {(hasCustomization || isCoffeeOrDrink) && (
              <Button
                onClick={handleCustomize}
                variant="outline"
                size="sm"
                className="h-7 px-2 text-xs flex-1"
              >
                <Settings2 className="h-3 w-3 mr-1" />
                Customize
              </Button>
            )}
            
            {/* Quick Add Button */}
            <motion.div
              initial={false}
              animate={isAdded ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.15 }}
              className={cn(hasCustomization || isCoffeeOrDrink ? "" : "flex-1")}
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickAdd();
                }}
                disabled={isAdded}
                variant={isAdded ? "success" : "default"}
                size="sm"
                className={cn(
                  "h-7 text-xs transition-all duration-150",
                  hasCustomization || isCoffeeOrDrink ? "px-2" : "w-full"
                )}
              >
                {isAdded ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" />
                    {!(hasCustomization || isCoffeeOrDrink) && <span className="ml-1">Add</span>}
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Customize Modal */}
      <CustomizeModal
        product={product}
        open={showCustomize}
        onOpenChange={setShowCustomize}
        initialSize={selectedSize}
      />
    </>
  );
}
