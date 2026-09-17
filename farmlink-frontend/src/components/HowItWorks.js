"use client";

import React, { useState } from "react";
import {
  Store,
  UserCheck,
  Search,
  FileCheck,
  Truck,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  ArrowRight,
  ClipboardList,
} from "lucide-react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("buyer"); // 'buyer' | 'farmer'

  const buyerSteps = [
    {
      stepNumber: 1,
      title: "ស្វែងរក & ដាក់តម្រូវការ",
      description: "រើសកសិផលស្រស់ពីកសិដ្ឋាន ឬបង្ហោះតម្រូវការបញ្ជាទិញតាមបរិមាណដែលអ្នកត្រូវការ (រាយ ឬដុំរាប់តោន)។",
      icon: <Search className="w-7 h-7 text-[#1B5E20] stroke-[2.2]" />,
    },
    {
      stepNumber: 2,
      title: "ចរចាតម្លៃ & កិច្ចសន្យា",
      description: "ទទួលបានតម្លៃបោះដុំផ្ទាល់ពីកសិករ/សហគមន៍ គ្មានឈ្មួញកណ្តាលកាត់ថ្លៃ និងមានវិក្កយបត្រត្រឹមត្រូវ។",
      icon: <FileCheck className="w-7 h-7 text-[#1B5E20] stroke-[2.2]" />,
    },
    {
      stepNumber: 3,
      title: "ដឹកជញ្ជូន & ពិនិត្យគុណភាព",
      description: "កសិផលត្រូវបានដឹកជញ្ជូនរហ័សដល់ទីកន្លែង រក្សាភាពស្រស់ និងត្រួតពិនិត្យស្តង់ដារ GAP មុនទូទាត់ប្រាក់។",
      icon: <Truck className="w-7 h-7 text-[#1B5E20] stroke-[2.2]" />,
    },
  ];

  const farmerSteps = [
    {
      stepNumber: 1,
      title: "ចុះបញ្ជីកសិផលឥតគិតថ្លៃ",
      description: "ថតរូបកសិផល កំណត់បរិមាណស្តុក និងកំណត់តម្លៃលក់ដោយខ្លួនឯង ដោយមិនបាច់បារម្ភពីការគាបសង្កត់តម្លៃ។",
      icon: <ClipboardList className="w-7 h-7 text-[#1B5E20] stroke-[2.2]" />,
    },
    {
      stepNumber: 2,
      title: "ទទួលការកុម្ម៉ង់ដុំរាប់តោន",
      description: "ភ្ជាប់ទំនាក់ទំនងដោយផ្ទាល់ជាមួយផ្សារទំនើប ភោជនីយដ្ឋាន និងរោងចក្រដែលកំពុងស្វែងរកទិញកសិផលជាប្រចាំ។",
      icon: <TrendingUp className="w-7 h-7 text-[#1B5E20] stroke-[2.2]" />,
    },
    {
      stepNumber: 3,
      title: "ទូទាត់ប្រាក់ឆាប់រហ័ស & សុវត្ថិភាព",
      description: "ទទួលបានប្រាក់ចំណូលពេញលេញ និងទាន់ពេលវេលាតាមរយៈប្រព័ន្ធទូទាត់អេឡិចត្រូនិកប្រកបដោយទំនុកចិត្ត។",
      icon: <CreditCard className="w-7 h-7 text-[#1B5E20] stroke-[2.2]" />,
    },
  ];

  const currentSteps = activeTab === "buyer" ? buyerSteps : farmerSteps;

  return (
    <section className="bg-[#FAFDF9] py-16 sm:py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-[#1B5E20] text-xs font-bold mb-3">
            <span>⚙️ ដំណើរការប្រកបដោយតម្លាភាព</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            តើ FarmLink ដំណើរការយ៉ាងដូចម្តេច?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 leading-relaxed">
            ប្រព័ន្ធផ្គូផ្គងកសិផលឆ្លាតវៃ ជួយសម្រួលដល់ការជួញដូរកសិកម្មទាំងសងខាងឱ្យកាន់តែលឿន មានសុវត្ថិភាព និងចំណេញពេលវេលា។
          </p>
        </div>

        {/* Dual Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-gray-200/70 rounded-2xl border border-gray-200 shadow-inner">
            <button
              onClick={() => setActiveTab("buyer")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "buyer"
                  ? "bg-[#1B5E20] text-white shadow-md"
                  : "text-gray-700 hover:text-[#1B5E20]"
              }`}
            >
              <Store className="w-4 h-4" />
              <span>សម្រាប់អ្នកទិញដុំ</span>
            </button>
            <button
              onClick={() => setActiveTab("farmer")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "farmer"
                  ? "bg-[#1B5E20] text-white shadow-md"
                  : "text-gray-700 hover:text-[#1B5E20]"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>សម្រាប់កសិករ & សហគមន៍</span>
            </button>
          </div>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {currentSteps.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="group relative bg-white rounded-3xl border border-emerald-100/90 p-8 flex flex-col items-center text-center shadow-xs hover:shadow-xl hover:border-[#1B5E20]/40 transition-all duration-300"
            >
              {/* Step Number Badge */}
              <span className="absolute -top-3.5 left-7 w-8 h-8 rounded-full bg-[#1B5E20] text-white font-black text-xs flex items-center justify-center shadow-md">
                {step.stepNumber}
              </span>

              {/* Step Icon */}
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 mt-1 group-hover:scale-110 group-hover:bg-emerald-100/70 transition-all duration-300">
                {step.icon}
              </div>

              {/* Step Title & Description */}
              <h3 className="text-base sm:text-lg font-black text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

