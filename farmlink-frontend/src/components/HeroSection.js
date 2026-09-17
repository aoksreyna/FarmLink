"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  Building2,
  Store,
  UserCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function HeroSection() {
  const router = useRouter();
  const { openAuth } = useAuth();

  // Search filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedVolume, setSelectedVolume] = useState("");

  // Hero Background Carousel
  const heroImages = [
    {
      src: "/hero-farmer.jpg",
      alt: "កសិករខ្មែរប្រមូលផលបន្លែស្រស់",
      caption: "កសិផលបោះដុំផ្ទាល់ពីចម្ការ គ្មានឈ្មួញកណ្តាល",
    },
    {
      src: "/hero-image2.png",
      alt: "ទិដ្ឋភាពចម្ការកសិកម្មបៃតងធម្មជាតិ",
      caption: "តភ្ជាប់បណ្តាញផ្គត់ផ្គង់កសិកម្មទូទាំង ២៥ ខេត្ត-ក្រុង",
    },
    {
      src: "/hero-image3.png",
      alt: "ដំណាំកសិផលខៀវស្រងាត់",
      caption: "ធានាស្តង់ដារគុណភាព GAP និងសុវត្ថិភាពចំណីអាហារ",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto transition every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const provinces = [
    "រាជធានីភ្នំពេញ",
    "បាត់ដំបង",
    "កំពង់ចាម",
    "សៀមរាប",
    "តាកែវ",
    "កំពត",
    "កណ្តាល",
    "ពោធិ៍សាត់",
    "កំពង់ធំ",
    "ព្រៃវែង",
  ];

  const quickCategories = [
    "ស្ពៃក្តោប",
    "ប៉េងប៉ោះ",
    "ម្ទេសដៃនាង",
    "ត្រសក់ផ្អែម",
    "ពោតបារាំង",
    "អង្ករផ្ការំដួល",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set("q", searchTerm);
    if (selectedProvince) params.set("province", selectedProvince);
    if (selectedVolume) params.set("volume", selectedVolume);
    router.push(`/marketplace?${params.toString()}`);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative min-h-[580px] lg:min-h-[620px] flex items-center overflow-hidden bg-slate-900">
      
      {/* 1. Background Carousel with Dark Overlay for Maximum Contrast & B2B Feel */}
      {heroImages.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "1200ms" }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover object-[center_35%]"
          />
          {/* Subtle multi-layer gradient for professional readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>
      ))}

      {/* 2. Hero Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-3xl space-y-6">
          
          {/* Strong Headline in Pure Khmer */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.25] tracking-tight">
              តភ្ជាប់កសិករផ្ទាល់ជាមួយ <br className="hidden sm:inline" />
              <span className="text-emerald-400">
                ទីផ្សារបោះដុំកសិផល
              </span> គ្រប់ខេត្ត-ក្រុង
            </h1>
            <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed max-w-2xl pt-1">
              ផ្គត់ផ្គង់បន្លែ ផ្លែឈើ និងដំណាំស្រស់ៗពីចម្ការដល់ផ្សារទំនើប ភោជនីយដ្ឋាន និងរោងចក្រកែច្នៃ ក្នុងតម្លៃសមរម្យ និងមានតម្លាភាពដោយគ្មានឈ្មួញកណ្តាល។
            </p>
          </div>

          {/* 3. Intelligent B2B Search & Filter Bar */}
          <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/40 max-w-2xl">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
              
              {/* Search input */}
              <div className="flex-1 flex items-center gap-2.5 px-3 py-2.5 bg-gray-50/90 rounded-xl border border-gray-200 focus-within:border-[#1B5E20] focus-within:bg-white transition-all">
                <Search className="w-4 h-4 text-[#1B5E20] shrink-0" />
                <input
                  type="text"
                  placeholder="ស្វែងរកកសិផល (ឧ. ស្ពៃក្តោប, ប៉េងប៉ោះ...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-transparent outline-hidden text-gray-900 placeholder:text-gray-400 font-medium"
                />
              </div>

              {/* Province Selector */}
              <div className="sm:w-44 flex items-center gap-2 px-3 py-2.5 bg-gray-50/90 rounded-xl border border-gray-200 focus-within:border-[#1B5E20] focus-within:bg-white transition-all">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  aria-label="ជ្រើសរើសខេត្តផលិត"
                  className="w-full text-xs sm:text-sm bg-transparent outline-hidden text-gray-700 font-medium cursor-pointer"
                >
                  <option value="">គ្រប់ខេត្ត-ក្រុង</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Volume Range Selector */}
              <div className="sm:w-40 flex items-center gap-2 px-3 py-2.5 bg-gray-50/90 rounded-xl border border-gray-200 focus-within:border-[#1B5E20] focus-within:bg-white transition-all">
                <SlidersHorizontal className="w-4 h-4 text-emerald-700 shrink-0" />
                <select
                  value={selectedVolume}
                  onChange={(e) => setSelectedVolume(e.target.value)}
                  aria-label="បរិមាណកុម្ម៉ង់"
                  className="w-full text-xs sm:text-sm bg-transparent outline-hidden text-gray-700 font-medium cursor-pointer"
                >
                  <option value="">បរិមាណ (រាយ/ដុំ)</option>
                  <option value="1">ចាប់ពី ១ គ.ក</option>
                  <option value="50">&gt; ៥០ គ.ក</option>
                  <option value="200">&gt; ២០០ គ.ក</option>
                  <option value="1000">&gt; ១,០០០ គ.ក (តោន)</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-6 py-3 bg-[#1B5E20] hover:bg-[#154a19] text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer shrink-0"
              >
                <span>ស្វែងរក</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Sourcing Tags */}
            <div className="flex items-center gap-2 pt-3 px-1 flex-wrap text-xs">
              <span className="text-gray-500 font-semibold">កសិផលពេញនិយម៖</span>
              {quickCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setSearchTerm(item);
                    router.push(`/marketplace?q=${encodeURIComponent(item)}`);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-gray-100/90 hover:bg-emerald-50 text-gray-700 hover:text-[#1B5E20] font-medium transition-colors cursor-pointer text-[11px]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Dual Persona Entry Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/marketplace"
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#1B5E20] text-white hover:bg-[#154a19] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
            >
              <Store className="w-4 h-4" />
              <span>ស្វែងរកទិញកសិផល (អ្នកទិញ)</span>
            </Link>

            <button
              type="button"
              onClick={() => openAuth("register", "farmer")}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>ចុះឈ្មោះលក់កសិផល (កសិករ)</span>
            </button>
          </div>

        </div>
      </div>

      {/* 5. Slide Controls & Caption */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-20 flex items-center gap-3 bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 text-white">
        <span className="text-[11px] font-medium hidden sm:inline text-emerald-200">
          {heroImages[currentSlide].caption}
        </span>
        <div className="h-3 w-px bg-white/30 hidden sm:block" />
        <div className="flex items-center gap-1.5">
          <button
            onClick={prevSlide}
            className="p-1 hover:text-emerald-300 transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1 px-1">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === currentSlide ? "w-5 bg-emerald-400" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-1 hover:text-emerald-300 transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </section>
  );
}

