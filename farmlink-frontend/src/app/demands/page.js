"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import DemandCard from "@/components/demands/DemandCard";
import SubmitProposalModal from "@/components/demands/SubmitProposalModal";
import PostDemandModal from "@/components/demands/PostDemandModal";
import {
  Search,
  MapPin,
  ChevronDown,
  PlusCircle,
  PackageOpen,
  ArrowUpDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

//Mock Data/Sample data
const INITIAL_DEMANDS = [
  {
    id: "dem-1",
    buyerName: "រោងចក្រកែច្នៃផ្លែឈើបាត់ដំបង",
    cropName: "ស្វាយកែវរមៀតស្រស់",
    image: "/papaya.jpg",
    category: "fruits",
    requiredQty: "៥,០០០",
    unit: "គ.ក",
    targetPrice: "0.45",
    location: "ក្រុងបាត់ដំបង, ខេត្តបាត់ដំបង",
    deadline: "នៅសល់ ៧ ថ្ងៃទៀត",
    proposalsCount: 6,
    description: "ត្រូវការស្វាយកែវរមៀតទុំដើម សាច់ក្រាស់ គ្មានជាំ សម្រាប់កែច្នៃដំណាប់ស្វាយនាំចេញទៅកាន់ទីផ្សារអន្តរជាតិ។",
    phone: "012 889 900",
    isVerified: true,
    frequency: "ប្រចាំខែ",
  },
  {
    id: "dem-2",
    buyerName: "សង្វាក់ភោជនីយដ្ឋានភ្នំពេញ",
    cropName: "ប៉េងប៉ោះធម្មជាតិ",
    image: "/tomato.jpg",
    category: "vegetables",
    requiredQty: "១,៥០០",
    unit: "គ.ក",
    targetPrice: "0.65",
    location: "ខណ្ឌចំការមន, រាជធានីភ្នំពេញ",
    deadline: "នៅសល់ ៣ ថ្ងៃទៀត",
    proposalsCount: 4,
    description: "ត្រូវការប៉េងប៉ោះស្រស់ពណ៌ក្រហមស្អាត គ្មានជាតិគីមីពុល ដឹកជញ្ជូនរៀងរាល់ថ្ងៃច័ន្ទ និងព្រហស្បតិ៍។",
    phone: "098 776 655",
    isVerified: true,
    frequency: "ប្រចាំសប្តាហ៍",
  },
  {
    id: "dem-3",
    buyerName: "ក្រុមហ៊ុននាំចេញអង្ករកម្ពុជា",
    cropName: "ស្រូវផ្ការំដួលសើម",
    image: "/grain.png",
    category: "grains",
    requiredQty: "៥០",
    unit: "តោន",
    targetPrice: "0.85",
    location: "ស្រុកមោងឫស្សី, ខេត្តបាត់ដំបង",
    deadline: "នៅសល់ ១២ ថ្ងៃទៀត",
    proposalsCount: 9,
    description: "ប្រមូលទិញស្រូវផ្ការំដួលសុទ្ធពីសហគមន៍កសិកម្មផ្ទាល់ ថ្លឹង និងទូទាត់ប្រាក់ភ្លាមៗនៅទីតាំងចម្ការ។",
    phone: "011 223 344",
    isVerified: true,
    frequency: "ម្តង",
  },
  {
    id: "dem-4",
    buyerName: "ផ្សារទំនើបខ្មែរម៉ាត (Khmer Mart)",
    cropName: "ត្រសក់ផ្អែមស្រួយ",
    image: "/cucumber.jpg",
    category: "vegetables",
    requiredQty: "៨០០",
    unit: "គ.ក",
    targetPrice: "0.45",
    location: "រាជធានីភ្នំពេញ",
    deadline: "នៅសល់ ៥ ថ្ងៃទៀត",
    proposalsCount: 3,
    description: "ត្រូវការត្រសក់ស្រស់ប្រមូលផលពេលព្រឹក វេចខ្ចប់តាមទំហំស្តង់ដារ សម្រាប់ដាក់លក់លើធ្នើផ្សារទំនើប។",
    phone: "015 334 455",
    isVerified: true,
    frequency: "ប្រចាំសប្តាហ៍",
  },
  {
    id: "dem-5",
    buyerName: "រោងចក្រផលិតទឹកផ្លែឈើធម្មជាតិ",
    cropName: "ម្នាស់ទឹកឃ្មុំ",
    image: "/pineapple.jpg",
    category: "fruits",
    requiredQty: "៣,០០០",
    unit: "ផ្លែ",
    targetPrice: "0.85",
    location: "ខេត្តកំពង់ស្ពឺ",
    deadline: "នៅសល់ ៩ ថ្ងៃទៀត",
    proposalsCount: 5,
    description: "ត្រូវការម្នាស់ទឹកឃ្មុំទុំផ្អែម គ្មានជាតិជូរចត់ខ្លាំង សម្រាប់កិនច្របាច់ទឹកផ្លែឈើសុទ្ធ។",
    phone: "097 889 911",
    isVerified: true,
    frequency: "ម្តង",
  },
  {
    id: "dem-6",
    buyerName: "សហគ្រាសកែច្នៃគ្រឿងទេសខ្មែរ",
    cropName: "ម្រេចខ្មៅកំពត",
    image: "/grain.png",
    category: "spices",
    requiredQty: "៥០០",
    unit: "គ.ក",
    targetPrice: "8.50",
    location: "ស្រុកទឹកឈូ, ខេត្តកំពត",
    deadline: "នៅសល់ ១៥ ថ្ងៃទៀត",
    proposalsCount: 7,
    description: "ត្រូវការម្រេចកំពតស្ងួតលេខ១ គ្រាប់ធំៗ មានក្លិនឈ្ងុយខ្លាំង សម្រាប់វេចខ្ចប់នាំចេញ។",
    phone: "012 445 566",
    isVerified: true,
    frequency: "ប្រចាំខែ",
  },
];

const PROVINCES = [
  "គ្រប់ខេត្ត-ក្រុង",
  "កំពង់ចាម",
  "បាត់ដំបង",
  "សៀមរាប",
  "កណ្តាល",
  "កំពត",
  "តាកែវ",
  "កំពង់ធំ",
  "ព្រៃវែង",
  "ត្បូងឃ្មុំ",
  "ពោធិ៍សាត់",
  "បន្ទាយមានជ័យ",
  "រតនគិរី",
  "មណ្ឌលគិរី",
  "ភ្នំពេញ",
];

export default function DemandsPage() {
  const { isAuthOpen, closeAuth, initialMode, initialRole } = useAuth();

  // Search & Filter States
  const [demands, setDemands] = useState(INITIAL_DEMANDS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchInput, setActiveSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProvince, setSelectedProvince] = useState("គ្រប់ខេត្ត-ក្រុង");
  const [sortBy, setSortBy] = useState("latest");

  // Modals
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isPostDemandModalOpen, setIsPostDemandModalOpen] = useState(false);

  // Dynamic Categories
  const categoriesWithCounts = useMemo(() => {
    const rawCategories = [
      { id: "all", name: "ទាំងអស់" },
      { id: "vegetables", name: "បន្លែស្រស់" },
      { id: "fruits", name: "ផ្លែឈើ" },
      { id: "grains", name: "អង្ករ & ធញ្ញជាតិ" },
      { id: "spices", name: "គ្រឿងទេស" },
    ];

    return rawCategories.map((c) => {
      const count =
        c.id === "all"
          ? demands.length
          : demands.filter((p) => p.category === c.id).length;
      return { ...c, count };
    });
  }, [demands]);

  // Handle Search Submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(activeSearchInput.trim());
  };

  // Filter & Sort Logic
  const filteredDemands = useMemo(() => {
    return demands.filter((d) => {
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchCrop = d.cropName.toLowerCase().includes(query);
        const matchBuyer = d.buyerName.toLowerCase().includes(query);
        const matchLoc = d.location.toLowerCase().includes(query);
        if (!matchCrop && !matchBuyer && !matchLoc) return false;
      }

      if (selectedCategory !== "all" && d.category !== selectedCategory) {
        return false;
      }

      if (selectedProvince !== "គ្រប់ខេត្ត-ក្រុង" && !d.location.includes(selectedProvince.replace("ខេត្ត", ""))) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return parseFloat(a.targetPrice) - parseFloat(b.targetPrice);
      if (sortBy === "price_desc") return parseFloat(b.targetPrice) - parseFloat(a.targetPrice);
      return 0; // latest
    });
  }, [demands, searchTerm, selectedCategory, selectedProvince, sortBy]);

  // Handle new demand posted
  const handleDemandPosted = (newDemand) => {
    setDemands((prev) => [
      {
        ...newDemand,
        image: newDemand.image || "/category-veggies.jpg",
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/*Navbar */}
      <Navbar />

      {/*Page Header with Post Demand CTA (Removed unwanted pill badge) */}
      <section className="bg-white border-b border-gray-200/80 pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight mb-2">
                តម្រូវការទីផ្សារ & ការបញ្ជាទិញបោះដុំ
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-xl leading-relaxed">
                សេចក្តីប្រកាសស្វែងរកទិញកសិផលបរិមាណច្រើនពីភោជនីយដ្ឋាន ផ្សារទំនើប និងរោងចក្រកែច្នៃទូទាំងកម្ពុជា។ កសិករអាចដាក់សំណើរផ្គត់ផ្គង់បានភ្លាមៗ។
              </p>
            </div>

            {/* Post Demand Button */}
            <button
              type="button"
              onClick={() => setIsPostDemandModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-[#1B5E20] hover:bg-[#154a19] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0 self-start md:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ ប្រកាសត្រូវការទិញថ្មី</span>
            </button>
          </div>

          {/* Quick Stats Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/70">
              <span className="text-[11px] text-gray-500 font-medium block">តម្រូវការសកម្ម</span>
              <span className="text-lg font-black text-[#1B5E20]">{demands.length} សំណើ</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/70">
              <span className="text-[11px] text-gray-500 font-medium block">បរិមាណទិញសរុប</span>
              <span className="text-lg font-black text-gray-900">១៨០+ តោន</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/70">
              <span className="text-[11px] text-gray-500 font-medium block">ផ្គត់ផ្គង់ជោគជ័យ</span>
              <span className="text-lg font-black text-emerald-700">៩៦%</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/70">
              <span className="text-[11px] text-gray-500 font-medium block">ទីតាំងទទួលកសិផល</span>
              <span className="text-lg font-black text-gray-900">២៥ ខេត្ត-ក្រុង</span>
            </div>
          </div>

        </div>
      </section>

      {/* Unified Search Bar & Filters */}
      <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-7 pb-2">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white border border-gray-300 rounded-2xl shadow-xs hover:border-gray-400 focus-within:border-[#1B5E20] focus-within:ring-2 focus-within:ring-[#1B5E20]/20 transition-all p-1.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5"
        >
          {/* Search Input */}
          <div className="flex-1 flex items-center px-3 gap-2">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              value={activeSearchInput}
              onChange={(e) => setActiveSearchInput(e.target.value)}
              placeholder="ស្វែងរកកសិផលដែលគេត្រូវការទិញ ឬឈ្មោះក្រុមហ៊ុន..."
              className="w-full text-xs sm:text-sm text-gray-900 placeholder-gray-400 bg-transparent border-none focus:outline-hidden py-2"
            />
          </div>

          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

          {/* Province Selector */}
          <div className="flex items-center px-2">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0 mr-1.5" />
            <div className="relative">
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="text-xs sm:text-sm font-semibold text-gray-700 bg-transparent appearance-none pr-6 py-2 focus:outline-hidden cursor-pointer"
              >
                {PROVINCES.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov === "គ្រប់ខេត្ត-ក្រុង" ? "គ្រប់ខេត្ត-ក្រុង" : `ខេត្ត${prov}`}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

          {/* Sort Selector */}
          <div className="flex items-center px-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 shrink-0 mr-1.5" />
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs sm:text-sm font-semibold text-gray-700 bg-transparent appearance-none pr-6 py-2 focus:outline-hidden cursor-pointer"
              >
                <option value="latest">ថ្មីបំផុត</option>
                <option value="price_asc">តម្លៃគោលដៅ ៖ ទាបទៅខ្ពស់</option>
                <option value="price_desc">តម្លៃគោលដៅ ៖ ខ្ពស់ទៅទាប</option>
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#1B5E20] hover:bg-[#154a19] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <span>ស្វែងរក</span>
          </button>
        </form>
      </section>

      {/* Category Pills & Demands Grid */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 space-y-6">
        
        {/* Category Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-gray-200/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categoriesWithCounts.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? "bg-[#1B5E20] text-white shadow-xs"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                      isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs sm:text-sm text-gray-600 font-medium shrink-0 self-end sm:self-auto">
            បង្ហាញ <strong className="text-gray-900 font-bold">{filteredDemands.length}</strong> សេចក្តីប្រកាស
          </div>
        </div>

        {/* Demands Cards Grid (3 Columns) with Visual Crop Images */}
        {filteredDemands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDemands.map((demand) => (
              <DemandCard
                key={demand.id}
                demand={demand}
                onSubmitProposal={(d) => {
                  setSelectedDemand(d);
                  setIsProposalModalOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-md mx-auto shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#1B5E20] mx-auto flex items-center justify-center mb-3">
              <PackageOpen className="w-7 h-7" />
            </div>
            <h3 className="text-base font-black text-gray-900 mb-1">
              មិនមានសេចក្តីប្រកាសត្រូវនឹងការស្វែងរកទេ
            </h3>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">
              សូមសាកល្បងផ្លាស់ប្តូរពាក្យស្វែងរក ឬជ្រើសរើសខេត្តផ្សេង។
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveSearchInput("");
                setSelectedCategory("all");
                setSelectedProvince("គ្រប់ខេត្ត-ក្រុង");
              }}
              className="px-5 py-2.5 rounded-xl bg-[#1B5E20] text-white text-xs font-bold hover:bg-[#154a19] transition-all cursor-pointer shadow-xs"
            >
              សម្អាតតម្រងស្វែងរក
            </button>
          </div>
        )}

      </main>

      {/*Submit Proposal Modal */}
      <SubmitProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        demand={selectedDemand}
        onSubmitSuccess={() => {
          if (selectedDemand) {
            setDemands((prev) =>
              prev.map((d) =>
                d.id === selectedDemand.id
                  ? { ...d, proposalsCount: d.proposalsCount + 1 }
                  : d
              )
            );
          }
        }}
      />

      {/*Post New Demand Modal */}
      <PostDemandModal
        isOpen={isPostDemandModalOpen}
        onClose={() => setIsPostDemandModalOpen(false)}
        onPostSuccess={handleDemandPosted}
      />

      {/*Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuth}
        initialMode={initialMode}
        initialRole={initialRole}
      />

      {/*Footer */}
      <Footer />

    </div>
  );
}
