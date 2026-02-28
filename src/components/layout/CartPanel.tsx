"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, Receipt, X, AlertCircle } from "lucide-react";
import { useCartStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency, generateOrderId } from "@/lib/utils";
import { OrderType } from "@/types";
import { cn } from "@/lib/utils";
import { PaymentModal } from "./PaymentModal";
import { PinPad } from "@/components/auth/PinPad";

interface OrderPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function OrderPanel({ isOpen = true, onClose }: OrderPanelProps) {
  const {
    items,
    orderType,
    setOrderType,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getDiscount,
    getTotal,
  } = useCartStore();

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [supervisorKey, setSupervisorKey] = useState("");
  const [keyError, setKeyError] = useState(false);
  const orderId = React.useMemo(() => generateOrderId(), []);

  const handleClearSubmit = () => {
    if (supervisorKey === "1234") {
      clearCart();
      setIsClearModalOpen(false);
      setSupervisorKey("");
      setKeyError(false);
    } else {
      setKeyError(true);
      setSupervisorKey("");
    }
  };

  return (
    <>
      {/* Mobile Overlay (only on small screens) */}
      <AnimatePresence>
        {isOpen && onClose && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Order Panel - visible on md+ screens */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-screen w-full sm:w-72 lg:w-80 flex-col border-l border-border bg-surface transition-transform duration-300 ease-in-out",
          "md:translate-x-0 md:z-30",
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-3 lg:p-4">
          <div>
            <h2 className="text-base lg:text-lg font-semibold text-text-primary">Current Order</h2>
            <p className="text-xs lg:text-sm text-text-muted">Order {orderId}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-2 -mr-2 text-text-muted hover:text-text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Order Type Toggle */}
        {/* <div className="border-b border-border p-3 lg:p-4">
          <ToggleGroup
            type="single"
            value={orderType}
            onValueChange={(value) => value && setOrderType(value as OrderType)}
            className="w-full grid grid-cols-3"
          >
            <ToggleGroupItem value="Delivery" className="text-xs">
              Delivery
            </ToggleGroupItem>
            <ToggleGroupItem value="Dine in" className="text-xs">
              Dine in
            </ToggleGroupItem>
            <ToggleGroupItem value="Take away" className="text-xs">
              Take away
            </ToggleGroupItem>
          </ToggleGroup>
        </div> */}

        {/* Order Items */}
        <ScrollArea className="flex-1">
          <div className="p-3 lg:p-4">
            <AnimatePresence mode="popLayout">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-8 lg:py-12 text-center"
                >
                  <div className="mb-3 flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-surface-secondary">
                    <Receipt className="h-6 w-6 lg:h-8 lg:w-8 text-text-muted" />
                  </div>
                  <p className="text-sm font-medium text-text-primary">
                    No items in order
                  </p>
                  <p className="text-xs text-text-muted">
                    Tap products to add them
                  </p>
                </motion.div>
              ) : (
                <ul className="space-y-2">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-lg bg-surface-secondary p-2.5"
                    >
                      <div className="flex gap-2">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-surface">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <div className="min-w-0">
                              <h4 className="text-sm font-medium text-text-primary truncate">
                                {item.product.name}
                              </h4>
                              {item.size && (
                                <p className="text-xs text-text-muted">
                                  {item.size}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-0.5 text-text-muted hover:text-error transition-colors flex-shrink-0"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          
                          {/* Add-ons display */}
                          {item.selectedAddOns.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {item.selectedAddOns.map((addon) => (
                                <span
                                  key={addon.id}
                                  className="inline-flex items-center px-1.5 py-0.5 rounded bg-accent-light text-accent text-[10px] font-medium"
                                >
                                  {addon.name}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="mt-1.5 flex items-center justify-between">
                            <p className="text-sm font-semibold text-text-primary">
                              {formatCurrency(item.totalPrice / item.quantity)}
                            </p>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="flex h-5 w-5 items-center justify-center rounded bg-surface text-text-secondary shadow-sm hover:bg-surface-hover transition-colors"
                              >
                                <Minus className="h-2.5 w-2.5" />
                              </button>
                              <span className="w-4 text-center text-xs font-medium text-text-primary">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="flex h-5 w-5 items-center justify-center rounded bg-surface text-text-secondary shadow-sm hover:bg-surface-hover transition-colors"
                              >
                                <Plus className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Summary */}
        {items.length > 0 && (
          <div className="border-t border-border p-3 lg:p-4 space-y-3 safe-area-inset-bottom">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-xs lg:text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="font-medium text-text-primary">
                  {formatCurrency(getSubtotal())}
                </span>
              </div>
              {getDiscount() > 0 && (
                <div className="flex justify-between text-xs lg:text-sm text-success">
                  <span>Discount (10%)</span>
                  <span className="font-medium">
                    -{formatCurrency(getDiscount())}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-dashed border-border">
                <span className="font-medium text-text-primary">Total</span>
                <span className="text-base lg:text-lg font-semibold text-accent">
                  {formatCurrency(getTotal())}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                className="w-full" 
                size="default" 
                onClick={() => setIsPaymentOpen(true)}
              >
                Charge {formatCurrency(getTotal())}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-text-muted text-xs"
                onClick={() => setIsClearModalOpen(true)}
              >
                Clear Order
              </Button>
            </div>
          </div>
        )}
      </aside>

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={() => {
          clearCart();
          if (onClose) onClose();
        }}
        totalAmount={getTotal()}
      />

      {/* Clear Order Supervisor Key Modal */}
      <AnimatePresence>
        {isClearModalOpen && (
          <React.Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setIsClearModalOpen(false);
                setKeyError(false);
                setSupervisorKey("");
              }}
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-sm rounded-2xl bg-surface p-5 sm:p-6 shadow-2xl border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setIsClearModalOpen(false);
                    setKeyError(false);
                    setSupervisorKey("");
                  }}
                  className="absolute right-4 top-4 rounded-full p-1.5 text-text-muted hover:bg-surface-secondary hover:text-text-primary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-error">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-text-primary">
                    Clear Order
                  </h3>
                  <p className="mb-4 text-sm text-text-muted">
                    Enter supervisor key to clear this order.
                  </p>

                  <div className="w-full space-y-4">
                    <div>
                      <Input
                        type="password"
                        placeholder="Enter PIN"
                        value={supervisorKey}
                        readOnly
                        className={cn("w-full h-12 text-center text-xl tracking-[0.4em] bg-surface-secondary border-2 cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl", keyError ? "border-error text-error" : "border-border text-text-primary")}
                      />
                      {keyError && (
                        <p className="mt-1 text-xs text-error text-center">
                          Invalid supervisor key
                        </p>
                      )}
                    </div>

                    <PinPad
                      onKeyPress={(key) => {
                        if (supervisorKey.length < 8) {
                          setSupervisorKey((prev) => prev + key);
                          setKeyError(false);
                        }
                      }}
                      onClear={() => { setSupervisorKey(""); setKeyError(false); }}
                      onDelete={() => { setSupervisorKey((prev) => prev.slice(0, -1)); setKeyError(false); }}
                    />
                    
                    <div className="flex gap-3 pt-1 border-t border-border">
                      <Button
                        variant="ghost"
                        className="flex-1"
                        onClick={() => {
                          setIsClearModalOpen(false);
                          setKeyError(false);
                          setSupervisorKey("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="default"
                        className="flex-1 bg-error hover:bg-red-600 text-white border-0"
                        onClick={handleClearSubmit}
                        disabled={supervisorKey.length === 0}
                      >
                        Clear Order
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
}

// Keep backward compatibility
export { OrderPanel as CartPanel };
