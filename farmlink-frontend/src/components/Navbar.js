"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout, ShoppingCart, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar({ onOpenCart, cartCount = 0 }) {
  const pathname = usePathname();
  const { openAuth, profile: userProfile, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Menu Navigation Links
  const navLinks = [
    { name: "ទំព័រដើម", href: "/" },
    { name: "ផ្សារកសិផល", href: "/marketplace" },
    { name: "តម្រូវការទីផ្សារ", href: "/demands" },
    { name: "អំពីយើង", href: "/about" },
    { name: "ទំនាក់ទំនង", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* 1. LOGO */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1B5E20] text-white flex items-center justify-center shadow-xs">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="text-2xl font-black tracking-tight">
            <span className="text-[#1B5E20]">Farm</span>
            <span className="text-black">Link</span>
          </span>
        </Link>

        {/* 2. MENU LINKS (DESKTOP) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[15px] font-bold transition-colors ${
                  isActive ? "text-[#1B5E20]" : "text-gray-700 hover:text-[#1B5E20]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* 3. RIGHT UTILITIES (CART + AUTH / PROFILE) */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-gray-700 hover:text-[#1B5E20] transition-colors cursor-pointer"
            title="កន្ត្រកបញ្ជាទិញ"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1B5E20] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <div className="h-5 w-px bg-gray-200 hidden sm:block"></div>

          {/* User Status: Login & Register or Rich Profile Dropdown */}
          {!userProfile ? (
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => openAuth("login")}
                className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#1B5E20] text-white hover:bg-[#154a19] transition-all cursor-pointer shadow-xs"
              >
                ចូលគណនី
              </button>
              <button
                type="button"
                onClick={() => openAuth("register", "farmer")}
                className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold border border-gray-300 text-gray-700 hover:border-[#1B5E20] hover:text-[#1B5E20] transition-all cursor-pointer"
              >
                ចុះឈ្មោះ
              </button>
            </div>
          ) : (
            /* Logged in Profile Menu */
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-gray-200 hover:border-[#1B5E20] transition-colors cursor-pointer bg-gray-50/50"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#1B5E20] flex items-center justify-center font-bold text-xs">
                  {userProfile.full_name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="text-xs font-bold text-gray-800 hidden lg:inline max-w-[110px] truncate">
                  {userProfile.business_name || userProfile.full_name}
                </span>
                {userProfile.role && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100/70 text-[#1B5E20] font-bold uppercase hidden sm:inline">
                    {userProfile.role}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-900 truncate">
                      {userProfile.full_name}
                    </p>
                    <p className="text-[11px] text-gray-500 capitalize">
                      {userProfile.role || "Member"}
                    </p>
                  </div>

                  <Link
                    href={userProfile.role === "farmer" ? "/farmer" : "/buyer"}
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#1B5E20] transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    ផ្ទាំងគ្រប់គ្រង
                  </Link>

                  <button
                    onClick={signOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    ចាកចេញ
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#1B5E20]"
            aria-label="បើកម៉ឺនុយ"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-gray-700 hover:text-[#1B5E20]"
            >
              {link.name}
            </Link>
          ))}
          {!userProfile ? (
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => { setIsMobileMenuOpen(false); openAuth("login"); }}
                className="flex-1 py-2.5 rounded-lg text-sm font-bold bg-[#1B5E20] text-white cursor-pointer"
              >
                ចូលគណនី
              </button>
              <button
                type="button"
                onClick={() => { setIsMobileMenuOpen(false); openAuth("register", "farmer"); }}
                className="flex-1 py-2.5 rounded-lg text-sm font-bold border border-gray-300 text-gray-700 cursor-pointer"
              >
                ចុះឈ្មោះ
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-800">
                {userProfile.full_name} ({userProfile.role === "farmer" ? "កសិករ" : "អ្នកទិញ"})
              </span>
              <button
                onClick={signOut}
                className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
              >
                ចាកចេញ
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}