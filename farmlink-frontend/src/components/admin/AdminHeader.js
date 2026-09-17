"use client";

import React from "react";
import { Search, Bell, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function AdminHeader({ title = "ផ្ទាំងគ្រប់គ្រងទូទៅ", subtitle }) {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Controls: Search, System Status, Admin Profile */}
      <div className="flex items-center gap-3 sm:gap-4">


        {/* Notifications Icon */}
        <div className="relative">
          <button
            type="button"
            className="w-10 h-10 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            title="ការជូនដំណឹងរដ្ឋបាល"
          >
            <Bell className="w-5 h-5" />
          </button>
          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </div>

        {/* Profile Avatar Only */}
        <div className="flex items-center pl-2">
          <div
            className="w-10 h-10 rounded-full bg-[#1B5E20] text-white flex items-center justify-center font-bold text-sm select-none cursor-pointer"
            title="គណនីរដ្ឋបាល"
          >
            AD
          </div>
        </div>
      </div>
    </header>
  );
}
