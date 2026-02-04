"use client";

import React from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { OrdersTable } from "@/components/booking/OrdersTable";
import { mockHistoryOrders } from "@/data/mockOrders";
import { useLayout } from "../layout";

export default function HistoryPage() {
  const { openSidebar } = useLayout();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <TopBar
        title="Order History"
        showSearch={true}
        showFilter={true}
        onMenuClick={openSidebar}
      />

      <div className="p-4 sm:p-6">
        <OrdersTable orders={mockHistoryOrders} />
      </div>
    </motion.div>
  );
}
