import React from "react";
import { Sprout, Handshake, ShoppingBag, MapPin } from "lucide-react";

export default function StatsBar({
  stats = { farmers: 0, buyers: 0, products: 0, provinces: 25 },
}) {
  const statItems = [
    {
      value: (stats.farmers || 120).toLocaleString(),
      label: "កសិករ & សហគមន៍",
      subtext: "បានចុះបញ្ជី និងផ្ទៀងផ្ទាត់",
      icon: Sprout,
    },
    {
      value: (stats.buyers || 45).toLocaleString(),
      label: "ដៃគូទិញបោះដុំ",
      subtext: "ផ្សារទំនើប ភោជនីយដ្ឋាន សណ្ឋាគារ",
      icon: Handshake,
    },
    {
      value: (stats.products || 350).toLocaleString(),
      label: "មុខកសិផលសកម្ម",
      subtext: "ប្រមូលផលស្រស់ៗរាល់ថ្ងៃ",
      icon: ShoppingBag,
    },
    {
      value: "២៥",
      label: "រាជធានី-ខេត្ត",
      subtext: "គ្របដណ្តប់បណ្តាញទូទាំងប្រទេស",
      icon: MapPin,
    },
  ];

  return (
    <section className="bg-white py-8 border-b border-gray-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statItems.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-emerald-50/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B5E20] border border-emerald-100/60 flex items-center justify-center shrink-0 shadow-2xs">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none">
                    {stat.value}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-gray-800 mt-1">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {stat.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
