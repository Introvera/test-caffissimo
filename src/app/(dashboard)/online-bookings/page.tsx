"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Truck, Package } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { OnlineOrderCard } from "@/components/online/OnlineOrderCard";
import { useOnlineOrdersStore } from "@/store/useStore";
import { Badge } from "@/components/ui/badge";
import { useLayout } from "../layout";

export default function OnlineBookingsPage() {
  const { orders, simulateNewOrder } = useOnlineOrdersStore();
  const { openSidebar } = useLayout();

  const uberOrders = orders.filter((o) => o.platform === "UBER_EATS");
  const doordashOrders = orders.filter((o) => o.platform === "DOORDASH");

  const activeUberOrders = uberOrders.filter(
    (o) => o.status !== "Completed" && o.status !== "Cancelled"
  );
  const activeDoordashOrders = doordashOrders.filter(
    (o) => o.status !== "Completed" && o.status !== "Cancelled"
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <TopBar
        title="Online Bookings"
        showSearch={false}
        showFilter={false}
        onMenuClick={openSidebar}
      />

      <div className="p-4 sm:p-6">
        {/* Simulate Button */}
        <div className="mb-4 sm:mb-6">
          <Button onClick={simulateNewOrder} className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Simulate New Order
          </Button>
        </div>

        {/* Order Queues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Uber Eats Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-uber text-white flex-shrink-0">
                <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Uber Eats Orders
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  {activeUberOrders.length} active order
                  {activeUberOrders.length !== 1 ? "s" : ""}
                </p>
              </div>
              {activeUberOrders.filter((o) => o.status === "New").length > 0 && (
                <Badge variant="warning" className="animate-pulse-subtle flex-shrink-0">
                  {activeUberOrders.filter((o) => o.status === "New").length} New
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {uberOrders.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-xl sm:rounded-2xl bg-white p-6 sm:p-8 text-center shadow-card"
                  >
                    <div className="mb-3 flex justify-center">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gray-100">
                        <Package className="h-6 w-6 sm:h-7 sm:w-7 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      No Uber Eats orders
                    </p>
                    <p className="text-xs text-gray-500">
                      New orders will appear here
                    </p>
                  </motion.div>
                ) : (
                  uberOrders.map((order, index) => (
                    <OnlineOrderCard
                      key={order.id}
                      order={order}
                      index={index}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* DoorDash Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-doordash text-white flex-shrink-0">
                <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  DoorDash Orders
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  {activeDoordashOrders.length} active order
                  {activeDoordashOrders.length !== 1 ? "s" : ""}
                </p>
              </div>
              {activeDoordashOrders.filter((o) => o.status === "New").length >
                0 && (
                <Badge variant="warning" className="animate-pulse-subtle flex-shrink-0">
                  {activeDoordashOrders.filter((o) => o.status === "New").length}{" "}
                  New
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {doordashOrders.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-xl sm:rounded-2xl bg-white p-6 sm:p-8 text-center shadow-card"
                  >
                    <div className="mb-3 flex justify-center">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gray-100">
                        <Package className="h-6 w-6 sm:h-7 sm:w-7 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      No DoorDash orders
                    </p>
                    <p className="text-xs text-gray-500">
                      New orders will appear here
                    </p>
                  </motion.div>
                ) : (
                  doordashOrders.map((order, index) => (
                    <OnlineOrderCard
                      key={order.id}
                      order={order}
                      index={index}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
