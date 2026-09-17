"use client";

import React, { useState } from "react";
import {
  Search,
  RotateCcw,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
} from "lucide-react";

export const MOCK_ADMIN_ORDERS = [
  {
    id: "ORD-5541",
    buyer: "ផ្សារទំនើប ឡាក់គី (Lucky Supermarket)",
    farmer: "ចម្ការសំបូរផល បាត់ដំបង",
    crop: "ស្វាយកែវរមៀតស្រស់",
    qty: "២,០០០ គ.ក",
    amount: "$840.00",
    paymentStatus: "Escrow Held",
    paymentStatusKh: "ប្រាក់តម្កល់សុវត្ថិភាព",
    deliveryStatus: "In Transit",
    deliveryStatusKh: "កំពុងដឹកជញ្ជូន",
    date: "15 កញ្ញា 2026",
  },
  {
    id: "ORD-5540",
    buyer: "ភោជនីយដ្ឋាន ទន្លេបាសាក់",
    farmer: "សហគមន៍បន្លែធម្មជាតិកណ្តាល",
    crop: "ប៉េងប៉ោះធម្មជាតិ",
    qty: "៥០០ គ.ក",
    amount: "$325.00",
    paymentStatus: "Paid",
    paymentStatusKh: "បានទូទាត់រួច",
    deliveryStatus: "Delivered",
    deliveryStatusKh: "បានដឹកដល់",
    date: "15 កញ្ញា 2026",
  },
  {
    id: "ORD-5539",
    buyer: "ក្រុមហ៊ុន គិរីរម្យ ហ្វូដ",
    farmer: "រោងម៉ាស៊ីនស្រូវបាត់ដំបង",
    crop: "អង្ករផ្ការំដួលកម្រិត១",
    qty: "៥,០០០ គ.ក",
    amount: "$4,500.00",
    paymentStatus: "Paid",
    paymentStatusKh: "បានទូទាត់រួច",
    deliveryStatus: "Delivered",
    deliveryStatusKh: "បានដឹកដល់",
    date: "14 កញ្ញា 2026",
  },
  {
    id: "ORD-5538",
    buyer: "សណ្ឋាគារ & ភោជនីយដ្ឋាន អង្គរ",
    farmer: "ចម្ការតារា (Dara Farm)",
    crop: "ប៉េងប៉ោះស្រស់",
    qty: "១,០០០ គ.ក",
    amount: "$600.00",
    paymentStatus: "Escrow Held",
    paymentStatusKh: "ប្រាក់តម្កល់សុវត្ថិភាព",
    deliveryStatus: "Dispatched",
    deliveryStatusKh: "បានចេញដំណើរ",
    date: "13 កញ្ញា 2026",
  },
];

export default function AdminOrdersTab() {
  const [orders, setOrders] = useState(MOCK_ADMIN_ORDERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.buyer.toLowerCase().includes(search.toLowerCase()) ||
      o.farmer.toLowerCase().includes(search.toLowerCase()) ||
      o.crop.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter !== "all" && o.paymentStatus !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header & Quick Status Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            ការបញ្ជាទិញ & ប្រតិបត្តិការ (Wholesale Orders & Escrow)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            គ្រប់គ្រងការទូទាត់ប្រាក់តម្កល់សុវត្ថិភាព (Escrow System) និងតាមដានការដឹកជញ្ជូនទូទាំងប្រទេស
          </p>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-xl self-start sm:self-auto">
          {[
            { id: "all", label: "ទាំងអស់ (All)" },
            { id: "Escrow Held", label: "ប្រាក់តម្កល់ (Escrow)" },
            { id: "Paid", label: "បានទូទាត់ (Paid)" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-white text-[#1B5E20] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Table Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="ស្វែងរកតាមលេខកូដកុម្ម៉ង់, សហគ្រាស, កសិករ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-800"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <button
            type="button"
            onClick={() => setSearch("")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>កំណត់ឡើងវិញ</span>
          </button>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#144717] text-white font-semibold">
              <tr>
                <th className="py-3.5 px-4">លេខកូដ (Order ID)</th>
                <th className="py-3.5 px-4">សហគ្រាសអ្នកទិញ</th>
                <th className="py-3.5 px-4">កសិករផ្គត់ផ្គង់</th>
                <th className="py-3.5 px-4">កសិផល & បរិមាណ</th>
                <th className="py-3.5 px-4">ទឹកប្រាក់សរុប</th>
                <th className="py-3.5 px-4">ស្ថានភាពទូទាត់</th>
                <th className="py-3.5 px-4 text-right">ការដឹកជញ្ជូន</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                      {ord.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-gray-900 block">
                        {ord.buyer}
                      </span>
                      <span className="text-xs text-gray-400">
                        {ord.date}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-gray-800">
                      {ord.farmer}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-gray-900 block">
                        {ord.crop}
                      </span>
                      <span className="text-xs text-gray-500">
                        {ord.qty}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-black text-[#1B5E20] text-sm">
                      {ord.amount}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          ord.paymentStatus === "Paid"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{ord.paymentStatusKh}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          ord.deliveryStatus === "Delivered"
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : "bg-purple-100 text-purple-800 border border-purple-200"
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>{ord.deliveryStatusKh}</span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500 font-medium">
                    មិនមានការបញ្ជាទិញត្រូវនឹងតម្រងស្វែងរកនេះទេ
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
