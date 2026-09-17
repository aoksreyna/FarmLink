"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  PackageCheck,
  Building2,
  MapPin,
  Eye,
  AlertCircle,
} from "lucide-react";
import AdminChartsSection from "@/components/admin/AdminChartsSection";
import AdminProvinceFilterView from "@/components/admin/AdminProvinceFilterView";
import AdminUserVerifyModal from "@/components/admin/AdminUserVerifyModal";
import AdminProductConfirmModal from "@/components/admin/AdminProductConfirmModal";
import { MOCK_ADMIN_USERS } from "@/components/admin/AdminUsersTab";
import { MOCK_ADMIN_PRODUCTS } from "@/components/admin/AdminProductsTab";

export default function AdminDashboardTab({ onSelectTab }) {
  const [users, setUsers] = useState(MOCK_ADMIN_USERS);
  const [products, setProducts] = useState(MOCK_ADMIN_PRODUCTS);

  // Modals state
  const [inspectingUser, setInspectingUser] = useState(null);
  const [inspectingProduct, setInspectingProduct] = useState(null);

  // Pending Actions
  const pendingUsers = users.filter((u) => !u.isVerified);
  const pendingProducts = products.filter((p) => p.status === "Pending");

  // User Verification Handlers
  const handleVerifyUser = (userId, giveCamGAP = false) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            isVerified: true,
            status: "Active",
            certType: giveCamGAP ? "CamGAP ផ្លូវការ" : "ផ្ទៀងផ្ទាត់រួច (Verified)",
          };
        }
        return u;
      })
    );
  };

  const handleRevokeUser = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            isVerified: false,
            status: "Pending Verification",
            certType: "កំពុងរង់ចាំពិនិត្យ",
          };
        }
        return u;
      })
    );
  };

  // Product Confirmation Handlers
  const handleApproveProduct = (productId) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status: "Active" } : p))
    );
  };

  const handleRejectProduct = (productId, reason) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, status: "Rejected", rejectReason: reason } : p
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Urgent Action Center: Pending User Verification & Product Approvals */}
      {(pendingUsers.length > 0 || pendingProducts.length > 0) && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                ការងាររង់ចាំការសម្រេច (Action Required)
              </h3>
              <p className="text-xs text-slate-500">
                {pendingUsers.length} គណនីរង់ចាំផ្ទៀងផ្ទាត់ និង {pendingProducts.length} កសិផលរង់ចាំអនុម័ត
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <button
                type="button"
                onClick={() => onSelectTab("users")}
                className="font-medium text-[#1B5E20] hover:underline cursor-pointer"
              >
                មើលអ្នកប្រើប្រាស់ ({pendingUsers.length})
              </button>
              <span className="text-slate-300">/</span>
              <button
                type="button"
                onClick={() => onSelectTab("products")}
                className="font-medium text-[#1B5E20] hover:underline cursor-pointer"
              >
                មើលកសិផល ({pendingProducts.length})
              </button>
            </div>
          </div>

          {/* Cards for Pending Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Pending Farmer Verification */}
            {pendingUsers.slice(0, 2).map((user) => (
              <div
                key={user.id}
                className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono">{user.id}</span>
                    <span>{user.type === "farmer" ? "កសិករ" : "អ្នកទិញ"}</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm mt-0.5 truncate">
                    {user.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {user.phone} • ខេត្ត{user.province}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setInspectingUser(user)}
                    className="px-2.5 py-1 rounded bg-[#1B5E20] hover:bg-[#144717] text-white text-xs font-medium cursor-pointer"
                  >
                    ពិនិត្យ & ផ្ទៀងផ្ទាត់
                  </button>
                </div>
              </div>
            ))}

            {/* Pending Product Approval */}
            {pendingProducts.slice(0, 1).map((prod) => (
              <div
                key={prod.id}
                className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono">{prod.id}</span>
                    <span>កសិផលថ្មី</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm mt-0.5 truncate">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    ${prod.price}/{prod.unit} • {prod.stock} • {prod.farmer}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setInspectingProduct(prod)}
                    className="px-2.5 py-1 rounded bg-[#1B5E20] hover:bg-[#144717] text-white text-xs font-medium cursor-pointer"
                  >
                    ពិនិត្យ & អនុម័ត
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Charts Section (Trading Growth & Province Distribution - API ready) */}
      <AdminChartsSection />

      {/* 3. Interactive Province Filtering View (Inspect Farmers & Buyers by Province) */}
      <AdminProvinceFilterView
        users={users}
        onInspectUser={(user) => setInspectingUser(user)}
        onQuickVerify={(userId) => handleVerifyUser(userId, false)}
      />

      {/* Inspection Modals */}
      <AdminUserVerifyModal
        user={inspectingUser}
        isOpen={Boolean(inspectingUser)}
        onClose={() => setInspectingUser(null)}
        onVerify={handleVerifyUser}
        onReject={handleRevokeUser}
      />

      <AdminProductConfirmModal
        product={inspectingProduct}
        isOpen={Boolean(inspectingProduct)}
        onClose={() => setInspectingProduct(null)}
        onApprove={handleApproveProduct}
        onReject={handleRejectProduct}
      />
    </div>
  );
}

