"use client";

import React, { useState } from "react";
import BuyerSidebar from "@/components/buyer/BuyerSidebar";
import BuyerHeader from "@/components/buyer/BuyerHeader";
import BuyerStatCards from "@/components/buyer/BuyerStatCards";
import BuyerRecentOrders from "@/components/buyer/BuyerRecentOrders";
import BuyerActiveDemands from "@/components/buyer/BuyerActiveDemands";
import BuyerOrdersTab from "@/components/buyer/BuyerOrdersTab";
import BuyerDemandsTab from "@/components/buyer/BuyerDemandsTab";
import BuyerInvoicesTab from "@/components/buyer/BuyerInvoicesTab";
import BuyerProfileTab from "@/components/buyer/BuyerProfileTab";
import CreateDemandForm from "@/components/buyer/CreateDemandForm";
import BuyerMessages from "@/components/buyer/BuyerMessages";
import PostDemandModal from "@/components/demands/PostDemandModal";
import Link from "next/link";
import { Store, PlusCircle, ShoppingBag } from "lucide-react";

export default function BuyerDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPostDemandModalOpen, setIsPostDemandModalOpen] = useState(false);

  // Render tab contents
  const renderContent = () => {
    switch (activeTab) {
      case "my-requests":
        return <BuyerOrdersTab />;

      case "my-demands":
        return <BuyerDemandsTab onNewDemand={() => setActiveTab("create-demand")} />;

      case "create-demand":
        return (
          <CreateDemandForm
            onCancel={() => setActiveTab("my-demands")}
            onSuccess={() => setActiveTab("my-demands")}
          />
        );

      case "invoices":
        return <BuyerInvoicesTab />;

      case "profile":
        return <BuyerProfileTab />;

      case "my-cart":
        return (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-lg mx-auto shadow-2xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#1B5E20] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">កន្ត្រកបញ្ជាទិញកសិផល</h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
              អ្នកអាចចូលទៅកាន់ផ្សារកសិផល ដើម្បីជ្រើសរើសកសិផលបោះដុំ និងដាក់ចូលកន្ត្រក។
            </p>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#154a19] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <Store className="w-4 h-4" />
              <span>ទៅកាន់ផ្សារកសិផលបោះដុំ</span>
            </Link>
          </div>
        );

      case "messages":
        return <BuyerMessages />;

      case "dashboard":
      default:
        return (
          <div className="space-y-6 w-full">
            {/* Dashboard Header matching farmer: Clean title + Add Demand action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  ផ្ទាំងគ្រប់គ្រងទូទៅ
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                  សេចក្តីសង្ខេបនៃការកុម្ម៉ង់ តម្រូវការទិញ និងចំណាយរបស់អ្នក
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab("create-demand")}
                className="px-4 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#144717] text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ បង្កើតតម្រូវការថ្មី</span>
              </button>
            </div>

            {/* 4 Stat Cards matching farmer exactly */}
            <BuyerStatCards
              activeDemands={3}
              pendingRequests={12}
              confirmedOrders={10}
              totalSpent="1,200.89"
            />

            {/* Recent Procurement Orders Table matching farmer style */}
            <BuyerRecentOrders
              isEmbedded={true}
              onViewAll={() => setActiveTab("my-requests")}
            />

            {/* Active Sourcing Demands Section */}
            <BuyerActiveDemands
              onNewDemand={() => setActiveTab("create-demand")}
              onSelectTab={(tab) => setActiveTab(tab)}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans">
      {/* 1. Dark Green Sidebar matching user draft */}
      <BuyerSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onCreateDemand={() => setActiveTab("create-demand")}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* 2. Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <BuyerHeader />

        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto w-full">
          {renderContent()}
        </main>
      </div>

      {/* Post Demand Modal */}
      <PostDemandModal
        isOpen={isPostDemandModalOpen}
        onClose={() => setIsPostDemandModalOpen(false)}
        onPostSuccess={() => {
          alert("សេចក្តីប្រកាសតម្រូវការទិញត្រូវបានបង្ហោះជោគជ័យ!");
        }}
      />
    </div>
  );
}
