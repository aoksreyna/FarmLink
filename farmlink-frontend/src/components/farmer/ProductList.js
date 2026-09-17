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
  Plus,
  Edit,
  Eye,
  ArrowUpDown,
} from "lucide-react";

// Default realistic demo produce data to display when database has 0 items
const DEMO_PRODUCTS = [
  {
    id: "00124",
    name: "ស្ពៃក្តោបធម្មជាតិ",
    category_name: "បន្លែស្លឹក",
    price_per_unit: "1.20",
    unit: "គីឡូក្រាម",
    stock_quantity: 150,
    status: "active",
    image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "00125",
    name: "ប៉េងប៉ោះទុំសរីរាង្គ",
    category_name: "បន្លែផ្លែ",
    price_per_unit: "1.50",
    unit: "គីឡូក្រាម",
    stock_quantity: 80,
    status: "active",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "00126",
    name: "ម្ទេសដៃនាងស្រស់",
    category_name: "គ្រឿងទេស",
    price_per_unit: "2.80",
    unit: "គីឡូក្រាម",
    stock_quantity: 45,
    status: "active",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "00127",
    name: "ស្វាយកែវរមៀតផ្អែម",
    category_name: "ផ្លែឈើ",
    price_per_unit: "0.90",
    unit: "គីឡូក្រាម",
    stock_quantity: 0,
    status: "out_of_stock",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "00128",
    name: "ត្រសក់ស្រូវធម្មជាតិ",
    category_name: "បន្លែផ្លែ",
    price_per_unit: "0.80",
    unit: "គីឡូក្រាម",
    stock_quantity: 200,
    status: "active",
    image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=150&auto=format&fit=crop&q=80",
  },
];

export default function ProductList({
  products = [],
  categories = [],
  loading = false,
  onAddNew,
}) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ទាំងអស់");
  const [selectedStatus, setSelectedStatus] = useState("ទាំងអស់");
  const [sortByPrice, setSortByPrice] = useState("ទាំងអស់");

  // Determine items to display: if Supabase products exist, use them; otherwise use DEMO_PRODUCTS
  const displaySource =
    products.length > 0
      ? products.map((p, idx) => ({
          id: String(p.id || idx + 1).slice(0, 6).toUpperCase(),
          name: p.name,
          category_name: p.categories?.name || "ទូទៅ",
          price_per_unit: p.price_per_unit,
          unit: p.unit || "គីឡូក្រាម",
          stock_quantity: p.stock_quantity,
          status: p.status,
          image: p.product_images?.[0]?.image_url || "/category-veggies.jpg",
        }))
      : DEMO_PRODUCTS;

  // Filter & Search Logic
  let filtered = displaySource.filter((p) => {
    const matchSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.id?.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === "ទាំងអស់" || p.category_name === selectedCategory;
    const matchStatus =
      selectedStatus === "ទាំងអស់" ||
      (selectedStatus === "កំពុងលក់" && p.status === "active") ||
      (selectedStatus === "អស់ពីស្តុក" &&
        (p.status === "out_of_stock" || p.stock_quantity <= 0));
    return matchSearch && matchCat && matchStatus;
  });

  // Sort by price if chosen
  if (sortByPrice === "ទាបទៅខ្ពស់") {
    filtered = [...filtered].sort((a, b) => Number(a.price_per_unit) - Number(b.price_per_unit));
  } else if (sortByPrice === "ខ្ពស់ទៅទាប") {
    filtered = [...filtered].sort((a, b) => Number(b.price_per_unit) - Number(a.price_per_unit));
  }

  // Export to CSV / Excel
  const handleExportExcel = () => {
    if (filtered.length === 0) {
      alert("មិនទាន់មានទិន្នន័យសម្រាប់ទាញយកជា Excel នៅឡើយទេ");
      return;
    }
    const headers = [
      "Product ID",
      "ឈ្មោះកសិផល",
      "Category",
      "តម្លៃ ($)",
      "ស្តុក",
      "ស្ថានភាព",
    ];
    const rows = filtered.map((item) => [
      `"PRD-${item.id}"`,
      `"${item.name}"`,
      `"${item.category_name}"`,
      item.price_per_unit,
      `"${item.stock_quantity} ${item.unit}"`,
      item.status === "active" ? "កំពុងលក់" : "អស់ពីស្តុក",
    ]);

    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `farmlink_products_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-5 w-full">
      {/* 1. Header: Breadcrumbs & Page Title on Left, Add Product Button on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 tracking-tight">
            បញ្ជីកសិផលដាក់លក់នៅលើទីផ្សារ
          </h1>
        </div>

        {/* Add Product Button */}
        <button
          type="button"
          onClick={onAddNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B5E20] hover:bg-[#144717] text-white text-sm font-bold rounded-xl transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>បន្ថែមកសិផលថ្មី</span>
        </button>
      </div>

      {/* 2. Action Buttons: Export Excel & Export PDF */}
      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleExportExcel}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
        >
          <FileDown className="w-4 h-4" />
          <span>ទាញយកបញ្ជីរបាយការណ៍ (Excel)</span>
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>ទាញយករបាយការណ៍ PDF</span>
        </button>
      </div>

      {/* 3. Main Unified White Card (Filter Section + Table Section) */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Filter Section */}
        <div className="p-5 sm:p-6 border-b border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">តម្រង (Filter)</span>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("ទាំងអស់");
                setSelectedStatus("ទាំងអស់");
                setSortByPrice("ទាំងអស់");
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>កំណត់ឡើងវិញ</span>
            </button>
          </div>

          {/* 3 Dropdown Filters in 1 Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Filter 1: Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Category
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-700 cursor-pointer"
                >
                  <option value="ទាំងអស់">ជ្រើសរើសជម្រើស (ទាំងអស់)</option>
                  <option value="បន្លែស្លឹក">បន្លែស្លឹក</option>
                  <option value="បន្លែផ្លែ">បន្លែផ្លែ</option>
                  <option value="គ្រឿងទេស">គ្រឿងទេស</option>
                  <option value="ផ្លែឈើ">ផ្លែឈើ</option>
                  <option value="ដំណាំមើម">ដំណាំមើម</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Filter 2: ស្ថានភាពកសិផល */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                ស្ថានភាពកសិផល
              </label>
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-700 cursor-pointer"
                >
                  <option value="ទាំងអស់">ជ្រើសរើសជម្រើស (ទាំងអស់)</option>
                  <option value="កំពុងលក់">កំពុងលក់</option>
                  <option value="អស់ពីស្តុក">អស់ពីស្តុក</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Filter 3: តម្រៀបតាមតម្លៃ */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                តម្រៀបតាមតម្លៃ
              </label>
              <div className="relative">
                <select
                  value={sortByPrice}
                  onChange={(e) => setSortByPrice(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-700 cursor-pointer"
                >
                  <option value="ទាំងអស់">ជ្រើសរើសជម្រើស (ទាំងអស់)</option>
                  <option value="ទាបទៅខ្ពស់">តម្លៃពីទាប ទៅ ខ្ពស់</option>
                  <option value="ខ្ពស់ទៅទាប">តម្លៃពីខ្ពស់ ទៅ ទាប</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Search Box Aligned to Right (Exactly like Red Cross Admin) */}
          <div className="flex justify-end pt-1">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="ស្វែងរកតាមឈ្មោះ ឬ Product ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-800"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1B5E20] text-white text-sm font-bold">
              <tr>
                <th className="py-3.5 px-4 text-center w-12">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                </th>
                <th className="py-3.5 px-5">Product ID</th>
                <th className="py-3.5 px-4">រូបភាព</th>
                <th className="py-3.5 px-5">ឈ្មោះកសិផល</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">តម្លៃរាយ ($)</th>
                <th className="py-3.5 px-5">បរិមាណក្នុងស្តុក</th>
                <th className="py-3.5 px-5">ស្ថានភាព</th>
                <th className="py-3.5 px-5 text-right">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-gray-400 font-medium">
                    កំពុងទាញយកទិន្នន័យ...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((item) => {
                  return (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-4 text-center">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                      </td>
                      <td className="py-3.5 px-5 font-mono font-bold text-[#1B5E20]">
                        PRD-{item.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-11 h-11 rounded-xl object-cover border border-gray-200 shadow-2xs"
                        />
                      </td>
                      <td className="py-3.5 px-5 font-bold text-gray-900">
                        {item.name}
                      </td>
                      <td className="py-3.5 px-5 text-gray-600 font-medium">
                        {item.category_name}
                      </td>
                      <td className="py-3.5 px-5 font-bold text-gray-900">
                        ${Number(item.price_per_unit).toFixed(2)} / {item.unit}
                      </td>
                      <td className="py-3.5 px-5 font-semibold text-gray-800">
                        {item.stock_quantity} {item.unit}
                      </td>
                      <td className="py-3.5 px-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === "active"
                              ? "bg-emerald-50 text-[#1B5E20] border border-emerald-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {item.status === "active" ? "កំពុងលក់" : "អស់ពីស្តុក"}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right space-x-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1B5E20] hover:bg-[#144717] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-2xs"
                        >
                          <Eye className="w-3 h-3" />
                          <span>លម្អិត</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-gray-500 font-medium">
                    មិនមានកសិផលត្រូវនឹងលក្ខខណ្ឌស្វែងរកនេះទេ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Table Pagination Footer (Centered < 1 2 3 >) */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-600">
          <div className="sm:w-1/3 text-left">
            បង្ហាញ <span className="font-bold text-gray-900">១</span> ដល់{" "}
            <span className="font-bold text-gray-900">{filtered.length}</span> នៃ{" "}
            <span className="font-bold text-gray-900">{filtered.length}</span> ទិន្នន័យ
          </div>

          {/* Centered Pagination < 1 2 3 > */}
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

          <div className="sm:w-1/3 text-right hidden sm:block">
            {/* Spacer for center alignment */}
          </div>
        </div>
      </div>
    </div>
  );
}
