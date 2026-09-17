"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Calendar,
  Award,
  Package,
  AlertCircle,
} from "lucide-react";

export default function AdminProductConfirmModal({
  product,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) {
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    setActivePhotoIdx(0);
    setShowRejectBox(false);
    setRejectReason("");
  }, [product?.id]);

  if (!isOpen || !product) return null;

  const photos =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const currentPhoto = photos[activePhotoIdx] || photos[0];

  const handlePrevImage = () => {
    setActivePhotoIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActivePhotoIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const quickRejectReasons = [
    "រូបភាពកសិផលមិនច្បាស់ ឬមិនត្រូវតាមស្តង់ដារ",
    "តម្លៃដាក់លក់មិនសមស្របនឹងទីផ្សារ",
    "ព័ត៌មានបរិមាណស្តុក ឬទីតាំងមិនច្បាស់លាស់",
    "ខ្វះឯកសារបញ្ជាក់ស្តង់ដារគុណភាព CamGAP",
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl lg:max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
          {/* Header Tag */}
          <div className="mb-6 flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B5E20] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ផ្ទៀងផ្ទាត់ និងអនុម័តកសិផល (Product Moderation)
            </span>
            <span className="text-xs font-mono font-semibold text-gray-500">
              កូដ៖ {product.id}
            </span>
          </div>

          {/* Top 2 Columns Layout: Replicating Marketplace ProductDetailModal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 1. Left Column: Image Carousel & Farmer Card (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Carousel Container */}
              <div className="space-y-3">
                <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 shadow-xs">
                  <img
                    src={currentPhoto}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-300"
                  />

                  {/* Image Counter Badge */}
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {activePhotoIdx + 1} / {photos.length}
                  </span>

                  {/* Carousel Prev/Next Buttons */}
                  {photos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center text-gray-700 shadow-md transition-colors cursor-pointer"
                        aria-label="រូបភាពមុន"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center text-gray-700 shadow-md transition-colors cursor-pointer"
                        aria-label="រូបភាពបន្ទាប់"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails below */}
                {photos.length > 1 && (
                  <div className="grid grid-cols-3 gap-3">
                    {photos.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActivePhotoIdx(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          activePhotoIdx === idx
                            ? "border-[#1B5E20] ring-2 ring-[#1B5E20]/20 shadow-xs"
                            : "border-gray-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Farmer Info Card (Identical to Marketplace ProductDetailModal) */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    ព័ត៌មានកសិករម្ចាស់កសិផល
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1B5E20] bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1B5E20]" />
                    <span>កសិករផ្លូវការ</span>
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-gray-900">
                    {product.farmer}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>ខេត្ត{product.province}</span>
                  </div>
                </div>

                {product.phone && (
                  <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                    <span className="text-gray-500">លេខទូរស័ព្ទទំនាក់ទំនង៖</span>
                    <span className="font-bold text-gray-900 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#1B5E20]" />
                      {product.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Right Column: Product Detail & Specifications (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Category & Status Bar */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {product.category || "កសិផល"}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>ដាក់ស្នើ៖ {product.submittedDate || "ថ្មីៗនេះ"}</span>
                  </span>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    product.status === "Active"
                      ? "bg-emerald-50 text-[#1B5E20] border-emerald-200"
                      : product.status === "Pending"
                      ? "bg-amber-50 text-amber-900 border-amber-300"
                      : "bg-rose-50 text-rose-800 border-rose-200"
                  }`}
                >
                  {product.status === "Active"
                    ? "បានអនុម័ត (Active)"
                    : product.status === "Pending"
                    ? "កំពុងរង់ចាំការពិនិត្យ (Pending)"
                    : "បានបដិសេធ (Rejected)"}
                </span>
              </div>

              {/* Product Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  {product.name}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  ផលិតផលដាំដុះធម្មជាតិពីកសិករក្នុងស្រុក កំណត់សម្រាប់ទីផ្សារលក់ដុំ និងលក់រាយ
                </p>
              </div>

              {/* Price & Wholesale Tier Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-xs text-gray-600 font-medium block">
                    តម្លៃលក់រាយ
                  </span>
                  <p className="text-2xl font-black text-[#1B5E20] mt-0.5">
                    ${product.price}
                    <span className="text-xs font-normal text-gray-600 ml-1">
                      / {product.unit || "គ.ក"}
                    </span>
                  </p>
                </div>

                <div>
                  <span className="text-xs text-gray-600 font-medium block">
                    តម្លៃបោះដុំ
                  </span>
                  <p className="text-2xl font-black text-gray-900 mt-0.5">
                    ${product.wholesalePrice || product.price}
                    <span className="text-xs font-normal text-gray-600 ml-1">
                      / {product.unit || "គ.ក"}
                    </span>
                  </p>
                </div>

                <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-emerald-200 pt-2 sm:pt-0 sm:pl-4">
                  <span className="text-xs text-gray-600 font-medium block">
                    កុម្ម៉ង់អប្បបរមា (MOQ)
                  </span>
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    {product.moq || `ចាប់ពី ១០ ${product.unit || "គ.ក"}`}
                  </p>
                </div>
              </div>

              {/* Key Specs 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-gray-200 bg-white">
                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1 mb-1">
                    <Package className="w-3.5 h-3.5 text-gray-400" />
                    <span>ស្តុកដែលអាចផ្គត់ផ្គង់</span>
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    {product.stock}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 bg-white">
                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>ប្រភពដាំដុះ / ខេត្ត</span>
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    ខេត្ត{product.province}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 bg-white">
                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1 mb-1">
                    <Truck className="w-3.5 h-3.5 text-gray-400" />
                    <span>ជម្រើសដឹកជញ្ជូន</span>
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {product.deliveryOption === "pickup"
                      ? "ទៅយកផ្ទាល់នៅចម្ការ"
                      : product.deliveryOption === "both"
                      ? "ដឹកជញ្ជូន ឬ ទៅយកផ្ទាល់"
                      : "សេវាដឹកជញ្ជូនដល់កន្លែង"}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 bg-white">
                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1 mb-1">
                    <Award className="w-3.5 h-3.5 text-[#1B5E20]" />
                    <span>ស្តង់ដារគុណភាព</span>
                  </span>
                  <span className="text-sm font-bold text-[#1B5E20]">
                    CamGAP ស្តង់ដារកសិកម្មល្អ
                  </span>
                </div>
              </div>

              {/* Description Section */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  ការពិពណ៌នាកសិផល (Product Description)
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.description ||
                    "កសិផលស្រស់ធម្មជាតិ ប្រមូលផលថ្មីៗពីចម្ការ គ្មានប្រើប្រាស់សារធាតុគីមីពុល ធានាគុណភាពស្រស់ល្អ និងសុវត្ថិភាពម្ហូបអាហារកម្រិតខ្ពស់។"}
                </p>
              </div>

              {/* Rejection Note Form (If Opened) */}
              {showRejectBox && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>បញ្ជាក់មូលហេតុនៃការបដិសេធកសិផល</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowRejectBox(false)}
                      className="text-xs font-bold text-rose-700 hover:underline cursor-pointer"
                    >
                      បោះបង់
                    </button>
                  </div>

                  {/* Predefined Quick Reasons */}
                  <div className="flex flex-wrap gap-1.5">
                    {quickRejectReasons.map((r, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRejectReason(r)}
                        className="text-xs px-2.5 py-1 bg-white hover:bg-rose-100 text-rose-900 border border-rose-200 rounded-lg cursor-pointer transition-colors text-left"
                      >
                        {r}
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={3}
                    placeholder="សរសេរបញ្ជាក់បន្ថែមអំពីមូលហេតុនៃការបដិសេធ..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full p-3 rounded-xl border border-rose-300 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        onReject(
                          product.id,
                          rejectReason.trim() || "រូបភាព ឬព័ត៌មានកសិផលមិនត្រូវតាមស្តង់ដារ"
                        );
                        onClose();
                      }}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-colors"
                    >
                      បញ្ជាក់ការបដិសេធកសិផលនេះ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Moderation Toolbar */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-4 flex-wrap">
          <div className="text-xs text-gray-500">
            ស្ថានភាពបច្ចុប្បន្ន៖{" "}
            <strong className="text-gray-900">
              {product.status === "Active"
                ? "បានអនុម័ត និងដាក់លក់លើទីផ្សាររួចរាល់"
                : product.status === "Pending"
                ? "រង់ចាំការសម្រេចចិត្តពីអ្នកគ្រប់គ្រង"
                : "ត្រូវបានបដិសេធ"}
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

            {!showRejectBox && product.status !== "Rejected" && (
              <button
                type="button"
                onClick={() => setShowRejectBox(true)}
                className="px-4 py-2.5 rounded-xl border border-rose-300 bg-white hover:bg-rose-50 text-rose-700 text-sm font-bold cursor-pointer transition-colors"
              >
                បដិសេធកសិផល
              </button>
            )}

            {product.status !== "Active" && (
              <button
                type="button"
                onClick={() => {
                  onApprove(product.id);
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#144717] text-white text-sm font-bold cursor-pointer transition-colors shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>អនុម័ត និងដាក់លក់លើទីផ្សារ</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
