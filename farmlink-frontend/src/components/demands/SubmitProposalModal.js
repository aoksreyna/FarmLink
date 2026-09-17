"use client";

import React, { useState } from "react";
import { X, Send, Building2, MapPin, Package, DollarSign, Calendar, Phone, CheckCircle2 } from "lucide-react";

export default function SubmitProposalModal({
  isOpen,
  onClose,
  demand,
  onSubmitSuccess,
}) {
  const [offerPrice, setOfferPrice] = useState("");
  const [supplyQty, setSupplyQty] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [farmerPhone, setFarmerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !demand) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        if (onSubmitSuccess) onSubmitSuccess();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-emerald-50/50">
          <div>
            <span className="text-[11px] font-bold text-[#1B5E20] uppercase tracking-wide block">
              ដាក់សំណើរផ្គត់ផ្គង់កសិផល
            </span>
            <h3 className="text-base font-black text-gray-900 leading-tight">
              {demand.cropName} ({demand.requiredQty} {demand.unit})
            </h3>
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

        {/* Demand Quick Summary Box */}
        <div className="px-5 pt-4 pb-1">
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">អ្នកទិញ / ក្រុមហ៊ុន ៖</span>
              <strong className="text-gray-900 flex items-center gap-1">
                {demand.buyerName}
                {demand.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />}
              </strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">តម្លៃគោលដៅរបស់អ្នកទិញ ៖</span>
              <strong className="text-[#1B5E20] text-sm">${demand.targetPrice} / {demand.unit}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">ទីតាំងទទួលកសិផល ៖</span>
              <span className="text-gray-700">{demand.location}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        {isSuccess ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#1B5E20] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-gray-900">បានបញ្ជូនសំណើរជោគជ័យ!</h4>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              សំណើរផ្គត់ផ្គង់របស់អ្នកត្រូវបានផ្ញើទៅកាន់ {demand.buyerName} រួចរាល់។
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Supply Quantity */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  បរិមាណផ្គត់ផ្គង់ ({demand.unit})*
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder={`ឧ. ${demand.requiredQty}`}
                  value={supplyQty}
                  onChange={(e) => setSupplyQty(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] bg-white"
                />
              </div>

              {/* Offer Price */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  តម្លៃផ្តល់ជូន ($/{demand.unit})*
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder={`ឧ. ${demand.targetPrice}`}
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Ready / Harvest Date */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  កាលបរិច្ឆេទប្រមូលផល*
                </label>
                <input
                  type="date"
                  required
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] bg-white text-gray-700"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  លេខទូរស័ព្ទ / Telegram*
                </label>
                <input
                  type="tel"
                  required
                  placeholder="012 345 678"
                  value={farmerPhone}
                  onChange={(e) => setFarmerPhone(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] bg-white"
                />
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ព័ត៌មានបន្ថែមអំពីចម្ការ (ស្រេចចិត្ត)
              </label>
              <textarea
                rows={2}
                placeholder="ឧ. កសិផលប្រមូលផលថ្មីៗ អាចដឹកជញ្ជូនដល់ទីតាំងផ្ទាល់..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "កំពុងបញ្ជូន..." : "បញ្ជូនសំណើរផ្គត់ផ្គង់"}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
