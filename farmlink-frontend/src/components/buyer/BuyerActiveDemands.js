"use client";

import React from "react";
import Image from "next/image";
import { PlusCircle, Clock, Users, ArrowRight, Check } from "lucide-react";

//Mock Data (Test and See UI only , Remove when fetch data from backend)
export const MOCK_BUYER_DEMANDS = [
  {
    id: "MY-DEM-1",
    cropName: "ស្វាយកែវរមៀតស្រស់",
    image: "/papaya.jpg",
    requiredQty: "៥,០០០",
    unit: "គ.ក",
    targetPrice: "0.45",
    deadline: "នៅសល់ ៧ ថ្ងៃ",
    proposals: [
      { id: "P-1", farmerName: "ចម្ការសំបូរផល", province: "បាត់ដំបង", offerPrice: "0.42", qty: "៥,០០០", date: "15 កញ្ញា" },
      { id: "P-2", farmerName: "សហគមន៍កសិកម្មមោងឫស្សី", province: "បាត់ដំបង", offerPrice: "0.45", qty: "៣,០០០", date: "14 កញ្ញា" },
      { id: "P-3", farmerName: "ចម្ការធម្មជាតិតាកែវ", province: "តាកែវ", offerPrice: "0.44", qty: "២,០០០", date: "14 កញ្ញា" },
    ],
  },
  {
    id: "MY-DEM-2",
    cropName: "ប៉េងប៉ោះធម្មជាតិ",
    image: "/tomato.jpg",
    requiredQty: "១,៥០០",
    unit: "គ.ក",
    targetPrice: "0.65",
    deadline: "នៅសល់ ៣ ថ្ងៃ",
    proposals: [
      { id: "P-4", farmerName: "ចម្ការតារា", province: "តាកែវ", offerPrice: "0.60", qty: "១,៥០០", date: "15 កញ្ញា" },
      { id: "P-5", farmerName: "ចម្ការបៃតងកណ្តាល", province: "កណ្តាល", offerPrice: "0.65", qty: "១,០០០", date: "13 កញ្ញា" },
    ],
  },
];

export default function BuyerActiveDemands({ onNewDemand, onSelectTab }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-900">
            តម្រូវការទិញដែលអ្នកបានប្រកាស (Sourcing Demands)
          </h3>
          <span className="text-xs text-gray-400">
            ពិនិត្យមើលសំណើរផ្គត់ផ្គង់ដែលកសិករបានដាក់ដេញថ្លៃ
          </span>
        </div>

        <button
          type="button"
          onClick={onNewDemand}
          className="px-3.5 py-2 rounded-xl bg-[#1B5E20] hover:bg-[#154a19] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>+ ប្រកាសថ្មី</span>
        </button>
      </div>

      {/* Demand Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_BUYER_DEMANDS.map((demand) => (
          <div
            key={demand.id}
            className="p-4 rounded-xl border border-gray-200/90 bg-gray-50/50 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200">
                <Image
                  src={demand.image}
                  alt={demand.cropName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-900 truncate">
                  {demand.cropName}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>ត្រូវការ ៖ <strong>{demand.requiredQty} {demand.unit}</strong></span>
                  <span>·</span>
                  <span className="text-[#1B5E20] font-bold">${demand.targetPrice}/{demand.unit}</span>
                </div>
              </div>

              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                {demand.deadline}
              </span>
            </div>

            {/* Received Proposals Count */}
            <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
              <span className="text-gray-600 flex items-center gap-1.5 font-medium">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>ទទួលបាន <strong>{demand.proposals.length} សំណើរ</strong> ពីកសិករ</span>
              </span>

              <button
                type="button"
                onClick={() => onSelectTab && onSelectTab("my-demands")}
                className="text-xs font-bold text-[#1B5E20] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>ពិនិត្យសំណើរ</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
