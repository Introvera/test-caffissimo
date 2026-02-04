"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { CategoryTabs } from "@/components/home/CategoryTabs";
import { ProductGrid } from "@/components/home/ProductGrid";
import { mockProducts } from "@/data/mockProducts";
import { Category } from "@/types";
import { useLayout } from "./layout";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Coffee");
  const { openSidebar, openOrder, showOrderPanel } = useLayout();

  const filteredProducts = useMemo(
    () => mockProducts.filter((product) => product.category === activeCategory),
    [activeCategory]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <TopBar
        onMenuClick={openSidebar}
        onCartClick={openOrder}
        showCartButton={showOrderPanel}
      />
      
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <ProductGrid
          products={filteredProducts}
          categoryTitle={activeCategory}
        />
      </div>
    </motion.div>
  );
}
