"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { categories } from "@/data/mockProducts";

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 -mx-3 px-3 sm:mx-0 sm:px-0 scrollbar-hide">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category as Category)}
            className={cn(
              "relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap flex-shrink-0",
              isActive
                ? "text-white"
                : "text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="category-pill"
                className="absolute inset-0 rounded-full bg-accent"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
