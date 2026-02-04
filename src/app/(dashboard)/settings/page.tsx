"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Globe } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { useLayout } from "../layout";

const settingsSections = [
  {
    title: "Account Settings",
    description: "Manage your account information and preferences",
    icon: User,
  },
  {
    title: "Notifications",
    description: "Configure how you receive alerts and updates",
    icon: Bell,
  },
  {
    title: "Security",
    description: "Password, 2FA, and security preferences",
    icon: Shield,
  },
  {
    title: "Appearance",
    description: "Customize the look and feel of your dashboard",
    icon: Palette,
  },
  {
    title: "Language & Region",
    description: "Set your preferred language and timezone",
    icon: Globe,
  },
];

export default function SettingsPage() {
  const { openSidebar } = useLayout();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <TopBar
        title="Settings"
        showSearch={false}
        showFilter={false}
        onMenuClick={openSidebar}
      />

      <div className="p-4 sm:p-6">
        <div className="max-w-2xl space-y-3 sm:space-y-4">
          {settingsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="w-full flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl bg-surface p-3 sm:p-4 shadow-card text-left hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-accent-light flex-shrink-0">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-text-primary text-sm sm:text-base">
                    {section.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted truncate sm:whitespace-normal">
                    {section.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
