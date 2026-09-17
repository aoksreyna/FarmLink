"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  RotateCcw,
  CheckSquare,
  Square,
  User,
  ArrowLeft,
  SlidersHorizontal,
  ChevronDown,
  Eye,
  Check,
} from "lucide-react";
import AdminProductConfirmModal from "@/components/admin/AdminProductConfirmModal";

//Mock data
export const MOCK_ADMIN_PRODUCTS = [
  {
    id: "PROD-001",
    name: "ប៉េងប៉ោះស្រស់ធម្មជាតិ",
    category: "បន្លែ",
    farmer: "ចម្ការតារា",
    province: "តាកែវ",
    price: "0.75",
    wholesalePrice: "0.60",
    unit: "គ.ក",
    stock: "២០០ គ.ក",
    moq: "កុម្ម៉ង់ចាប់ពី ១០ គ.ក",
    deliveryOption: "delivery",
    status: "Active",
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 32,
    phone: "098 474 843",
    description:
      "ប៉េងប៉ោះស្រស់ធម្មជាតិប្រមូលផលរៀងរាល់ព្រឹកពីផ្ទះសំណាញ់ទំនើប គ្មានជាតិគីមី រសជាតិជូរអែមឆ្ងាញ់ សមស្របសម្រាប់ភោជនីយដ្ឋាន និងអ្នកទិញដុំ។",
    image: null,
    images: [null, null, null],
    submittedDate: "12 កញ្ញា 2026",
  },
  {
    id: "PROD-002",
    name: "ស្វាយកែវរមៀតនាំចេញ (លេខ១)",
    category: "ផ្លែឈើ",
    farmer: "ចម្ការសំបូរផល",
    province: "បាត់ដំបង",
    price: "0.45",
    wholesalePrice: "0.38",
    unit: "គ.ក",
    stock: "៥,០០០ គ.ក",
    moq: "កុម្ម៉ង់ចាប់ពី ៥០ គ.ក",
    deliveryOption: "both",
    status: "Pending",
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 45,
    phone: "088 765 4321",
    description:"",
    image: null,
    images: [null, null, null],
    submittedDate: "15 កញ្ញា 2026",
  },
  {
    id: "PROD-003",
    name: "ក្រូចពោធិ៍សាត់ផ្អែមធម្មជាតិ",
    category: "ផ្លែឈើ",
    farmer: "ចម្ការសំបូរផល",
    province: "បាត់ដំបង",
    price: "1.10",
    wholesalePrice: "0.95",
    unit: "គ.ក",
    stock: "១,២០០ គ.ក",
    moq: "កុម្ម៉ង់ចាប់ពី ២០ គ.ក",
    deliveryOption: "both",
    status: "Pending",
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 19,
    phone: "088 765 4321",
    description:
      "ក្រូចពោធិ៍សាត់ដាំលើដីធម្មជាតិខេត្តបាត់ដំបង ទឹកច្រើន រសជាតិផ្អែមមុត គ្មានប្រើសារធាតុរក្សាទុកយូរ ប្រមូលផលស្រស់ៗពីដើម។",
     image: null,
    images: [null, null, null],
    submittedDate: "15 កញ្ញា 2026",
  },
  {
    id: "PROD-004",
    name: "មៀនប៉ៃលិនកម្រិតនាំចេញ",
    category: "ផ្លែឈើ",
    farmer: "ចម្ការសំបូរផល",
    province: "បាត់ដំបង",
    price: "1.35",
    wholesalePrice: "1.15",
    unit: "គ.ក",
    stock: "២,៥០០ គ.ក",
    moq: "កុម្ម៉ង់ចាប់ពី ៣០ គ.ក",
    deliveryOption: "delivery",
    status: "Pending",
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 28,
    phone: "088 765 4321",
    description:
      "មៀនប៉ៃលិនសាច់ក្រាស់ គ្រាប់តូច ផ្អែមស្រួយធម្មជាតិ ប្រមូលផលថ្មីៗពីចម្ការ វេចខ្ចប់កេសស្តង់ដារ ដឹកជញ្ជូនរហ័សដល់ភ្នំពេញ។",
    image: null,
    images: [null, null, null],
    submittedDate: "14 កញ្ញា 2026",
  },
  {
    id: "PROD-005",
    name: "អង្ករផ្ការំដួលកម្រិត១",
    category: "គ្រាប់ធញ្ញជាតិ",
    farmer: "រោងម៉ាស៊ីនស្រូវបាត់ដំបង",
    province: "បាត់ដំបង",
    price: "0.95",
    wholesalePrice: "0.85",
    unit: "គ.ក",
    stock: "១០ តោន",
    moq: "កុម្ម៉ង់ចាប់ពី ១០០ គ.ក",
    deliveryOption: "delivery",
    status: "Active",
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 58,
    phone: "017 889 900",
    description:
      "អង្ករផ្ការំដួលបាត់ដំបងលេខ១ សុទ្ធ១០០% គ្រាប់វែង ក្រអូបឈ្ងុយពេលដាំ បាយទន់ឆ្ងាញ់ មានស្តុកច្រើនសម្រាប់ការផ្គត់ផ្គង់ប្រចាំខែជូនដេប៉ូ និងភោជនីយដ្ឋាន។",
     image: null,
    images: [null, null, null],
    submittedDate: "10 កញ្ញា 2026",
  },
  {
    id: "PROD-006",
    name: "អង្ករសែនក្រអូបពិសេស",
    category: "គ្រាប់ធញ្ញជាតិ",
    farmer: "រោងម៉ាស៊ីនស្រូវបាត់ដំបង",
    province: "បាត់ដំបង",
    price: "0.85",
    wholesalePrice: "0.75",
    unit: "គ.ក",
    stock: "៥ តោន",
    moq: "កុម្ម៉ង់ចាប់ពី ១០០ គ.ក",
    deliveryOption: "delivery",
    status: "Pending",
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 22,
    phone: "017 889 900",
    description:
      "អង្ករសែនក្រអូបប្រណីត កិនថ្មីៗ គ្មានក្លិនផ្អួរ សម្បូរជីវជាតិ សមស្របសម្រាប់គ្រួសារ ភោជនីយដ្ឋាន និងសហគ្រាសផ្តល់សេវាម្ហូបអាហារ។",
    image: null,
    images: [null, null, null],
    submittedDate: "15 កញ្ញា 2026",
  },
  {
    id: "PROD-007",
    name: "ម្ទេសហាវៃស្រស់ចម្រុះពណ៌",
    category: "បន្លែ",
    farmer: "កសិដ្ឋានបៃតងកណ្តាល",
    province: "កណ្តាល",
    price: "1.80",
    wholesalePrice: "1.50",
    unit: "គ.ក",
    stock: "៣០០ គ.ក",
    moq: "កុម្ម៉ង់ចាប់ពី ៥ គ.ក",
    deliveryOption: "both",
    status: "Pending",
    isFeatured: false,
    rating: 4.6,
    reviewsCount: 17,
    phone: "010 445 566",
    description:
      "ម្ទេសហាវៃក្រហម លឿង បៃតង ដាំក្នុងផ្ទះសំណាញ់ទំនើប សាច់ក្រាស់ ស្រួយឆ្ងាញ់ គ្មានជាតិថ្នាំពុល ស្រោចស្រពតាមប្រព័ន្ធស្វ័យប្រវត្ត។",
     image: null,
    images: [null, null, null],
    submittedDate: "14 កញ្ញា 2026",
  },
  {
    id: "PROD-008",
    name: "ស្ពៃក្តោបសរីរាង្គដីខ្ពង់រាប",
    category: "បន្លែ",
    farmer: "កសិដ្ឋានបៃតងកណ្តាល",
    province: "កណ្តាល",
    price: "0.60",
    wholesalePrice: "0.48",
    unit: "គ.ក",
    stock: "៨០០ គ.ក",
    moq: "កុម្ម៉ង់ចាប់ពី ២០ គ.ក",
    deliveryOption: "delivery",
    status: "Pending",
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 24,
    phone: "010 445 566",
    description:
      "ស្ពៃក្តោបដាំលើដីធម្មជាតិ ស្លឹកណែនល្អ គ្មានដង្កូវ គ្មានជាតិគីមី ធានាសុវត្ថិភាពម្ហូបអាហារកម្រិតខ្ពស់ និងរក្សាទុកបានយូរ។",
     image: null,
    images: [null, null, null],
    submittedDate: "14 កញ្ញា 2026",
  },
  {
    id: "PROD-009",
    name: "ដំឡូងមីស្ងួតបោះដុំ",
    category: "មើមរុក្ខជាតិ",
    farmer: "សហគមន៍ពោធិ៍សាត់",
    province: "ពោធិ៍សាត់",
    price: "0.20",
    wholesalePrice: "0.16",
    unit: "គ.ក",
    stock: "២០ តោន",
    moq: "កុម្ម៉ង់ចាប់ពី ១,០០០ គ.ក",
    deliveryOption: "delivery",
    status: "Rejected",
    isFeatured: false,
    rating: 4.2,
    reviewsCount: 11,
    phone: "012 334 455",
    description:
      "ដំឡូងមីស្ងួតកែច្នៃតាមស្តង់ដារ ជាតិសំណើមទាប គ្មានផ្សិត សមស្របសម្រាប់រោងចក្រផលិតចំណីសត្វ និងការកែច្នៃម្សៅមី។",
     image: null,
    images: [null, null, null],
    submittedDate: "08 កញ្ញា 2026",
  },
];

export default function AdminProductsTab() {
  const [products, setProducts] = useState(MOCK_ADMIN_PRODUCTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [inspectingProduct, setInspectingProduct] = useState(null);
  const [openActionId, setOpenActionId] = useState(null);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedFarmer && p.farmer !== selectedFarmer) return false;

      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.farmer.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (provinceFilter !== "all" && p.province !== provinceFilter) return false;
      return true;
    });
  }, [products, search, statusFilter, provinceFilter, selectedFarmer]);

  // Pending products eligible for verification in current view
  const pendingInView = useMemo(() => {
    return filteredProducts.filter((p) => p.status === "Pending");
  }, [filteredProducts]);

  // Single Approve
  const handleApprove = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Active" } : p))
    );
    setSelectedProductIds((prev) => prev.filter((pId) => pId !== id));
  };

  // Single Reject
  const handleReject = (id, reason = "") => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "Rejected", rejectReason: reason } : p
      )
    );
    setSelectedProductIds((prev) => prev.filter((pId) => pId !== id));
  };

  // Bulk Approve Selected
  const handleVerifySelected = () => {
    if (selectedProductIds.length === 0) return;
    setProducts((prev) =>
      prev.map((p) =>
        selectedProductIds.includes(p.id) ? { ...p, status: "Active" } : p
      )
    );
    setSelectedProductIds([]);
  };

  // Bulk Verify All Pending in current view
  const handleVerifyAllPendingInView = () => {
    const idsToVerify = pendingInView.map((p) => p.id);
    if (idsToVerify.length === 0) return;
    setProducts((prev) =>
      prev.map((p) =>
        idsToVerify.includes(p.id) ? { ...p, status: "Active" } : p
      )
    );
    setSelectedProductIds([]);
  };

  // Select all pending checkbox toggle
  const isAllPendingSelected =
    pendingInView.length > 0 &&
    pendingInView.every((p) => selectedProductIds.includes(p.id));

  const handleToggleSelectAll = () => {
    if (isAllPendingSelected) {
      // Unselect all pending
      const pendingIds = new Set(pendingInView.map((p) => p.id));
      setSelectedProductIds((prev) => prev.filter((id) => !pendingIds.has(id)));
    } else {
      // Select all pending
      const pendingIds = pendingInView.map((p) => p.id);
      setSelectedProductIds((prev) => Array.from(new Set([...prev, ...pendingIds])));
    }
  };

  const handleToggleSelectRow = (id) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const provinces = Array.from(new Set(products.map((p) => p.province)));
  const allFarmers = Array.from(new Set(products.map((p) => p.farmer)));

  // Count unverified products for selected farmer
  const farmerPendingCount = useMemo(() => {
    if (!selectedFarmer) return 0;
    return products.filter((p) => p.farmer === selectedFarmer && p.status === "Pending").length;
  }, [products, selectedFarmer]);

  return (
    <div className="space-y-6">
      {/* 1. Top Header & Primary Status Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            ពិនិត្យ & អនុម័តកសិផល
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            ត្រួតពិនិត្យរូបភាពកសិផល តម្លៃបោះដុំ និងបរិមាណស្តុក មុននឹងអនុម័តដាក់លក់លើផ្សារ
          </p>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl self-start sm:self-auto">
          {[
            { id: "all", label: "ទាំងអស់" },
            { id: "Pending", label: "រង់ចាំពិនិត្យ" },
            { id: "Active", label: "បានអនុម័ត" },
            { id: "Rejected", label: "បដិសេធ" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-white text-[#1B5E20] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Farmer Filter Banner (when a farm is clicked) */}
      {selectedFarmer && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1B5E20] text-white flex items-center justify-center font-bold text-base shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                  កំពុងមើលកសិផលរបស់កសិករ
                </span>
                {farmerPendingCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    នៅសល់ {farmerPendingCount} មិនទាន់ពិនិត្យ
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {selectedFarmer}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {farmerPendingCount > 0 && (
              <button
                type="button"
                onClick={handleVerifyAllPendingInView}
                className="px-4 py-2 bg-[#1B5E20] hover:bg-[#144717] text-white rounded-lg text-sm font-bold cursor-pointer transition-colors shadow-xs"
              >
                អនុម័តទាំងអស់ ({farmerPendingCount})
              </button>
            )}
            <button
              type="button"
              onClick={() => setSelectedFarmer(null)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>មើលកសិករទាំងអស់</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Search, Province & Reset Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="ស្វែងរកតាមឈ្មោះកសិផល, កសិដ្ឋាន ឬកូដ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white text-slate-800"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Province Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm font-semibold text-slate-700 shrink-0">ខេត្ត៖</span>
              <select
                value={provinceFilter}
                onChange={(e) => setProvinceFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-[#1B5E20] cursor-pointer"
              >
                <option value="all">គ្រប់ខេត្ត</option>
                {provinces.map((prov) => (
                  <option key={prov} value={prov}>
                    ខេត្ត{prov}
                  </option>
                ))}
              </select>
            </div>

            {/* Farm / Farmer Filter Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm font-semibold text-slate-700 shrink-0">ចម្ការ / កសិដ្ឋាន៖</span>
              <select
                value={selectedFarmer || "all"}
                onChange={(e) =>
                  setSelectedFarmer(e.target.value === "all" ? null : e.target.value)
                }
                className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-[#1B5E20] cursor-pointer"
              >
                <option value="all">គ្រប់ចម្ការទាំងអស់</option>
                {allFarmers.map((farmerName) => {
                  const totalCount = products.filter((p) => p.farmer === farmerName).length;
                  const pendingCount = products.filter(
                    (p) => p.farmer === farmerName && p.status === "Pending"
                  ).length;
                  return (
                    <option key={farmerName} value={farmerName}>
                      {farmerName} ({totalCount} កសិផល{pendingCount > 0 ? ` • ${pendingCount} រង់ចាំ` : ""})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setProvinceFilter("all");
              setSelectedFarmer(null);
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer self-end md:self-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>កំណត់ឡើងវិញ</span>
          </button>
        </div>

        {/* Bulk Action Bar (when items are checked) */}
        {selectedProductIds.length > 0 && (
          <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold">
                បានជ្រើសរើស {selectedProductIds.length} កសិផល
              </span>
              <span className="text-xs text-slate-300 hidden sm:inline">
                (កសិផលដែលរង់ចាំពិនិត្យ)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleVerifySelected}
                className="px-4 py-1.5 bg-[#1B5E20] hover:bg-[#144717] text-white font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
              >
                អនុម័តដែលបានជ្រើសរើស ({selectedProductIds.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedProductIds([])}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium cursor-pointer"
              >
                លុបចោល
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#144717] text-white font-semibold">
              <tr>
                {/* Select All Checkbox Column */}
                <th className="py-3.5 px-4 w-12 text-center">
                  <button
                    type="button"
                    onClick={handleToggleSelectAll}
                    disabled={pendingInView.length === 0}
                    title="ធីកទាំងអស់សម្រាប់កសិផលដែលរង់ចាំពិនិត្យ"
                    className="cursor-pointer disabled:opacity-40"
                  >
                    {isAllPendingSelected && pendingInView.length > 0 ? (
                      <CheckSquare className="w-5 h-5 text-white" />
                    ) : (
                      <Square className="w-5 h-5 text-white/70 hover:text-white" />
                    )}
                  </button>
                </th>
                <th className="py-3.5 px-4">កសិផល</th>
                <th className="py-3.5 px-4">កសិករ / កសិដ្ឋាន</th>
                <th className="py-3.5 px-4">តម្លៃបោះដុំ</th>
                <th className="py-3.5 px-4">ស្តុកដែលអាចផ្គត់ផ្គង់</th>
                <th className="py-3.5 px-4">ស្ថានភាព</th>
                <th className="py-3.5 px-4 text-right">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod) => {
                  const isPending = prod.status === "Pending";
                  const isChecked = selectedProductIds.includes(prod.id);

                  return (
                    <tr
                      key={prod.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        isChecked ? "bg-emerald-50/40" : ""
                      }`}
                    >
                      {/* Row Checkbox */}
                      <td className="py-3.5 px-4 text-center">
                        {isPending ? (
                          <button
                            type="button"
                            onClick={() => handleToggleSelectRow(prod.id)}
                            className="cursor-pointer text-[#1B5E20]"
                          >
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5 text-[#1B5E20]" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                            )}
                          </button>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>

                      {/* Product Name & Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-base text-slate-900 block">
                              {prod.name}
                            </span>
                            <span className="text-xs font-mono text-slate-500">
                              កូដ៖ {prod.id} • {prod.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Farmer / Farm (Click to show all products of this farm) */}
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => setSelectedFarmer(prod.farmer)}
                          title="ចុចដើម្បីមើលកសិផលទាំងអស់របស់កសិករនេះ"
                          className="text-left group cursor-pointer"
                        >
                          <span className="font-bold text-base text-slate-900 group-hover:text-[#1B5E20] group-hover:underline block">
                            {prod.farmer}
                          </span>
                          <span className="text-xs text-slate-500">
                            ខេត្ត{prod.province} • ចុចមើលកសិផល
                          </span>
                        </button>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4">
                        <span className="font-black text-base text-[#1B5E20]">
                          ${prod.price}
                        </span>
                        <span className="text-xs text-slate-500 font-medium"> / {prod.unit}</span>
                      </td>

                      {/* Stock */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-base">
                        {prod.stock}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            prod.status === "Active"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : prod.status === "Pending"
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : "bg-rose-100 text-rose-800 border border-rose-300"
                          }`}
                        >
                          {prod.status === "Active"
                            ? "បានអនុម័ត"
                            : prod.status === "Pending"
                            ? "រង់ចាំពិនិត្យ"
                            : "បដិសេធ"}
                        </span>
                      </td>

                      {/* Unified Action Button with Sub Buttons */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="relative inline-block text-right">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenActionId(openActionId === prod.id ? null : prod.id)
                            }
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer"
                          >
                            <span>សកម្មភាព</span>
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          </button>

                          {openActionId === prod.id && (
                            <>
                              <div
                                className="fixed inset-0 z-20"
                                onClick={() => setOpenActionId(null)}
                              />
                              <div className="absolute right-0 mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 text-left divide-y divide-slate-100">
                                <div className="py-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setOpenActionId(null);
                                      setInspectingProduct(prod);
                                    }}
                                    className="w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer font-medium"
                                  >
                                    <Eye className="w-4 h-4 text-slate-500" />
                                    <span>មើលព័ត៌មានលម្អិត</span>
                                  </button>
                                </div>

                                <div className="py-1">
                                  {prod.status !== "Active" && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setOpenActionId(null);
                                        handleApprove(prod.id);
                                      }}
                                      className="w-full px-4 py-2.5 text-sm text-[#1B5E20] hover:bg-emerald-50 flex items-center gap-2.5 cursor-pointer font-bold"
                                    >
                                      <Check className="w-4 h-4 text-[#1B5E20]" />
                                      <span>អនុម័តកសិផល</span>
                                    </button>
                                  )}

                                  {prod.status !== "Rejected" && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setOpenActionId(null);
                                        setInspectingProduct(prod);
                                      }}
                                      className="w-full px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer font-medium"
                                    >
                                      <XCircle className="w-4 h-4 text-rose-500" />
                                      <span>បដិសេធកសិផល</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-medium text-base">
                    មិនមានកសិផលត្រូវនឹងតម្រងស្វែងរកនេះទេ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation & Inspection Modal */}
      <AdminProductConfirmModal
        product={inspectingProduct}
        isOpen={Boolean(inspectingProduct)}
        onClose={() => setInspectingProduct(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}


