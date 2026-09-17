"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  Check,
  Users,
  Handshake,
  Truck,
  Coins,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AboutPage() {
  const { openAuth } = useAuth();

  const valuesList = [
    "ទំនុកចិត្ត & តម្លាភាព",
    "គាំទ្រសហគមន៍កសិករមូលដ្ឋាន",
    "និរន្តរភាពបរិស្ថាន & សុវត្ថិភាពចំណីអាហារ",
    "នវានុវត្តន៍បច្ចេកវិទ្យាកសិកម្ម",
    "ការផ្តល់តម្លៃលើផលប្រយោជន៍កសិករជាចម្បង",
  ];

  const badges = [
    {
      icon: Coins,
      title: "ប្រាក់ចំណូលសមរម្យ",
      subtitle: "ជូនកសិករខ្មែរ",
    },
    {
      icon: Handshake,
      title: "ភ្ជាប់ផ្ទាល់គ្មានឈ្មួញកណ្តាល",
      subtitle: "តម្លៃតម្លាភាព",
    },
    {
      icon: Truck,
      title: "ដឹកជញ្ជូនរក្សាភាពត្រជាក់",
      subtitle: "កសិផលស្រស់ថ្មី",
    },
    {
      icon: Users,
      title: "ពង្រឹងសហគមន៍រឹងមាំ",
      subtitle: "អនាគតកសិកម្មចីរភាព",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 bg-gradient-to-b from-[#edf8ee]/80 via-[#f5fbf6]/50 to-white overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-gray-900 tracking-tight leading-[1.25] mb-6">
              លើកស្ទួយកសិករខ្មែរ <br />
              <span className="text-[#1B5E20]">ផ្គត់ផ្គង់កសិផលសុវត្ថិភាព</span> <br />
              <span className="text-[#1B5E20]">ដល់សហគមន៍ទូទាំងប្រទេស</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              FarmLink គឺជាវេទិកាទីផ្សារកសិផលបោះដុំផ្ទាល់ឈានមុខគេនៅកម្ពុជា។ យើងផ្សារភ្ជាប់កសិករផលិតផ្ទាល់ជាមួយអាជីវកម្ម ភោជនីយដ្ឋាន ផ្សារទំនើប ដើម្បីកសាងប្រព័ន្ធស្បៀងអាហារដែលមាននិរន្តរភាព និងយុត្តិធម៌។
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#1B5E20] text-white hover:bg-[#154a19] transition-all shadow-md group cursor-pointer"
              >
                <span>ស្វែងរកកសិផល</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                type="button"
                onClick={() => openAuth("register", "farmer")}
                className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-bold bg-white text-[#1B5E20] border-2 border-[#1B5E20] hover:bg-emerald-50 transition-all cursor-pointer shadow-xs"
              >
                ចូលរួមជាមួយ FarmLink
              </button>
            </div>

          </div>
        </section>

        {/* 3. Why We Built FarmLink Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Story text */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-[#1B5E20] text-xs font-bold">
                  <span>📖 រឿងរ៉ាវរបស់យើង</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                  ហេតុអ្វីបានជាយើងបង្កើត FarmLink?
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                  <p>
                    អស់រយៈពេលជាច្រើនជំនាន់មកហើយ កសិករខ្មែរខិតខំដាំដុះស្រូវផ្ការំដួលដ៏ល្បីល្បាញ បន្លែផ្លែឈើស្រស់ធម្មជាតិ និងដំណាំកសិកម្មប្រកបដោយគុណភាពខ្ពស់។ ក៏ប៉ុន្តែ ខ្សែច្រវាក់ផ្គត់ផ្គង់ប្រពៃណីបានបង្ខំឱ្យកសិករលក់តាមរយៈឈ្មួញកណ្តាលជាច្រើនដំណាក់កាល ទទួលបានកម្រៃតិចតួច ចំណែកឯភោជនីយដ្ឋាន និងផ្សារទំនើបក្នុងក្រុងជួបបញ្ហាតម្លៃមិនថេរ និងគុណភាពមិនទៀងទាត់។
                  </p>
                  <p>
                    យើងបានបង្កើត <strong className="font-bold text-[#1B5E20]">FarmLink</strong> ឡើងដើម្បីដោះស្រាយបញ្ហានេះដោយប្រើបច្ចេកវិទ្យាឌីជីថល។ តាមរយៈការតភ្ជាប់កសិករផ្ទាល់ជាមួយអ្នកទិញ និងការរៀបចំបណ្តាញដឹកជញ្ជូនត្រជាក់ប្រកបដោយស្តង់ដារ យើងធានាថាកសិករទទួលបានប្រាក់ចំណូលសមរម្យ ចំណែកអ្នកទិញទទួលបានកសិផលស្រស់ថ្មីក្នុងតម្លៃដើមសមរម្យ។
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Card with Delivery Truck and 4 Feature Badges */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden shadow-lg bg-white">
                  
                  {/* Image Area */}
                  <div className="relative w-full h-56 sm:h-72 md:h-80 bg-gray-100">
                    <Image
                      src="/about-truck.jpg"
                      alt="រថយន្តដឹកជញ្ជូនត្រជាក់របស់ FarmLink"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* 4 Badges in Bottom Overlay / Bar */}
                  <div className="p-4 sm:p-5 bg-white border-t border-gray-100">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      {badges.map((badge, idx) => {
                        const Icon = badge.icon;
                        return (
                          <div
                            key={idx}
                            className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50/60 hover:bg-emerald-50/50 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#1B5E20] flex items-center justify-center mb-1.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-gray-900 leading-tight">
                              {badge.title}
                            </span>
                            <span className="text-[10px] text-gray-500 mt-0.5">
                              {badge.subtitle}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Our Mission, Vision & Values Section */}
        <section className="py-16 sm:py-24 bg-[#EBF7EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B5E20] tracking-tight">
                បេសកកម្ម ចក្ខុវិស័យ និងគុណតម្លៃ
              </h2>
            </div>

            {/* 3 Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              
              {/* Card 1: Our Mission */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100/80 shadow-sm flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B5E20] flex items-center justify-center mb-5 ring-1 ring-emerald-200/50">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3">
                  បេសកកម្មរបស់យើង
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">
                  តភ្ជាប់កសិករ និងអាជីវកម្មតាមរយៈវេទិកាឌីជីថលដ៏សាមញ្ញ គួរឱ្យទុកចិត្ត និងមានប្រសិទ្ធភាពខ្ពស់ ដែលលើកកម្ពស់ពាណិជ្ជកម្មយុត្តិធម៌ និងការរីកចម្រើនប្រកបដោយចីរភាព។
                </p>
              </div>

              {/* Card 2: Our Vision */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100/80 shadow-sm flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B5E20] flex items-center justify-center mb-5 ring-1 ring-emerald-200/50">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3">
                  ចក្ខុវិស័យរបស់យើង
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">
                  ក្លាយជាវេទិកាពាណិជ្ជកម្មកសិផលបោះដុំឈានមុខគេនៅកម្ពុជា និងក្នុងតំបន់ ដោយផ្តល់អំណាចសេដ្ឋកិច្ចដល់កសិករ និងអាជីវកម្ម ដើម្បីអនាគតបៃតង និងសុខុមាលភាពរឹងមាំ។
                </p>
              </div>

              {/* Card 3: Our Values */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100/80 shadow-sm flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B5E20] flex items-center justify-center mb-5 ring-1 ring-emerald-200/50">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3">
                  គុណតម្លៃស្នូល
                </h3>
                <ul className="space-y-3 flex-1">
                  {valuesList.map((val, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-700">
                      <div className="w-4 h-4 rounded-full bg-[#1B5E20] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{val}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
