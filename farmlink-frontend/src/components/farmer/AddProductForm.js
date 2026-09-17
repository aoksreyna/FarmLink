"use client";

import React, { useState, useRef } from "react";
import { Camera, X, ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import DeliveryOptionsModal from "./DeliveryOptionsModal";

export default function AddProductForm({ categories = [], onCancel, onSuccess }) {
  const [supabase] = useState(() => createClient());
  const fileInputRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Delivery configuration Modal State (Frame 31)
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isDeliveryConfigured, setIsDeliveryConfigured] = useState(false);
  const [deliveryConfig, setDeliveryConfig] = useState({
    pickupOnly: false,
    directDelivery: false,
    baseFee: "1.20",
    freeThreshold: "100",
  });

  // Form Fields
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("kg");
  const [stock, setStock] = useState("");
  const [minOrder, setMinOrder] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("ភ្នំពេញ");
  const [description, setDescription] = useState("");

  // File Upload Images State
  const [imagePreviews, setImagePreviews] = useState([]);

  const provinces = [
    "ភ្នំពេញ", "កណ្តាល", "បាត់ដំបង", "សៀមរាប", "កំពត",
    "តាកែវ", "កំពង់ចាម", "មណ្ឌលគិរី", "ពោធិ៍សាត់", "កំពង់ស្ពឺ"
  ];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (imagePreviews.length + files.length > 10) {
      setErrorMsg("អាចបញ្ចូលរូបភាពបានអតិបរមាត្រឹម ១០ សន្លឹកប៉ុណ្ណោះ");
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) return setErrorMsg("សូមបញ្ចូលឈ្មោះកសិផល");
    if (!price || Number(price) <= 0) return setErrorMsg("សូមបញ្ចូលតម្លៃឱ្យបានត្រឹមត្រូវ");
    if (!stock || Number(stock) <= 0) return setErrorMsg("សូមបញ្ចូលបរិមាណក្នុងស្តុក");

    try {
      setSubmitting(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("សូមចូលគណនីជាមុនសិន");

      // 1. Insert product
      const { data: product, error: prodErr } = await supabase
        .from("products")
        .insert({
          farmer_id: user.id,
          category_id: categoryId || categories[0]?.id,
          name: name.trim(),
          description: description.trim() || null,
          price_per_unit: parseFloat(price),
          unit: unit,
          stock_quantity: parseFloat(stock),
          min_order_qty: parseFloat(minOrder) || 1,
          harvest_date: startDate || null,
          delivery_options: deliveryConfig,
          status: "active",
        })
        .select()
        .single();

      if (prodErr) throw prodErr;

      // 2. Insert image records
      const imagesToInsert = imagePreviews.length > 0
        ? imagePreviews.map((url, idx) => ({
            product_id: product.id,
            image_url: url.startsWith("blob:") ? "/category-veggies.jpg" : url,
            is_primary: idx === 0,
            display_order: idx,
          }))
        : [{
            product_id: product.id,
            image_url: "/category-veggies.jpg",
            is_primary: true,
            display_order: 0,
          }];

      await supabase.from("product_images").insert(imagesToInsert);

      onSuccess && onSuccess();
    } catch (err) {
      setErrorMsg(err.message || "មិនអាចបង្កើតកសិផលបានឡើយ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Title & Back Button */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="p-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            បន្ថែមកសិផលថ្មី
          </h1>
          <p className="text-base text-gray-500 mt-1">
            បញ្ចូលទិន្នន័យកសិផលរបស់អ្នកដើម្បីដាក់បង្ហាញលើទីផ្សារ FarmLink
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-base rounded-xl">
          {errorMsg}
        </div>
      )}

      {/* Main Full-Width Form Card */}
      <form onSubmit={handleSubmit} className="w-full bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 shadow-xs space-y-8">
        
        {/* Click to Choose Image (Max 10) */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3">
            រូបភាពកសិផល (អតិបរមា ១០ សន្លឹក)
          </label>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="hidden"
          />

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-28 h-28 rounded-2xl border-2 border-dashed border-[#1B5E20]/50 bg-emerald-50/50 hover:bg-emerald-50 text-[#1B5E20] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs group"
            >
              <Camera className="w-8 h-8 stroke-[1.8] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-[#1B5E20]">ជ្រើសរើសរូប</span>
            </button>

            {imagePreviews.map((url, idx) => (
              <div key={idx} className="relative w-28 h-28 rounded-2xl overflow-hidden border border-gray-300 shadow-sm bg-gray-50">
                <img src={url} alt="Produce Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/75 text-white flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                  title="លុបរូបភាព"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Row 1: Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-base font-bold text-gray-800 mb-2">ឈ្មោះកសិផល</label>
            <input
              type="text"
              required
              placeholder="ឧទាហរណ៍៖ ប៉េងប៉ោះស្រស់ធម្មជាតិ"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20]"
            />
          </div>
          <div>
            <label className="block text-base font-bold text-gray-800 mb-2">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-3 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Price, Unit, Stock, Min Order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-base font-bold text-gray-800 mb-2">តម្លៃរាយ ($)</label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="1.25"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 text-base font-semibold text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20]"
            />
          </div>
          <div>
            <label className="block text-base font-bold text-gray-800 mb-2">ឯកតា</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-3 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] cursor-pointer"
            >
              <option value="kg">គីឡូក្រាម (kg)</option>
              <option value="ton">តោន (ton)</option>
              <option value="crate">កេស (crate)</option>
              <option value="bundle">បាច់/ដុំ (bundle)</option>
            </select>
          </div>
          <div>
            <label className="block text-base font-bold text-gray-800 mb-2">បរិមាណក្នុងស្តុក</label>
            <input
              type="number"
              required
              placeholder="500"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-4 py-3 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20]"
            />
          </div>
          <div>
            <label className="block text-base font-bold text-gray-800 mb-2">កម្រិតកុម្ម៉ង់អប្បបរមា</label>
            <input
              type="number"
              placeholder="10"
              value={minOrder}
              onChange={(e) => setMinOrder(e.target.value)}
              className="w-full px-4 py-3 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20]"
            />
          </div>
        </div>

        {/* Row 3: Dates & Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-base font-bold text-gray-800 mb-2">ថ្ងៃចាប់ផ្តើមប្រមូលផល</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-base font-bold text-gray-800 mb-2">ថ្ងៃបញ្ចប់</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-base font-bold text-gray-800 mb-2">ទីតាំងកសិដ្ឋាន</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] cursor-pointer"
            >
              {provinces.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Delivery Options - Readonly Trigger that opens Frame 31 Modal */}
        <div className="space-y-3">
          <label className="block text-base font-bold text-gray-800">
            ជម្រើសដឹកជញ្ជូន (Delivery Options)
          </label>
          
          {/* Clickable Card: Opens Frame 31 Modal to configure */}
          <div
            onClick={() => setIsDeliveryModalOpen(true)}
            className="p-6 bg-gray-50 hover:bg-emerald-50/40 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#1B5E20] space-y-3 cursor-pointer transition-all"
            title="ចុចទីនេះដើម្បីកំណត់ជម្រើសដឹកជញ្ជូនក្នុង Frame 31"
          >
            {isDeliveryConfigured ? (
              <div className="space-y-2 pointer-events-none">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    readOnly
                    checked={deliveryConfig.pickupOnly}
                    className="w-5 h-5 rounded text-[#1B5E20] focus:ring-[#1B5E20]"
                  />
                  <span className="text-base text-gray-800 font-medium">Pickup only</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    readOnly
                    checked={deliveryConfig.directDelivery}
                    className="w-5 h-5 rounded text-[#1B5E20] focus:ring-[#1B5E20]"
                  />
                  <span className="text-base text-gray-800 font-medium">
                    Direct delivery (${Number(deliveryConfig.baseFee).toFixed(2)})
                  </span>
                </label>

                {deliveryConfig.directDelivery && (
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      readOnly
                      checked={true}
                      className="w-5 h-5 rounded text-[#1B5E20] focus:ring-[#1B5E20]"
                    />
                    <span className="text-base text-gray-800 font-medium">
                      Free Delivery for {deliveryConfig.freeThreshold} kg and above
                    </span>
                  </label>
                )}
                <p className="text-xs text-[#1B5E20] font-bold pt-1">
                  ✓ បានកំណត់រួចរាល់ (ចុចទីនេះដើម្បីបើក Frame 31 កែប្រែឡើងវិញ)
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <p className="text-base font-bold text-gray-700">
                  មិនទាន់បានកំណត់ជម្រើសដឹកជញ្ជូននៅឡើយទេ
                </p>
                <p className="text-sm text-[#1B5E20] font-semibold mt-1">
                  👉 ចុចទីនេះដើម្បីបើកផ្ទាំងកំណត់ Frame 31 (Delivery Options Modal)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-base font-bold text-gray-800 mb-2">ការពិពណ៌នាលម្អិត (Description)</label>
          <textarea
            rows={4}
            placeholder="បញ្ជាក់ពីគុណភាព ប្រភេទពូជ វិធីសាស្ត្រដាំដុះ និងការវេចខ្ចប់..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] resize-none"
          />
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3.5 border border-gray-300 rounded-xl text-base font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-10 py-3.5 bg-[#1B5E20] hover:bg-[#144919] text-white text-base font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <span>Publish Product</span>
            )}
          </button>
        </div>

      </form>

      {/* Frame 31 Delivery Modal Popup */}
      <DeliveryOptionsModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        initialData={deliveryConfig}
        onSave={(newConfig) => {
          setDeliveryConfig(newConfig);
          setIsDeliveryConfigured(true);
        }}
      />
    </div>
  );
}
