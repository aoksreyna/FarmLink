"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import MarketplaceProductCard from "@/components/marketplace/MarketplaceProductCard";
import ProductDetailModal from "@/components/marketplace/ProductDetailModal";
import CartDrawer from "@/components/marketplace/CartDrawer";
import {
  Search,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  PackageOpen,
  ArrowUpDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

//Mock Data / Sample data
const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "ប៉េងប៉ោះស្រស់ធម្មជាតិ",
    category: "vegetables",
    image: "/tomato.jpg",
    price: "0.75",
    wholesalePrice: "0.60",
    unit: "គ.ក",
    rating: 4.8,
    reviewsCount: 32,
    farmerName: "ចម្ការតារា",
    province: "តាកែវ",
    availableQty: 120,
    isVerified: true,
    moq: "កុម្ម៉ង់ចាប់ពី ១០ គ.ក",
    deliveryOption: "delivery",
    description: "ប៉េងប៉ោះស្រស់ធម្មជាតិប្រមូលផលរៀងរាល់ព្រឹកពីផ្ទះសំណាញ់ទំនើប គ្មានជាតិគីមី រសជាតិជូរអែមឆ្ងាញ់ សមស្របសម្រាប់ភោជនីយដ្ឋាន និងអ្នកទិញដុំ។",
    phone: "012 345 678",
  },
  {
    id: "prod-2",
    name: "ស្ត្រប៊ែរីស្រស់មណ្ឌលគិរី",
    category: "fruits",
    image: "/strawberry.jpg",
    price: "4.50",
    wholesalePrice: "3.80",
    unit: "គ.ក",
    rating: 4.9,
    reviewsCount: 45,
    farmerName: "ចម្ការភ្នំខ្ពស់",
    province: "មណ្ឌលគិរី",
    availableQty: 85,
    isVerified: true,
    moq: "កុម្ម៉ង់ចាប់ពី ៥ គ.ក",
    deliveryOption: "delivery",
    description: "ស្ត្រប៊ែរីដាំលើខ្ពង់រាបខេត្តមណ្ឌលគិរី ផ្លែធំៗ ក្រហមល្អ ក្លិនក្រអូបផ្អែមធម្មជាតិ ធានាគុណភាពស្រស់ល្អពេលដឹកដល់ដៃ។",
    phone: "088 765 4321",
  },
  {
    id: "prod-3",
    name: "ចេកណាំវ៉ាធម្មជាតិ",
    category: "fruits",
    image: "/banana.jpg",
    price: "0.85",
    wholesalePrice: "0.65",
    unit: "ស្និត",
    rating: 4.7,
    reviewsCount: 19,
    farmerName: "សហគមន៍កសិកម្មកំពង់ចាម",
    province: "កំពង់ចាម",
    availableQty: 250,
    isVerified: true,
    moq: "កុម្ម៉ង់ចាប់ពី ២០ ស្និត",
    deliveryOption: "both",
    description: "ចេកណាំវ៉ាទុំជោរលើដើមធម្មជាតិ គ្មានការកៀបថ្នាំ ផ្អែមឆ្ងាញ់ សម្បូរប៉ូតាស្យូម និងថាមពល។",
    phone: "097 112 2334",
  },
  {
    id: "prod-4",
    name: "អង្ករផ្ការំដួលប្រណីត",
    category: "grains",
    image: "/grain.png",
    price: "1.10",
    wholesalePrice: "0.92",
    unit: "គ.ក",
    rating: 5.0,
    reviewsCount: 58,
    farmerName: "រោងម៉ាស៊ីនស្រូវបាត់ដំបង",
    province: "បាត់ដំបង",
    availableQty: 1500,
    isVerified: true,
    moq: "កុម្ម៉ង់ចាប់ពី ៥០ គ.ក",
    deliveryOption: "delivery",
    description: "អង្ករផ្ការំដួលបាត់ដំបងលេខ១ គ្រាប់វែង ក្រអូបឈ្ងុយពេលដាំ បាយទន់ឆ្ងាញ់ មានស្តុកច្រើនសម្រាប់ការផ្គត់ផ្គង់ប្រចាំខែ។",
    phone: "017 889 900",
  },
  {
    id: "prod-5",
    name: "ត្រសក់ផ្អែមស្រស់ស្រួយ",
    category: "vegetables",
    image: "/cucumber.jpg",
    price: "0.55",
    wholesalePrice: "0.40",
    unit: "គ.ក",
    rating: 4.6,
    reviewsCount: 28,
    farmerName: "ចម្ការបៃតងកណ្តាល",
    province: "កណ្តាល",
    availableQty: 300,
    isVerified: true,
    moq: "កុម្ម៉ង់ចាប់ពី ១៥ គ.ក",
    deliveryOption: "both",
    description: "ត្រសក់ស្រួយស្រស់ប្រមូលផលរៀងរាល់ព្រឹក សាច់ណែន គ្មានរសជាតិជូរចត់ វេចខ្ចប់តាមស្តង់ដារអនាម័យ។",
    phone: "010 445 566",
  },
  {
    id: "prod-6",
    name: "ល្ហុងទុំធម្មជាតិ",
    category: "fruits",
    image: "/papaya.jpg",
    price: "0.90",
    wholesalePrice: "0.75",
    unit: "គ.ក",
    rating: 4.7,
    reviewsCount: 16,
    farmerName: "ចម្ការសំបូរផល",
    province: "កំពត",
    availableQty: 180,
    isVerified: true,
    moq: "កុម្ម៉ង់ចាប់ពី ១០ គ.ក",
    deliveryOption: "delivery",
    description: "ល្ហុងពូជហូឡង់ សាច់ក្រហមរលោង ផ្អែមមុត សម្បូរវីតាមីន A & C ស័ក្តិសមសម្រាប់ធ្វើបង្អែម និងទឹកក្រឡុក។",
    phone: "096 334 4556",
  },
  {
    id: "prod-7",
    name: "ម្នាស់ទឹកឃ្មុំស្រស់",
    category: "fruits",
    image: "/pineapple.jpg",
    price: "1.20",
    wholesalePrice: "0.95",
    unit: "ផ្លែ",
    rating: 4.8,
    reviewsCount: 22,
    farmerName: "ចម្ការម្នាស់តាកែវ",
    province: "តាកែវ",
    availableQty: 220,
    isVerified: true,
    moq: "កុម្ម៉ង់ចាប់ពី ១០ ផ្លែ",
    deliveryOption: "pickup",
    description: "ម្នាស់ទឹកឃ្មុំផ្អែមឆ្ងាញ់ គ្មានជាតិជូរចត់ ក្លិនក្រអូប មកយកផ្ទាល់នៅចម្ការ ឬដឹកជញ្ជូនតាមការកុម្ម៉ង់។",
    phone: "012 998 877",
  },
  {
    id: "prod-8",
    name: "ស្ពៃក្តោបសរីរាង្គ",
    category: "vegetables",
    image: "/category-veggies.jpg",
    price: "0.70",
    wholesalePrice: "0.55",
    unit: "គ.ក",
    rating: 4.8,
    reviewsCount: 30,
    farmerName: "សហគមន៍កសិកម្មរតនគិរី",
    province: "រតនគិរី",
    availableQty: 450,
    isVerified: true,
    moq: "កុម្ម៉ង់ចាប់ពី ២០ គ.ក",
    deliveryOption: "delivery",
    description: "ស្ពៃក្តោបដាំលើដីក្រហមធម្មជាតិ ស្រួយផ្អែម គ្មានសារធាតុគីមី ធានាសុខភាព ១០០%។",
    phone: "097 555 6677",
  },
  {
    id: "prod-9",
    name: "ម្រេចកំពត GI ខ្មៅ",
    category: "spices",
    image: "/grain.png",
    price: "3.50",
    wholesalePrice: "2.90",
    unit: "កញ្ចប់",
    rating: 5.0,
    reviewsCount: 64,
    farmerName: "សមាគមម្រេចកំពត",
    province: "កំពត",
    availableQty: 500,
    isVerified: true,
    moq: "កុម្ម៉ង់ចាប់ពី ៥ កញ្ចប់",
    deliveryOption: "delivery",
    description: "ម្រេចកំពតពិតប្រាកដ មានម៉ាកសម្គាល់ភូមិសាស្ត្រទំនិញ (GI) ក្លិនឈ្ងុយខ្លាំង ហិរមុតស្រទន់ ស្តង់ដារនាំចេញអន្តរជាតិ។",
    phone: "012 667 788",
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

const TRENDING_TAGS = ["ប៉េងប៉ោះ", "អង្ករផ្ការំដួល", "ស្ត្រប៊ែរី", "ចេកណាំវ៉ា", "ម្រេចកំពត"];

export default function MarketplacePage() {
  const { isAuthOpen, closeAuth, initialMode, initialRole } = useAuth();

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchInput, setActiveSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProvince, setSelectedProvince] = useState("គ្រប់ខេត្ត-ក្រុង");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal & Drawer States
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Dynamic Categories with Actual Counts
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
          ? INITIAL_PRODUCTS.length
          : INITIAL_PRODUCTS.filter((p) => p.category === c.id).length;
      return { ...c, count };
    });
  }, []);

  // Cart operations
  const handleAddToCart = (product, quantity = 10) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartDrawerOpen(true);
  };

  const handleUpdateCartQty = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setActiveSearchInput("");
    setSelectedCategory("all");
    setSelectedProvince("គ្រប់ខេត្ត-ក្រុង");
    setSortBy("latest");
    setCurrentPage(1);
  };

  // Handle Search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(activeSearchInput.trim());
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((prod) => {
      // Search keyword
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(query);
        const matchFarm = prod.farmerName.toLowerCase().includes(query);
        const matchProv = prod.province.toLowerCase().includes(query);
        if (!matchName && !matchFarm && !matchProv) return false;
      }

      // Category
      if (selectedCategory !== "all" && prod.category !== selectedCategory) {
        return false;
      }

      // Province
      if (selectedProvince !== "គ្រប់ខេត្ត-ក្រុង" && prod.province !== selectedProvince) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return parseFloat(a.wholesalePrice || a.price) - parseFloat(b.wholesalePrice || b.price);
      if (sortBy === "price_desc") return parseFloat(b.wholesalePrice || b.price) - parseFloat(a.wholesalePrice || a.price);
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [searchTerm, selectedCategory, selectedProvince, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* Navbar */}
      <Navbar
        onOpenCart={() => setIsCartDrawerOpen(true)}
        cartCount={cartItems.reduce((sum, item) => sum + 1, 0)}
      />

      {/* Header */}
      <section className="bg-white border-b border-gray-200/80 pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight mb-2">
            ផ្សារកសិផលបោះដុំផ្ទាល់ពីចម្ការ
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-xl mx-auto mb-6 leading-relaxed">
            ប្រភពផ្គត់ផ្គង់កសិផលស្រស់សុវត្ថិភាពសម្រាប់ភោជនីយដ្ឋាន ផ្សារទំនើប និងអ្នកទិញដុំទូទាំងកម្ពុជា។
          </p>

          {/*ONE UNIFIED SEARCH & FILTER BAR*/}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white border border-gray-300 rounded-2xl shadow-sm hover:border-gray-400 focus-within:border-[#1B5E20] focus-within:ring-2 focus-within:ring-[#1B5E20]/20 transition-all p-1.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5"
          >
            {/* Search Input */}
            <div className="flex-1 flex items-center px-3 gap-2">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={activeSearchInput}
                onChange={(e) => setActiveSearchInput(e.target.value)}
                placeholder="ស្វែងរកកសិផល ឬឈ្មោះចម្ការ..."
                className="w-full text-xs sm:text-sm text-gray-900 placeholder-gray-400 bg-transparent border-none focus:outline-hidden py-2"
              />
            </div>

            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

            {/*Province Selector */}
            <div className="flex items-center px-2">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0 mr-1.5" />
              <div className="relative">
                <select
                  value={selectedProvince}
                  onChange={(e) => {
                    setSelectedProvince(e.target.value);
                    setCurrentPage(1);
                  }}
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

            {/*  Sort Selector */}
            <div className="flex items-center px-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 shrink-0 mr-1.5" />
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs sm:text-sm font-semibold text-gray-700 bg-transparent appearance-none pr-6 py-2 focus:outline-hidden cursor-pointer"
                >
                  <option value="latest">ថ្មីបំផុត</option>
                  <option value="price_asc">តម្លៃដុំ ៖ ទាបទៅខ្ពស់</option>
                  <option value="price_desc">តម្លៃដុំ ៖ ខ្ពស់ទៅទាប</option>
                  <option value="rating">ការពេញចិត្តខ្ពស់</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/*Search Button */}
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1B5E20] hover:bg-[#154a19] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              <span>ស្វែងរក</span>
            </button>
          </form>

          {/* Quick Trending Tags */}

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-gray-400 font-medium">ពេញនិយម ៖</span>
            {TRENDING_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setActiveSearchInput(tag);
                  setSearchTerm(tag);
                  setCurrentPage(1);
                }}
                className="px-3 py-1 bg-gray-100 hover:bg-emerald-50 hover:text-[#1B5E20] rounded-full text-gray-600 transition-colors cursor-pointer font-medium"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 
      Main Marketplace Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-7 flex-1 space-y-6">
        
        {/* Category Pills Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-gray-200/80">
          
          {/* Horizontal Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categoriesWithCounts.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentPage(1);
                  }}
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

          {/* Results Count & Reset */}
          <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600 shrink-0 self-end sm:self-auto">
            <span>
              បង្ហាញ{" "}
              <strong className="text-gray-900 font-bold">
                {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{" "}
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
              </strong>{" "}
              នៃ{" "}
              <strong className="text-[#1B5E20] font-bold">
                {filteredProducts.length}
              </strong>{" "}
              កសិផល
            </span>

            {(searchTerm || selectedCategory !== "all" || selectedProvince !== "គ្រប់ខេត្ត-ក្រុង") && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-rose-600 hover:underline font-bold cursor-pointer ml-1"
              >
                សម្អាតតម្រង
              </button>
            )}
          </div>

        </div>

        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <MarketplaceProductCard
                key={product.id}
                product={product}
                onViewDetail={(p) => {
                  setSelectedProductDetail(p);
                  setIsDetailModalOpen(true);
                }}
                onAddToCart={(p) => {
                  setSelectedProductDetail(p);
                  setIsDetailModalOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-md mx-auto shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#1B5E20] mx-auto flex items-center justify-center mb-3">
              <PackageOpen className="w-7 h-7" />
            </div>
            <h3 className="text-base font-black text-gray-900 mb-1">
              មិនមានកសិផលត្រូវនឹងការស្វែងរកទេ
            </h3>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">
              សូមសាកល្បងផ្លាស់ប្តូរពាក្យស្វែងរក ឬជ្រើសរើសខេត្តផ្សេង។
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#1B5E20] text-white text-xs font-bold hover:bg-[#154a19] transition-all cursor-pointer shadow-xs"
            >
              កំណត់ការស្វែងរកឡើងវិញ
            </button>
          </div>
        )}

        {/* Pagination  */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8 pb-4">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-2xs"
              aria-label="ទំព័រមុន"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? "bg-[#1B5E20] text-white shadow-xs"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-2xs"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-2xs"
              aria-label="ទំព័របន្ទាប់"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </main>

      {/* 6. Product Detail Quick View Modal */}
      <ProductDetailModal
        product={selectedProductDetail}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuth}
        initialMode={initialMode}
        initialRole={initialRole}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
