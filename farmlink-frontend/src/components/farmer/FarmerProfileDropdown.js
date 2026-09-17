"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Sun,
  Moon,
  Monitor,
  KeyRound,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function FarmerProfileDropdown({ onClose }) {
  const { profile, signOut } = useAuth();
  const [themeMode, setThemeMode] = useState("light");

  const farmerName = profile?.business_name || profile?.full_name || "Farmer Account";

  return (
    <div className="absolute right-0 top-12 sm:top-14 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 px-3 z-50">
      
      {/* User Identity Header */}
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-gray-100 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#1B5E20] border border-emerald-100 flex items-center justify-center font-bold text-xs">
            <User className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm text-gray-900 truncate max-w-[140px]">
            {farmerName}
          </span>
        </div>
        {profile?.is_verified && (
          <div title="Verified Farmer" className="text-[#1B5E20]">
            <CheckCircle2 className="w-4 h-4 fill-[#1B5E20] text-white" />
          </div>
        )}
      </div>

      {/* Theme Toggle Bar (Light / Dark / System) */}
      <div className="grid grid-cols-3 gap-1 bg-gray-50 p-1 rounded-xl mb-2.5 border border-gray-100">
        <button
          type="button"
          onClick={() => setThemeMode("light")}
          className={`p-1.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            themeMode === "light"
              ? "bg-white text-amber-500 shadow-2xs font-bold"
              : "text-gray-400 hover:text-gray-700"
          }`}
          title="Light mode"
        >
          <Sun className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setThemeMode("dark")}
          className={`p-1.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            themeMode === "dark"
              ? "bg-white text-indigo-500 shadow-2xs font-bold"
              : "text-gray-400 hover:text-gray-700"
          }`}
          title="Dark mode"
        >
          <Moon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setThemeMode("system")}
          className={`p-1.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            themeMode === "system"
              ? "bg-white text-emerald-600 shadow-2xs font-bold"
              : "text-gray-400 hover:text-gray-700"
          }`}
          title="System preference"
        >
          <Monitor className="w-4 h-4" />
        </button>
      </div>

      {/* Action Links */}
      <div className="space-y-1">
        <button
          type="button"
          onClick={() => {
            onClose && onClose();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#1B5E20] rounded-xl transition-colors text-left cursor-pointer"
        >
          <KeyRound className="w-4 h-4 text-gray-400" />
          <span>Security & Password</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onClose && onClose();
            signOut();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
}
