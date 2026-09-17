"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileDown,
  Printer,
  RotateCcw,
  Send,
  Calendar,
  X,
  Eye,
  Building2,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Package,
} from "lucide-react";

export default function FarmerMarketDemand() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ទាំងអស់");
  const [activeTab, setActiveTab] = useState("ទាំងអស់");
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [offerQty, setOfferQty] = useState("");
  const [offerNote, setOfferNote] = useState("");

  const demands = [
    {
      id: "DMD-5021",
      productName: "ស្ពៃបូកគោធម្មជាតិ",
      category: "បន្លែស្លឹក",
      image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&auto=format&fit=crop&q=80",
      volume: "៥០០ គីឡូក្រាម / សប្តាហ៍",
      targetPrice: "$0.85 / គ.ក",
      buyerName: "ផ្សារទំនើប ឡាក់គី (Lucky)",
      contactPerson: "លោក ចាន់ សុភាព (ប្រធានផ្នែកលទ្ធកម្ម)",
      phone: "012 999 888",
      location: "រាជធានីភ្នំពេញ",
      address: "ឃ្លាំងកណ្តាលឡាក់គី, ផ្លូវជាតិលេខ ៤, រាជធានីភ្នំពេញ",
      deadline: "២៥ កញ្ញា ២០២៦",
      frequency: "ដឹកជញ្ជូន ២ ដងក្នុងមួយសប្តាហ៍ (ថ្ងៃអង្គារ និងសុក្រ)",
      urgency: "បន្ទាន់ខ្លាំង",
      standards: "ស្តង់ដារ GAP ឬ ធម្មជាតិគ្មានសារធាតុគីមីពុល",
      packaging: "វេចខ្ចប់ក្នុងកេសប្លាស្ទិក ឬ ប្រអប់ស្អាត ២៥ គ.ក/ប្រអប់",
      status: "កំពុងបើកទទួល",
      description: "ត្រូវការស្ពៃបូកគោស្រស់ ទំហំប៉ុនៗគ្នា គ្មានស្នាមជាំ ឬ ដង្កូវស៊ី។ តម្រូវឱ្យកសិករប្រមូលផលមុនពេលដឹកជញ្ជូនយ៉ាងយូរ ១២ ម៉ោងដើម្បីរក្សាភាពស្រស់។",
    },
    {
      id: "DMD-5022",
      productName: "ប៉េងប៉ោះឆឺរីសរីរាង្គ",
      category: "បន្លែផ្លែ",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80",
      volume: "២០០ គីឡូក្រាម",
      targetPrice: "$1.80 / គ.ក",
      buyerName: "ភោជនីយដ្ឋាន ទន្លេបាសាក់",
      contactPerson: "អ្នកស្រី គឹម សៀក (មេការទិញទំនិញ)",
      phone: "016 777 666",
      location: "រាជធានីភ្នំពេញ",
      address: "មហាវិថីព្រះសុធារស, សង្កាត់ទន្លេបាសាក់, ភ្នំពេញ",
      deadline: "២២ កញ្ញា ២០២៦",
      frequency: "ដឹកជញ្ជូនរៀងរាល់ព្រឹក ម៉ោង ៧:០០ ព្រឹក",
      urgency: "ធម្មតា",
      standards: "សរីរាង្គសុទ្ធ ១០០% រសជាតិផ្អែមស្រួយ",
      packaging: "ប្រអប់ក្រដាសខ្យល់ ៥ គ.ក/ប្រអប់",
      status: "កំពុងបើកទទួល",
      description: "ត្រូវការប៉េងប៉ោះឆឺរីទុំក្រហមស្មើល្អ សំបកតឹងណែន សម្រាប់ធ្វើសាឡាដប្រចាំថ្ងៃ។ មិនទទួលយកផ្លែដែលមានស្នាមប្រេះឡើយ។",
    },
    {
      id: "DMD-5023",
      productName: "ម្ទេសដៃនាងក្រហមស្រស់",
      category: "គ្រឿងទេស",
      image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&auto=format&fit=crop&q=80",
      volume: "១០០ គីឡូក្រាម",
      targetPrice: "$2.60 / គ.ក",
      buyerName: "សណ្ឋាគារ ហ្គាដិនភ្នំពេញ",
      contactPerson: "លោក វ៉ាន់នី (Chef លទ្ធកម្ម)",
      phone: "098 555 444",
      location: "ខណ្ឌជ្រោយចង្វារ, ភ្នំពេញ",
      address: "ផ្លូវមាត់ទន្លេជ្រោយចង្វារ, ភ្នំពេញ",
      deadline: "២០ កញ្ញា ២០២៦",
      frequency: "ដឹកជញ្ជូនម្តងទាំងអស់",
      urgency: "បន្ទាន់ខ្លាំង",
      standards: "ម្ទេសក្រហមសុទ្ធ ១០០% ស្រស់ទើបបេះ",
      packaging: "ថង់សំណាញ់ខ្យល់ ១០ គ.ក/ថង់",
      status: "កំពុងបើកទទួល",
      description: "ត្រូវការម្ទេសដៃនាងពណ៌ក្រហមស្រស់ មិនរលួយ ដឹកជញ្ជូនមុនម៉ោង ៨ ព្រឹក ដើម្បីរៀបចំចង្ក្រានបម្រើភ្ញៀវ។",
    },
    {
      id: "DMD-5024",
      productName: "ស្វាយកែវរមៀតផ្អែម",
      category: "ផ្លែឈើ",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&auto=format&fit=crop&q=80",
      volume: "១,០០០ គីឡូក្រាម",
      targetPrice: "$0.70 / គ.ក",
      buyerName: "រោងចក្រកែច្នៃដំណាប់ស្វាយ",
      contactPerson: "លោក ហេង លី (នាយកគ្រប់គ្រងរោងចក្រ)",
      phone: "017 333 222",
      location: "ខេត្តកំពង់ស្ពឺ",
      address: "តំបន់សេដ្ឋកិច្ចពិសេស, ខេត្តកំពង់ស្ពឺ",
      deadline: "៣០ កញ្ញា ២០២៦",
      frequency: "ដឹកតាមឡានដឹកទំនិញចូលរោងចក្រផ្ទាល់",
      urgency: "ធម្មតា",
      standards: "ស្វាយចាស់សាច់លឿង កម្រិតជាតិស្ករសមស្រប",
      packaging: "កញ្ច្រែងជ័រ ឬ ឡានទ្រុង",
      status: "កំពុងបើកទទួល",
      description: "ត្រូវការស្វាយកែវរមៀតសាច់ក្រាស់ ផ្អែមល្អ សម្រាប់ធ្វើដំណាប់ស្វាយស្ងួតនាំចេញទៅក្រៅប្រទេស។",
    },
    {
      id: "DMD-5025",
      productName: "ត្រសក់ស្រូវធម្មជាតិ",
      category: "បន្លែផ្លែ",
      image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&auto=format&fit=crop&q=80",
      volume: "៣៥០ គីឡូក្រាម",
      targetPrice: "$0.65 / គ.ក",
      buyerName: "ផ្សារម៉ាត ជីបម៉ុង (Chip Mong)",
      contactPerson: "អ្នកស្រី សុភា (Buyer)",
      phone: "012 111 000",
      location: "រាជធានីភ្នំពេញ",
      address: "ផ្សារម៉ាត ជីបម៉ុង គ្រប់សាខា",
      deadline: "១៨ កញ្ញា ២០២៦",
      frequency: "បានបិទទទួល",
      urgency: "ធម្មតា",
      standards: "ស្តង់ដារ GAP",
      packaging: "ប្រអប់ក្រដាស",
      status: "បានបិទ",
      description: "ការកុម្ម៉ង់ត្រូវបានបិទដោយសារទទួលបានការផ្គត់ផ្គង់គ្រប់គ្រាន់ហើយ។",
    },
  ];

  const filteredDemands = demands.filter((d) => {
    const matchSearch =
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.productName.toLowerCase().includes(search.toLowerCase()) ||
      d.buyerName.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === "ទាំងអស់" || d.category === selectedCategory;
    const matchTab =
      activeTab === "ទាំងអស់" ||
      (activeTab === "កំពុងបើកទទួល" && d.status === "កំពុងបើកទទួល") ||
      (activeTab === "បន្ទាន់ខ្លាំង" && d.urgency === "បន្ទាន់ខ្លាំង") ||
      (activeTab === "បានបិទ" && d.status === "បានបិទ");
    return matchSearch && matchCat && matchTab;
  });

  const handleExportCSV = () => {
    const headers = [
      "លេខកូដ",
      "កសិផលដែលត្រូវការ",
      "ជំពូក",
      "បរិមាណ",
      "តម្លៃគោលដៅ",
      "អ្នកទិញ",
      "កាលបរិច្ឆេទ",
      "កម្រិតបន្ទាន់",
      "ស្ថានភាព",
    ];
    const rows = filteredDemands.map((d) => [
      `"${d.id}"`,
      `"${d.productName}"`,
      `"${d.category}"`,
      `"${d.volume}"`,
      `"${d.targetPrice}"`,
      `"${d.buyerName} (${d.location})"`,
      `"${d.deadline}"`,
      `"${d.urgency}"`,
      `"${d.status}"`,
    ]);
    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `market_demands_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const handleOpenDetail = (demand) => {
    setSelectedDemand(demand);
    setDetailModalOpen(true);
  };

  const handleOpenOffer = (demand) => {
    setSelectedDemand(demand);
    setOfferPrice(demand.targetPrice.replace(/[^0-9.]/g, ""));
    setOfferQty("");
    setOfferNote("");
    setDetailModalOpen(false);
    setOfferModalOpen(true);
  };

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    alert(
      `សំណើផ្គត់ផ្គង់របស់អ្នកចំពោះ #${selectedDemand?.id} ត្រូវបានផ្ញើជូន ${selectedDemand?.buyerName} រួចរាល់!`
    );
    setOfferModalOpen(false);
  };

  return (
    <div className="space-y-6 w-full font-sans">
      {/* 1. Breadcrumbs & Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span>ប្រតិបត្តិការ</span>
            <span>&gt;</span>
            <span className="text-gray-800 font-semibold">តម្រូវការទីផ្សារ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 tracking-tight">
            តម្រូវការទីផ្សារពីអ្នកទិញ
          </h1>
        </div>
      </div>

      {/* 2. Action Buttons on Top Right */}
      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
        >
          <FileDown className="w-4 h-4" />
          <span>ទាញយកបញ្ជីរបាយការណ៍ (Excel)</span>
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>ទាញយករបាយការណ៍ PDF</span>
        </button>
      </div>

      {/* 3. Main Unified White Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Filter Section */}
        <div className="p-6 border-b border-gray-100 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">តម្រង (Filter)</span>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("ទាំងអស់");
                setActiveTab("ទាំងអស់");
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>កំណត់ឡើងវិញ</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                ស្វែងរកតាមឈ្មោះកសិផល ឬ អ្នកទិញ
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ស្វែងរកតាមឈ្មោះកសិផល ឬ អ្នកទិញ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-800"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                ជំពូកកសិផល
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-700 cursor-pointer"
                >
                  <option value="ទាំងអស់">ជ្រើសរើសជម្រើស (ទាំងអស់)</option>
                  <option value="បន្លែស្លឹក">បន្លែស្លឹក</option>
                  <option value="បន្លែផ្លែ">បន្លែផ្លែ</option>
                  <option value="គ្រឿងទេស">គ្រឿងទេស</option>
                  <option value="ផ្លែឈើ">ផ្លែឈើ</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2">
            {[
              { label: "ទាំងអស់", count: 5 },
              { label: "កំពុងបើកទទួល", count: 4 },
              { label: "បន្ទាន់ខ្លាំង", count: 2 },
              { label: "បានបិទ", count: 1 },
            ].map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#DCFCE7] text-[#15803D] font-bold border border-emerald-300 shadow-2xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1B5E20] text-white font-bold">
              <tr>
                <th className="py-4 px-4 text-center w-12 whitespace-nowrap">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                </th>
                <th className="py-4 px-6 whitespace-nowrap">លេខកូដតម្រូវការ</th>
                <th className="py-4 px-6 whitespace-nowrap">កសិផលដែលត្រូវការ</th>
                <th className="py-4 px-6 whitespace-nowrap">បរិមាណត្រូវការ</th>
                <th className="py-4 px-6 whitespace-nowrap">តម្លៃគោលដៅ</th>
                <th className="py-4 px-6 whitespace-nowrap">អ្នកទិញ & ទីតាំង</th>
                <th className="py-4 px-6 whitespace-nowrap">កាលបរិច្ឆេទប្រមូលផល</th>
                <th className="py-4 px-6 text-center whitespace-nowrap">កម្រិតបន្ទាន់</th>
                <th className="py-4 px-6 text-right whitespace-nowrap">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {filteredDemands.length > 0 ? (
                filteredDemands.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-base text-[#1B5E20] whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div
                        onClick={() => handleOpenDetail(item)}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200 shadow-2xs shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#1B5E20] transition-colors">
                            {item.productName}
                          </p>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md text-xs bg-gray-100 text-gray-600 font-medium">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900 text-sm sm:text-base whitespace-nowrap">
                      {item.volume}
                    </td>
                    <td className="py-4 px-6 font-bold text-emerald-700 text-base whitespace-nowrap">
                      {item.targetPrice}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <p className="font-bold text-gray-900 text-sm">{item.buyerName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.location}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-medium whitespace-nowrap">
                      {item.deadline}
                    </td>
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                          item.urgency === "បន្ទាន់ខ្លាំង"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : item.status === "បានបិទ"
                            ? "bg-gray-100 text-gray-600 border border-gray-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {item.urgency}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-2">
                        {/* View Detail Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-2xs whitespace-nowrap"
                          title="មើលព័ត៌មានលម្អិត"
                        >
                          <Eye className="w-3.5 h-3.5 text-gray-500" />
                          <span>លម្អិត</span>
                        </button>

                        {/* Offer Supply Button */}
                        {item.status === "កំពុងបើកទទួល" ? (
                          <button
                            type="button"
                            onClick={() => handleOpenOffer(item)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1B5E20] hover:bg-[#144717] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-2xs whitespace-nowrap"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>ដាក់សំណើ</span>
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 font-medium whitespace-nowrap">បានបិទ</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-gray-500 font-medium">
                    មិនមានតម្រូវការទីផ្សារត្រូវនឹងតម្រងនេះទេ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Centered Pagination < 1 2 3 > */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
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
              className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 text-sm font-semibold cursor-pointer shadow-2xs transition-colors"
            >
              2
            </button>

            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 text-sm font-semibold cursor-pointer shadow-2xs transition-colors"
            >
              3
            </button>

            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-semibold cursor-pointer shadow-2xs transition-colors"
              title="បន្ទាប់"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="sm:w-1/3 text-right hidden sm:block"></div>
        </div>
      </div>

      {/* 4. Product Demand Details Modal (See Details Before Offering) */}
      {detailModalOpen && selectedDemand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 pb-4 flex items-start justify-between border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span>ព័ត៌មានលម្អិតអំពីតម្រូវការកសិផល</span>
                  <span className="text-[#1B5E20]">#{selectedDemand.id}</span>
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      selectedDemand.urgency === "បន្ទាន់ខ្លាំង"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    កម្រិត៖ {selectedDemand.urgency}
                  </span>
                  <span className="text-xs text-gray-500">
                    ស្ថានភាព៖{" "}
                    <strong className="text-emerald-700">
                      {selectedDemand.status}
                    </strong>
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDetailModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Product Overview Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl">
                <img
                  src={selectedDemand.image}
                  alt={selectedDemand.productName}
                  className="w-24 h-24 rounded-2xl object-cover border border-emerald-300 shadow-xs shrink-0"
                />
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#1B5E20] text-white">
                    {selectedDemand.category}
                  </span>
                  <h4 className="text-xl font-bold text-gray-900">
                    {selectedDemand.productName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    បរិមាណត្រូវការសរុប៖{" "}
                    <strong className="text-gray-900">
                      {selectedDemand.volume}
                    </strong>
                  </p>
                  <p className="text-base font-bold text-[#1B5E20]">
                    តម្លៃគោលដៅរបស់អ្នកទិញ៖ {selectedDemand.targetPrice}
                  </p>
                </div>
              </div>

              {/* Quality Standards & Packaging */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/60 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase">
                    <ShieldCheck className="w-4 h-4 text-[#1B5E20]" />
                    <span>ស្តង់ដារគុណភាព</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedDemand.standards}
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/60 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase">
                    <Package className="w-4 h-4 text-[#1B5E20]" />
                    <span>លក្ខខណ្ឌវេចខ្ចប់</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedDemand.packaging}
                  </p>
                </div>
              </div>

              {/* Buyer Information Card */}
              <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-2xs space-y-3">
                <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  ព័ត៌មានអ្នកទិញ និង ទីតាំងទទួល
                </h5>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>
                      ស្ថាប័ន / ក្រុមហ៊ុន៖{" "}
                      <strong className="text-gray-900">
                        {selectedDemand.buyerName}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>
                      អ្នកទំនាក់ទំនង៖ {selectedDemand.contactPerson} (
                      {selectedDemand.phone})
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>
                      ទីតាំងទទួលទំនិញ៖ {selectedDemand.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>
                      កាលវិភាគដឹកជញ្ជូន៖ {selectedDemand.frequency} (មុនកាលបរិច្ឆេទ{" "}
                      <strong>{selectedDemand.deadline}</strong>)
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/40 space-y-1.5">
                <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  លក្ខខណ្ឌតម្រូវបន្ថែមពីអ្នកទិញ
                </h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedDemand.description}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setDetailModalOpen(false)}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
              >
                បិទ
              </button>

              {selectedDemand.status === "កំពុងបើកទទួល" && (
                <button
                  type="button"
                  onClick={() => handleOpenOffer(selectedDemand)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1B5E20] hover:bg-[#144717] text-white text-sm font-bold rounded-xl cursor-pointer shadow-xs transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>ដាក់សំណើផ្គត់ផ្គង់ឥឡូវនេះ</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Supply Offer Modal */}
      {offerModalOpen && selectedDemand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 pb-4 flex items-start justify-between border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span>ដាក់សំណើផ្គត់ផ្គង់ចំពោះ</span>
                  <span className="text-[#1B5E20]">#{selectedDemand.id}</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  អ្នកទិញ៖{" "}
                  <span className="font-semibold text-gray-800">
                    {selectedDemand.buyerName}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOfferModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitOffer} className="p-6 space-y-4">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-3">
                <img
                  src={selectedDemand.image}
                  alt={selectedDemand.productName}
                  className="w-12 h-12 rounded-xl object-cover border border-emerald-300 shadow-2xs shrink-0"
                />
                <div className="text-xs">
                  <p className="font-bold text-gray-900 text-sm">
                    {selectedDemand.productName}
                  </p>
                  <p className="text-gray-600 mt-0.5">
                    តម្រូវការ៖ <strong>{selectedDemand.volume}</strong>
                  </p>
                  <p className="text-[#1B5E20] font-bold">
                    តម្លៃគោលដៅរបស់អ្នកទិញ៖ {selectedDemand.targetPrice}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  តម្លៃផ្គត់ផ្គង់របស់អ្នក ($ / គីឡូក្រាម) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="ឧ. 0.80"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  បរិមាណដែលអាចផ្គត់ផ្គង់បាន (គីឡូក្រាម) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="ឧ. 300"
                  value={offerQty}
                  onChange={(e) => setOfferQty(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  ចំណាំបន្ថែមជូនអ្នកទិញ
                </label>
                <textarea
                  rows={3}
                  placeholder="បញ្ជាក់អំពីគុណភាពកសិផល ឬ ពេលវេលាអាចដឹកជញ្ជូន..."
                  value={offerNote}
                  onChange={(e) => setOfferNote(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOfferModalOpen(false)}
                  className="px-5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1B5E20] hover:bg-[#144717] text-white text-sm font-bold rounded-xl cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>បញ្ជូនសំណើ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
