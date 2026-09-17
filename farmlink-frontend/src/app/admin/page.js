"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStatCards from "@/components/admin/AdminStatCards";
import AdminDashboardTab from "@/components/admin/AdminDashboardTab";
import AdminUsersTab from "@/components/admin/AdminUsersTab";
import AdminProductsTab from "@/components/admin/AdminProductsTab";
import AdminDemandsTab from "@/components/admin/AdminDemandsTab";
import AdminOrdersTab from "@/components/admin/AdminOrdersTab";

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const getPageHeaderInfo = () => {
    switch (activeTab) {
      case "users":
        return {
          title: "គ្រប់គ្រងអ្នកប្រើប្រាស់",
          subtitle: "បញ្ជីកសិករ និងអ្នកទិញបោះដុំ",
        };
      case "products":
        return {
          title: "ពិនិត្យ & អនុម័តកសិផល",
          subtitle: "ត្រួតពិនិត្យគុណភាព និងអនុម័តកសិផលមុនពេលផ្សព្វផ្សាយលើផ្សារ",
        };
      case "demands":
        return {
          title: "តម្រូវការទិញ & ដេញថ្លៃ",
          subtitle: "ត្រួតពិនិត្យការប្រកាសទិញ និងតាមដានការដេញថ្លៃ",
        };
      case "dashboard":
      default:
        return {
          title: "ផ្ទាំងគ្រប់គ្រងរដ្ឋបាល",
          subtitle: "ទិដ្ឋភាពទូទៅនៃប្រតិបត្តិការវេទិកា FarmLink",
        };
    }
  };

  const { title, subtitle } = getPageHeaderInfo();

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <AdminUsersTab />;
      case "products":
        return <AdminProductsTab />;
      case "demands":
        return <AdminDemandsTab />;
      case "dashboard":
      default:
        return (
          <div className="space-y-6">
            <AdminStatCards />
            <AdminDashboardTab onSelectTab={(tab) => setActiveTab(tab)} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans">
      {/* 1. Admin Dark Green Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* 2. Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <AdminHeader title={title} subtitle={subtitle} />

        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
