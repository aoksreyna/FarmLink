"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Bell, User, LogOut, LayoutDashboard, Store } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function BuyerHeader() {
  const { profile: userProfile, signOut } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="bg-[#144717] border-b border-[#0e3311] h-20 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      
      {/* Left: Quick Back to Marketplace */}
      <div className="flex items-center gap-3">
        <Link
          href="/marketplace"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800/60 hover:bg-emerald-800 text-emerald-100 text-xs font-bold transition-colors"
        >
          <Store className="w-3.5 h-3.5" />
          <span>ទៅផ្សារកសិផល</span>
        </Link>
      </div>

      {/* Right side: Search, Notifications & Profile Avatar matching draft */}
      <div className="flex items-center gap-4">
        {/* Search Input Bar */}
        <div className="relative w-56 sm:w-80">
          <Search className="w-4 h-4 text-emerald-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ស្វែងរកការកុម្ម៉ង់, កសិផល..."
            className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm bg-[#1b5e20]/60 border border-emerald-600/40 rounded-xl focus:outline-none focus:border-white focus:bg-[#1b5e20] text-white placeholder:text-emerald-200/70 transition-all"
          />
        </div>

        {/* Notifications Button with Badge */}
        <button
          type="button"
          className="relative p-2 text-emerald-100 hover:text-white hover:bg-[#1b5e20] rounded-xl transition-colors cursor-pointer"
          title="ការជូនដំណឹង"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400"></span>
        </button>

        {/* Profile Avatar */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfile(!showProfile)}
            className="w-10 h-10 rounded-full bg-white text-[#1B5E20] flex items-center justify-center hover:ring-2 hover:ring-emerald-300 transition-all cursor-pointer shadow-sm"
          >
            <User className="w-5 h-5 stroke-[2.2]" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-gray-800">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {userProfile?.business_name || userProfile?.full_name || "អ្នកទិញបោះដុំ"}
                </p>
                <p className="text-[11px] text-emerald-700 font-medium">
                  គណនីអ្នកទិញ (Wholesale Buyer)
                </p>
              </div>

              <Link
                href="/marketplace"
                onClick={() => setShowProfile(false)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#1B5E20] transition-colors"
              >
                <Store className="w-4 h-4" />
                <span>ផ្សារកសិផលបោះដុំ</span>
              </Link>

              <button
                type="button"
                onClick={signOut}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>ចាកចេញ</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
