"use client";

import React from "react";
import { UserCheck, Store } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function CtaBanner() {
  const { openAuth } = useAuth();

  return (
    <section className="bg-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container with clear scenic tea-farm background */}
        <div className="relative max-w-5xl mx-auto rounded-3xl sm:rounded-[36px] overflow-hidden min-h-[220px] sm:min-h-[260px] flex items-center justify-center p-8 sm:p-12 shadow-xl border border-gray-100">
          
          {/* Clear Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/Cta-image.png"
              alt="FarmLink CTA background"
              className="w-full h-full object-cover object-center select-none"
            />
          </div>

          {/* Centered Content with Title, Subtitle, and Buttons */}
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-3 sm:space-y-4">
            
            {/* Title in bold black */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 leading-tight">
              តើអ្នកត្រៀមខ្លួនរួចរាល់ហើយឬនៅ?
            </h2>
            
            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-emerald-950 font-bold max-w-lg mx-auto leading-relaxed">
              ចូលរួមជាមួយ FarmLink ថ្ងៃនេះ ដើម្បីពង្រីកទីផ្សារកសិផលរបស់អ្នក និងទទួលបានការផ្គត់ផ្គង់ប្រកបដោយនិរន្តរភាព។
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-1 sm:pt-2">
              <button
                type="button"
                onClick={() => openAuth("register", "farmer")}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#1B5E20] hover:bg-[#154a19] text-white transition-all flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-white" />
                <span>ចុះឈ្មោះជាកសិករ</span>
              </button>
              
              <button
                type="button"
                onClick={() => openAuth("register", "buyer")}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-gray-50 text-[#1B5E20] border border-[#1B5E20] transition-all flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                <Store className="w-4 h-4 text-[#1B5E20] stroke-[2.5]" />
                <span>ចុះឈ្មោះជាអ្នកទិញដុំ</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
