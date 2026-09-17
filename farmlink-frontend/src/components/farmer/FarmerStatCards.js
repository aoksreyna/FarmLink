"use client";

import React from "react";
import { Package, ClipboardList, Truck, DollarSign } from "lucide-react";

export default function FarmerStatCards({
  activeProducts = 0,
  pendingRequests = 0,
  ongoingDeliveries = 0,
  totalEarning = "0.00",
}) {
  const cards = [
    {
      label: "Active Products",
      value: activeProducts,
      icon: Package,
    },
    {
      label: "Pending Requests",
      value: pendingRequests,
      icon: ClipboardList,
    },
    {
      label: "Ongoing Deliveries",
      value: ongoingDeliveries,
      icon: Truck,
    },
    {
      label: "Total Earnings",
      value: `$${totalEarning}`,
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-[15px] font-medium text-gray-500">
                {card.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {card.value}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#1B5E20] flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}