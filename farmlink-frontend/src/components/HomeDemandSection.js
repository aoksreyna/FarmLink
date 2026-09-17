"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Calendar,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldAlert,
  Send,
  Eye,
  CheckCircle2,
  FileSpreadsheet,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function HomeDemandSection() {
  const { openAuth, user } = useAuth();
  const [selectedDemand, setSelectedDemand] = useState(null);

  //Mock data
  const featuredDemands = [
    {
      id: "DMD-5021",
      productName: "ស្ពៃបូកគោធម្មជាតិ",
      category: "បន្លែស្លឹក",
      image: null,
      volume: "៥០០ គ.ក / សប្តាហ៍",
      targetPrice: "$0.85 / គ.ក",
      buyerName: "ផ្សារទំនើប ឡាក់គី",
      location: "រាជធានីភ្នំពេញ",
      deadline: "២៥ កញ្ញា ២០២៦",
      urgency: "បន្ទាន់ខ្លាំង",
      standards: "ស្តង់ដារ GAP គ្មានគីមីពុល",
    },
    {
      id: "DMD-5022",
      productName: "ប៉េងប៉ោះឆឺរីសរីរាង្គ",
      category: "បន្លែផ្លែ",
      image: null,
      volume: "២០០ គ.ក / សប្តាហ៍",
      targetPrice: "$1.80 / គ.ក",
      buyerName: "ភោជនីយដ្ឋាន ទន្លេបាសាក់",
      location: "រាជធានីភ្នំពេញ",
      deadline: "២២ កញ្ញា ២០២៦",
      urgency: "ធម្មតា",
      standards: "សរីរាង្គសុទ្ធ ១០០% ស្រស់ស្រួយ",
    },
    {
      id: "DMD-5023",
      productName: "ម្ទេសដៃនាងក្រហមស្រស់",
      category: "គ្រឿងទេស",
      image: null,
      volume: "១០០ គ.ក / សប្តាហ៍",
      targetPrice: "$2.60 / គ.ក",
      buyerName: "សណ្ឋាគារ ហ្គាដិនភ្នំពេញ",
      location: "រាជធានីភ្នំពេញ",
      deadline: "២០ កញ្ញា ២០២៦",
      urgency: "បន្ទាន់ខ្លាំង",
      standards: "ម្ទេសក្រហមសុទ្ធ ១០០% ស្រស់ទើបបេះ",
    },
    {
      id: "DMD-5024",
      productName: "ស្វាយកែវរមៀតផ្អែម",
      category: "ផ្លែឈើ",
      image: null,
      volume: "១,០០០ គ.ក (១ តោន)",
      targetPrice: "$0.70 / គ.ក",
      buyerName: "រោងចក្រកែច្នៃដំណាប់ស្វាយ",
      location: "ខេត្តកំពង់ស្ពឺ",
      deadline: "៣០ កញ្ញា ២០២៦",
      urgency: "ធម្មតា",
      standards: "ស្វាយចាស់សាច់លឿង កម្រិតជាតិស្ករខ្ពស់",
    },
  ];

  const handleOfferClick = (demand) => {
    if (!user) {
      openAuth("login");
    } else {
      alert(`លោកអ្នកអាចដាក់សំណើរផ្គត់ផ្គង់ទៅកាន់ ${demand.buyerName} ក្នុងផ្ទាំងគ្រប់គ្រងកសិករ!`);
    }
  };

  return (
    <section className="bg-slate-50 py-14 sm:py-18 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Live Pulsing Badge */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-bold mb-2.5">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              <span>តម្រូវការទិញបន្ទាន់ពីទីផ្សារ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              ផ្សារទំនើប & ភោជនីយដ្ឋាន កំពុងស្វែងរកទិញកសិផល
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              កសិករ និងសហគមន៍កសិកម្មអាចដាក់សំណើរផ្គត់ផ្គង់ដោយផ្ទាល់ ដើម្បីទទួលបានកិច្ចសន្យាទិញដុំទៀងទាត់។
            </p>
          </div>

          <Link
            href="/farmer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#1B5E20] hover:bg-[#154a19] text-white transition-all shrink-0 self-start sm:self-auto shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>មើលតម្រូវការទាំងអស់</span>
          </Link>
        </div>

        {/* Demands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDemands.map((demand) => (
            <div
              key={demand.id}
              className="bg-white rounded-2xl border border-gray-200/90 hover:border-[#1B5E20]/40 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Clean Image */}
                <div className="relative aspect-16/10 w-full bg-gray-100 overflow-hidden">
                  <img
                    src={demand.image}
                    alt={demand.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs ${
                        demand.urgency === "បន្ទាន់ខ្លាំង"
                          ? "bg-rose-600 text-white"
                          : "bg-amber-600 text-white"
                      }`}
                    >
                      {demand.urgency}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {demand.id}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 space-y-3">
                  
                  {/* Buyer & Crop Title */}
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mb-1">
                      <Building2 className="w-3.5 h-3.5 text-[#1B5E20] shrink-0" />
                      <span className="truncate">{demand.buyerName}</span>
                    </div>
                    <h3 className="text-base font-black text-gray-900 leading-snug">
                      {demand.productName}
                    </h3>
                  </div>

                  {/* Clean Key Details: Target Price & Volume */}
                  <div className="pt-2 border-t border-gray-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-gray-400 block font-medium">តម្លៃទិញ</span>
                      <span className="text-lg font-black text-[#1B5E20]">
                        {demand.targetPrice}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-gray-400 block font-medium">បរិមាណត្រូវការ</span>
                      <span className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded-md">
                        {demand.volume}
                      </span>
                    </div>
                  </div>

                  {/* Quality standard badge */}
                  <div className="text-xs text-gray-600 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100/60 flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">ស្តង់ដារ៖</span>
                    <span className="font-bold text-emerald-900 text-[11px]">
                      {demand.standards}
                    </span>
                  </div>

                  {/* Destination & Deadline */}
                  <div className="space-y-1 text-xs text-gray-500 pt-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{demand.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-600 font-medium">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>ផុតកំណត់៖ {demand.deadline}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Card Action Button */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => handleOfferClick(demand)}
                  className="w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold bg-[#1B5E20] hover:bg-[#154a19] text-white transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ដាក់សំណើរផ្គត់ផ្គង់</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
