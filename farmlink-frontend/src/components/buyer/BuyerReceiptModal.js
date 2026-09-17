"use client";

import React from "react";
import { X, Printer, Download, CheckCircle2, Sprout, Building2, User } from "lucide-react";

export default function BuyerReceiptModal({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null;

  const invoiceNo = `INV-${order.id || "FL-8492"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 border border-gray-200">
        {/* Modal Top Controls (Hidden on print) */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              បង្កាន់ដៃទូទាត់ផ្លូវការ
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-[#1B5E20] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              បានបញ្ជាក់ & បង់ប្រាក់
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-white text-xs font-bold text-gray-700 transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>បោះពុម្ព</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto print:max-h-none print:p-0">
          {/* Invoice Header */}
          <div className="flex items-start justify-between border-b border-gray-200 pb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#144717] text-white flex items-center justify-center font-bold">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black text-gray-900 leading-tight block">
                  Farm<span className="text-[#1B5E20]">Link</span>
                </span>
                <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase block">
                  B2B Wholesale Marketplace
                </span>
              </div>
            </div>

            <div className="text-right">
              <h2 className="text-lg font-black text-gray-900 tracking-tight uppercase">
                បង្កាន់ដៃ / RECEIPT
              </h2>
              <p className="text-xs font-mono font-bold text-[#1B5E20] mt-0.5">
                {invoiceNo}
              </p>
              <p className="text-[11px] text-gray-500">
                កាលបរិច្ឆេទ ៖ {order.date || "Sep 08, 2026"}
              </p>
            </div>
          </div>

          {/* Seller & Buyer 2-Column Info */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="font-bold text-gray-500 uppercase tracking-wider block text-[10px]">
                កសិករផ្គត់ផ្គង់ (SUPPLIER)
              </span>
              <p className="font-bold text-gray-900 text-sm">{order.farmerName || "ចម្ការតារា (Dara Farm)"}</p>
              <p className="text-gray-600">ខេត្ត ៖ {order.province || "តាកែវ"}</p>
              <p className="text-gray-600">ទូរស័ព្ទ ៖ {order.farmerPhone || "098 474 843"}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="font-bold text-gray-500 uppercase tracking-wider block text-[10px]">
                អ្នកទិញ (BUYER)
              </span>
              <p className="font-bold text-gray-900 text-sm">{order.buyerName || "ភោជនីយដ្ឋាន អង្គរ"}</p>
              <p className="text-gray-600">ទីតាំង ៖ រាជធានីភ្នំពេញ</p>
              <p className="text-gray-600">អាសយដ្ឋាន ៖ {order.address || "ផ្លូវ 271, ស្ទឹងមានជ័យ"}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3">ល.រ</th>
                  <th className="py-2.5 px-3">មុខទំនិញ (Item)</th>
                  <th className="py-2.5 px-3">បរិមាណ (Qty)</th>
                  <th className="py-2.5 px-3">តម្លៃរាយ (Unit)</th>
                  <th className="py-2.5 px-3 text-right">សរុប (Total)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {order.itemsList && order.itemsList.length > 0 ? (
                  order.itemsList.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-3 text-gray-400">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-bold">{item.name}</td>
                      <td className="py-2.5 px-3">{item.quantity}</td>
                      <td className="py-2.5 px-3">${item.unitPrice}/kg</td>
                      <td className="py-2.5 px-3 text-right font-bold">${item.total}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-2.5 px-3 text-gray-400">1</td>
                    <td className="py-2.5 px-3 font-bold">{order.productName || "Fresh tomato"}</td>
                    <td className="py-2.5 px-3">{order.quantity || "50kg"}</td>
                    <td className="py-2.5 px-3">${order.unitPrice || "0.75"}/kg</td>
                    <td className="py-2.5 px-3 text-right font-bold">${order.totalPrice || "34.90"}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="flex justify-end">
            <div className="w-56 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>តម្លៃទំនិញសរុប ៖</span>
                <span className="font-semibold text-gray-900">${order.subtotal || order.totalPrice || "30.00"}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>សេវាដឹកជញ្ជូន ៖</span>
                <span className="font-semibold text-gray-900">${order.deliveryFee || "0.00"}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-bold text-gray-900">
                <span>ទឹកប្រាក់សរុប ៖</span>
                <span className="text-[#1B5E20] text-base">${order.totalPrice || "34.90"}</span>
              </div>
            </div>
          </div>

          {/* Verification Stamp Note */}
          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-center text-[11px] text-[#1B5E20] font-medium">
            ✓ ឯកសារនេះត្រូវបានបង្កើតឡើងដោយប្រព័ន្ធស្វ័យប្រវត្តិនៃ FarmLink Cambodia Marketplace។
          </div>
        </div>
      </div>
    </div>
  );
}
