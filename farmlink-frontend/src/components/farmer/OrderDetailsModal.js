"use client";

import React from "react";
import { X, MessageSquare, User } from "lucide-react";

export default function OrderDetailsModal({
  order,
  isOpen,
  onClose,
  onAccept,
  onReject,
  onChat,
}) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 border border-gray-200">
        
        {/* 1. Modal Header */}
        <div className="p-6 pb-4 flex items-start justify-between border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 tracking-tight">
              <span>Order Details</span>
              <span className="text-[#1B5E20]">#{order.id}</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Placed on : <span className="text-gray-700 font-medium">{order.date} , 10:15 AM</span> . Status :{" "}
              <span className="font-bold text-amber-800 bg-[#FEF9C3] border border-amber-200 px-2.5 py-0.5 rounded-md text-xs">
                {order.status}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 2. Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Buyer Information Card */}
          <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Buyer Information
            </h3>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#1B5E20] flex items-center justify-center font-bold text-base shadow-2xs">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-bold text-gray-900">
                  {order.buyerName}
                </span>{" "}
                <span className="text-sm text-gray-500 font-normal">
                  (Restaurant Buyer)
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-sm text-gray-600 pt-1 border-t border-gray-100">
              <p>
                <span className="font-semibold text-gray-800">Phone Number :</span>{" "}
                {order.phone}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Delivery Address :</span>{" "}
                {order.address}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Delivery Type :</span>{" "}
                {order.deliveryType}
              </p>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Order Items
            </h3>
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Unit Price</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                  {order.itemsList?.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0"
                        />
                        <span className="font-bold text-gray-900 text-sm">
                          {item.name}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 font-medium">
                        ${item.unitPrice}/kg
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-gray-800">
                        {item.quantity}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-gray-900 text-base">
                        ${item.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2-Column: Buyer Note & Payment Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/70">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Buyer Note</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {order.buyerNote || "Fresh tomatoes"}
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 space-y-2 text-sm bg-white shadow-2xs">
              <h4 className="font-bold text-gray-900 mb-2">Payment Summary</h4>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-gray-900">${order.subtotal || "30.00"}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee:</span>
                <span className="font-semibold text-gray-900">${order.deliveryFee || "0.00"}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-base text-gray-900">
                <span>Total amount :</span>
                <span className="text-[#1B5E20] text-lg">${order.totalPrice || "30.00"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Modal Footer Buttons */}
        <div className="p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onChat}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-[#1B5E20] text-[#1B5E20] hover:bg-emerald-50 text-sm font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with buyer</span>
          </button>

          <div className="w-full sm:w-auto flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onReject}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-600 text-sm font-bold rounded-xl transition-colors cursor-pointer"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={onAccept}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-[#1B5E20] hover:bg-[#144717] text-white text-sm font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Accept request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
