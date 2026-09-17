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
      {/* Charts Section (Trading Growth & Province Distribution - API ready) */}
      <AdminChartsSection />

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

