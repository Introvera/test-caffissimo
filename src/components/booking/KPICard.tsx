"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: number;
  format?: "currency" | "number";
  change?: number;
  icon: LucideIcon;
  index: number;
}

export function KPICard({
  title,
  value,
  format = "number",
  change,
  icon: Icon,
  index,
}: KPICardProps) {
  const isPositive = change && change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="rounded-xl sm:rounded-2xl bg-surface p-4 sm:p-6 shadow-card"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-text-muted truncate">{title}</p>
          <p className="mt-1 sm:mt-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-text-primary">
            {format === "currency" ? formatCurrency(value) : value.toLocaleString()}
          </p>
          {change !== undefined && (
            <div
              className={cn(
                "mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm font-medium",
                isPositive ? "text-success" : "text-error"
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              ) : (
                <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              )}
              <span className="truncate">
                {isPositive ? "+" : ""}
                {change}%
                <span className="hidden sm:inline"> from last week</span>
              </span>
            </div>
          )}
        </div>
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-accent-light flex-shrink-0 ml-2">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
        </div>
      </div>
    </motion.div>
  );
}
