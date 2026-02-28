"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import { useAuthStore } from "@/store/useStore";
import { PinPad } from "@/components/auth/PinPad";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LockScreen() {
  const { isLocked, unlock, logout } = useAuthStore();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleKeyPress = (key: string) => {
    if (pin.length < 8) {
      setPin((prev) => prev + key);
      setError(false);
    }
  };

  const handleUnlock = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (pin === "1234") {
      unlock();
      setPin(""); // reset for next time
    } else {
      setError(true);
      setPin("");
    }
  };

  /** 
   * The z-index is set to [999] so that it covers absolutely everything, 
   * including the sidebar, cart panel, and any open modals.
   */
  return (
    <AnimatePresence>
      {isLocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-sm bg-surface p-5 sm:p-6 rounded-3xl shadow-2xl border border-border"
          >
            <div className="flex flex-col items-center mb-4">
              <div className="h-12 w-12 bg-accent-light rounded-[14px] flex items-center justify-center mb-2">
                <Lock className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-text-primary">Terminal Locked</h2>
              <p className="text-sm text-text-muted mt-0.5 text-center">
                Enter your exact PIN to resume your session
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter PIN"
                  value={pin}
                  readOnly
                  className={cn(
                    "w-full h-12 text-center text-xl tracking-[0.4em] bg-surface-secondary border-2 cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors rounded-xl",
                    error ? "border-error text-error" : "border-border text-text-primary"
                  )}
                />
                <div className="h-5 mt-1 text-center">
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="text-xs font-medium text-error flex items-center justify-center gap-1.5"
                    >
                      Incorrect PIN
                    </motion.p>
                  )}
                </div>
              </div>

              <PinPad
                onKeyPress={handleKeyPress}
                onClear={() => { setPin(""); setError(false); }}
                onDelete={() => { setPin((prev) => prev.slice(0, -1)); setError(false); }}
              />

              <div className="space-y-2 pt-1">
                <Button
                  type="submit"
                  className="w-full h-10 text-sm font-semibold rounded-xl gap-2"
                  disabled={pin.length === 0}
                >
                  Unlock Session
                </Button>
                
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full h-9 text-xs text-text-muted hover:text-error hover:bg-red-500/10"
                  onClick={() => {
                    logout(); // Fully logs out, kicking them to /login
                  }}
                >
                  Sign in as different user
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
