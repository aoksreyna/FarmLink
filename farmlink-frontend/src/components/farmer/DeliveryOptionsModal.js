"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function DeliveryOptionsModal({
  isOpen,
  onClose,
  initialData = {
    pickupOnly: false,
    directDelivery: true,
    baseFee: "1.20",
    freeThreshold: "100",
  },
  onSave,
}) {
  const [pickupOnly, setPickupOnly] = useState(initialData.pickupOnly);
  const [directDelivery, setDirectDelivery] = useState(initialData.directDelivery);
  const [baseFee, setBaseFee] = useState(initialData.baseFee || "1.20");
  const [freeThreshold, setFreeThreshold] = useState(initialData.freeThreshold || "100");

  useEffect(() => {
    if (isOpen) {
      setPickupOnly(initialData.pickupOnly);
      setDirectDelivery(initialData.directDelivery);
      setBaseFee(initialData.baseFee || "1.20");
      setFreeThreshold(initialData.freeThreshold || "100");
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      pickupOnly,
      directDelivery,
      baseFee: parseFloat(baseFee) || 0,
      freeThreshold: parseFloat(freeThreshold) || 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-gray-200 p-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header matching Frame 31 */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-gray-900">
            Delivery Options
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkbox Options */}
        <div className="space-y-4">
          
          {/* 1. Pickup only */}
          <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={pickupOnly}
              onChange={(e) => setPickupOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#1B5E20] focus:ring-[#1B5E20]"
            />
            <span>Pickup only</span>
          </label>

          {/* 2. Direct delivery */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={directDelivery}
                onChange={(e) => setDirectDelivery(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#1B5E20] focus:ring-[#1B5E20]"
              />
              <span>Direct delivery</span>
            </label>

            {/* Inputs shown when Direct delivery is enabled */}
            {directDelivery && (
              <div className="grid grid-cols-2 gap-3 mt-3 pl-7">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Base Fee ($)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={baseFee}
                      onChange={(e) => setBaseFee(e.target.value)}
                      placeholder="1.20"
                      className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 truncate" title="Free Delivery threshold (kg)">
                    Free threshold (kg)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={freeThreshold}
                      onChange={(e) => setFreeThreshold(e.target.value)}
                      placeholder="100"
                      className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Buttons matching Frame 31 */}
        <div className="grid grid-cols-2 gap-3 mt-6 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-gray-400 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#144919] text-white font-bold text-sm transition-colors shadow-xs"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
