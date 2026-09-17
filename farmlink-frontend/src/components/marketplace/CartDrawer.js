"use client";

import React from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";

export default function CartDrawer({
  isOpen,
  onClose,
  items = [],
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.quantity >= 50 && item.wholesalePrice
      ? parseFloat(item.wholesalePrice)
      : parseFloat(item.price);
    return sum + unitPrice * item.quantity;
  }, 0);

  const totalWeight = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1B5E20] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">កន្ត្រកបញ្ជាទិញ</h2>
              <span className="text-xs text-gray-500">
                {items.length} មុខទំនិញ · សរុប {totalWeight} គ.ក
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
            aria-label="បិទ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {items.length > 0 ? (
            items.map((item) => {
              const isWholesale = item.quantity >= 50 && item.wholesalePrice;
              const activePrice = isWholesale ? parseFloat(item.wholesalePrice) : parseFloat(item.price);
              const lineTotal = activePrice * item.quantity;

              return (
                <div
                  key={item.id}
                  className="p-3 bg-gray-50/80 rounded-2xl border border-gray-200/80 flex gap-3 items-center"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200">
                    <Image
                      src={item.image || "/category-veggies.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                        title="លុបចេញ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-gray-500 mb-2">
                      <span>{item.farmerName || "កសិករ"}</span>
                      {isWholesale && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded bg-emerald-100 text-[#1B5E20] font-bold text-[10px]">
                          តម្លៃដុំ
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Qty +/- */}
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - (item.quantity > 50 ? 10 : 5)))}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-800">
                          {item.quantity} {item.unit || "គ.ក"}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, item.quantity + (item.quantity >= 50 ? 10 : 5))}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm font-black text-gray-900">
                        ${lineTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-gray-800">កន្ត្រករបស់អ្នកនៅទទេ</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-[200px]">
                សូមជ្រើសរើសកសិផលដែលអ្នកត្រូវការពីផ្សារកសិផល។
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/50 space-y-3">
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>តម្លៃទំនិញសរុប</span>
                <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>ថ្លៃដឹកជញ្ជូន</span>
                <span className="font-bold text-emerald-700">គិតតាមចម្ងាយជាក់ស្តែង</span>
              </div>
              <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-200">
                <span>ទឹកប្រាក់សរុប</span>
                <span className="text-[#1B5E20] text-base">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                alert(`សូមអរគុណ! ការកុម្ម៉ង់ទម្ងន់ ${totalWeight} គ.ក តម្លៃសរុប $${subtotal.toFixed(2)} ត្រូវបានបញ្ជូនទៅកសិករ។ យើងនឹងទាក់ទងមកអ្នកដើម្បីបញ្ជាក់ការដឹកជញ្ជូន។`);
                onClearCart && onClearCart();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-[#1B5E20] hover:bg-[#154a19] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>បន្តទៅបញ្ជាក់ការបញ្ជាទិញ</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>ការទូទាត់មានសុវត្ថិភាព និងទំនុកចិត្តខ្ពស់</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
