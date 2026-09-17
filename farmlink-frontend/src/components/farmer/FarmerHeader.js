"use client";

import React, { useState } from "react";
import { Search, Bell, User } from "lucide-react";
import FarmerProfileDropdown from "./FarmerProfileDropdown";

export default function FarmerHeader() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="bg-[#144717] border-b border-[#0e3311] h-20 px-8 flex items-center justify-end sticky top-0 z-30 shadow-xs">
      {/* Search Input Bar (Near notification and profile on the right side) */}
      <div className="flex items-center gap-5">
        <div className="relative w-72 sm:w-80">
          <Search className="w-5 h-5 text-emerald-200 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ស្វែងរក..."
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-[#1b5e20]/60 border border-emerald-600/40 rounded-xl focus:outline-none focus:border-white focus:bg-[#1b5e20] text-white placeholder:text-emerald-200/80 transition-all"
          />
        </div>

        {/* Notifications Button */}
        <button
          type="button"
          className="p-2.5 text-emerald-100 hover:text-white hover:bg-[#1b5e20] rounded-xl transition-colors cursor-pointer"
        >
          <Bell className="w-6 h-6" />
        </button>

        {/* Profile Avatar */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfile(!showProfile)}
            className="w-11 h-11 rounded-full bg-white text-[#1B5E20] flex items-center justify-center hover:ring-2 hover:ring-emerald-300 transition-all cursor-pointer shadow-sm"
          >
            <User className="w-6 h-6 stroke-[2.2]" />
          </button>

          {showProfile && (
            <FarmerProfileDropdown onClose={() => setShowProfile(false)} />
          )}
        </div>
      </div>
    </header>
  );
}