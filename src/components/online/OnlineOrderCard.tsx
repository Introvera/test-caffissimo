"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MessageSquare, ChevronRight, AlertCircle, X } from "lucide-react";
import { OnlineOrder, OrderStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [supervisorKey, setSupervisorKey] = useState("");
  const [keyError, setKeyError] = useState(false);

  const handleAction = () => {
    const nextStatus = statusFlow[order.status];
    if (nextStatus) {
      updateOrderStatus(order.id, nextStatus);
    }
  };

  const handleRejectClick = () => {
    setIsRejectModalOpen(true);
  };

  const submitReject = () => {
    if (supervisorKey === "1234") { // Simple mock key validation
      updateOrderStatus(order.id, "Cancelled");
      setIsRejectModalOpen(false);
      setSupervisorKey("");
      setKeyError(false);
    } else {
      setKeyError(true);
    }
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
                onClick={handleRejectClick}
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

      {/* Reject Modal */}
      <AnimatePresence>
        {isRejectModalOpen && (
          <React.Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setIsRejectModalOpen(false);
                setKeyError(false);
                setSupervisorKey("");
              }}
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-sm rounded-2xl bg-surface p-6 shadow-2xl border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setIsRejectModalOpen(false);
                    setKeyError(false);
                    setSupervisorKey("");
                  }}
                  className="absolute right-4 top-4 rounded-full p-1.5 text-text-muted hover:bg-surface-secondary hover:text-text-primary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-error">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-text-primary">
                    Reject Order
                  </h3>
                  <p className="mb-6 text-sm text-text-muted">
                    This action requires supervisor approval. Please enter the supervisor key to continue.
                  </p>

                  <div className="w-full space-y-5">
                    <div>
                      <Input
                        type="password"
                        placeholder="Enter Supervisor Key"
                        value={supervisorKey}
                        readOnly
                        className={cn("w-full text-center tracking-[0.5em] text-lg h-12 bg-surface-secondary cursor-default focus-visible:ring-0 focus-visible:ring-offset-0", keyError && "border-error text-error")}
                        autoFocus
                      />
                      {keyError && (
                        <p className="mt-1.5 text-xs text-error text-center w-full">
                          Invalid supervisor key
                        </p>
                      )}
                    </div>

                    {/* Number Pad */}
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <Button
                          key={num}
                          type="button"
                          variant="outline"
                          className="h-12 text-lg font-medium rounded-xl border-border bg-surface hover:bg-surface-secondary"
                          onClick={() => {
                            setSupervisorKey((prev) => prev.length < 8 ? prev + num : prev);
                            setKeyError(false);
                          }}
                        >
                          {num}
                        </Button>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        className="h-12 text-sm font-medium rounded-xl border-border bg-surface hover:bg-surface-secondary text-text-muted"
                        onClick={() => {
                          setSupervisorKey("");
                          setKeyError(false);
                        }}
                      >
                        Clear
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-12 text-lg font-medium rounded-xl border-border bg-surface hover:bg-surface-secondary"
                        onClick={() => {
                          setSupervisorKey((prev) => prev.length < 8 ? prev + "0" : prev);
                          setKeyError(false);
                        }}
                      >
                        0
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-12 text-sm font-medium rounded-xl border-border bg-surface hover:bg-surface-secondary text-text-muted"
                        onClick={() => {
                          setSupervisorKey((prev) => prev.slice(0, -1));
                          setKeyError(false);
                        }}
                      >
                        Del
                      </Button>
                    </div>
                    
                    <div className="flex gap-3 pt-2 border-t border-border">
                      <Button
                        variant="ghost"
                        className="flex-1"
                        onClick={() => {
                          setIsRejectModalOpen(false);
                          setKeyError(false);
                          setSupervisorKey("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="default"
                        className="flex-1 bg-error hover:bg-red-600 text-white border-0"
                        onClick={submitReject}
                        disabled={supervisorKey.length === 0}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
