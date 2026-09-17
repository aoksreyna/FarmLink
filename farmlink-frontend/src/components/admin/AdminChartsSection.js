"use client";

import React, { useState } from "react";

export default function AdminChartsSection() {
  const [timeframe, setTimeframe] = useState("month");

  const monthlyData = [
    { month: "មេសា", gmv: 42, label: "$42k", height: "35%" },
    { month: "ឧសភា", gmv: 58, label: "$58k", height: "45%" },
    { month: "មិថុនា", gmv: 74, label: "$74k", height: "55%" },
    { month: "កក្កដា", gmv: 96, label: "$96k", height: "68%" },
    { month: "សីហា", gmv: 125, label: "$125k", height: "82%" },
    { month: "កញ្ញា", gmv: 148, label: "$148k", height: "100%", current: true },
  ];

  const provinceDistribution = [
    { province: "បាត់ដំបង", farmers: 68, buyers: 24, total: 92 },
    { province: "កណ្តាល", farmers: 45, buyers: 38, total: 83 },
    { province: "ភ្នំពេញ", farmers: 12, buyers: 65, total: 77 },
    { province: "កំពង់ស្ពឺ", farmers: 34, buyers: 15, total: 49 },
    { province: "សៀមរាប", farmers: 28, buyers: 18, total: 46 },
    { province: "តាកែវ", farmers: 26, buyers: 12, total: 38 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* 1. GMV Chart (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                ទំហំពាណិជ្ជកម្មបោះដុំ (Wholesale Volume GMV)
              </h3>
              <p className="text-xs text-slate-500">
                ប្រតិបត្តិការទូទាត់ប្រាក់តាមប្រព័ន្ធ
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto text-xs">
              {[
                { id: "week", label: "៧ ថ្ងៃ" },
                { id: "month", label: "៦ ខែចុងក្រោយ" },
                { id: "year", label: "១ ឆ្នាំ" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setTimeframe(btn.id)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    timeframe === btn.id
                      ? "bg-white text-slate-900 font-semibold shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-baseline gap-3 my-4">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900">
              $148,250.00
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              +18.4%
            </span>
            <span className="text-xs text-slate-400">API Ready</span>
          </div>
        </div>

        <div className="pt-2">
          <div className="h-40 flex items-end justify-between gap-3 sm:gap-6 px-1">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] text-slate-400">
                  {d.label}
                </span>
                <div className="w-full max-w-[36px] bg-slate-100 rounded-t h-full flex items-end">
                  <div
                    style={{ height: d.height }}
                    className={`w-full rounded-t ${
                      d.current ? "bg-[#1B5E20]" : "bg-slate-300"
                    }`}
                  />
                </div>
                <span className={`text-[11px] ${d.current ? "font-bold text-[#1B5E20]" : "text-slate-500"}`}>
                  {d.month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Top Provinces (5 cols) */}
      <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                ការបែងចែកតាមខេត្ត (Province Distribution)
              </h3>
              <p className="text-xs text-slate-500">
                កសិករ និងអ្នកទិញតាមតំបន់
              </p>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Top 6
            </span>
          </div>

          <div className="space-y-3 mt-4 text-xs">
            {provinceDistribution.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-800">
                    ខេត្ត{item.province}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>{item.farmers} កសិករ</span>
                    <span>/</span>
                    <span>{item.buyers} អ្នកទិញ</span>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${(item.farmers / item.total) * 100}%` }}
                    className="bg-[#1B5E20] h-full"
                  />
                  <div
                    style={{ width: `${(item.buyers / item.total) * 100}%` }}
                    className="bg-slate-400 h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#1B5E20]" />
            <span>កសិករ (Farmers)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-400" />
            <span>អ្នកទិញ (Buyers)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

