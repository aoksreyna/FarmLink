"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileDown,
  Printer,
  RotateCcw,
  Calendar,
  Check,
  X,
  Eye,
} from "lucide-react";
import OrderDetailsModal from "./OrderDetailsModal";

export default function FarmerOrders() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Exact data from Figma with realistic high-resolution details
  const [ordersList, setOrdersList] = useState([
    {
      id: "FL-8492",
      time: "មុននេះបន្តិច (Just now)",
      date: "08 កញ្ញា 2026",
      productName: "Fresh tomato (ប៉េងប៉ោះស្រស់)",
      quantity: "50 គ.ក (50kg)",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=120&auto=format&fit=crop&q=80",
      buyerName: "Angkor Hotel",
      location: "សៀមរាប (Siem Reap)",
      phone: "088 474 843",
      address: "ផ្លូវលេខ 234, សង្កាត់ស្ទឹងមានជ័យ, រាជធានីភ្នំពេញ",
      deliveryType: "កសិករដឹកជូនផ្ទាល់ (Direct Delivery)",
      totalPrice: "34.90",
      subtotal: "30.00",
      deliveryFee: "4.90",
      buyerNote: "សូមជ្រើសរើសប៉េងប៉ោះដែលស្រស់ល្អ មិនទាន់ទន់ជ្រុល។",
      status: "Pending",
      statusKhmer: "រង់ចាំការបញ្ជាក់",
      itemsList: [
        {
          name: "Fresh tomato",
          unitPrice: "0.75",
          quantity: "20kg",
          total: "15.00",
          image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&auto=format&fit=crop&q=80",
        },
        {
          name: "Fresh tomato (Grade A)",
          unitPrice: "0.75",
          quantity: "20kg",
          total: "15.00",
          image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=100&auto=format&fit=crop&q=80",
        },
      ],
    },
    {
      id: "FL-8491",
      time: "មុននេះបន្តិច (Just now)",
      date: "08 កញ្ញា 2026",
      productName: "Fresh tomato (ប៉េងប៉ោះស្រស់)",
      quantity: "50 គ.ក (50kg)",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=120&auto=format&fit=crop&q=80",
      buyerName: "Angkor Hotel",
      location: "សៀមរាប (Siem Reap)",
      phone: "088 474 843",
      address: "ផ្លូវលេខ 234, សង្កាត់ស្ទឹងមានជ័យ, រាជធានីភ្នំពេញ",
      deliveryType: "កសិករដឹកជូនផ្ទាល់ (Direct Delivery)",
      totalPrice: "34.90",
      subtotal: "34.90",
      deliveryFee: "0.00",
      buyerNote: "Fresh tomatoes",
      status: "Pending",
      statusKhmer: "រង់ចាំការបញ្ជាក់",
      itemsList: [
        {
          name: "Fresh tomato",
          unitPrice: "0.75",
          quantity: "20kg",
          total: "15.00",
          image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=100&auto=format&fit=crop&q=80",
        },
      ],
    },
    {
      id: "FL-8490",
      time: "មុននេះបន្តិច (Just now)",
      date: "07 កញ្ញា 2026",
      productName: "Fresh tomato (ប៉េងប៉ោះស្រស់)",
      quantity: "50 គ.ក (50kg)",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=120&auto=format&fit=crop&q=80",
      buyerName: "Angkor Hotel",
      location: "សៀមរាប (Siem Reap)",
      phone: "088 474 843",
      address: "ផ្លូវលេខ 234, សង្កាត់ស្ទឹងមានជ័យ, រាជធានីភ្នំពេញ",
      deliveryType: "កសិករដឹកជូនផ្ទាល់ (Direct Delivery)",
      totalPrice: "34.90",
      subtotal: "34.90",
      deliveryFee: "0.00",
      buyerNote: "Fresh tomatoes",
      status: "Pending",
      statusKhmer: "រង់ចាំការបញ្ជាក់",
      itemsList: [
        {
          name: "Fresh tomato",
          unitPrice: "0.75",
          quantity: "50kg",
          total: "34.90",
          image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100&auto=format&fit=crop&q=80",
        },
      ],
    },
    {
      id: "FL-8489",
      time: "មុននេះបន្តិច (Just now)",
      date: "07 កញ្ញា 2026",
      productName: "Fresh tomato (ប៉េងប៉ោះស្រស់)",
      quantity: "50 គ.ក (50kg)",
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=120&auto=format&fit=crop&q=80",
      buyerName: "Angkor Hotel",
      location: "សៀមរាប (Siem Reap)",
      phone: "088 474 843",
      address: "ផ្លូវលេខ 234, សង្កាត់ស្ទឹងមានជ័យ, រាជធានីភ្នំពេញ",
      deliveryType: "កសិករដឹកជូនផ្ទាល់ (Direct Delivery)",
      totalPrice: "34.90",
      subtotal: "34.90",
      deliveryFee: "0.00",
      buyerNote: "Fresh tomatoes",
      status: "Pending",
      statusKhmer: "រង់ចាំការបញ្ជាក់",
      itemsList: [
        {
          name: "Fresh tomato",
          unitPrice: "0.75",
          quantity: "50kg",
          total: "34.90",
          image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=100&auto=format&fit=crop&q=80",
        },
      ],
    },
  ]);

  // Filtering
  const filteredOrders = ordersList.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.productName.toLowerCase().includes(search.toLowerCase()) ||
      o.buyerName.toLowerCase().includes(search.toLowerCase());
    const matchTab =
      activeTab === "All" || o.status.toLowerCase() === activeTab.toLowerCase();
    return matchSearch && matchTab;
  });

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
    setActionMenuOpen(null);
  };

  const handleAcceptOrder = (orderId) => {
    setOrdersList((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: "Completed", statusKhmer: "បានទទួលយក" }
          : o
      )
    );
    setActionMenuOpen(null);
    setModalOpen(false);
  };

  const handleRejectOrder = (orderId) => {
    setOrdersList((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: "Rejected", statusKhmer: "បានបដិសេធ" }
          : o
      )
    );
    setActionMenuOpen(null);
    setModalOpen(false);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["Order ID", "Date/Time", "Product & Qty", "Buyer & Location", "Total Price", "Status"];
    const rows = filteredOrders.map((o) => [
      `"${o.id}"`,
      `"${o.time}"`,
      `"${o.productName} ${o.quantity}"`,
      `"${o.buyerName} (${o.location})"`,
      `"$${o.totalPrice}"`,
      `"${o.status}"`,
    ]);
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `farmlink_orders_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 w-full font-sans">
      {/* 1. Header: Breadcrumbs & Page Title (Exact Layout Like Product Page) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span>ប្រតិបត្តិការ</span>
            <span>&gt;</span>
            <span className="text-gray-800 font-semibold">ការបញ្ជាទិញ</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 tracking-tight">
            Order Management (គ្រប់គ្រងការបញ្ជាទិញ)
          </h1>
        </div>
      </div>

      {/* 2. Action Buttons: Export Excel & Export PDF on Top Right */}
      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
        >
          <FileDown className="w-4 h-4" />
          <span>ទាញយកបញ្ជីរបាយការណ៍ (Excel)</span>
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>ទាញយករបាយការណ៍ PDF</span>
        </button>
      </div>

      {/* 3. Main Unified White Card (Filter Section + Status Tabs + Table) */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        
        {/* Filter Section */}
        <div className="p-6 border-b border-gray-100 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">តម្រង (Filter)</span>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategoryFilter("All");
                setActiveTab("All");
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>កំណត់ឡើងវិញ</span>
            </button>
          </div>

          {/* Filter Controls Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                ស្វែងរកតាមឈ្មោះ ឬ លេខកូដ
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, order ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-800"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                ជំពូកកសិផល (Categories)
              </label>
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-700 cursor-pointer"
                >
                  <option value="All">ជ្រើសរើសជម្រើស (ទាំងអស់)</option>
                  <option value="Vegetables">បន្លែ (Vegetables)</option>
                  <option value="Fruits">ផ្លែឈើ (Fruits)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                កាលបរិច្ឆេទ (Date Filter)
              </label>
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl text-gray-700 hover:bg-white transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>ជ្រើសរើសកាលបរិច្ឆេទ</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Status Tabs (Pills) matching Figma exactly */}
          <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2">
            {[
              { label: "All", count: 15, kh: "ទាំងអស់" },
              { label: "Pending", count: 12, kh: "រង់ចាំការបញ្ជាក់" },
              { label: "Rejected", count: 1, kh: "បានបដិសេធ" },
              { label: "Completed", count: 34, kh: "បានបញ្ចប់" },
            ].map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#DCFCE7] text-[#15803D] font-bold border border-emerald-300 shadow-2xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Table Section: Big font size, clear spacing, forest green header */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1B5E20] text-white font-bold">
              <tr>
                <th className="py-4 px-4 text-center w-12">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                </th>
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Date/Time</th>
                <th className="py-4 px-6">Product & Qty</th>
                <th className="py-4 px-6">Buyer & Location</th>
                <th className="py-4 px-6">Total Price</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-4 text-center">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                    </td>

                    {/* Order ID */}
                    <td className="py-4 px-6 font-mono font-bold text-base text-[#1B5E20]">
                      {order.id}
                    </td>

                    {/* Date / Time */}
                    <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                      {order.time}
                    </td>

                    {/* Product & Qty */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.image}
                          alt={order.productName}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200 shadow-2xs shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-sm sm:text-base">
                            {order.productName}
                          </p>
                          <p className="text-xs text-gray-500 font-medium mt-0.5">
                            {order.quantity}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Buyer & Location */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-gray-900 text-sm sm:text-base">
                        {order.buyerName}
                      </p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        ({order.location})
                      </p>
                    </td>

                    {/* Total Price */}
                    <td className="py-4 px-6 font-bold text-gray-900 text-base">
                      ${order.totalPrice}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3.5 py-1.5 rounded-lg text-xs font-bold ${
                          order.status === "Pending"
                            ? "bg-[#FEF9C3] text-[#854D0E] border border-amber-200"
                            : order.status === "Completed"
                            ? "bg-emerald-50 text-[#1B5E20] border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Actions Menu */}
                    <td className="py-4 px-6 text-right relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActionMenuOpen(actionMenuOpen === order.id ? null : order.id)
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1B5E20] hover:bg-[#144717] text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-2xs"
                      >
                        <span className="text-xs font-bold">:</span>
                        <span>Actions</span>
                      </button>

                      {/* Dropdown Menu matching Figma */}
                      {actionMenuOpen === order.id && (
                        <div className="absolute right-6 mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1.5 text-left text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => handleAcceptOrder(order.id)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-emerald-50 text-[#1B5E20] text-left cursor-pointer font-bold"
                          >
                            <Check className="w-4 h-4" />
                            <span>Accept</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRejectOrder(order.id)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-rose-50 text-rose-600 text-left cursor-pointer font-bold"
                          >
                            <X className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenDetail(order)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 text-gray-800 text-left font-bold cursor-pointer border-t border-gray-100"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Detail</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-gray-500 font-medium">
                    មិនមានការបញ្ជាទិញត្រូវនឹងតម្រងនេះទេ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Table Pagination Footer (Centered < 1 2 3 >) */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="sm:w-1/3 text-left">
            បង្ហាញ <span className="font-bold text-gray-900">១</span> ដល់{" "}
            <span className="font-bold text-gray-900">{filteredOrders.length}</span> នៃ{" "}
            <span className="font-bold text-gray-900">១២</span> ទិន្នន័យ
          </div>

          {/* Centered Pagination < 1 2 3 > */}
          <div className="sm:w-1/3 flex justify-center items-center gap-1.5">
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-semibold cursor-pointer shadow-2xs transition-colors"
              title="មុន"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center bg-[#1B5E20] text-white rounded-xl text-sm font-bold shadow-2xs cursor-pointer"
            >
              1
            </button>

            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 text-sm font-semibold cursor-pointer shadow-2xs transition-colors"
            >
              2
            </button>

            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 text-sm font-semibold cursor-pointer shadow-2xs transition-colors"
            >
              3
            </button>

            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-semibold cursor-pointer shadow-2xs transition-colors"
              title="បន្ទាប់"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="sm:w-1/3 flex justify-end items-center gap-2">
            <span className="text-sm font-medium">1 page</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-7 text-sm font-semibold text-gray-700 cursor-pointer focus:outline-none">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Frame 32 Modal */}
      <OrderDetailsModal
        isOpen={modalOpen}
        order={selectedOrder}
        onClose={() => setModalOpen(false)}
        onAccept={() => handleAcceptOrder(selectedOrder?.id)}
        onReject={() => handleRejectOrder(selectedOrder?.id)}
        onChat={() => {
          alert(`បើកប្រអប់សារជាមួយអតិថិជន ${selectedOrder?.buyerName}`);
          setModalOpen(false);
        }}
      />
    </div>
  );
}
