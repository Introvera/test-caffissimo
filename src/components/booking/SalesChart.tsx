"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";
import { SalesData } from "@/types";

interface SalesChartProps {
  data: SalesData[];
  type?: "area" | "bar";
}

export function SalesChart({ data, type = "area" }: SalesChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-card"
    >
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
        Sales Overview
      </h3>
      
      <div className="h-56 sm:h-64 lg:h-72">
        <ResponsiveContainer width="100%" height="100%">
          {type === "area" ? (
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e07c3f" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#e07c3f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#737373", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#737373", fontSize: 11 }}
                tickFormatter={(value) => `$${value}`}
                width={50}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
                formatter={(value) => [`$${value}`, "Sales"]}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#e07c3f"
                strokeWidth={2}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          ) : (
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#737373", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#737373", fontSize: 11 }}
                tickFormatter={(value) => `$${value}`}
                width={50}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
                formatter={(value) => [`$${value}`, "Sales"]}
              />
              <Bar
                dataKey="sales"
                fill="#e07c3f"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
