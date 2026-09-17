"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  PlusCircle,
  Clock,
  CheckCircle2,
  Phone,
  Search,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Award,
  FileDown,
  Eye,
  X,
  User,
  Truck,
  ArrowLeft,
} from "lucide-react";

export const MOCK_BUYER_DEMANDS_TABLE = [
  {
    id: "DEM-901",
    cropName: "ស្វាយកែវរមៀតស្រស់",
    category: "fruits",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=120&auto=format&fit=crop&q=80",
    requiredQty: "៥,០០០",
    unit: "គ.ក",
    targetPrice: "0.45",
    deadline: "នៅសល់ ៧ ថ្ងៃ",
    bestPrice: "0.42",
    status: "Open",
    proposals: [
      {
        id: "P-1",
        farmerName: "ចម្ការសំបូរផល",
        province: "បាត់ដំបង",
        offerPrice: "0.42",
        qty: "៥,០០០",
        date: "15 កញ្ញា 2026",
        phone: "088 765 4321",
        isBest: true,
      },
      {
        id: "P-2",
        farmerName: "សហគមន៍កសិកម្មមោងឫស្សី",
        province: "បាត់ដំបង",
        offerPrice: "0.45",
        qty: "៣,០០០",
        date: "14 កញ្ញា 2026",
        phone: "012 345 678",
        isBest: false,
      },
      {
        id: "P-3",
        farmerName: "ចម្ការធម្មជាតិតាកែវ",
        province: "តាកែវ",
        offerPrice: "0.44",
        qty: "២,០០០",
        date: "14 កញ្ញា 2026",
        phone: "098 474 843",
        isBest: false,
      },
    ],
  },
  {
    id: "DEM-902",
    cropName: "ប៉េងប៉ោះធម្មជាតិ",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=120&auto=format&fit=crop&q=80",
    requiredQty: "១,៥០០",
    unit: "គ.ក",
    targetPrice: "0.65",
    deadline: "នៅសល់ ៣ ថ្ងៃ",
    bestPrice: "0.60",
    status: "Open",
    proposals: [
      {
        id: "P-4",
        farmerName: "ចម្ការតារា (Dara Farm)",
        province: "តាកែវ",
        offerPrice: "0.60",
        qty: "១,៥០០",
        date: "15 កញ្ញា 2026",
        phone: "098 474 843",
        isBest: true,
      },
      {
        id: "P-5",
        farmerName: "ចម្ការបៃតងកណ្តាល",
        province: "កណ្តាល",
        offerPrice: "0.65",
        qty: "១,០០០",
        date: "13 កញ្ញា 2026",
        phone: "010 445 566",
        isBest: false,
      },
    ],
  },
  {
    id: "DEM-903",
    cropName: "អង្ករផ្ការំដួលកម្រិត១",
    category: "grains",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&auto=format&fit=crop&q=80",
    requiredQty: "២,០០០",
    unit: "គ.ក",
    targetPrice: "0.95",
    deadline: "នៅសល់ ៥ ថ្ងៃ",
    bestPrice: "0.90",
    status: "Open",
    proposals: [
      {
        id: "P-6",
        farmerName: "រោងម៉ាស៊ីនស្រូវបាត់ដំបង",
        province: "បាត់ដំបង",
        offerPrice: "0.90",
        qty: "២,០០០",
        date: "18 កញ្ញា 2026",
        phone: "017 889 900",
        isBest: true,
      },
    ],
  },
];

export default function BuyerDemandsTab({ onNewDemand }) {
  const [demands, setDemands] = useState(MOCK_BUYER_DEMANDS_TABLE);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("All");
  const [expandedDemandId, setExpandedDemandId] = useState("DEM-901"); // default expand first
  const [acceptedProposals, setAcceptedProposals] = useState({});
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [viewingDemand, setViewingDemand] = useState(null);

  const handleToggleExpand = (demandId) => {
    setExpandedDemandId(expandedDemandId === demandId ? null : demandId);
  };

  const handleOpenDemandDetail = (demand) => {
    setViewingDemand(demand);
  };

  const handleOpenProposal = (demand, proposal) => {
    setSelectedProposal({
      ...proposal,
      demandId: demand.id,
      cropName: demand.cropName,
      requiredQty: demand.requiredQty,
      unit: demand.unit,
      targetPrice: demand.targetPrice,
      image: demand.image,
    });
    setIsProposalModalOpen(true);
  };

  const handleAcceptProposal = (demandId, proposal) => {
    setAcceptedProposals((prev) => ({
      ...prev,
      [`${demandId}-${proposal.id}`]: true,
    }));
    alert(`អ្នកបានយល់ព្រមទទួលយកសំណើពី៖ ${proposal.farmerName} តម្លៃ $${proposal.offerPrice}/${proposal.unit || "គ.ក"} ចំនួន ${proposal.qty}!`);
  };

  const filteredDemands = demands.filter((demand) => {
    const matchesSearch =
      demand.cropName.toLowerCase().includes(search.toLowerCase()) ||
      demand.id.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (categoryFilter !== "All" && demand.category !== categoryFilter) return false;
    return true;
  });

  if (viewingDemand) {
    return (
      <div className="w-full space-y-6 animate-in fade-in duration-200">
        {/* Title & Back Button matching CreateDemandForm */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setViewingDemand(null)}
            className="p-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            title="ត្រឡប់ក្រោយ"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                ព័ត៌មានលម្អិតតម្រូវការទិញ #{viewingDemand.id}
              </h1>
              <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-emerald-100 text-[#1B5E20] border border-emerald-300">
                កំពុងបើកទទួលសំណើ (Open)
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-500 mt-0.5">
              សេចក្តីប្រកាសតម្រូវការទិញដែលអ្នកបានបង្កើត (របៀបមើលតែប៉ុណ្ណោះ / Read-only)
            </p>
          </div>
        </div>

        {/* Main Full-Width Form Card - Look like create form just can't edit */}
        <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
          {/* Row 1: Crop Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                ឈ្មោះកសិផលដែលត្រូវការ *
              </label>
              <input
                type="text"
                readOnly
                disabled
                value={viewingDemand.cropName}
                className="w-full px-4 py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-800 cursor-not-allowed select-none"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                ជំពូកកសិផល
              </label>
              <select
                disabled
                value={viewingDemand.category || "vegetables"}
                className="w-full px-4 py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-800 cursor-not-allowed select-none"
              >
                <option value="vegetables">បន្លែគ្រប់មុខ (Vegetables)</option>
                <option value="fruits">ផ្លែឈើស្រស់ (Fruits)</option>
                <option value="grains">ស្រូវ & អង្ករ (Rice & Grains)</option>
                <option value="tubers">ដំណាំមើម (Tubers & Roots)</option>
              </select>
            </div>
          </div>

          {/* Row 2: Quantity, Unit, Target Price, Delivery Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                បរិមាណត្រូវការ *
              </label>
              <input
                type="text"
                readOnly
                disabled
                value={`${viewingDemand.requiredQty} ${viewingDemand.unit}`}
                className="w-full px-4 py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-800 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                ខ្នាត (Unit)
              </label>
              <select
                disabled
                value={viewingDemand.unit.includes("តោន") ? "តោន (Ton)" : "គ.ក (kg)"}
                className="w-full px-4 py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-800 cursor-not-allowed select-none"
              >
                <option value="គ.ក (kg)">គ.ក (kg)</option>
                <option value="តោន (Ton)">តោន (Ton)</option>
                <option value="ផ្លែ (Pcs)">ផ្លែ (Pcs)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                តម្លៃគោលដៅរំពឹងទុក ($) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                  $
                </span>
                <input
                  type="text"
                  readOnly
                  disabled
                  value={viewingDemand.targetPrice}
                  className="w-full pl-8 pr-4 py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-800 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                ទីតាំងទទួលកសិផល
              </label>
              <select
                disabled
                value="ភ្នំពេញ"
                className="w-full px-4 py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-800 cursor-not-allowed select-none"
              >
                <option value="ភ្នំពេញ">ខេត្ត/រាជធានី ភ្នំពេញ</option>
                <option value="កណ្តាល">ខេត្ត/រាជធានី កណ្តាល</option>
                <option value="បាត់ដំបង">ខេត្ត/រាជធានី បាត់ដំបង</option>
              </select>
            </div>
          </div>

          {/* Row 3: Deadline & Contact Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                កាលបរិច្ឆេទផុតកំណត់ទទួលសំណើ (Deadline)
              </label>
              <input
                type="text"
                readOnly
                disabled
                value={viewingDemand.deadline}
                className="w-full px-4 py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-800 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                លេខទូរស័ព្ទទាក់ទង
              </label>
              <input
                type="tel"
                readOnly
                disabled
                value="088 474 843"
                className="w-full px-4 py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-800 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Row 4: Quality Specifications */}
          <div>
            <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
              ការពិពណ៌នាតម្រូវការ & លក្ខខណ្ឌគុណភាព (Quality Specifications)
            </label>
            <textarea
              rows={4}
              readOnly
              disabled
              value="ត្រូវការទិញបោះដុំជាប្រចាំសប្តាហ៍ ស្តង់ដារ CamGAP ឬ Grade A ស្រស់ថ្មី គ្មានជាំ ដឹកជញ្ជូនផ្ទាល់ដល់ឃ្លាំងកណ្តាលស្ទឹងមានជ័យ រាជធានីភ្នំពេញ។"
              className="w-full px-4 py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-xl text-gray-800 leading-relaxed cursor-not-allowed resize-none"
            />
          </div>

          {/* Bidding Overview Banner */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white border border-emerald-300 flex items-center justify-center text-[#1B5E20] shrink-0 shadow-2xs">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">ស្ថានភាពដេញថ្លៃបច្ចុប្បន្ន</p>
                <p className="text-base sm:text-lg font-bold text-gray-900">
                  ទទួលបាន <span className="text-[#1B5E20] font-black">{viewingDemand.proposals?.length || 0} សំណើដេញថ្លៃ</span> • តម្លៃទាបបំផុត ៖ <span className="text-[#1B5E20] font-black">${viewingDemand.bestPrice}/{viewingDemand.unit}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setExpandedDemandId(viewingDemand.id);
                setViewingDemand(null);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#144717] text-white text-sm font-bold shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <span>មើលសំណើដេញថ្លៃទាំងអស់</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setViewingDemand(null)}
              className="w-full sm:w-auto px-8 py-3.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-base rounded-xl transition-colors cursor-pointer text-center inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>ត្រឡប់ក្រោយ (Back to Demands)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setExpandedDemandId(viewingDemand.id);
                setViewingDemand(null);
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#1B5E20] hover:bg-[#144717] text-white font-bold text-base rounded-xl transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center gap-2"
            >
              <Award className="w-5 h-5" />
              <span>ពិនិត្យមើលសំណើដេញថ្លៃ ({viewingDemand.proposals?.length || 0} Bids)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* 1. Header & Actions matching Farmer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            បញ្ជីតម្រូវការទិញ & សំណើដេញថ្លៃ (Sourcing Demands)
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-0.5">
            គ្រប់គ្រងការប្រកាសទិញកសិផល និងប្រៀបធៀបសំណើតម្លៃដែលកសិករបានដាក់ដេញថ្លៃ
          </p>
        </div>

        <button
          type="button"
          onClick={onNewDemand}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B5E20] hover:bg-[#144717] text-white text-sm font-bold rounded-xl transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ បង្កើតតម្រូវការថ្មី</span>
        </button>
      </div>

      {/* 2. Main Unified White Card (Filter Section + Status Tabs + Table) */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        
        {/* Filter Section matching Farmer */}
        <div className="p-6 border-b border-gray-100 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">តម្រង (Filter)</span>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategoryFilter("All");
                setActiveTab("All");
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>កំណត់ឡើងវិញ</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                ស្វែងរកតាមឈ្មោះកសិផល ឬ លេខកូដ
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search crop name, demand ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-800"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                ជំពូកកសិផល (Categories)
              </label>
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-700 cursor-pointer"
                >
                  <option value="All">ជ្រើសរើសជម្រើស (ទាំងអស់)</option>
                  <option value="vegetables">បន្លែ (Vegetables)</option>
                  <option value="fruits">ផ្លែឈើ (Fruits)</option>
                  <option value="grains">ស្រូវ & អង្ករ (Grains & Rice)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2">
            {[
              { label: "All", count: demands.length, kh: "ទាំងអស់" },
              { label: "Open", count: demands.length, kh: "កំពុងបើកទទួល" },
              { label: "Fulfilled", count: 0, kh: "បានបញ្ចប់" },
            ].map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#DCFCE7] text-[#15803D] font-bold border border-emerald-300 shadow-2xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent"
                  }`}
                >
                  {tab.kh} ({tab.count})
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Professional E-Procurement Table matching Farmer Table Header */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#144717] text-white font-semibold">
              <tr>
                <th className="py-4 px-4 sm:px-6">លេខកូដ (ID)</th>
                <th className="py-4 px-4 sm:px-6">កសិផលដែលត្រូវការ</th>
                <th className="py-4 px-4 sm:px-6">បរិមាណត្រូវការ</th>
                <th className="py-4 px-4 sm:px-6">តម្លៃគោលដៅ</th>
                <th className="py-4 px-4 sm:px-6 text-center">សំណើដេញថ្លៃ</th>
                <th className="py-4 px-4 sm:px-6">តម្លៃល្អបំផុត (Best Offer)</th>
                <th className="py-4 px-4 sm:px-6">កាលបរិច្ឆេទ</th>
                <th className="py-4 px-4 sm:px-6 text-right">សកម្មភាព</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-gray-800">
              {filteredDemands.length > 0 ? (
                filteredDemands.map((demand) => {
                  const isExpanded = expandedDemandId === demand.id;

                  return (
                    <React.Fragment key={demand.id}>
                      {/* Main Demand Row */}
                      <tr
                        onClick={() => handleToggleExpand(demand.id)}
                        className={`hover:bg-gray-50/80 transition-colors cursor-pointer ${
                          isExpanded ? "bg-emerald-50/30" : ""
                        }`}
                      >
                        {/* ID */}
                        <td className="py-4 px-4 sm:px-6 font-mono font-bold text-gray-900">
                          {demand.id}
                        </td>

                        {/* Crop Name & Thumbnail */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={demand.image}
                              alt={demand.cropName}
                              className="w-11 h-11 rounded-xl object-cover border border-gray-200 shadow-2xs shrink-0"
                            />
                            <div>
                              <span className="font-bold text-gray-900 text-sm block">
                                {demand.cropName}
                              </span>
                              <span className="text-xs text-gray-500">
                                ទទួលទិញបោះដុំ
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Quantity */}
                        <td className="py-4 px-4 sm:px-6 font-bold text-gray-900">
                          {demand.requiredQty} {demand.unit}
                        </td>

                        {/* Target Price */}
                        <td className="py-4 px-4 sm:px-6 font-semibold text-gray-700">
                          ${demand.targetPrice}/{demand.unit}
                        </td>

                        {/* Proposals Count Badge */}
                        <td className="py-4 px-4 sm:px-6 text-center">
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            {demand.proposals.length} សំណើ
                          </span>
                        </td>

                        {/* Best Offer Highlight */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-[#1B5E20] text-sm sm:text-base">
                              ${demand.bestPrice}/{demand.unit}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-[#1B5E20]">
                              Best
                            </span>
                          </div>
                        </td>

                        {/* Deadline */}
                        <td className="py-4 px-4 sm:px-6 text-gray-600 text-xs whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                            {demand.deadline}
                          </span>
                        </td>

                        {/* Action Buttons: View Demand Details + Toggle Proposals */}
                        <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDemandDetail(demand);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                              title="មើលព័ត៌មានលម្អិតនៃសំណើតម្រូវការនេះ"
                            >
                              <Eye className="w-3.5 h-3.5 text-gray-600" />
                              <span>មើល (View)</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleExpand(demand.id);
                              }}
                              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                                isExpanded
                                  ? "bg-[#1B5E20] text-white"
                                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                              }`}
                            >
                              <span>{isExpanded ? "បិទសំណើ" : "មើលសំណើដេញថ្លៃ"}</span>
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Accordion: Farmer Bids Comparison Sub-Table */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} className="p-0 bg-gray-50/70 border-b border-gray-200">
                            <div className="p-5 sm:p-6 space-y-3">
                              <div className="flex items-center justify-between pb-2 border-b border-gray-200/80">
                                <h4 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                  <Award className="w-4 h-4 text-[#1B5E20]" />
                                  <span>
                                    តារាងប្រៀបធៀបសំណើដេញថ្លៃពីកសិករ ({demand.proposals.length} Bids)
                                  </span>
                                </h4>
                                <span className="text-xs text-gray-500">
                                  តម្លៃគោលដៅ ៖ <strong>${demand.targetPrice}/{demand.unit}</strong>
                                </span>
                              </div>

                              {/* Bids Comparison Sub-Table */}
                              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                                <table className="w-full text-left text-xs sm:text-sm">
                                  <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200 text-xs">
                                    <tr>
                                      <th className="py-2.5 px-4">កសិករ / ចម្ការ</th>
                                      <th className="py-2.5 px-4">បរិមាណផ្គត់ផ្គង់</th>
                                      <th className="py-2.5 px-4">តម្លៃដេញថ្លៃ (Bid Price)</th>
                                      <th className="py-2.5 px-4">កាលបរិច្ឆេទដឹកជញ្ជូន</th>
                                      <th className="py-2.5 px-4 text-right">សកម្មភាពសម្រេចចិត្ត</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-100 text-gray-800">
                                    {demand.proposals.map((prop) => {
                                      const isAccepted = acceptedProposals[`${demand.id}-${prop.id}`];

                                      return (
                                        <tr
                                          key={prop.id}
                                          className={`hover:bg-gray-50/80 transition-colors ${
                                            prop.isBest ? "bg-emerald-50/40" : ""
                                          }`}
                                        >
                                          {/* Farmer Name & Province */}
                                          <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                              <span className="font-bold text-gray-900">
                                                {prop.farmerName}
                                              </span>
                                              <span className="text-xs text-gray-500">
                                                (ខេត្ត{prop.province})
                                              </span>
                                            </div>
                                          </td>

                                          {/* Qty */}
                                          <td className="py-3 px-4 font-semibold text-gray-900">
                                            {prop.qty} {demand.unit}
                                          </td>

                                          {/* Bid Price with Best Offer Highlight */}
                                          <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                              <span className="font-black text-[#1B5E20] text-sm">
                                                ${prop.offerPrice}/{demand.unit}
                                              </span>
                                              {prop.isBest && (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#1B5E20] border border-emerald-300">
                                                  <Award className="w-3 h-3 text-[#1B5E20]" />
                                                  <span>តម្លៃទាបជាងគេ (Best)</span>
                                                </span>
                                              )}
                                            </div>
                                          </td>

                                          {/* Date */}
                                          <td className="py-3 px-4 text-gray-600 text-xs">
                                            {prop.date}
                                          </td>

                                          {/* Decision Actions */}
                                          <td className="py-3 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                              <button
                                                type="button"
                                                onClick={() => handleOpenProposal(demand, prop)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
                                                title="មើលព័ត៌មានលម្អិតនៃសំណើ"
                                              >
                                                <Eye className="w-3.5 h-3.5 text-gray-600" />
                                                <span>មើល</span>
                                              </button>

                                              <a
                                                href={`tel:${prop.phone.replace(/\s+/g, "")}`}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-semibold transition-colors"
                                                title="ទាក់ទងកសិករ"
                                              >
                                                <Phone className="w-3.5 h-3.5" />
                                                <span className="hidden sm:inline">ទាក់ទង</span>
                                              </a>

                                              {isAccepted ? (
                                                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 text-[#1B5E20] text-xs font-bold">
                                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                                  បានយល់ព្រម
                                                </span>
                                              ) : (
                                                <button
                                                  type="button"
                                                  onClick={() => handleAcceptProposal(demand.id, prop)}
                                                  className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs ${
                                                    prop.isBest
                                                      ? "bg-[#1B5E20] hover:bg-[#144717] text-white"
                                                      : "bg-gray-800 hover:bg-black text-white"
                                                  }`}
                                                >
                                                  <span>យល់ព្រមទទួល</span>
                                                </button>
                                              )}
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-gray-500 font-medium">
                    មិនមានតម្រូវការទិញត្រូវនឹងតម្រងស្វែងរកនេះទេ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Centered Pagination Footer matching Farmer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-600">
          <div className="sm:w-1/3 text-left">
            បង្ហាញ <span className="font-bold text-gray-900">១</span> ដល់{" "}
            <span className="font-bold text-gray-900">{filteredDemands.length}</span> នៃ{" "}
            <span className="font-bold text-gray-900">{filteredDemands.length}</span> ទិន្នន័យ
          </div>

          <div className="sm:w-1/3 flex justify-center items-center gap-1.5">
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-semibold cursor-pointer shadow-2xs transition-colors"
              title="មុន"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center bg-[#1B5E20] text-white rounded-xl text-sm font-bold shadow-2xs cursor-pointer"
            >
              1
            </button>

            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-semibold cursor-pointer shadow-2xs transition-colors"
              title="បន្ទាប់"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="sm:w-1/3 text-right hidden sm:block">
            {/* Spacer */}
          </div>
        </div>
      </div>

      {/* 5. Proposal Details Modal matching media_1789442280871.png */}
      {isProposalModalOpen && selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 pb-4 flex items-start justify-between border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span>ព័ត៌មានលម្អិតសំណើផ្គត់ផ្គង់ចំពោះ</span>
                  <span className="text-[#1B5E20]">#{selectedProposal.demandId}</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  អ្នកផ្គត់ផ្គង់៖{" "}
                  <span className="font-semibold text-gray-800">
                    {selectedProposal.farmerName} ({selectedProposal.province})
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsProposalModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="បិទ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Product Info Card matching screenshot */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-3">
                <img
                  src={selectedProposal.image}
                  alt={selectedProposal.cropName}
                  className="w-12 h-12 rounded-xl object-cover border border-emerald-300 shadow-2xs shrink-0"
                />
                <div className="text-xs">
                  <p className="font-bold text-gray-900 text-sm">
                    {selectedProposal.cropName}
                  </p>
                  <p className="text-gray-600 mt-0.5">
                    តម្រូវការ៖ <strong>{selectedProposal.requiredQty || "៥,០០០"} {selectedProposal.unit || "គ.ក"}</strong>
                  </p>
                  <p className="text-[#1B5E20] font-bold">
                    តម្លៃគោលដៅរបស់អ្នកទិញ៖ ${selectedProposal.targetPrice} / {selectedProposal.unit || "គ.ក"}
                  </p>
                </div>
              </div>

              {/* Price Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  តម្លៃផ្គត់ផ្គង់របស់កសិករ ($ / {selectedProposal.unit || "គីឡូក្រាម"}) *
                </label>
                <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 flex items-center justify-between">
                  <span className="text-[#1B5E20] font-bold text-base">${selectedProposal.offerPrice}</span>
                  {selectedProposal.isBest && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-[#1B5E20] border border-emerald-300">
                      <Award className="w-3.5 h-3.5 text-[#1B5E20]" />
                      <span>តម្លៃទាបជាងគេ (Best Offer)</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  បរិមាណដែលអាចផ្គត់ផ្គង់បាន ({selectedProposal.unit || "គីឡូក្រាម"}) *
                </label>
                <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-gray-900">
                  {selectedProposal.qty} {selectedProposal.unit || "គីឡូក្រាម"}
                </div>
              </div>

              {/* Notes & Delivery Terms */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  ចំណាំបន្ថែម & លក្ខខណ្ឌដឹកជញ្ជូន
                </label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-700 space-y-1.5 leading-relaxed">
                  <p>• <strong>កាលបរិច្ឆេទដាក់សំណើ៖</strong> {selectedProposal.date}</p>
                  <p>• <strong>ទីតាំង & ការដឹកជញ្ជូន៖</strong> ដឹកជញ្ជូនផ្ទាល់ដល់ឃ្លាំង (រាជធានីភ្នំពេញ)</p>
                  <p>• <strong>ស្តង់ដារគុណភាព៖</strong> ស្តង់ដារ CamGAP កម្រិត Grade A ស្រស់ថ្មី</p>
                  <p>• <strong>លេខទូរស័ព្ទកសិករ៖</strong> {selectedProposal.phone}</p>
                </div>
              </div>

              {/* Modal Footer matching screenshot */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsProposalModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors"
                >
                  បោះបង់
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedProposal.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    title="ទាក់ទងកសិករ"
                  >
                    <Phone className="w-4 h-4 text-[#1B5E20]" />
                    <span>ទាក់ទង</span>
                  </a>

                  {acceptedProposals[`${selectedProposal.demandId}-${selectedProposal.id}`] ? (
                    <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-100 text-[#1B5E20] text-xs sm:text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>បានយល់ព្រមទទួល</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        handleAcceptProposal(selectedProposal.demandId, selectedProposal);
                        setIsProposalModalOpen(false);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1B5E20] hover:bg-[#144717] text-white text-xs sm:text-sm font-bold rounded-xl cursor-pointer shadow-xs transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>យល់ព្រមទទួលសំណើ</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
