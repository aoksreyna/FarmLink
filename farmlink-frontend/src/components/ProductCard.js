"use client";

import React, { useState } from "react";
import {
  Star,
  Heart,
  MapPin,
  CheckCircle2,
  ShoppingCart,
  Eye,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProductCard({
  name = "កសិផលស្រស់",
  image = "/tomato.jpg",
  price = "0.75",
  wholesalePrice = null,
  currency = "$",
  unit = "គ.ក",
  rating = 4.9,
  farmerName = "សហគមន៍កសិកម្មដារ៉ា",
  communityName = null,
  isVerified = true,
  location = "ខេត្តតាកែវ",
  availableQty = "១២០ គ.ក",
  isFresh = true,
  standard = "ស្តង់ដារ GAP", // "ស្តង់ដារ GAP" | "សរីរាង្គ" | "ធម្មជាតិ"
  moq = "ចាប់ពី ១ គ.ក (រាយ/ដុំ)", // Flexibly allows retail or wholesale
  onViewDetail,
  onAddToCart,
  onRequest,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const { user, openAuth } = useAuth();

  const handleCardAction = () => {
    if (onAddToCart) {
      onAddToCart();
    } else if (onRequest) {
      onRequest();
    } else if (!user) {
      openAuth("login");
    } else {
      alert(`បានបន្ថែម ${name} ទៅក្នុងកន្ត្រកបញ្ជាទិញ!`);
    }
  };

  const handleLike = () => {
    if (!user) {
      openAuth("login");
    } else {
      setIsLiked(!isLiked);
    }
  };

  // Determine standard badge styling
  const isOrganic = standard?.includes("សរីរាង្គ") || standard?.toLowerCase().includes("organic");

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-lg hover:border-[#1B5E20]/30 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* 1. Product Image Area */}
      <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-Left Badge: Freshness */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
          {isFresh && (
            <span className="inline-flex items-center gap-1 bg-emerald-600/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-xs backdrop-blur-xs">
              <Sparkles className="w-2.5 h-2.5" />
              ស្រស់ពីចម្ការ
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleLike}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors shadow-xs cursor-pointer"
          aria-label="Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </button>

        {/* Bottom image gradient strip indicating Retail & Bulk Friendly */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2 flex items-center justify-between text-white text-[11px]">
          <span className="flex items-center gap-1 font-medium drop-shadow-xs">
            <Package className="w-3 h-3 text-emerald-300" />
            {moq}
          </span>
          <span className="text-[10px] bg-white/20 backdrop-blur-xs px-1.5 py-0.5 rounded font-bold">
            រាយ & ដុំ
          </span>
        </div>
      </div>

      {/* 2. Product Details Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Title & Rating */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4
              className="font-bold text-sm sm:text-[15px] text-gray-900 line-clamp-1 group-hover:text-[#1B5E20] transition-colors"
              title={name}
            >
              {name}
            </h4>
            <div className="flex items-center gap-1 text-[11px] font-bold text-gray-700 shrink-0 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{rating}</span>
            </div>
          </div>

          {/* Pricing: Retail & Wholesale tier */}
          <div className="mt-2 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-[#1B5E20]">
                  {currency}{price}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  / {unit}
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-medium">
                តម្លៃរាយទូទៅ
              </span>
            </div>

            {/* Bulk / Wholesale Tier Highlight */}
            <div className="text-right">
              <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 inline-flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#1B5E20]" />
                ដុំ: {currency}{wholesalePrice || (Number(price) * 0.85).toFixed(2)}
              </span>
              <p className="text-[10px] text-emerald-700 font-medium mt-0.5">
                (ទិញចាប់ពី ២០ {unit} ឡើង)
              </p>
            </div>
          </div>
        </div>

        {/* 3. Origin, Community & Stock Availability */}
        <div className="space-y-1.5 pt-2.5 border-t border-gray-100 text-xs text-gray-600">
          
          {/* Farmer & Community */}
          <div className="flex items-center gap-1.5 font-semibold text-gray-800 truncate">
            <span className="text-emerald-700 font-bold">
              {communityName || farmerName}
            </span>
            {isVerified && (
              <CheckCircle2
                className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 shrink-0"
                title="កសិដ្ឋានបានផ្ទៀងផ្ទាត់"
              />
            )}
          </div>

          {/* Province / Location */}
          <div className="flex items-center gap-1.5 text-gray-500 truncate text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          {/* Stock in Bulk */}
          <div className="flex items-center justify-between text-[11px] pt-0.5 font-medium">
            <span className="text-gray-500">ស្តុកក្នុងដៃ៖</span>
            <span className="font-bold text-emerald-800 bg-emerald-50/80 px-2 py-0.5 rounded">
              {availableQty}
            </span>
          </div>
        </div>

        {/* 4. Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={onViewDetail}
            className="w-full py-2 px-2 text-center rounded-lg text-xs font-bold border border-gray-200 text-gray-700 hover:border-[#1B5E20] hover:text-[#1B5E20] hover:bg-emerald-50/50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>មើល (View)</span>
          </button>
          <button
            onClick={handleCardAction}
            className="w-full py-2 px-2 text-center rounded-lg text-xs font-bold bg-[#1B5E20] hover:bg-[#154a19] text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>ដាក់កន្ត្រក</span>
          </button>
        </div>

      </div>
    </div>
  );
}
