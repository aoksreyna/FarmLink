"use client";

import React from "react";
import Image from "next/image";
import {
  Building2,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Phone,
} from "lucide-react";

export default function DemandCard({ demand, onSubmitProposal }) {
  const {
    id,
    buyerName,
    cropName,
    image,
    requiredQty,
    unit = "គ.ក",
    targetPrice,
    location,
    deadline,
    proposalsCount = 0,
    phone,
    isVerified = true,
    frequency = "ម្តង",
  } = demand;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/90 hover:border-emerald-400 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between">
      
      {/* 1. Balanced Header Image (Medium height h-36, perfectly proportioned) */}
      <div className="relative h-36 w-full bg-gray-100 overflow-hidden">
        <Image
          src={image || "/category-veggies.jpg"}
          alt={cropName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Frequency Badge */}
        <div className="absolute top-2.5 right-2.5">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/95 text-gray-800 shadow-xs backdrop-blur-xs">
            {frequency}
          </span>
        </div>

        {/* Target Price Overlay on Image */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-[#1B5E20] text-white shadow-md">
            តម្លៃគោលដៅ ៖ ${targetPrice} / {unit}
          </span>
        </div>
      </div>

      {/* 2. Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Buyer Info */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-gray-700 truncate">
              <span className="truncate">{buyerName}</span>
              {isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
            </div>
            <div className="flex items-center gap-1 shrink-0 text-gray-400 text-[11px]">
              <MapPin className="w-3 h-3" />
              <span>{location.split(",")[0]}</span>
            </div>
          </div>

          {/* Crop Title */}
          <h3
            className="text-base font-black text-gray-900 leading-tight mb-3 line-clamp-1 group-hover:text-[#1B5E20] transition-colors"
            title={cropName}
          >
            ត្រូវការ ៖ {cropName}
          </h3>

          {/* Volume & Deadline Row */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200/80 mb-4 text-xs">
            <div>
              <span className="text-[10px] text-gray-400 font-medium block">បរិមាណត្រូវការ</span>
              <strong className="text-sm font-black text-gray-900">
                {requiredQty} {unit}
              </strong>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-gray-400 font-medium block">កាលបរិច្ឆេទ</span>
              <span className="text-xs font-bold text-amber-600 flex items-center justify-end gap-1">
                <Clock className="w-3 h-3" />
                <span>{deadline}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3. Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {phone ? (
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
              title="ទាក់ទងអ្នកទិញ"
            >
              <Phone className="w-3.5 h-3.5 text-[#1B5E20]" />
              <span>ទាក់ទង</span>
            </a>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={() => onSubmitProposal(demand)}
            className="py-2.5 px-3 rounded-xl bg-[#1B5E20] hover:bg-[#154a19] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-center"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ដាក់សំណើរ</span>
          </button>
        </div>

      </div>

    </div>
  );
}
