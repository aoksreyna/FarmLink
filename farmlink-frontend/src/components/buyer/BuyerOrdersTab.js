"use client";

import React from "react";
import BuyerRecentOrders from "./BuyerRecentOrders";

export default function BuyerOrdersTab() {
  return (
    <div className="w-full">
      <BuyerRecentOrders isEmbedded={false} />
    </div>
  );
}
