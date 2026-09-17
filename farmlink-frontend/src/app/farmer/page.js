"use client";

import React, { useState, useEffect } from "react";
import FarmerHeader from "@/components/farmer/FarmerHeader";
import FarmerSidebar from "@/components/farmer/FarmerSidebar";
import ProductList from "@/components/farmer/ProductList";
import AddProductForm from "@/components/farmer/AddProductForm";
import FarmerOrders from "@/components/farmer/FarmerOrders";
import FarmerMarketDemand from "@/components/farmer/FarmerMarketDemand";
import FarmerMessages from "@/components/farmer/FarmerMessages";
import FarmerProfile from "@/components/farmer/FarmerProfile";
import FarmerStatCards from "@/components/farmer/FarmerStatCards";
import { createClient } from "@/lib/supabase/client";

export default function FarmerPage() {
  const [supabase] = useState(() => createClient());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("products-list");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products and categories from Supabase
  const loadData = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: cats } = await supabase
        .from("categories")
        .select("id, name, name_en")
        .order("display_order", { ascending: true });
      if (cats) setCategories(cats);

      if (user) {
        const { data: prods } = await supabase
          .from("products")
          .select(`
            id,
            name,
            price_per_unit,
            unit,
            stock_quantity,
            status,
            category_id,
            categories (name),
            product_images (image_url)
          `)
          .eq("farmer_id", user.id)
          .order("created_at", { ascending: false });

        if (prods) setProducts(prods);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [supabase]);

  const renderContent = () => {
    switch (activeTab) {
      case "products-add":
        return (
          <AddProductForm
            categories={categories}
            onCancel={() => setActiveTab("products-list")}
            onSuccess={() => {
              loadData();
              setActiveTab("products-list");
            }}
          />
        );
      case "orders":
        return <FarmerOrders />;
      case "market-demand":
        return <FarmerMarketDemand />;
      case "messages":
        return <FarmerMessages />;
      case "profile":
        return <FarmerProfile />;
      case "dashboard":
        return (
          <div className="space-y-6 w-full">
            <h1 className="text-3xl font-bold text-gray-900">ផ្ទាំងគ្រប់គ្រងទូទៅ</h1>
            <FarmerStatCards
              activeProducts={products.length || 5}
              pendingRequests={4}
              ongoingDeliveries={1}
              totalEarning="270.00"
            />
          </div>
        );
      case "products-list":
      default:
        return (
          <ProductList
            products={products}
            categories={categories}
            loading={loading}
            onAddNew={() => setActiveTab("products-add")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans">
      {/* 1. Dark Green Sidebar */}
      <FarmerSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* 2. Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <FarmerHeader />

        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}