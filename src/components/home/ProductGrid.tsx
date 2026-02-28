"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  categoryTitle: string;
}

export function ProductGrid({ products, categoryTitle }: ProductGridProps) {
  return (
    <div>
      <h2 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4">
        {categoryTitle} menu
      </h2>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={categoryTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5"
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
