"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { CustomizeModal } from "./CustomizeModal";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [showCustomize, setShowCustomize] = useState(false);

  const hasCustomization = product.hasSizes || (product.addOns && product.addOns.length > 0);
  const isCoffeeOrDrink = product.category === "Coffee" || product.category === "Non Coffee";

  const handleQuickAdd = () => {
    if (hasCustomization || isCoffeeOrDrink) {
      setShowCustomize(true);
    } else {
      // Quick add for items without customization
      addItem(product, undefined, []);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: index * 0.03 }}
        whileHover={{ y: -2 }}
        onClick={handleQuickAdd}
        className="group relative rounded-xl bg-surface p-2.5 sm:p-3 shadow-card transition-shadow duration-200 hover:shadow-lg cursor-pointer"
      >
        {/* Product Image */}
        <div className="relative mb-2 aspect-[4/3] overflow-hidden rounded-lg bg-surface-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              className="hidden group-hover:flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-lg"
            >
              <Plus className="h-5 w-5" />
            </motion.div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
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

          {/* Customizable indicator */}
          {(hasCustomization || isCoffeeOrDrink) && (
            <p className="text-xs text-accent font-medium">
              Tap to customize
            </p>
          )}
        </div>
      </motion.div>

      {/* Customize Modal */}
      <CustomizeModal
        product={product}
        open={showCustomize}
        onOpenChange={setShowCustomize}
      />
    </>
  );
}
