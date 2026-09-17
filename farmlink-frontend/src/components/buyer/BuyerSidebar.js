"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sprout,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  List,
  PlusCircle,
  FileText,
  Store,
  MessageSquare,
  FileCheck2,
  User,
  ChevronDown,
} from "lucide-react";

export default function BuyerSidebar({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  onCreateDemand,
}) {
  const [demandsOpen, setDemandsOpen] = useState(true);

  const handleCreateDemandClick = () => {
    if (onCreateDemand) {
      onCreateDemand();
    }
    onSelectTab("create-demand");
  };

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
              <div>
                <span className="text-xl font-bold tracking-tight text-white block leading-tight">
                  Farm<span className="text-emerald-300">Link</span>
                </span>
                <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">
                  អ្នកទិញដុំ · Buyer
                </span>
              </div>
            </Link>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-white text-[#1B5E20] flex items-center justify-center mx-auto shadow-md">
              <Sprout className="w-6 h-6 stroke-[2.5]" />
            </div>
          )}

          {/* Toggle Button inside header */}
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

          {/* Group: តម្រូវការទិញ (Sourcing Demand) with 2 sub-menus: demand and create demand */}
          <div className="pt-2">
            {!isCollapsed && (
              <button
                type="button"
                onClick={() => setDemandsOpen(!demandsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider text-emerald-300 hover:text-white cursor-pointer"
              >
                <span>តម្រូវការទិញ</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    demandsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}

            {(demandsOpen || isCollapsed) && (
              <div className="space-y-1.5 mt-1">
                {/* Sub-menu 1: demand (បញ្ជីតម្រូវការ / Demands List) */}
                <button
                  type="button"
                  onClick={() => onSelectTab("my-demands")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "my-demands"
                      ? "bg-white text-[#1B5E20] shadow-sm font-bold"
                      : "text-emerald-100 hover:bg-[#1B5E20] hover:text-white"
                  }`}
                  title="បញ្ជីតម្រូវការ"
                >
                  <List className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span>បញ្ជីតម្រូវការ</span>}
                </button>

                {/* Sub-menu 2: create demand (+ បង្កើតតម្រូវការថ្មី / Create Demand) */}
                <button
                  type="button"
                  onClick={handleCreateDemandClick}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "create-demand"
                      ? "bg-white text-[#1B5E20] shadow-sm font-bold"
                      : "text-emerald-100 hover:bg-[#1B5E20] hover:text-white"
                  }`}
                  title="បង្កើតតម្រូវការថ្មី"
                >
                  <PlusCircle className="w-5 h-5 shrink-0 text-emerald-300" />
                  {!isCollapsed && <span>បង្កើតតម្រូវការថ្មី</span>}
                </button>
              </div>
            )}
          </div>

          {/* Group: ប្រតិបត្តិការ (Operations) */}
          <div className="pt-2">
            {!isCollapsed && (
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                ប្រតិបត្តិការ
              </div>
            )}

            <div className="space-y-1.5">
              {/* My Requests / Orders Table */}
              <button
                type="button"
                onClick={() => onSelectTab("my-requests")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "my-requests"
                    ? "bg-white text-[#1B5E20] shadow-sm font-bold"
                    : "text-emerald-100 hover:bg-[#1B5E20] hover:text-white"
                }`}
                title="សំណើបញ្ជាទិញ"
              >
                <FileText className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span>សំណើបញ្ជាទិញ</span>}
              </button>

              {/* Wholesale Marketplace Link */}
              <Link
                href="/marketplace"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-emerald-100 hover:bg-[#1B5E20] hover:text-white transition-all cursor-pointer"
                title="ផ្សារកសិផលបោះដុំ"
              >
                <Store className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span>ផ្សារកសិផលបោះដុំ</span>}
              </Link>

              {/* Messages */}
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
                    2
                  </span>
                )}
              </button>

              {/* Invoices */}
              <button
                type="button"
                onClick={() => onSelectTab("invoices")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "invoices"
                    ? "bg-white text-[#1B5E20] shadow-sm font-bold"
                    : "text-emerald-100 hover:bg-[#1B5E20] hover:text-white"
                }`}
                title="វិក្កយបត្រ & ចំណាយ"
              >
                <FileCheck2 className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span>វិក្កយបត្រ & ចំណាយ</span>}
              </button>
            </div>
          </div>

          {/* Group: គណនី (Account) */}
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

        {/* Footer info in sidebar */}
        {!isCollapsed && (
          <div className="p-4 border-t border-[#1b5e20] text-[11px] text-emerald-300/80">
            <span>ជំនួយការទិញ ៖ 012 345 678</span>
          </div>
        )}
      </div>
    </aside>
  );
}
