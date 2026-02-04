"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KPICard } from "@/components/booking/KPICard";
import { SalesChart } from "@/components/booking/SalesChart";
import { OrdersTable } from "@/components/booking/OrdersTable";
import { mockSalesData, mockHistoryOrders } from "@/data/mockOrders";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLayout } from "../layout";

type TimeFilter = "today" | "week" | "month";

const kpiData = {
  online: {
    totalSales: 11691,
    ordersCount: 391,
    avgOrderValue: 29.9,
    change: 12.5,
  },
  onsite: {
    totalSales: 8234,
    ordersCount: 287,
    avgOrderValue: 28.7,
    change: 8.3,
  },
};

export default function BookingSummaryPage() {
  const [salesTab, setSalesTab] = useState("online");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("week");
  const { openSidebar } = useLayout();

  const currentKPIs = salesTab === "online" ? kpiData.online : kpiData.onsite;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <TopBar
        title="Booking Summary"
        showSearch={false}
        showFilter={false}
        onMenuClick={openSidebar}
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Tabs & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Tabs value={salesTab} onValueChange={setSalesTab}>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="online" className="flex-1 sm:flex-none">
                Online Sales
              </TabsTrigger>
              <TabsTrigger value="onsite" className="flex-1 sm:flex-none">
                On-site Sales
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <ToggleGroup
            type="single"
            value={timeFilter}
            onValueChange={(v) => v && setTimeFilter(v as TimeFilter)}
            className="w-full sm:w-auto"
          >
            <ToggleGroupItem value="today" className="text-xs flex-1 sm:flex-none">
              Today
            </ToggleGroupItem>
            <ToggleGroupItem value="week" className="text-xs flex-1 sm:flex-none">
              This Week
            </ToggleGroupItem>
            <ToggleGroupItem value="month" className="text-xs flex-1 sm:flex-none">
              This Month
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <KPICard
            title="Total Sales"
            value={currentKPIs.totalSales}
            format="currency"
            change={currentKPIs.change}
            icon={DollarSign}
            index={0}
          />
          <KPICard
            title="Orders Count"
            value={currentKPIs.ordersCount}
            change={currentKPIs.change - 2}
            icon={ShoppingCart}
            index={1}
          />
          <KPICard
            title="Avg Order Value"
            value={currentKPIs.avgOrderValue}
            format="currency"
            change={2.1}
            icon={TrendingUp}
            index={2}
          />
          <KPICard
            title="Items Sold"
            value={currentKPIs.ordersCount * 3}
            change={currentKPIs.change + 1}
            icon={Package}
            index={3}
          />
        </div>

        {/* Chart and Table Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <SalesChart
            data={mockSalesData}
            type={salesTab === "online" ? "area" : "bar"}
          />
          <OrdersTable orders={mockHistoryOrders} />
        </div>
      </div>
    </motion.div>
  );
}
