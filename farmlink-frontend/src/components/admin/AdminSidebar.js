"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  PackageCheck,
  ClipboardList,
  ShoppingBag,
  ShieldCheck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Store,
} from "lucide-react";

export default function AdminSidebar({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
}) {
  const menuItems = [
    {
      id: "dashboard",
      label: "ផ្ទាំងគ្រប់គ្រងទូទៅ",
      icon: LayoutDashboard,
    },
    {
      id: "users",
      label: "គ្រប់គ្រងអ្នកប្រើប្រាស់",
      icon: Users,
    },
    {
      id: "products",
      label: "ពិនិត្យ & អនុម័តកសិផល",
      icon: PackageCheck,
    },
    {
      id: "demands",
      label: "តម្រូវការទិញ & ដេញថ្លៃ",
      icon: ClipboardList,
    },
  ];

  return (
    <aside
      className={`relative bg-[#0d2e10] text-white flex flex-col transition-all duration-300 z-30 shrink-0 select-none ${
        isCollapsed ? "w-20" : "w-72"
      } min-h-screen border-r border-[#1B5E20]/30 shadow-xl`}
    >
      {/* 1. Header / Logo Brand */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        {!isCollapsed ? (
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-[#1B5E20] flex items-center justify-center text-white font-black text-xl shadow-md">
              FL
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-wide block leading-tight">
                FarmLink
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Admin Control
              </span>
            </div>
          </Link>
        ) : (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-[#1B5E20] flex items-center justify-center text-white font-black text-xl mx-auto shadow-md">
            FL
          </div>
        )}

        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer hidden sm:block"
          title={isCollapsed ? "ពន្លាត Menu" : "បង្រួម Menu"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 2. Navigation Menu Items */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all cursor-pointer group ${
                isActive
                  ? "bg-[#1B5E20] text-white shadow-md font-bold"
                  : "text-gray-300 hover:bg-white/10 hover:text-white font-medium"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={`w-5 h-5 shrink-0 ${
                  isActive ? "text-emerald-300" : "text-gray-400 group-hover:text-white"
                }`}
              />

              {!isCollapsed && (
                <span className="text-base font-medium truncate block">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. Footer Links: Marketplace view & Logout */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <Link
          href="/marketplace"
          target="_blank"
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white text-xs font-semibold transition-colors"
          title="ទៅកាន់ Marketplace"
        >
          <Store className="w-4 h-4 text-emerald-400 shrink-0" />
          {!isCollapsed && <span>មើលផ្សារ Marketplace</span>}
        </Link>

        <Link
          href="/"
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 text-xs font-semibold transition-colors"
          title="ចាកចេញ"
        >
          <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
          {!isCollapsed && <span>ចាកចេញពីប្រព័ន្ធ</span>}
        </Link>
      </div>
    </aside>
  );
}
