"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Banknote, CheckCircle2, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  totalAmount: number;
}

type PaymentState = "idle" | "processing" | "success";
type PaymentMethod = "card" | "cash" | null;

export function PaymentModal({ isOpen, onClose, onSuccess, totalAmount }: PaymentModalProps) {
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setPaymentState("idle");
        setSelectedMethod(null);
      }, 300);
    }
  }, [isOpen]);

  const handlePaymentSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setPaymentState("processing");

    // Simulate payment processing
    setTimeout(() => {
      setPaymentState("success");
      
      // Auto close/success after a moment
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={paymentState === "idle" ? onClose : undefined}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm rounded-3xl bg-surface p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              {paymentState === "idle" && (
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-full p-2 text-text-muted hover:bg-surface-secondary hover:text-text-primary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              <div className="flex flex-col items-center justify-center min-h-[240px]">
                {/* IDLE STATE: Choose Payment Method */}
                {paymentState === "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex w-full flex-col items-center"
                  >
                    <h2 className="mb-2 text-2xl font-bold text-text-primary">
                      Payment Method
                    </h2>
                    <p className="mb-8 text-text-muted">
                      How would you like to pay?
                    </p>

                    <div className="grid w-full grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="flex h-24 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-border hover:border-accent hover:bg-accent-light"
                        onClick={() => handlePaymentSelect("card")}
                      >
                        <CreditCard className="h-8 w-8 text-accent" />
                        <span className="font-semibold text-text-primary">Card</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex h-24 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-border hover:border-accent hover:bg-accent-light"
                        onClick={() => handlePaymentSelect("cash")}
                      >
                        <Banknote className="h-8 w-8 text-success" />
                        <span className="font-semibold text-text-primary">Cash</span>
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* PROCESSING STATE */}
                {paymentState === "processing" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <Loader2 className="mb-6 h-12 w-12 animate-spin text-accent" />
                    <h3 className="mb-2 text-xl font-semibold text-text-primary">
                      Processing Payment...
                    </h3>
                    <p className="text-sm text-text-muted pb-4">
                      Don&apos;t close this window
                    </p>
                    {selectedMethod && (
                      <div className="rounded-full bg-surface-secondary px-4 py-1.5 text-xs font-medium text-text-primary uppercase tracking-wider">
                        {selectedMethod} selected
                      </div>
                    )}
                  </motion.div>
                )}

                {/* SUCCESS STATE */}
                {paymentState === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                    >
                      <CheckCircle2 className="mb-6 h-16 w-16 text-success" />
                    </motion.div>
                    <h3 className="mb-2 text-2xl font-bold text-text-primary">
                      Success!
                    </h3>
                    <p className="text-text-muted">
                      Payment of <strong>${totalAmount.toFixed(2)}</strong> completed.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
