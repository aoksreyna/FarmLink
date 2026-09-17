"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  RotateCcw,
  SlidersHorizontal,
  MapPin,
  Truck,
  Check,
  Award,
} from "lucide-react";

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

export const STANDARDS = [
  "គ្រប់ស្តង់ដារ",
  "ស្តង់ដារ GAP",
  "សរីរាង្គធម្មជាតិ",
  "ធម្មជាតិសុវត្ថិភាព",
];

export default function MarketplaceTopFilters({
  categories = [],
  selectedCategory = "all",
  onSelectCategory,
  selectedProvince = "គ្រប់ខេត្ត-ក្រុង",
  onSelectProvince,
  priceRange = [0, 10],
  onChangePriceRange,
  deliveryOption = "all",
  onChangeDeliveryOption,
  selectedStandard = "គ្រប់ស្តង់ដារ",
  onSelectStandard,
  onResetFilters,
  hasActiveFilters = false,
}) {
  const [openDropdown, setOpenDropdown] = useState(null); // 'province' | 'price' | 'delivery' | 'standard' | null

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <div className="space-y-4">
      {/* 1. HORIZONTAL CATEGORY PILLS (Scrollable & Responsive) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                isSelected
                  ? "bg-[#1B5E20] text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                  isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. TOP FILTER DROPDOWN PILLS & RESET BUTTON */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        
        {/* Province Filter Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("province")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all cursor-pointer bg-white ${
              selectedProvince !== "គ្រប់ខេត្ត-ក្រុង"
                ? "border-[#1B5E20] text-[#1B5E20] bg-emerald-50/50"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span>{selectedProvince === "គ្រប់ខេត្ត-ក្រុង" ? "ទីតាំងខេត្ត" : `ខេត្ត${selectedProvince.replace("ខេត្ត", "")}`}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === "province" ? "rotate-180" : ""}`} />
          </button>

          {openDropdown === "province" && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)}></div>
              <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-30 max-h-64 overflow-y-auto">
                {PROVINCES.map((prov) => (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => {
                      onSelectProvince(prov);
                      setOpenDropdown(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                      selectedProvince === prov
                        ? "bg-emerald-50 text-[#1B5E20] font-bold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{prov}</span>
                    {selectedProvince === prov && <Check className="w-3.5 h-3.5 text-[#1B5E20]" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Price Filter Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("price")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all cursor-pointer bg-white ${
              priceRange[1] < 10
                ? "border-[#1B5E20] text-[#1B5E20] bg-emerald-50/50"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            <span>តម្លៃ ៖ ${priceRange[0]} - ${priceRange[1]}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === "price" ? "rotate-180" : ""}`} />
          </button>

          {openDropdown === "price" && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)}></div>
              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-30 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                  <span>កម្រិតតម្លៃអតិបរមា</span>
                  <span className="text-[#1B5E20]">${priceRange[1]} / គ.ក</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.25"
                  value={priceRange[1]}
                  onChange={(e) => onChangePriceRange([priceRange[0], parseFloat(e.target.value)])}
                  className="w-full accent-[#1B5E20] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>$0.50</span>
                  <span>$10.00</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quality Standard Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("standard")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all cursor-pointer bg-white ${
              selectedStandard !== "គ្រប់ស្តង់ដារ"
                ? "border-[#1B5E20] text-[#1B5E20] bg-emerald-50/50"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-gray-400" />
            <span>{selectedStandard}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === "standard" ? "rotate-180" : ""}`} />
          </button>

          {openDropdown === "standard" && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)}></div>
              <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-30">
                {STANDARDS.map((std) => (
                  <button
                    key={std}
                    type="button"
                    onClick={() => {
                      onSelectStandard(std);
                      setOpenDropdown(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                      selectedStandard === std
                        ? "bg-emerald-50 text-[#1B5E20] font-bold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{std}</span>
                    {selectedStandard === std && <Check className="w-3.5 h-3.5 text-[#1B5E20]" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Delivery Options */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("delivery")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all cursor-pointer bg-white ${
              deliveryOption !== "all"
                ? "border-[#1B5E20] text-[#1B5E20] bg-emerald-50/50"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-gray-400" />
            <span>
              {deliveryOption === "all"
                ? "ការដឹកជញ្ជូន"
                : deliveryOption === "delivery"
                ? "មានសេវាដឹក"
                : "យកដល់ចម្ការ"}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === "delivery" ? "rotate-180" : ""}`} />
          </button>

          {openDropdown === "delivery" && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)}></div>
              <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-30">
                {[
                  { id: "all", label: "ទាំងអស់" },
                  { id: "delivery", label: "មានសេវាដឹកដល់កន្លែង" },
                  { id: "pickup", label: "ទៅយកដល់ចម្ការផ្ទាល់" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onChangeDeliveryOption(opt.id);
                      setOpenDropdown(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                      deliveryOption === opt.id
                        ? "bg-emerald-50 text-[#1B5E20] font-bold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {deliveryOption === opt.id && <Check className="w-3.5 h-3.5 text-[#1B5E20]" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Reset Filter Button (Only when filter is active) */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer flex items-center gap-1.5 ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>កំណត់ឡើងវិញ</span>
          </button>
        )}

      </div>
    </div>
  );
}
