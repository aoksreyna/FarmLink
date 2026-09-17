"use client";

import React from "react";

export default function AdminStatCards({
  totalFarmers = 248,
  verifiedFarmers = 194,
  totalBuyers = 135,
  verifiedBuyers = 112,
  totalProvinces = 16,
  totalProducts = 86,
  pendingProducts = 7,
}) {
  const stats = [
    {
      id: "farmers",
      label: "កសិករ & ចម្ការសរុប",
      englishLabel: "Total Farmers",
      value: totalFarmers.toLocaleString(),
      subtext: `ផ្ទៀងផ្ទាត់ ${verifiedFarmers} នាក់`,
      meta: "+14 ខែនេះ",
    },
    {
      id: "buyers",
      label: "អ្នកទិញ & អាជីវកម្មសរុប",
      englishLabel: "Total Buyers",
      value: totalBuyers.toLocaleString(),
      subtext: `ផ្ទៀងផ្ទាត់ ${verifiedBuyers} នាក់`,
      meta: "+9 ខែនេះ",
    },
    {
      id: "provinces",
      label: "ខេត្តគ្របដណ្តប់",
      englishLabel: "Active Provinces",
      value: `${totalProvinces} ខេត្ត`,
      subtext: "បាត់ដំបង, កណ្តាល, តាកែវ, សៀមរាប",
      meta: "ទូទាំងប្រទេស",
    },
    {
      id: "products",
      label: "កសិផល & ការចុះបញ្ជី",
      englishLabel: "Produce & Demands",
      value: totalProducts.toLocaleString(),
      subtext: `រង់ចាំពិនិត្យ ${pendingProducts} មុខ`,
      meta: `${pendingProducts} Pending`,
      highlight: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="p-5 rounded-xl bg-white border border-slate-200"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">{stat.englishLabel}</span>
            <span className={stat.highlight ? "font-semibold text-amber-700" : "text-slate-400"}>
              {stat.meta}
            </span>
          </div>

          <div className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            {stat.value}
          </div>

          <div className="text-xs font-semibold text-slate-800 mt-1">
            {stat.label}
          </div>

          <div className="text-[11px] text-slate-500 mt-0.5">
            {stat.subtext}
          </div>
        </div>
      ))}
    </div>
  );
}
