"use client";

import React, { useState } from "react";
import { Search, RotateCcw } from "lucide-react";

//Mock Data (Test and See UI only , Remove when fetch data from backend)
export const MOCK_ADMIN_DEMANDS = [
  {
    id: "DEM-901",
    cropName: "ស្វាយកែវរមៀតស្រស់",
    buyer: "ភោជនីយដ្ឋាន អង្គរ",
    province: "ភ្នំពេញ",
    requiredQty: "៥,០០០ គ.ក",
    targetPrice: "$0.45 / គ.ក",
    bestBid: "$0.42 / គ.ក",
    totalBids: 3,
    deadline: "នៅសល់ ៧ ថ្ងៃ",
    status: "Open",
  },
  {
    id: "DEM-902",
    cropName: "ប៉េងប៉ោះធម្មជាតិ (CamGAP)",
    buyer: "ផ្សារទំនើប ឡាក់គី",
    province: "ភ្នំពេញ",
    requiredQty: "១,៥០០ គ.ក",
    targetPrice: "$0.65 / គ.ក",
    bestBid: "$0.60 / គ.ក",
    totalBids: 2,
    deadline: "នៅសល់ ៣ ថ្ងៃ",
    status: "Open",
  },
  {
    id: "DEM-903",
    cropName: "អង្ករផ្ការំដួលកម្រិត១",
    buyer: "ក្រុមហ៊ុន គិរីរម្យ ហ្វូដ",
    province: "កំពង់ស្ពឺ",
    requiredQty: "២,០០០ គ.ក",
    targetPrice: "$0.95 / គ.ក",
    bestBid: "$0.90 / គ.ក",
    totalBids: 1,
    deadline: "នៅសល់ ៥ ថ្ងៃ",
    status: "Open",
  },
  {
    id: "DEM-890",
    cropName: "ត្រសក់ផ្អែមស្រស់",
    buyer: "ភោជនីយដ្ឋាន ទន្លេបាសាក់",
    province: "ភ្នំពេញ",
    requiredQty: "៨០០ គ.ក",
    targetPrice: "$0.50 / គ.ក",
    bestBid: "$0.48 / គ.ក",
    totalBids: 4,
    deadline: "បានបញ្ចប់",
    status: "Fulfilled",
  },
];

export default function AdminDemandsTab() {
  const [demands, setDemands] = useState(MOCK_ADMIN_DEMANDS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleToggleStatus = (id) => {
    setDemands((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const isClosed = d.status === "Closed";
          return {
            ...d,
            status: isClosed ? "Open" : "Closed",
          };
        }
        return d;
      })
    );
  };

  const filteredDemands = demands.filter((d) => {
    const matchesSearch =
      d.cropName.toLowerCase().includes(search.toLowerCase()) ||
      d.buyer.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter !== "all" && d.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header & Quick Status Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            តម្រូវការទិញ & ដេញថ្លៃ
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            ត្រួតពិនិត្យសេចក្តីប្រកាសតម្រូវការទិញបោះដុំរបស់អ្នកទិញ និងតាមដានការដាក់ដេញថ្លៃរបស់កសិករ
          </p>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl self-start sm:self-auto">
          {[
            { id: "all", label: "ទាំងអស់" },
            { id: "Open", label: "កំពុងបើក" },
            { id: "Fulfilled", label: "បានបញ្ចប់" },
            { id: "Closed", label: "បានបិទ" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-white text-[#1B5E20] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="ស្វែងរកតាមឈ្មោះកសិផល, សហគ្រាស ឬកូដ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white text-slate-800"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <button
            type="button"
            onClick={() => setSearch("")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>កំណត់ឡើងវិញ</span>
          </button>
        </div>

        {/* Demands Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#144717] text-white font-semibold">
              <tr>
                <th className="py-3.5 px-4">កូដ</th>
                <th className="py-3.5 px-4">កសិផលដែលត្រូវការ</th>
                <th className="py-3.5 px-4">សហគ្រាសអ្នកទិញ</th>
                <th className="py-3.5 px-4">បរិមាណ & តម្លៃគោលដៅ</th>
                <th className="py-3.5 px-4 text-center">សំណើដេញថ្លៃ</th>
                <th className="py-3.5 px-4">តម្លៃទាបបំផុត</th>
                <th className="py-3.5 px-4">ស្ថានភាព</th>
                <th className="py-3.5 px-4 text-right">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredDemands.length > 0 ? (
                filteredDemands.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {d.id}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-base text-slate-900">
                      {d.cropName}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-base text-slate-900 block">
                        {d.buyer}
                      </span>
                      <span className="text-xs text-slate-500">
                        {d.province}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-base text-slate-900 block">
                        {d.requiredQty}
                      </span>
                      <span className="text-xs text-slate-500">
                        គោលដៅ៖ {d.targetPrice}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {d.totalBids} សំណើ
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-black text-base text-[#1B5E20]">
                        {d.bestBid}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          d.status === "Open"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : d.status === "Fulfilled"
                            ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : "bg-slate-100 text-slate-700 border border-slate-300"
                        }`}
                      >
                        {d.status === "Open"
                          ? "កំពុងទទួល"
                          : d.status === "Fulfilled"
                          ? "បានផ្គត់ផ្គង់ពេញ"
                          : "បានបិទ"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(d.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer border ${
                          d.status === "Closed"
                            ? "bg-emerald-50 border-emerald-300 text-[#1B5E20] hover:bg-emerald-100"
                            : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {d.status === "Closed" ? "បើកឡើងវិញ" : "បិទការប្រកាស"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 font-medium text-base">
                    មិនមានតម្រូវការទិញត្រូវនឹងតម្រងស្វែងរកនេះទេ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
