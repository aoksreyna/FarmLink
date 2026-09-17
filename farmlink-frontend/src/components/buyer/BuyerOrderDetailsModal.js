"use client";

import React from "react";
import { X, MessageSquare, User, Receipt, Ban } from "lucide-react";

export default function BuyerOrderDetailsModal({
  order,
  isOpen,
  onClose,
  onCancelRequest,
  onChat,
  onViewReceipt,
}) {
  if (!isOpen || !order) return null;

  const isConfirmed = order.status === "Confirmed" || order.status === "Completed";
  const isPending = order.status === "Pending";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 border border-gray-200">
        {/* 1. Modal Header */}
        <div className="p-6 pb-4 flex items-start justify-between border-b border-gray-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 tracking-tight">
              <span>Order Details</span>
              <span className="text-[#1B5E20]">#{order.id}</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Placed on : <span className="text-gray-700 font-medium">{order.date || "Sep 08 , 2026 , 10:15 AM"}</span> . Status :{" "}
              <span
                className={`font-bold px-2 py-0.5 rounded text-xs ${
                  order.status === "Pending"
                    ? "text-amber-800 bg-[#FEF9C3]"
                    : order.status === "Confirmed" || order.status === "Completed"
                    ? "text-[#1B5E20] bg-emerald-100"
                    : "text-rose-700 bg-rose-100"
                }`}
              >
                {order.status}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Farmer Information Card */}
          <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-2xs space-y-2.5">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">
              Farmer Information
            </h3>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-gray-900">
                {order.farmerName || "Dara Farm"}
              </span>
            </div>

            <div className="space-y-1 text-xs sm:text-sm text-gray-600 pt-1">
              <p>
                <span className="text-gray-700 font-medium">Phone Number :</span>{" "}
                <span className="text-gray-900">{order.phone || order.farmerPhone || "098474843"}</span>
              </p>
              <p>
                <span className="text-gray-700 font-medium">Location :</span>{" "}
                <span className="text-gray-900">{order.province ? `${order.province} province` : "Takeo province"}</span>
              </p>
              <p className="leading-relaxed">
                <span className="text-gray-700 font-medium">Delivery :</span>{" "}
                <span className="text-gray-900">
                  {order.deliveryAddress
                    ? `Direct delivery to your address (${order.deliveryAddress})`
                    : "Direct delivery to your address (St 271, Steung Mean Chey , Phnom Penh)"}
                </span>
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">
              Order Items
            </h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-gray-200/80 text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3 sm:px-4">Product</th>
                    <th className="py-2.5 px-3 sm:px-4">Unit Price</th>
                    <th className="py-2.5 px-3 sm:px-4">Quantity</th>
                    <th className="py-2.5 px-3 sm:px-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                  {order.itemsList && order.itemsList.length > 0 ? (
                    order.itemsList.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3 px-3 sm:px-4 flex items-center gap-2.5">
                          <img
                            src={item.image || order.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
                          />
                          <span className="font-bold text-gray-900 text-xs sm:text-sm">
                            {item.name}
                          </span>
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-gray-600 font-medium">
                          ${item.unitPrice}/kg
                        </td>
                        <td className="py-3 px-3 sm:px-4 font-semibold text-gray-800">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-right font-bold text-gray-900">
                          ${item.total}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-3 sm:px-4 flex items-center gap-2.5">
                        <img
                          src={order.image || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=120&auto=format&fit=crop&q=80"}
                          alt={order.cropName || order.productName}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
                        />
                        <span className="font-bold text-gray-900 text-xs sm:text-sm">
                          {order.cropName || order.productName || "Fresh tomato"}
                        </span>
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-gray-600 font-medium">
                        ${order.unitPrice || "0.75"}/kg
                      </td>
                      <td className="py-3 px-3 sm:px-4 font-semibold text-gray-800">
                        {order.quantity || "50kg"}
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-right font-bold text-gray-900">
                        ${order.totalPrice || "34.90"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2-Column: My note to Farmer & Payment Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="border border-gray-200 rounded-xl p-3.5 bg-white">
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5">
                My note to Farmer
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                {order.buyerNote || "Fresh tomatoes"}
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-3.5 space-y-1.5 text-xs sm:text-sm bg-white">
              <h4 className="font-bold text-gray-900 mb-1.5">Payment Summary</h4>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-gray-900">${order.subtotal || "30"}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee:</span>
                <span className="font-semibold text-gray-900">${order.deliveryFee || "0"}</span>
              </div>
              <div className="border-t border-gray-200 pt-1.5 flex justify-between font-bold text-gray-900">
                <span>Total amount :</span>
                <span className="text-gray-900 font-bold text-sm sm:text-base">
                  ${order.totalPrice || "30"}
                </span>
              </div>
            </div>
          </div>

          {/* If Confirmed, show notice that order cannot be cancelled */}
          {isConfirmed && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-[#1B5E20] font-medium flex items-center gap-2">
              <Receipt className="w-4 h-4 shrink-0" />
              <span>កសិករបានបញ្ជាក់ការកុម្ម៉ង់នេះរួចរាល់ហើយ។ អ្នកអាចមើល ឬទាញយកបង្កាន់ដៃទូទាត់បាន។</span>
            </div>
          )}
        </div>

        {/* 3. Modal Footer Buttons */}
        <div className="p-4 sm:p-5 bg-white border-t border-gray-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onChat}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-[#1B5E20] text-[#1B5E20] hover:bg-emerald-50 text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with farmer</span>
          </button>

          {/* Conditional Action: If Pending -> Cancel Request; If Confirmed -> View Receipt */}
          {isPending ? (
            <button
              type="button"
              onClick={onCancelRequest}
              className="flex-1 inline-flex items-center justify-center py-2.5 px-4 bg-red-100 hover:bg-red-200 text-red-600 text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer"
            >
              Cancel Request
            </button>
          ) : isConfirmed ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onViewReceipt) onViewReceipt(order);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#144717] hover:bg-[#1B5E20] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <Receipt className="w-4 h-4" />
              <span>View Receipt</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
