"use client";

import React, { useState } from "react";
import {
  Search,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  MessageSquare,
  ArrowRight,
  Receipt,
  RotateCcw,
  FileDown,
  Printer,
} from "lucide-react";
import BuyerOrderDetailsModal from "./BuyerOrderDetailsModal";
import BuyerReceiptModal from "./BuyerReceiptModal";

export const INITIAL_BUYER_REQUESTS = [
  {
    id: "FL-8492",
    time: "មុននេះបន្តិច (Just now)",
    date: "08 កញ្ញា 2026 , 10:15 AM",
    productName: "Fresh tomato (ប៉េងប៉ោះស្រស់)",
    category: "vegetables",
    quantity: "50kg",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=120&auto=format&fit=crop&q=80",
    farmerName: "Dara Farm",
    province: "Takeo",
    phone: "098474843",
    farmerPhone: "098474843",
    address: "St 271, Steung Mean Chey , Phnom Penh",
    totalPrice: "34.90",
    subtotal: "30.00",
    deliveryFee: "4.90",
    buyerNote: "Fresh tomatoes",
    status: "Pending", // Farmer not confirmed yet -> CAN cancel/delete
    itemsList: [
      {
        name: "Fresh tomato",
        unitPrice: "0.75",
        quantity: "20kg",
        total: "15.00",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=120&auto=format&fit=crop&q=80",
      },
      {
        name: "Fresh tomato (Grade A)",
        unitPrice: "0.75",
        quantity: "20kg",
        total: "15.00",
        image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=120&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "FL-8491",
    time: "មុននេះបន្តិច (Just now)",
    date: "08 កញ្ញា 2026 , 09:40 AM",
    productName: "Fresh tomato (ប៉េងប៉ោះស្រស់)",
    category: "vegetables",
    quantity: "50kg",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=120&auto=format&fit=crop&q=80",
    farmerName: "Dara Farm",
    province: "Takeo",
    phone: "098474843",
    farmerPhone: "098474843",
    address: "St 271, Steung Mean Chey , Phnom Penh",
    totalPrice: "34.90",
    subtotal: "34.90",
    deliveryFee: "0.00",
    buyerNote: "Fresh tomatoes",
    status: "Confirmed", // Farmer confirmed! CANNOT cancel/delete -> HAS Receipt!
    itemsList: [
      {
        name: "Fresh tomato",
        unitPrice: "0.75",
        quantity: "20kg",
        total: "15.00",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=120&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "FL-8490",
    time: "មុននេះបន្តិច (Just now)",
    date: "07 កញ្ញា 2026 , 04:30 PM",
    productName: "Fresh banana (ចេកណាំវ៉ា)",
    category: "fruits",
    quantity: "50kg",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=120&auto=format&fit=crop&q=80",
    farmerName: "Dara Farm",
    province: "Takeo",
    phone: "098474843",
    farmerPhone: "098474843",
    address: "St 271, Steung Mean Chey , Phnom Penh",
    totalPrice: "34.90",
    subtotal: "30.00",
    deliveryFee: "4.90",
    buyerNote: "Fresh bananas",
    status: "Confirmed", // Farmer confirmed!
    itemsList: [
      {
        name: "Fresh banana",
        unitPrice: "0.70",
        quantity: "50kg",
        total: "34.90",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=120&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "FL-8489",
    time: "ម្សិលមិញ (Yesterday)",
    date: "07 កញ្ញា 2026 , 02:15 PM",
    productName: "Fresh tomato (ប៉េងប៉ោះស្រស់)",
    category: "vegetables",
    quantity: "50kg",
    image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=120&auto=format&fit=crop&q=80",
    farmerName: "Dara Farm",
    province: "Takeo",
    phone: "098474843",
    farmerPhone: "098474843",
    address: "St 271, Steung Mean Chey , Phnom Penh",
    totalPrice: "34.90",
    subtotal: "34.90",
    deliveryFee: "0.00",
    buyerNote: "Fresh tomato order",
    status: "Pending", // Farmer not confirmed -> Can cancel/delete
    itemsList: [
      {
        name: "Fresh tomato",
        unitPrice: "0.75",
        quantity: "50kg",
        total: "34.90",
        image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=120&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "FL-8480",
    time: "២ ថ្ងៃមុន",
    date: "05 កញ្ញា 2026 , 11:20 AM",
    productName: "Romduol Rice (អង្ករផ្ការំដួល)",
    category: "grains",
    quantity: "200kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&auto=format&fit=crop&q=80",
    farmerName: "Battambang Mill Farm",
    province: "Battambang",
    phone: "017889900",
    farmerPhone: "017889900",
    address: "St 271, Steung Mean Chey , Phnom Penh",
    totalPrice: "180.00",
    subtotal: "180.00",
    deliveryFee: "0.00",
    buyerNote: "Premium Grade A Romduol rice.",
    status: "Completed", // Completed -> Has receipt
    itemsList: [
      {
        name: "Romduol Rice",
        unitPrice: "0.90",
        quantity: "200kg",
        total: "180.00",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "FL-8475",
    time: "៥ ថ្ងៃមុន",
    date: "02 កញ្ញា 2026 , 08:00 AM",
    productName: "Cucumber (ត្រសក់ស្រួយ)",
    category: "vegetables",
    quantity: "100kg",
    image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=120&auto=format&fit=crop&q=80",
    farmerName: "Kandal Green Farm",
    province: "Kandal",
    phone: "010445566",
    farmerPhone: "010445566",
    address: "St 271, Steung Mean Chey , Phnom Penh",
    totalPrice: "40.00",
    subtotal: "40.00",
    deliveryFee: "0.00",
    buyerNote: "Cucumber out of stock.",
    status: "Rejected",
    itemsList: [
      {
        name: "Cucumber",
        unitPrice: "0.40",
        quantity: "100kg",
        total: "40.00",
        image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=120&auto=format&fit=crop&q=80",
      },
    ],
  },
];

export default function BuyerRecentOrders({
  isEmbedded = false,
  onViewAll,
}) {
  const [orders, setOrders] = useState(INITIAL_BUYER_REQUESTS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState("10");

  // Filtering
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.productName.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.farmerName.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (categoryFilter !== "All" && order.category !== categoryFilter) {
      return false;
    }

    if (activeTab === "All") return true;
    return order.status.toLowerCase() === activeTab.toLowerCase();
  });

  // Reset Filters
  const handleResetFilter = () => {
    setSearch("");
    setCategoryFilter("All");
    setDateFilter("all");
    setActiveTab("All");
  };

  // Action handlers
  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
    setActionMenuOpen(null);
  };

  const handleOpenReceipt = (order) => {
    setSelectedReceipt(order);
    setIsReceiptOpen(true);
    setActionMenuOpen(null);
  };

  // Rule: If farmer confirmed, buyer CANNOT cancel or delete!
  const handleDeleteOrder = (order) => {
    if (order.status === "Confirmed" || order.status === "Completed") {
      alert("កសិករបានបញ្ជាក់ការបញ្ជាទិញនេះរួចរាល់ហើយ ដូច្នេះអ្នកមិនអាចបោះបង់ ឬលុបបានឡើយ!");
      setActionMenuOpen(null);
      return;
    }

    if (confirm(`តើអ្នកប្រាកដជាចង់បោះបង់/លុបសំណើ ${order.id} នេះមែនទេ?`)) {
      setOrders((prev) => prev.filter((o) => o.id !== order.id));
      setActionMenuOpen(null);
      if (selectedOrder && selectedOrder.id === order.id) {
        setIsModalOpen(false);
      }
    }
  };

  const handleChatWithFarmer = (order) => {
    setActionMenuOpen(null);
    alert(`បើកប្រព័ន្ធជជែកជាមួយកសិករ៖ ${order.farmerName} (${order.phone || "098474843"})`);
  };

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-200">
      {/* 1. Page Header matching FarmerOrders */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            My requests (សំណើបញ្ជាទិញ)
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-0.5">
            តាមដានស្ថានភាពសំណើកុម្ម៉ង់ទិញកសិផលបោះដុំរបស់អ្នកទៅកាន់កសិករ
          </p>
        </div>

        {isEmbedded && onViewAll ? (
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-bold text-[#1B5E20] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>មើលទាំងអស់ (View all)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => alert("ទាញយកទិន្នន័យជាឯកសារ Excel")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <FileDown className="w-4 h-4" />
              <span>ទាញយក Excel</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>ទាញយក PDF</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Main Unified White Card matching FarmerOrders (Filter Section + Status Tabs + Table) */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        
        {/* Filter Section matching FarmerOrders */}
        <div className="p-6 border-b border-gray-100 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">តម្រង (Filter)</span>
            <button
              type="button"
              onClick={handleResetFilter}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>កំណត់ឡើងវិញ</span>
            </button>
          </div>

          {/* Filter Controls Row matching FarmerOrders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                ស្វែងរកតាមឈ្មោះ ឬ លេខកូដ
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, order ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-800"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                ជំពូកកសិផល (Categories)
              </label>
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-700 cursor-pointer"
                >
                  <option value="All">ជ្រើសរើសជម្រើស (ទាំងអស់)</option>
                  <option value="vegetables">បន្លែ (Vegetables)</option>
                  <option value="fruits">ផ្លែឈើ (Fruits)</option>
                  <option value="grains">ស្រូវ & អង្ករ (Grains & Rice)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                កាលបរិច្ឆេទ (Date Filter)
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDateMenuOpen(!isDateMenuOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl text-gray-700 hover:bg-white transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>
                      {dateFilter === "all"
                        ? "ជ្រើសរើសកាលបរិច្ឆេទ"
                        : dateFilter === "today"
                        ? "ថ្ងៃនេះ (Today)"
                        : dateFilter === "week"
                        ? "សប្តាហ៍នេះ (This Week)"
                        : "ខែនេះ (This Month)"}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {isDateMenuOpen && (
                  <div className="absolute right-0 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-30 py-1 text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => {
                        setDateFilter("all");
                        setIsDateMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      ទាំងអស់ (All Dates)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDateFilter("today");
                        setIsDateMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      ថ្ងៃនេះ (Today)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDateFilter("week");
                        setIsDateMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      សប្តាហ៍នេះ (This Week)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDateFilter("month");
                        setIsDateMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      ខែនេះ (This Month)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Tabs (Pills) inside the card matching FarmerOrders */}
          <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2">
            {[
              { label: "All", count: 15 },
              { label: "Pending", count: 12 },
              { label: "Confirmed", count: 10 },
              { label: "Rejected", count: 1 },
              { label: "Completed", count: 34 },
            ].map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
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

        {/* 3. Table Section matching Farmer style */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#144717] text-white font-semibold">
              <tr>
                <th className="py-4 px-4 sm:px-6">Order ID</th>
                <th className="py-4 px-4 sm:px-6">Date/Time</th>
                <th className="py-4 px-4 sm:px-6">Product & Qty</th>
                <th className="py-4 px-4 sm:px-6">Farmer & Farm</th>
                <th className="py-4 px-4 sm:px-6">Total Price</th>
                <th className="py-4 px-4 sm:px-6">Status</th>
                <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-gray-800">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const isConfirmed = order.status === "Confirmed" || order.status === "Completed";
                  const isPending = order.status === "Pending";

                  return (
                    <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                      {/* Order ID */}
                      <td className="py-4 px-4 sm:px-6 font-bold text-gray-900 font-mono text-sm sm:text-base">
                        {order.id}
                      </td>

                      {/* Date/Time */}
                      <td className="py-4 px-4 sm:px-6 text-gray-700 font-medium text-xs sm:text-sm whitespace-nowrap">
                        {order.time}
                      </td>

                      {/* Product & Qty */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.image}
                            alt={order.productName}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200 shadow-2xs shrink-0"
                          />
                          <div>
                            <p className="font-bold text-gray-900 text-xs sm:text-sm leading-tight">
                              {order.productName}
                            </p>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">
                              {order.quantity}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Farmer & Farm */}
                      <td className="py-4 px-4 sm:px-6">
                        <p className="font-bold text-gray-900 text-xs sm:text-sm">
                          {order.farmerName}
                        </p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                          ({order.province})
                        </p>
                      </td>

                      {/* Total Price */}
                      <td className="py-4 px-4 sm:px-6 font-bold text-gray-900 text-sm sm:text-base whitespace-nowrap">
                        ${order.totalPrice}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${
                            order.status === "Pending"
                              ? "bg-[#FEF9C3] text-[#854D0E] border border-amber-200"
                              : order.status === "Confirmed" || order.status === "Completed"
                              ? "bg-[#DCFCE7] text-[#15803D] border border-emerald-200"
                              : "bg-rose-100 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      {/* Actions Menu */}
                      <td className="py-4 px-4 sm:px-6 text-right relative whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() =>
                            setActionMenuOpen(actionMenuOpen === order.id ? null : order.id)
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#144717] hover:bg-[#1B5E20] text-white text-xs font-semibold rounded-md cursor-pointer transition-colors shadow-2xs"
                        >
                          <span className="font-bold">:</span>
                          <span>Actions</span>
                        </button>

                        {/* Dropdown Menu */}
                        {actionMenuOpen === order.id && (
                          <div className="absolute right-4 sm:right-6 mt-1.5 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1.5 text-left text-xs sm:text-sm font-medium animate-in fade-in zoom-in-95">
                            {/* 1. View Detail */}
                            <button
                              type="button"
                              onClick={() => handleOpenDetail(order)}
                              className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 text-gray-800 text-left font-semibold cursor-pointer"
                            >
                              <Eye className="w-4 h-4 text-gray-600" />
                              <span>View Detail</span>
                            </button>

                            {/* 2. If confirmed -> Button Receipt! If NOT confirmed -> Cancel/Deleted allowed! */}
                            {isConfirmed ? (
                              <button
                                type="button"
                                onClick={() => handleOpenReceipt(order)}
                                className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-emerald-50 text-[#1B5E20] text-left font-bold cursor-pointer"
                              >
                                <Receipt className="w-4 h-4 text-[#1B5E20]" />
                                <span>Receipt</span>
                              </button>
                            ) : isPending ? (
                              <button
                                type="button"
                                onClick={() => handleDeleteOrder(order)}
                                className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-rose-50 text-rose-600 text-left font-semibold cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4 text-rose-500" />
                                <span>Deleted</span>
                              </button>
                            ) : null}

                            {/* 3. Chat with farmer */}
                            <button
                              type="button"
                              onClick={() => handleChatWithFarmer(order)}
                              className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 text-gray-800 text-left font-semibold cursor-pointer border-t border-gray-100"
                            >
                              <MessageSquare className="w-4 h-4 text-[#1B5E20]" />
                              <span>Chat with farmer</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-gray-500 font-medium">
                    មិនមានសំណើបញ្ជាទិញត្រូវនឹងតម្រងនេះទេ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Table Pagination Footer matching FarmerOrders (Centered < 1 2 3 >) */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-600">
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
            <span className="text-xs sm:text-sm font-medium">1 page</span>
            <div className="relative">
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-7 text-xs sm:text-sm font-semibold text-gray-700 cursor-pointer focus:outline-none"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <BuyerOrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancelRequest={() => {
          if (selectedOrder) {
            handleDeleteOrder(selectedOrder);
          }
        }}
        onChat={() => {
          if (selectedOrder) {
            handleChatWithFarmer(selectedOrder);
          }
        }}
        onViewReceipt={(order) => {
          handleOpenReceipt(order);
        }}
      />

      {/* Official Receipt Modal */}
      <BuyerReceiptModal
        order={selectedReceipt}
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
      />
    </div>
  );
}
