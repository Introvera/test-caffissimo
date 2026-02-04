"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { useLayout } from "../layout";

export default function OrdersPage() {
  const { openSidebar } = useLayout();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <TopBar
        title="Orders"
        showSearch={true}
        showFilter={true}
        onMenuClick={openSidebar}
      />

      <div className="p-4 sm:p-6">
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4">
          <div className="mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-accent-light">
            <ClipboardList className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-text-primary mb-2">
            Orders Management
          </h2>
          <p className="text-sm sm:text-base text-text-muted max-w-md">
            This page will display all active orders being prepared in the kitchen.
            Track order progress and manage fulfillment in real-time.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
