"use client";

import React, { useState, useEffect } from "react";
import { X, RotateCcw, Check, SlidersHorizontal, MapPin, Truck, DollarSign } from "lucide-react";

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

export default function FilterDrawer({
  isOpen,
  onClose,
  selectedProvince = "គ្រប់ខេត្ត-ក្រុង",
  onApplyProvince,
  priceRange = [0, 10],
  onApplyPriceRange,
  deliveryOption = "all",
  onApplyDeliveryOption,
  onResetAll,
}) {
  // Temporary state inside drawer until user clicks "អនុវត្ត"
  const [tempProvince, setTempProvince] = useState(selectedProvince);
  const [tempPriceMax, setTempPriceMax] = useState(priceRange[1]);
  const [tempDelivery, setTempDelivery] = useState(deliveryOption);

  useEffect(() => {
    if (isOpen) {
      setTempProvince(selectedProvince);
      setTempPriceMax(priceRange[1]);
      setTempDelivery(deliveryOption);
    }
  }, [isOpen, selectedProvince, priceRange, deliveryOption]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyProvince(tempProvince);
    onApplyPriceRange([0, tempPriceMax]);
    onApplyDeliveryOption(tempDelivery);
    onClose();
  };

  const handleReset = () => {
    setTempProvince("គ្រប់ខេត្ត-ក្រុង");
    setTempPriceMax(10);
    setTempDelivery("all");
    onResetAll && onResetAll();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 z-10">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1B5E20] flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">តម្រងស្វែងរក</h2>
              <span className="text-xs text-gray-400">ជ្រើសរើសខេត្ត តម្លៃ និងការដឹកជញ្ជូន</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
            aria-label="បិទ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Section 1: Price Range Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                <DollarSign className="w-4 h-4 text-[#1B5E20]" />
                <span>កម្រិតតម្លៃអតិបរមា ($/គ.ក)</span>
              </div>
              <span className="text-sm font-black text-[#1B5E20] bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
                ${tempPriceMax.toFixed(2)} / គ.ក
              </span>
            </div>

            <input
              type="range"
              min="0.5"
              max="10"
              step="0.25"
              value={tempPriceMax}
              onChange={(e) => setTempPriceMax(parseFloat(e.target.value))}
              className="w-full accent-[#1B5E20] cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
            />

            <div className="flex justify-between text-[11px] text-gray-400 font-medium">
              <span>$0.50</span>
              <span>$5.00</span>
              <span>$10.00</span>
            </div>
          </div>

          {/* Section 2: Delivery Options */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
              <Truck className="w-4 h-4 text-[#1B5E20]" />
              <span>សេវាដឹកជញ្ជូន</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {[
                { id: "all", label: "ទាំងអស់ (មានដឹក ឬទៅយកដល់ចម្ការ)" },
                { id: "delivery", label: "មានសេវាដឹកដល់ទីតាំង (Delivery available)" },
                { id: "pickup", label: "ទៅយកផ្ទាល់នៅចម្ការ (Pickup only)" },
              ].map((opt) => {
                const isSelected = tempDelivery === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTempDelivery(opt.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer text-left ${
                      isSelected
                        ? "border-[#1B5E20] bg-emerald-50/70 text-[#1B5E20] font-bold ring-1 ring-[#1B5E20]"
                        : "border-gray-200 text-gray-700 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#1B5E20]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Location / Province */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold text-gray-900">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1B5E20]" />
                <span>ទីតាំងខេត្ត / ក្រុង</span>
              </div>
              <span className="text-[11px] text-gray-400 font-normal">
                {tempProvince}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1 border border-gray-100 rounded-xl bg-gray-50/50">
              {PROVINCES.map((prov) => {
                const isSelected = tempProvince === prov;
                return (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => setTempProvince(prov)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer text-left truncate flex items-center justify-between ${
                      isSelected
                        ? "bg-[#1B5E20] text-white font-bold shadow-xs"
                        : "text-gray-700 hover:bg-white hover:shadow-2xs"
                    }`}
                  >
                    <span className="truncate">{prov}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-4 h-4 text-gray-500" />
            <span>កំណត់ឡើងវិញ</span>
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-3 px-4 rounded-xl bg-[#1B5E20] hover:bg-[#154a19] text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>អនុវត្តតម្រង</span>
          </button>
        </div>

      </div>

    </div>
  );
}
