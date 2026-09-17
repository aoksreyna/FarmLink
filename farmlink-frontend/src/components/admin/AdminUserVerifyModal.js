"use client";

import React, { useState } from "react";
import {
  X,
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Award,
  Sprout,
  Image as ImageIcon,
  Check,
  Star,
  AlertCircle,
  Clock,
  Package,
} from "lucide-react";
import { MOCK_ADMIN_PRODUCTS } from "@/components/admin/AdminProductsTab";

export default function AdminUserVerifyModal({
  user,
  isOpen,
  onClose,
  onVerify,
  onReject,
}) {
  const [giveCamGAP, setGiveCamGAP] = useState(
    user?.certType?.includes("CamGAP") || false
  );
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  if (!isOpen || !user) return null;

  const isFarmer = user.type === "farmer";

  // Get all products belonging to this farmer
  const farmerProducts = MOCK_ADMIN_PRODUCTS.filter(
    (p) =>
      p.farmer?.toLowerCase().includes(user.name.toLowerCase()) ||
      user.name?.toLowerCase().includes(p.farmer?.toLowerCase())
  );

  const farmGallery = [
    user.farmPhoto1 ||
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    user.farmPhoto2 ||
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80",
    user.farmPhoto3 ||
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80",
    user.coverPhoto ||
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80",
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl lg:max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-6 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        
        {/* Close Button on top right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-30 w-10 h-10 flex items-center justify-center text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer shadow-md backdrop-blur-xs"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Body: Replicating FarmerProfile Template */}
        <div className="overflow-y-auto">
          
          {/* 1. Cover Photo Banner (Identical to FarmerProfile) */}
          <div className="relative h-48 sm:h-64 w-full bg-gray-100 overflow-hidden">
            <img
              src={
                user.coverPhoto ||
                "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80"
              }
              alt="Farm Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute top-5 left-6 text-white">
              <span className="text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
                ផ្ទៀងផ្ទាត់កសិករ & ចម្ការ (Farmer Verification)
              </span>
            </div>
          </div>

          {/* 2. Identity Header & Avatar Overlap (Identical to FarmerProfile) */}
          <div className="px-6 sm:px-8 pb-6 pt-0 relative border-b border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-4">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={
                    user.avatar ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                  }
                  alt={user.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
                />
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                {user.isVerified ? (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-[#1B5E20] border border-emerald-200 rounded-full text-xs font-bold shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-[#1B5E20]" />
                    <span>កសិករបានផ្ទៀងផ្ទាត់ផ្លូវការ (Verified Seller)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-50 text-amber-900 border border-amber-300 rounded-full text-xs font-bold shadow-2xs">
                    <Clock className="w-4 h-4 text-amber-700" />
                    <span>កំពុងរង់ចាំការពិនិត្យផ្ទៀងផ្ទាត់ (Pending)</span>
                  </span>
                )}
              </div>
            </div>

            {/* Farm Name & Identity */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    {user.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 font-semibold mt-0.5">
                    ម្ចាស់កសិដ្ឋាន៖{" "}
                    <span className="text-gray-900">
                      {user.ownerName || user.name}
                    </span>{" "}
                    • {user.roleKh || (isFarmer ? "កសិករម្ចាស់កសិដ្ឋាន" : "អាជីវករទិញដុំ")}
                  </p>
                </div>

                <span className="text-xs font-mono px-3 py-1 bg-gray-100 text-gray-700 font-bold rounded-lg border border-gray-200 self-start sm:self-auto">
                  កូដ៖ {user.id}
                </span>
              </div>

              {/* Contact & Location Meta Bar (Identical to FarmerProfile) */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#1B5E20]" />
                  <span>
                    {user.village ? `${user.village}, ` : ""}
                    {user.commune ? `${user.commune}, ` : ""}
                    {user.district ? `${user.district}, ` : ""}
                    ខេត្ត{user.province}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#1B5E20]" />
                  <span>លេខទូរស័ព្ទ៖ {user.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#1B5E20]" />
                  <span>បទពិសោធន៍ {user.experience || "៨ ឆ្នាំ"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Performance Stat Cards (Identical to FarmerProfile) */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  ផ្ទៃដីដាំដុះ
                </span>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {user.farmSize || "៥.០ ហិកតា"}
                </p>
                <span className="text-xs text-emerald-700 font-semibold mt-1 inline-block">
                  ចម្ការដាំដុះផ្ទាល់
                </span>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  ការផ្គត់ផ្គង់ជោគជ័យ
                </span>
                <p className="text-xl sm:text-2xl font-bold text-[#1B5E20]">
                  {user.totalOrders || 24}+ ដង
                </p>
                <span className="text-xs text-gray-500 mt-1 inline-block">
                  ការបញ្ជាទិញរួចរាល់
                </span>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  សមត្ថភាពផ្គត់ផ្គង់
                </span>
                <p className="text-lg sm:text-xl font-bold text-blue-700">
                  {user.monthlyCapacity || "១៥ - ២០ តោន/ខែ"}
                </p>
                <span className="text-xs text-gray-500 mt-1 inline-block">
                  បរិមាណប្រចាំខែ
                </span>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  កសិផលក្នុងប្រព័ន្ធ
                </span>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {farmerProducts.length} មុខ
                </p>
                <span className="text-xs text-emerald-700 font-semibold mt-1 inline-block">
                  កំពុងដាក់លក់លើ FarmLink
                </span>
              </div>
            </div>

            {/* 4. Two-Column Layout (Identical to FarmerProfile) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column (lg:col-span-7): About, Standards, Verification Docs */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* About the Farm */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-3">
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Sprout className="w-5 h-5 text-[#1B5E20]" />
                    <span>អំពីកសិដ្ឋាន (About Farm)</span>
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {user.bio ||
                      "កសិដ្ឋានដាំដុះដំណាំកសិកម្មធម្មជាតិ ស្របតាមគោលការណ៍កសិកម្មល្អ ផ្តោតលើសុវត្ថិភាពម្ហូបអាហារ និងការផ្គត់ផ្គង់កសិផលស្រស់ៗជូនទីផ្សារបោះដុំ និងផ្សារទំនើប។"}
                  </p>
                </div>

                {/* Standards & CamGAP Admin Option */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-3">
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#1B5E20]" />
                    <span>វិញ្ញាបនបត្រ និងស្តង់ដារគុណភាព</span>
                  </h3>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-[#1B5E20] rounded-xl text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ស្តង់ដារ CamGAP កម្ពុជា</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-[#1B5E20] rounded-xl text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>កសិផលសុវត្ថិភាពធម្មជាតិ</span>
                    </span>
                  </div>

                  {/* Admin CamGAP Toggle */}
                  <label className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 cursor-pointer text-xs font-bold text-[#1B5E20] mt-3">
                    <input
                      type="checkbox"
                      checked={giveCamGAP}
                      onChange={(e) => setGiveCamGAP(e.target.checked)}
                      className="w-4 h-4 rounded text-[#1B5E20] focus:ring-[#1B5E20]"
                    />
                    <span>
                      ផ្តល់ផ្លាកសញ្ញាបញ្ជាក់ CamGAP ផ្លូវការ (Official CamGAP Badge)
                    </span>
                  </label>
                </div>

                {/* Key Crops & Produce Details */}
                {user.cropTypes && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-3">
                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                      <Package className="w-5 h-5 text-[#1B5E20]" />
                      <span>ដំណាំចម្បងដែលដាំដុះ (Key Crops)</span>
                    </h3>
                    <p className="text-sm text-gray-700 font-medium bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
                      {user.cropTypes}
                    </p>
                  </div>
                )}

                {/* Customer Reviews from Buyers (Identical to FarmerProfile) */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>មតិយោបល់ និងការវាយតម្លៃពីអ្នកទិញ</span>
                    </h3>
                    <span className="text-sm font-bold text-gray-900">
                      4.9 <span className="text-xs text-gray-400 font-normal">/ 5.0</span>
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                      <div className="flex items-center justify-between font-bold text-gray-900">
                        <span>ភោជនីយដ្ឋាន ទន្លេបាសាក់</span>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">
                        "កសិផលស្រស់ល្អ ដឹកជញ្ជូនទាន់ពេល និងវេចខ្ចប់យ៉ាងមានស្តង់ដារ។"
                      </p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                      <div className="flex items-center justify-between font-bold text-gray-900">
                        <span>ផ្សារទំនើប ឡាក់គី</span>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">
                        "ទំនិញគុណភាពតាមស្តង់ដារ CamGAP ត្រឹមត្រូវ គ្មានជាតិគីមី។"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (lg:col-span-5): Gallery & Products List */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Farm Photo Gallery */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-3">
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#1B5E20]" />
                    <span>កម្រងរូបភាពកសិដ្ឋានជាក់ស្តែង ({farmGallery.length})</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-2.5">
                    {farmGallery.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-100"
                      >
                        <img
                          src={img}
                          alt={`Farm photo ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Farmer's Products on FarmLink */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                      <Package className="w-5 h-5 text-[#1B5E20]" />
                      <span>កសិផលរបស់កសិដ្ឋាន ({farmerProducts.length})</span>
                    </h3>
                  </div>

                  {farmerProducts.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {farmerProducts.map((p) => (
                        <div
                          key={p.id}
                          className="py-3 first:pt-0 last:pb-0 flex items-center gap-3"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-gray-900 truncate">
                              {p.name}
                            </h4>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                              ${p.price}/{p.unit} • ស្តុក {p.stock}
                            </p>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              p.status === "Active"
                                ? "bg-emerald-50 text-[#1B5E20] border border-emerald-200"
                                : "bg-amber-50 text-amber-800 border border-amber-200"
                            }`}
                          >
                            {p.status === "Active" ? "បានអនុម័ត" : "រង់ចាំពិនិត្យ"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 py-2">
                      មិនទាន់មានកសិផលដែលបានដាក់ស្នើនៅឡើយ។
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Rejection Note Form (If Opened) */}
            {showRejectBox && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>បញ្ជាក់មូលហេតុនៃការបដិសេធ ឬផ្អាកគណនី</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowRejectBox(false)}
                    className="text-xs font-bold text-rose-700 hover:underline cursor-pointer"
                  >
                    បោះបង់
                  </button>
                </div>

                <textarea
                  rows={3}
                  placeholder="បញ្ជាក់មូលហេតុ (ឧ. ព័ត៌មានកសិដ្ឋានមិនពេញលេញ, ទីតាំងចម្ការមិនពិតប្រាកដ)..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full p-3 rounded-xl border border-rose-300 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onReject(
                        user.id,
                        rejectReason.trim() || "ឯកសារ ឬព័ត៌មានមិនត្រឹមត្រូវតាមគោលការណ៍"
                      );
                      onClose();
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-colors"
                  >
                    បញ្ជាក់ការបដិសេធ / ផ្អាកគណនី
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 5. Sticky Bottom Toolbar for Admin Moderation */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-4 flex-wrap">
          <div className="text-xs text-gray-500">
            ស្ថានភាពបច្ចុប្បន្ន៖{" "}
            <strong className="text-gray-900">
              {user.isVerified
                ? "បានផ្ទៀងផ្ទាត់ផ្លូវការ (Verified Seller)"
                : "កំពុងរង់ចាំការពិនិត្យផ្ទៀងផ្ទាត់"}
            </strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 text-sm font-semibold cursor-pointer transition-colors"
            >
              បិទផ្ទាំង
            </button>

            {!showRejectBox && (
              <button
                type="button"
                onClick={() => setShowRejectBox(true)}
                className="px-4 py-2.5 rounded-xl border border-rose-300 bg-white hover:bg-rose-50 text-rose-700 text-sm font-bold cursor-pointer transition-colors"
              >
                {user.isVerified ? "ផ្អាកគណនី" : "បដិសេធការផ្ទៀងផ្ទាត់"}
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onVerify(user.id, giveCamGAP);
                onClose();
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#144717] text-white text-sm font-bold cursor-pointer transition-colors shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>
                {user.isVerified
                  ? "ធ្វើបច្ចុប្បន្នភាពការផ្ទៀងផ្ទាត់"
                  : "អនុម័ត និងផ្តល់ការផ្ទៀងផ្ទាត់ផ្លូវការ"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
