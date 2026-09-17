"use client";

import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, Plus } from "lucide-react";

export default function CreateDemandForm({ onCancel, onSuccess }) {
  const [cropName, setCropName] = useState("");
  const [category, setCategory] = useState("vegetables");
  const [requiredQty, setRequiredQty] = useState("");
  const [unit, setUnit] = useState("គ.ក (kg)");
  const [targetPrice, setTargetPrice] = useState("");
  const [location, setLocation] = useState("ភ្នំពេញ");
  const [deadline, setDeadline] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("088 474 843");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const provinces = [
    "ភ្នំពេញ", "កណ្តាល", "បាត់ដំបង", "សៀមរាប", "កំពត",
    "តាកែវ", "កំពង់ចាម", "មណ្ឌលគិរី", "ពោធិ៍សាត់", "កំពង់ស្ពឺ"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cropName.trim() || !requiredQty || !targetPrice) {
      alert("សូមបំពេញឈ្មោះកសិផល បរិមាណ និងតម្លៃគោលដៅ");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1000);
    }, 600);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Title & Back Button matching AddProductForm */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="p-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          title="ត្រឡប់ក្រោយ"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            បង្កើតតម្រូវការទិញថ្មី (Create Sourcing Demand)
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-0.5">
            បំពេញព័ត៌មានកសិផលដែលអ្នកត្រូវការទិញបោះដុំ ដើម្បីឱ្យកសិករ និងសហគមន៍ដាក់សំណើផ្គត់ផ្គង់
          </p>
        </div>
      </div>

      {/* Main Full-Width Form Card */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-xs">
        {success ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#1B5E20] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              បានបង្កើតតម្រូវការទិញជោគជ័យ!
            </h3>
            <p className="text-base text-gray-500 max-w-md mx-auto">
              សេចក្តីប្រកាសរបស់អ្នកត្រូវបានផ្សព្វផ្សាយទៅកាន់បណ្តាញកសិករទូទាំងប្រទេសកម្ពុជា។
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Row 1: Crop Name & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  ឈ្មោះកសិផលដែលត្រូវការ *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ឧទាហរណ៍៖ ប៉េងប៉ោះស្រស់ធម្មជាតិ, ស្វាយកែវរមៀត..."
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20]"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] cursor-pointer"
                >
                  <option value="vegetables">បន្លែគ្រប់មុខ (Vegetables)</option>
                  <option value="fruits">ផ្លែឈើស្រស់ (Fruits)</option>
                  <option value="grains">ស្រូវ & អង្ករ (Rice & Grains)</option>
                  <option value="tubers">ដំណាំមើម (Tubers & Roots)</option>
                </select>
              </div>
            </div>

            {/* Row 2: Quantity, Unit, Target Price, Delivery Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  បរិមាណត្រូវការ *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="ឧ. 500"
                  value={requiredQty}
                  onChange={(e) => setRequiredQty(e.target.value)}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20]"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  ខ្នាត (Unit)
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] cursor-pointer"
                >
                  <option value="គ.ក (kg)">គ.ក (kg)</option>
                  <option value="តោន (Ton)">តោន (Ton)</option>
                  <option value="ផ្លែ (Pcs)">ផ្លែ (Pcs)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  តម្លៃគោលដៅរំពឹងទុក ($) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.75"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  ទីតាំងទទួលកសិផល
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] cursor-pointer"
                >
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      ខេត្ត/រាជធានី {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Deadline & Contact Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  កាលបរិច្ឆេទផុតកំណត់ទទួលសំណើ (Deadline)
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  លេខទូរស័ព្ទទាក់ទង
                </label>
                <input
                  type="tel"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20]"
                />
              </div>
            </div>

            {/* Row 4: Quality Specifications */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                ការពិពណ៌នាតម្រូវការ & លក្ខខណ្ឌគុណភាព (Quality Specifications)
              </label>
              <textarea
                rows={4}
                placeholder="បញ្ជាក់អំពីទំហំផ្លែ កម្រិតទុំ ឬការវេចខ្ចប់ដែលអ្នកចង់បាន..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] leading-relaxed"
              />
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-end gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="w-full sm:w-auto px-8 py-3.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-base rounded-xl transition-colors cursor-pointer text-center"
              >
                បោះបង់ (Cancel)
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-10 py-3.5 bg-[#1B5E20] hover:bg-[#144717] text-white font-bold text-base rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span>{submitting ? "កំពុងបង្ហោះ..." : "បង្ហោះតម្រូវការទិញ (Publish Demand)"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
