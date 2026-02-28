"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { OrdersTable } from "@/components/booking/OrdersTable";
import { mockHistoryOrders } from "@/data/mockOrders";
import { useLayout } from "../layout";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/types";

type DateFilter = "all" | "today" | "week" | "month";
type StatusFilter = OrderStatus | "All";

export default function HistoryPage() {
  const { openSidebar } = useLayout();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const filteredOrders = useMemo(() => {
    return mockHistoryOrders.filter((order) => {
      // Status Filter
      if (statusFilter !== "All" && order.status !== statusFilter) {
        return false;
      }
      
      // Date Filter
      const orderDate = new Date(order.createdAt);
      const now = new Date();
      if (dateFilter === "today") {
        if (orderDate.toDateString() !== now.toDateString()) return false;
      } else if (dateFilter === "week") {
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        if (orderDate < oneWeekAgo) return false;
      } else if (dateFilter === "month") {
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        if (orderDate < oneMonthAgo) return false;
      }

      return true;
    });
  }, [dateFilter, statusFilter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen relative pb-10"
    >
      <TopBar
        title="Order History"
        showSearch={true}
        showFilter={true}
        onMenuClick={openSidebar}
        onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
      />

      {/* Filter Popover */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-4 sm:right-6 top-16 z-20 w-72 rounded-xl bg-surface p-4 shadow-lg border border-border"
          >
            <div className="space-y-4">
              {/* Status Filter */}
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-2">Status</h4>
                <div className="flex flex-wrap gap-2">
                  {["All", "Completed", "Cancelled", "Ready", "Preparing", "New"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status as StatusFilter)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                        statusFilter === status
                          ? "bg-text-primary text-surface"
                          : "bg-surface-secondary text-text-primary hover:bg-surface-hover"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Filter */}
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-2">Time Period</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "All Time", value: "all" },
                    { label: "Today", value: "today" },
                    { label: "This Week", value: "week" },
                    { label: "This Month", value: "month" },
                  ].map((period) => (
                    <button
                      key={period.value}
                      onClick={() => setDateFilter(period.value as DateFilter)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                        dateFilter === period.value
                          ? "bg-text-primary text-surface"
                          : "bg-surface-secondary text-text-primary hover:bg-surface-hover"
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-border flex justify-end">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full text-xs"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 sm:p-6">
        <OrdersTable orders={filteredOrders} />
        {filteredOrders.length === 0 && (
          <div className="text-center py-10 text-text-muted text-sm">
            No orders match the selected filters.
          </div>
        )}
      </div>
    </motion.div>
  );
}
