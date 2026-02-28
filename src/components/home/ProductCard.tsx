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
        className="group relative flex flex-col sm:flex-row rounded-2xl bg-surface shadow-card transition-shadow duration-200 hover:shadow-lg w-full overflow-hidden"
      >
        {/* Product Image */}
        <div className="relative w-full sm:w-[40%] xl:w-[35%] h-40 sm:h-auto overflow-hidden bg-surface-secondary flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow justify-between p-3 sm:p-4 min-w-0">
          <div className="space-y-2.5 min-w-0">
            <div className="flex items-start justify-between gap-1.5 min-w-0">
              <div className="min-w-0 flex-1 pr-2">
                <p className="text-xs font-medium text-text-muted mb-0.5 truncate">{product.category}</p>
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary leading-tight line-clamp-2">
                  {product.name}
                </h3>
              </div>
              {/* Customize Button */}
              {(hasCustomization || isCoffeeOrDrink) && (
                <Button
                  onClick={handleCustomize}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0 rounded-lg"
                >
                  <Settings2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Size Selector */}
            {product.hasSizes && (
              <div className="flex gap-1.5">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize(size);
                    }}
                    className={cn(
                      "flex items-center justify-center h-8 w-8 rounded-full text-xs font-medium transition-all duration-150",
                      selectedSize === size
                        ? "bg-text-primary text-surface"
                        : "bg-surface-secondary text-text-primary hover:bg-surface-hover"
                    )}
                  >
                    {size.charAt(0)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-text-primary">
                {formatCurrency(getPrice())}
              </span>
              
              {/* Quantity Selector Placeholder (visual only for now as requested by UI) */}
              <div className="flex items-center gap-2">
                <button className="h-6 w-6 rounded-full bg-surface-secondary flex items-center justify-center text-text-primary hover:bg-surface-hover transition-colors">
                  <span className="text-sm leading-none mt-[-2px]">-</span>
                </button>
                <span className="text-base font-medium w-3 text-center">0</span>
                <button className="h-6 w-6 rounded-full bg-text-primary flex items-center justify-center text-surface hover:bg-text-secondary transition-colors">
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Quick Add Button */}
            <motion.div
              initial={false}
              animate={isAdded ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.15 }}
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickAdd();
                }}
                disabled={isAdded}
                variant="outline"
                className={cn(
                  "w-full h-9 text-sm font-medium rounded-lg transition-all duration-150 border-border",
                  isAdded ? "bg-success text-white border-success" : "hover:bg-surface-secondary"
                )}
              >
                {isAdded ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1.5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5 mr-1.5" />
                    Add to Cart
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
