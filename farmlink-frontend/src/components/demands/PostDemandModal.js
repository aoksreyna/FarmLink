"use client";

import React, { useState } from "react";
import { X, PlusCircle, CheckCircle2, Building2 } from "lucide-react";

export default function PostDemandModal({
  isOpen,
  onClose,
  onPostSuccess,
}) {
  const [buyerName, setBuyerName] = useState("");
  const [cropName, setCropName] = useState("");
  const [category, setCategory] = useState("vegetables");
  const [requiredQty, setRequiredQty] = useState("");
  const [unit, setUnit] = useState("គ.ក");
  const [targetPrice, setTargetPrice] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newDemand = {
      id: `dem-${Date.now()}`,
      buyerName,
      cropName,
      category,
      requiredQty: Number(requiredQty).toLocaleString(),
      unit,
      targetPrice,
      location,
      deadline: deadline ? `ថ្ងៃផុតកំណត់ ៖ ${deadline}` : "នៅសល់ ៧ ថ្ងៃទៀត",
      proposalsCount: 0,
      description,
      phone: buyerPhone,
      isVerified: true,
      frequency: "ម្តង",
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        if (onPostSuccess) onPostSuccess(newDemand);
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-emerald-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1B5E20] text-white flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900 leading-tight">
                ប្រកាសតម្រូវការទិញកសិផលថ្មី
              </h3>
              <span className="text-xs text-gray-500">ស្វែងរកកសិករផ្គត់ផ្គង់កសិផលបោះដុំ</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-white cursor-pointer transition-colors"
            aria-label="បិទ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#1B5E20] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-gray-900">បានបង្ហោះតម្រូវការជោគជ័យ!</h4>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              សេចក្តីប្រកាសរបស់អ្នកត្រូវបានផ្សព្វផ្សាយទៅកាន់កសិករ និងសហគមន៍ទូទាំងប្រទេសកម្ពុជា។
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5 max-h-[80vh] overflow-y-auto">
            
            {/* Buyer/Company Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ឈ្មោះក្រុមហ៊ុន / ស្ថាប័នអ្នកទិញ*
              </label>
              <input
                type="text"
                required
                placeholder="ឧ. ភោជនីយដ្ឋានទន្លេបាសាក់ ឬ រោងចក្រកែច្នៃ"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] bg-white"
              />
            </div>

            {/* Crop Name & Category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  មុខកសិផលដែលត្រូវការ*
                </label>
                <input
                  type="text"
                  required
                  placeholder="ឧ. ស្វាយកែវរមៀត"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ប្រភេទ*
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] bg-white cursor-pointer"
                >
                  <option value="vegetables">បន្លែស្រស់</option>
                  <option value="fruits">ផ្លែឈើ</option>
                  <option value="grains">អង្ករ & ធញ្ញជាតិ</option>
                  <option value="spices">គ្រឿងទេស</option>
                  <option value="others">ផ្សេងៗ</option>
                </select>
              </div>
            </div>

            {/* Quantity & Unit */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  បរិមាណត្រូវការសរុប*
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="ឧ. 5000"
                  value={requiredQty}
                  onChange={(e) => setRequiredQty(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ខ្នាត*
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] bg-white cursor-pointer"
                >
                  <option value="គ.ក">គ.ក</option>
                  <option value="តោន">តោន</option>
                  <option value="ស្និត">ស្និត</option>
                  <option value="ផ្លែ">ផ្លែ</option>
                  <option value="បាវ">បាវ</option>
                </select>
              </div>
            </div>

            {/* Target Price & Location */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  តម្លៃគោលដៅរំពឹងទុក ($/{unit})*
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="ឧ. 0.45"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ទីតាំងទទួលកសិផល*
                </label>
                <input
                  type="text"
                  required
                  placeholder="ឧ. ក្រុងបាត់ដំបង"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] bg-white"
                />
              </div>
            </div>

            {/* Deadline & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  កាលបរិច្ឆេទផុតកំណត់*
                </label>
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] bg-white text-gray-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  លេខទូរស័ព្ទ / Telegram*
                </label>
                <input
                  type="tel"
                  required
                  placeholder="012 345 678"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] bg-white"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                លក្ខខណ្ឌកសិផលដែលត្រូវការ (ស្រេចចិត្ត)
              </label>
              <textarea
                rows={2}
                placeholder="ឧ. ផ្លែទុំល្មម គ្មានស្នាមជាំ សំបកស្អាត វេចខ្ចប់ក្នុងកេស..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] bg-white placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-[#1B5E20] hover:bg-[#154a19] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isSubmitting ? "កំពុងបង្ហោះ..." : "បង្ហោះសេចក្តីប្រកាស"}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
