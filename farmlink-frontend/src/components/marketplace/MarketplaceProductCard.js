"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Heart,
  Star,
  MapPin,
  Phone,
  CheckCircle2,
  ArrowRight,
  Eye,
} from "lucide-react";

export default function MarketplaceProductCard({
  product,
  onViewDetail,
  onAddToCart,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    id,
    name,
    image,
    price,
    wholesalePrice,
    unit = "គ.ក",
    rating = 4.8,
    reviewsCount = 24,
    farmerName = "ចម្ការតារា",
    province = "តាកែវ",
    availableQty = 120,
    isVerified = true,
    moq = "កុម្ម៉ង់ចាប់ពី ១០ គ.ក",
    phone = "012 345 678",
  } = product;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/90 overflow-hidden hover:shadow-xl hover:border-emerald-400 transition-all duration-200 flex flex-col justify-between">
      
      {/* 1. TOP IMAGE & STOCK TAG */}
      <div
        className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden cursor-pointer"
        onClick={() => onViewDetail && onViewDetail(product)}
      >
        <Image
          src={image || "/category-veggies.jpg"}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-xs ${
            isFavorite
              ? "bg-white text-rose-600"
              : "bg-white/85 text-gray-500 hover:text-rose-500 hover:bg-white"
          }`}
          aria-label="ចូលចិត្ត"
        >
          <Heart
            className={`w-4 h-4 ${isFavorite ? "fill-rose-500 stroke-rose-500" : "stroke-current"}`}
          />
        </button>

        {/* Available Stock Tag */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold bg-black/65 text-white backdrop-blur-xs shadow-xs">
            ស្តុក {availableQty} {unit}
          </span>
        </div>
      </div>

      {/* 2. CARD CONTENT */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Farm Name & Location */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <div className="flex items-center gap-1 font-semibold text-gray-700 truncate">
              <span className="truncate">{farmerName}</span>
              {isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
            </div>
            <div className="flex items-center gap-1 shrink-0 text-gray-400">
              <MapPin className="w-3 h-3" />
              <span>ខេត្ត{province.replace("ខេត្ត", "")}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onViewDetail && onViewDetail(product)}
            className="text-base font-black text-gray-900 line-clamp-1 hover:text-[#1B5E20] cursor-pointer transition-colors mb-2"
            title={name}
          >
            {name}
          </h3>

          {/* Dual B2B Pricing Box */}
          <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100/80 mb-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide block">
                  តម្លៃបោះដុំ (≥ ៥០ {unit})
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-[#1B5E20]">
                    ${wholesalePrice || price}
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">/ {unit}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block">តម្លៃរាយ</span>
                <span className="text-xs font-bold text-gray-700">
                  ${price} / {unit}
                </span>
              </div>
            </div>
          </div>

          {/* MOQ & Star Rating */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="text-[11px] font-medium text-gray-600">
              {moq}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span>{rating}</span>
              <span className="text-gray-400 text-[10px] font-normal">({reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* 3. B2B ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-gray-100">
          {/* Direct Call Button */}
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            onClick={(e) => e.stopPropagation()}
            className="py-2.5 px-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
            title="ទាក់ទងកសិករ"
          >
            <Phone className="w-3.5 h-3.5 text-[#1B5E20]" />
            <span>ទាក់ទង</span>
          </a>

          {/* View Details / Order Button */}
          <button
            type="button"
            onClick={() => onViewDetail && onViewDetail(product)}
            className="py-2.5 px-2 rounded-xl bg-[#1B5E20] hover:bg-[#154a19] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-center"
            title="មើលព័ត៌មានលម្អិត"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>មើល (View)</span>
          </button>
        </div>
      </div>

    </div>
  );
}
