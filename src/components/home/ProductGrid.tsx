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
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
        {categoryTitle} menu
      </h2>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={categoryTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3"
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
