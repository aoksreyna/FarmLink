"use client";

import React, { useState, useEffect } from "react";
import { Camera, X, Settings2, Loader2, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import DeliveryOptionsModal from "./DeliveryOptionsModal";

export default function CreateProductModal({ isOpen, onClose, onSuccess }) {
  const [supabase] = useState(() => createClient());
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Delivery Modal State (Frame 31)
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [deliveryConfig, setDeliveryConfig] = useState({
    pickupOnly: false,
    directDelivery: true,
    baseFee: "1.20",
    freeThreshold: "100",
  });

  // Form State matching Figma Picture 2
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("kg");
  const [stockQuantity, setStockQuantity] = useState("");
  const [minOrderQty, setMinOrderQty] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("Phnom Penh");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const provinces = [
    "Phnom Penh", "Kandal", "Battambang", "Siem Reap", "Kampot",
    "Takeo", "Kampong Cham", "Mondulkiri", "Pursat", "Kampong Speu"
  ];

  // Fetch Categories from Supabase
  useEffect(() => {
    if (!isOpen) return;

    async function loadCategories() {
      const { data } = await supabase
        .from("categories")
        .select("id, name, name_en")
        .order("display_order", { ascending: true });
      if (data && data.length > 0) {
        setCategories(data);
        if (!categoryId) setCategoryId(data[0].id);
      }
    }
    loadCategories();
  }, [isOpen, supabase]);

  if (!isOpen) return null;

  const handleAddImage = () => {
    if (!newImageUrl.trim() || imageUrls.length >= 10) return;
    setImageUrls([...imageUrls, newImageUrl.trim()]);
    setNewImageUrl("");
  };

  const handleRemoveImage = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) return setErrorMsg("Please enter product name.");
    if (!price || Number(price) <= 0) return setErrorMsg("Please enter a valid price.");
    if (!stockQuantity || Number(stockQuantity) <= 0) return setErrorMsg("Please enter stock quantity.");

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please log in as a farmer to list products.");

      // 1. Insert product into Supabase
      const { data: newProd, error: prodError } = await supabase
        .from("products")
        .insert({
          farmer_id: user.id,
          category_id: categoryId,
          name: name.trim(),
          description: description.trim() || null,
          price_per_unit: parseFloat(price),
          unit: unit,
          stock_quantity: parseFloat(stockQuantity),
          min_order_qty: parseFloat(minOrderQty) || 1,
          harvest_date: startDate || null,
          delivery_options: deliveryConfig,
          status: "active",
        })
        .select()
        .single();

      if (prodError) throw prodError;

      // 2. Insert Images if any
      const imagesToInsert = imageUrls.length > 0 ? imageUrls : ["/category-veggies.jpg"];
      if (newProd) {
        const imageInserts = imagesToInsert.map((url, idx) => ({
          product_id: newProd.id,
          image_url: url,
          is_primary: idx === 0,
          display_order: idx,
        }));
        await supabase.from("product_images").insert(imageInserts);
      }

      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      console.error("Error creating product:", err);
      setErrorMsg(err.message || "Failed to publish product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8 border border-gray-100">
          
          {/* Header matching Picture 2 */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#1B5E20]">Create new product</h2>
              <p className="text-xs text-gray-500 font-medium">Upload Product Photo (max 10)</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {errorMsg && (
            <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            
            {/* Image Upload Area matching Picture 2 */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                {/* Photo Trigger Icon Box */}
                <div className="w-16 h-16 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 flex flex-col items-center justify-center text-[#1B5E20] shrink-0">
                  <Camera className="w-6 h-6 stroke-[1.8]" />
                </div>

                {/* Uploaded Photos Preview with small 'x' delete badge */}
                {imageUrls.map((url, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shadow-2xs group">
                    <img src={url} alt="produce preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Photo Input */}
              <div className="flex gap-2 pt-1">
                <input
                  type="url"
                  placeholder="Paste Image URL (e.g. https://images.unsplash.com/...)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#1B5E20]"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-3 py-1.5 text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer"
                >
                  + Add Photo
                </button>
              </div>
            </div>

            {/* Product Name & category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fresh Tomatoes"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#1B5E20] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#1B5E20] focus:outline-hidden bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.name_en ? `(${c.name_en})` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Per kg, Unit, Quantity Available, Minimum order */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Price Per kg ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="1.25"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#1B5E20] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#1B5E20] focus:outline-hidden bg-white"
                >
                  <option value="kg">kg</option>
                  <option value="ton">ton</option>
                  <option value="crate">crate</option>
                  <option value="bundle">bundle</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Quantity Available</label>
                <input
                  type="number"
                  required
                  placeholder="500"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#1B5E20] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Minimum order</label>
                <input
                  type="number"
                  placeholder="10"
                  value={minOrderQty}
                  onChange={(e) => setMinOrderQty(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#1B5E20] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Start Date, End Date, Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#1B5E20] focus:outline-hidden bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#1B5E20] focus:outline-hidden bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#1B5E20] focus:outline-hidden bg-white"
                >
                  {provinces.map((prov) => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Delivery Options & Frame 31 Trigger */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700">Delivery Options</label>
                <button
                  type="button"
                  onClick={() => setIsDeliveryModalOpen(true)}
                  className="text-xs font-bold text-[#1B5E20] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>Configure (Frame 31)</span>
                </button>
              </div>

              {/* Delivery Options Checklist Box */}
              <div
                onClick={() => setIsDeliveryModalOpen(true)}
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-xs space-y-1.5 cursor-pointer transition-colors"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    readOnly
                    checked={deliveryConfig.pickupOnly}
                    className="rounded text-[#1B5E20] focus:ring-[#1B5E20]"
                  />
                  <span className="text-gray-700 font-medium">Pickup only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    readOnly
                    checked={deliveryConfig.directDelivery}
                    className="rounded text-[#1B5E20] focus:ring-[#1B5E20]"
                  />
                  <span className="text-gray-700 font-medium">Direct delivery (${Number(deliveryConfig.baseFee).toFixed(2)})</span>
                </label>
                {deliveryConfig.directDelivery && (
                  <div className="pl-6 text-[11px] text-gray-500">
                    Free Delivery for {deliveryConfig.freeThreshold} kg and above
                  </div>
                )}
              </div>
            </div>

            {/* description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">description</label>
              <textarea
                rows={3}
                placeholder="Write produce details, farming grade, packaging, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#1B5E20] focus:outline-hidden resize-none"
              />
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl border border-gray-400 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#144919] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <span>Public Product</span>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* Frame 31 Delivery Modal */}
      <DeliveryOptionsModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        initialData={deliveryConfig}
        onSave={(newConfig) => setDeliveryConfig(newConfig)}
      />
    </>
  );
}
