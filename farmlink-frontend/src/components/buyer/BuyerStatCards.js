"use client";

import React from "react";
import { Package, ClipboardList, Truck, DollarSign } from "lucide-react";

export default function BuyerStatCards({
  activeDemands = 3,
  pendingRequests = 12,
  confirmedOrders = 10,
  totalSpent = "1,200.89",
}) {
  const cards = [
    {
      label: "Active Demands",
      value: activeDemands,
      icon: Package,
    },
    {
      label: "Pending Requests",
      value: pendingRequests,
      icon: ClipboardList,
    },
    {
      label: "Confirmed Orders",
      value: confirmedOrders,
      icon: Truck,
    },
    {
      label: "Total Expenses",
      value: `$${totalSpent}`,
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between shadow-2xs hover:shadow-xs transition-shadow"
          >
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {card.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {card.value}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#1B5E20] flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
