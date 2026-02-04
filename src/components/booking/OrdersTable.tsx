"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types";
import { formatCurrency, formatTime } from "@/lib/utils";

interface OrdersTableProps {
  orders: Order[];
}

const statusVariant = {
  Completed: "success",
  Cancelled: "error",
  Preparing: "warning",
  Ready: "info",
  New: "accent",
} as const;

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="rounded-xl sm:rounded-2xl bg-surface shadow-card overflow-hidden"
    >
      <div className="p-4 sm:p-6 border-b border-border">
        <h3 className="text-base sm:text-lg font-semibold text-text-primary">Recent Orders</h3>
      </div>
      
      {/* Mobile Card View */}
      <div className="sm:hidden divide-y divide-border">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">{order.id}</span>
              <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">{order.orderType}</span>
              <span className="text-text-muted">{formatTime(order.createdAt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">Total</span>
              <span className="text-sm font-semibold text-text-primary">
                {formatCurrency(order.total)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Time
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {orders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="hover:bg-surface-hover transition-colors"
              >
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-text-primary">
                    {order.id}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-text-muted">{order.orderType}</span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-text-muted">
                    {formatTime(order.createdAt)}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <Badge variant={statusVariant[order.status]}>
                    {order.status}
                  </Badge>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-sm font-semibold text-text-primary">
                    {formatCurrency(order.total)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
