"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sprout,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Package,
  List,
  PlusCircle,
  FileText,
  MessageSquare,
  TrendingUp,
  User,
  ChevronDown,
} from "lucide-react";

export default function FarmerSidebar({ activeTab, onSelectTab, isCollapsed, onToggleCollapse }) {
  const [productsOpen, setProductsOpen] = useState(true);

  return (
    <aside
      className={`bg-[#144717] text-emerald-100 transition-all duration-300 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 border-r border-[#0e3311] ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* 1. Header: Logo + Collapse Toggle (< button) */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-[#1b5e20]">
          {!isCollapsed ? (
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#1B5E20] flex items-center justify-center shadow-md">
                <Sprout className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Farm<span className="text-emerald-300">Link</span>
              </span>
            </Link>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-white text-[#1B5E20] flex items-center justify-center mx-auto shadow-md">
              <Sprout className="w-6 h-6 stroke-[2.5]" />
            </div>
          )}

          {/* Toggle Button (<) inside header */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-[#1B5E20] transition-colors cursor-pointer"
            title={isCollapsed ? "ពង្រីក Sidebar" : "បង្រួម Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* 2. Navigation Menu */}
        <nav className="p-4 space-y-3 overflow-y-auto flex-1">
          {/* Dashboard Item */}
          <button
            type="button"
            onClick={() => onSelectTab("dashboard")}
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-base font-semibold transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-white text-[#1B5E20] shadow-md"
                : "text-emerald-100 hover:bg-[#1B5E20] hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>ផ្ទាំងគ្រប់គ្រងទូទៅ</span>}
          </button>

          {/* Group: គ្រប់គ្រងកសិផល */}
          <div className="pt-2">
            {!isCollapsed && (
              <button
                type="button"
                onClick={() => setProductsOpen(!productsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider text-emerald-300 hover:text-white cursor-pointer"
              >
                <span>គ្រប់គ្រងកសិផល</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    productsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}

            {(productsOpen || isCollapsed) && (
              <div className="space-y-1.5 mt-1">
                {/* Product List */}
                <button
                  type="button"
                  onClick={() => onSelectTab("products-list")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "products-list"
                      ? "bg-white text-[#1B5E20] shadow-sm font-bold"
                      : "text-emerald-100 hover:bg-[#1B5E20] hover:text-white"
                  }`}
                  title="បញ្ជីកសិផល"
                >
                  <List className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span>បញ្ជីកសិផល</span>}
                </button>

                {/* Add Product */}
                <button
                  type="button"
                  onClick={() => onSelectTab("products-add")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "products-add"
                      ? "bg-white text-[#1B5E20] shadow-sm font-bold"
                      : "text-emerald-100 hover:bg-[#1B5E20] hover:text-white"
                  }`}
                  title="បន្ថែមកសិផលថ្មី"
                >
                  <PlusCircle className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span>បន្ថែមកសិផលថ្មី</span>}
                </button>
              </div>
            )}
          </div>

          {/* Group: ប្រតិបត្តិការ */}
          <div className="pt-2">
            {!isCollapsed && (
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                ប្រតិបត្តិការ
              </div>
            )}

            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => onSelectTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "orders"
                    ? "bg-white text-[#1B5E20] shadow-sm font-bold"
                    : "text-emerald-100 hover:bg-[#1B5E20] hover:text-white"
                }`}
                title="ការបញ្ជាទិញ"
              >
                <FileText className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span>ការបញ្ជាទិញ</span>}
              </button>

              <button
                type="button"
                onClick={() => onSelectTab("market-demand")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "market-demand"
                    ? "bg-white text-[#1B5E20] shadow-sm font-bold"
                    : "text-emerald-100 hover:bg-[#1B5E20] hover:text-white"
                }`}
                title="តម្រូវការទីផ្សារ"
              >
                <TrendingUp className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span>តម្រូវការទីផ្សារ</span>}
              </button>

              <button
                type="button"
                onClick={() => onSelectTab("messages")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "messages"
                    ? "bg-white text-[#1B5E20] shadow-sm font-bold"
                    : "text-emerald-100 hover:bg-[#1B5E20] hover:text-white"
                }`}
                title="សារទំនាក់ទំនង"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <MessageSquare className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span>សារទំនាក់ទំនង</span>}
                </div>
                {!isCollapsed && (
                  <span
                    className={`min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                      activeTab === "messages"
                        ? "bg-[#1B5E20] text-white"
                        : "bg-emerald-400 text-[#0c2f0f]"
                    }`}
                  >
                    3
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Group: គណនី */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onSelectTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-white text-[#1B5E20] shadow-sm font-bold"
                  : "text-emerald-100 hover:bg-[#1B5E20] hover:text-white"
              }`}
              title="ព័ត៌មានគណនី"
            >
              <User className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span>ព័ត៌មានគណនី</span>}
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
