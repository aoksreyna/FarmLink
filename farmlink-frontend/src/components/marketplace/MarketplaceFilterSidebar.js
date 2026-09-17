"use client";

import React, { useState } from "react";
import {
  LayoutGrid,
  ChevronDown,
  RotateCcw,
  SlidersHorizontal,
  Salad,
  Apple,
  Wheat,
  Sparkles,
  Egg,
  Beef,
  Package,
} from "lucide-react";

export const CATEGORIES = [
  { id: "all", name: "កសិផលទាំងអស់", icon: LayoutGrid, count: 128 },
  { id: "vegetables", name: "បន្លែស្រស់", icon: Salad, count: 32 },
  { id: "fruits", name: "ផ្លែឈើធម្មជាតិ", icon: Apple, count: 28 },
  { id: "grains", name: "អង្ករ & គ្រាប់ធញ្ញជាតិ", icon: Wheat, count: 26 },
  { id: "spices", name: "គ្រឿងទេស", icon: Sparkles, count: 26 },
  { id: "dairy_eggs", name: "ស៊ុត & ទឹកដោះគោ", icon: Egg, count: 20 },
  { id: "meat", name: "ត្រី & សាច់", icon: Beef, count: 12 },
  { id: "others", name: "ផ្សេងៗ", icon: Package, count: 10 },
];

export const PROVINCES = [
  "គ្រប់ខេត្ត-ក្រុង",
  "កំពង់ចាម",
  "បាត់ដំបង",
  "សៀមរាប",
  "កណ្តាល",
  "កំពត",
  "តាកែវ",
  "កំពង់ធំ",
  "ព្រៃវែង",
  "ត្បូងឃ្មុំ",
  "ពោធិ៍សាត់",
  "បន្ទាយមានជ័យ",
  "រតនគិរី",
  "មណ្ឌលគិរី",
  "ភ្នំពេញ",
];

export default function MarketplaceFilterSidebar({
  selectedCategory = "all",
  onSelectCategory,
  priceRange = [0, 10],
  onChangePriceRange,
  selectedProvince = "គ្រប់ខេត្ត-ក្រុង",
  onSelectProvince,
  deliveryOption = "all",
  onChangeDeliveryOption,
  onResetFilters,
  className = "",
}) {
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  return (
    <aside className={`space-y-5 ${className}`}>
      
      {/* 1. CATEGORIES */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-100 text-gray-900 font-bold text-sm sm:text-base">
          <LayoutGrid className="w-4 h-4 text-[#1B5E20]" />
          <span>ប្រភេទកសិផល</span>
        </div>

        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer text-left ${
                  isSelected
                    ? "bg-[#1B5E20] text-white font-bold shadow-xs"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-white" : "text-gray-400"}`} />
                  <span className="truncate">{cat.name}</span>
                </span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold shrink-0 ml-2 ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. FILTERS */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100 text-gray-900 font-bold text-sm sm:text-base">
          <SlidersHorizontal className="w-4 h-4 text-[#1B5E20]" />
          <span>តម្រងស្វែងរក</span>
        </div>

        {/* Price Filter */}
        <div>
          <button
            type="button"
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="w-full flex items-center justify-between text-xs font-bold text-gray-800 mb-2.5 cursor-pointer"
          >
            <span>តម្លៃ ($/គ.ក)</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isPriceOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isPriceOpen && (
            <div className="space-y-3 pt-1">
              <input
                type="range"
                min="0"
                max="10"
                step="0.25"
                value={priceRange[1]}
                onChange={(e) => onChangePriceRange([priceRange[0], parseFloat(e.target.value)])}
                className="w-full accent-[#1B5E20] cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
              />

              <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg">
                  $0
                </span>
                <span className="text-gray-400 text-[11px]">រហូតដល់</span>
                <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-[#1B5E20] rounded-lg font-bold">
                  ${priceRange[1]} / គ.ក
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Location Dropdown */}
        <div className="pt-2 border-t border-gray-100">
          <label className="block text-xs font-bold text-gray-800 mb-2">
            ទីតាំងខេត្ត / ក្រុង
          </label>
          <div className="relative">
            <select
              value={selectedProvince}
              onChange={(e) => onSelectProvince(e.target.value)}
              className="w-full text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 appearance-none text-gray-800 focus:outline-hidden focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] cursor-pointer"
            >
              {PROVINCES.map((prov) => (
                <option key={prov} value={prov}>
                  {prov === "គ្រប់ខេត្ត-ក្រុង" ? "គ្រប់ខេត្ត-ក្រុង" : `ខេត្ត${prov}`}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Delivery Options */}
        <div className="pt-2 border-t border-gray-100">
          <label className="block text-xs font-bold text-gray-800 mb-2.5">
            ការដឹកជញ្ជូន
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer select-none">
              <input
                type="radio"
                name="delivery"
                value="all"
                checked={deliveryOption === "all"}
                onChange={() => onChangeDeliveryOption("all")}
                className="w-4 h-4 text-[#1B5E20] accent-[#1B5E20]"
              />
              <span>ទាំងអស់</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer select-none">
              <input
                type="radio"
                name="delivery"
                value="delivery"
                checked={deliveryOption === "delivery"}
                onChange={() => onChangeDeliveryOption("delivery")}
                className="w-4 h-4 text-[#1B5E20] accent-[#1B5E20]"
              />
              <span>មានសេវាដឹកដល់កន្លែង</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer select-none">
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={deliveryOption === "pickup"}
                onChange={() => onChangeDeliveryOption("pickup")}
                className="w-4 h-4 text-[#1B5E20] accent-[#1B5E20]"
              />
              <span>ទៅយកដល់ចម្ការផ្ទាល់</span>
            </label>
          </div>
        </div>

        {/* Reset Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={onResetFilters}
            className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
            <span>កំណត់ឡើងវិញ</span>
          </button>
        </div>

      </div>

    </aside>
  );
}
