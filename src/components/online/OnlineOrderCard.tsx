"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, MessageSquare, ChevronRight } from "lucide-react";
import { OnlineOrder, OrderStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatTime } from "@/lib/utils";
import { useOnlineOrdersStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

interface OnlineOrderCardProps {
  order: OnlineOrder;
  index: number;
}

const statusVariant = {
  New: "warning",
  Preparing: "info",
  Ready: "success",
  Completed: "default",
  Cancelled: "error",
} as const;

const statusFlow: Record<OrderStatus, OrderStatus | null> = {
  New: "Preparing",
  Preparing: "Ready",
  Ready: "Completed",
  Completed: null,
  Cancelled: null,
};

const actionLabels: Record<OrderStatus, string> = {
  New: "Accept",
  Preparing: "Ready",
  Ready: "Complete",
  Completed: "Done",
  Cancelled: "Cancelled",
};

export function OnlineOrderCard({ order, index }: OnlineOrderCardProps) {
  const updateOrderStatus = useOnlineOrdersStore(
    (state) => state.updateOrderStatus
  );

  const handleAction = () => {
    const nextStatus = statusFlow[order.status];
    if (nextStatus) {
      updateOrderStatus(order.id, nextStatus);
    }
  };

  const handleReject = () => {
    updateOrderStatus(order.id, "Cancelled");
  };

  const isUber = order.platform === "UBER_EATS";
  const isFinished = order.status === "Completed" || order.status === "Cancelled";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "rounded-xl sm:rounded-2xl bg-surface p-3 sm:p-4 shadow-card transition-all duration-200",
        order.status === "New" && "ring-2 ring-warning ring-offset-2 ring-offset-cream",
        isFinished && "opacity-60"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={cn(
              "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl font-bold text-white text-xs flex-shrink-0",
              isUber ? "bg-uber" : "bg-doordash"
            )}
          >
            {isUber ? "UE" : "DD"}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-text-primary text-sm sm:text-base truncate">
              {order.orderId}
            </p>
            <div className="flex items-center gap-1 text-xs text-text-muted">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span>{formatTime(order.time)}</span>
            </div>
          </div>
        </div>
        <Badge variant={statusVariant[order.status]} className="flex-shrink-0">
          {order.status}
        </Badge>
      </div>

      {/* Items */}
      <div className="mb-2 sm:mb-3 space-y-1">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-text-secondary truncate">
              {item.quantity}x {item.name}
              {item.notes && (
                <span className="text-text-muted ml-1">({item.notes})</span>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Notes */}
      {order.customerNotes && (
        <div className="mb-2 sm:mb-3 flex items-start gap-2 rounded-lg bg-amber-500/10 p-2 text-xs text-amber-600 dark:text-amber-400">
          <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-2">{order.customerNotes}</span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border pt-2 sm:pt-3">
        <p className="text-base sm:text-lg font-semibold text-text-primary">
          {formatCurrency(order.total)}
        </p>

        {!isFinished && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            {order.status === "New" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReject}
                className="text-error hover:text-error hover:bg-red-500/10 text-xs sm:text-sm px-2 sm:px-3"
              >
                Reject
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleAction}
              variant={order.status === "New" ? "success" : "default"}
              className="gap-1 text-xs sm:text-sm px-2 sm:px-3"
            >
              {actionLabels[order.status]}
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
