"use client";

import React, { useState } from "react";
import {
  FileText,
  DollarSign,
  Eye,
  CheckCircle2,
  Calendar,
  Sprout,
  ArrowRight,
  ArrowLeft,
  Receipt,
  Phone,
  MapPin,
  Package,
} from "lucide-react";
import BuyerReceiptModal from "./BuyerReceiptModal";

// Spending breakdown by farm
export const FARM_SPENDING_BREAKDOWN = [
  {
    id: "FARM-1",
    name: "ចម្ការតារា (Dara Farm)",
    farmerName: "Dara Farm",
    province: "តាកែវ",
    specialty: "ប៉េងប៉ោះស្រស់, ម្ទេសដៃនាង, ពងមាន់",
    orderCount: 12,
    totalSpent: "450.00",
    percentage: 37,
    phone: "098 474 843",
    color: "bg-emerald-500",
    invoices: [
      {
        invoiceId: "INV-FL-8492",
        id: "FL-8492",
        farmerName: "ចម្ការតារា (Dara Farm)",
        province: "តាកែវ",
        farmerPhone: "098 474 843",
        date: "08 កញ្ញា 2026",
        productName: "Fresh tomato (ប៉េងប៉ោះស្រស់)",
        quantity: "50kg",
        totalPrice: "34.90",
        subtotal: "30.00",
        deliveryFee: "4.90",
        status: "Confirmed",
        paymentStatus: "បានទូទាត់ (Paid)",
      },
      {
        invoiceId: "INV-FL-8491",
        id: "FL-8491",
        farmerName: "ចម្ការតារា (Dara Farm)",
        province: "តាកែវ",
        farmerPhone: "098 474 843",
        date: "08 កញ្ញា 2026",
        productName: "Fresh tomato (ប៉េងប៉ោះស្រស់)",
        quantity: "50kg",
        totalPrice: "34.90",
        subtotal: "34.90",
        deliveryFee: "0.00",
        status: "Confirmed",
        paymentStatus: "បានទូទាត់ (Paid)",
      },
      {
        invoiceId: "INV-FL-8490",
        id: "FL-8490",
        farmerName: "ចម្ការតារា (Dara Farm)",
        province: "តាកែវ",
        farmerPhone: "098 474 843",
        date: "07 កញ្ញា 2026",
        productName: "Fresh banana (ចេកណាំវ៉ា)",
        quantity: "50kg",
        totalPrice: "34.90",
        subtotal: "30.00",
        deliveryFee: "4.90",
        status: "Confirmed",
        paymentStatus: "បានទូទាត់ (Paid)",
      },
    ],
  },
  {
    id: "FARM-2",
    name: "ចម្ការភ្នំខ្ពស់ (Phnom Khpos)",
    farmerName: "ចម្ការភ្នំខ្ពស់",
    province: "បាត់ដំបង",
    specialty: "ស្វាយកែវរមៀត, ល្ហុងផ្អែម",
    orderCount: 8,
    totalSpent: "320.00",
    percentage: 27,
    phone: "088 765 4321",
    color: "bg-blue-500",
    invoices: [
      {
        invoiceId: "INV-FL-8472",
        id: "FL-8472",
        farmerName: "ចម្ការភ្នំខ្ពស់",
        province: "បាត់ដំបង",
        farmerPhone: "088 765 4321",
        date: "01 កញ្ញា 2026",
        productName: "ស្វាយកែវរមៀតស្រស់",
        quantity: "500kg",
        totalPrice: "225.00",
        subtotal: "225.00",
        deliveryFee: "0.00",
        status: "Confirmed",
        paymentStatus: "បានទូទាត់ (Paid)",
      },
      {
        invoiceId: "INV-FL-8468",
        id: "FL-8468",
        farmerName: "ចម្ការភ្នំខ្ពស់",
        province: "បាត់ដំបង",
        farmerPhone: "088 765 4321",
        date: "25 សីហា 2026",
        productName: "ល្ហុងផ្អែមធម្មជាតិ",
        quantity: "150kg",
        totalPrice: "95.00",
        subtotal: "95.00",
        deliveryFee: "0.00",
        status: "Confirmed",
        paymentStatus: "បានទូទាត់ (Paid)",
      },
    ],
  },
  {
    id: "FARM-3",
    name: "រោងម៉ាស៊ីនស្រូវបាត់ដំបង",
    farmerName: "រោងម៉ាស៊ីនស្រូវបាត់ដំបង",
    province: "បាត់ដំបង",
    specialty: "អង្ករផ្ការំដួល, ស្រូវសែនក្រអូប",
    orderCount: 4,
    totalSpent: "280.00",
    percentage: 23,
    phone: "017 889 900",
    color: "bg-amber-500",
    invoices: [
      {
        invoiceId: "INV-FL-8480",
        id: "FL-8480",
        farmerName: "រោងម៉ាស៊ីនស្រូវបាត់ដំបង",
        province: "បាត់ដំបង",
        farmerPhone: "017 889 900",
        date: "05 កញ្ញា 2026",
        productName: "អង្ករផ្ការំដួលកម្រិត១",
        quantity: "200kg",
        totalPrice: "180.00",
        subtotal: "180.00",
        deliveryFee: "0.00",
        status: "Confirmed",
        paymentStatus: "បានទូទាត់ (Paid)",
      },
      {
        invoiceId: "INV-FL-8460",
        id: "FL-8460",
        farmerName: "រោងម៉ាស៊ីនស្រូវបាត់ដំបង",
        province: "បាត់ដំបង",
        farmerPhone: "017 889 900",
        date: "20 សីហា 2026",
        productName: "អង្ករសែនក្រអូប",
        quantity: "100kg",
        totalPrice: "100.00",
        subtotal: "100.00",
        deliveryFee: "0.00",
        status: "Confirmed",
        paymentStatus: "បានទូទាត់ (Paid)",
      },
    ],
  },
  {
    id: "FARM-4",
    name: "ចម្ការបៃតងកណ្តាល",
    farmerName: "ចម្ការបៃតងកណ្តាល",
    province: "កណ្តាល",
    specialty: "ត្រសក់ស្រួយ, ស្ពៃក្តោប",
    orderCount: 3,
    totalSpent: "150.89",
    percentage: 13,
    phone: "010 445 566",
    color: "bg-purple-500",
    invoices: [
      {
        invoiceId: "INV-FL-8465",
        id: "FL-8465",
        farmerName: "ចម្ការបៃតងកណ្តាល",
        province: "កណ្តាល",
        farmerPhone: "010 445 566",
        date: "28 សីហា 2026",
        productName: "ត្រសក់ស្រួយធម្មជាតិ",
        quantity: "150kg",
        totalPrice: "60.00",
        subtotal: "60.00",
        deliveryFee: "0.00",
        status: "Confirmed",
        paymentStatus: "បានទូទាត់ (Paid)",
      },
      {
        invoiceId: "INV-FL-8455",
        id: "FL-8455",
        farmerName: "ចម្ការបៃតងកណ្តាល",
        province: "កណ្តាល",
        farmerPhone: "010 445 566",
        date: "15 សីហា 2026",
        productName: "ស្ពៃក្តោបធម្មជាតិ",
        quantity: "100kg",
        totalPrice: "90.89",
        subtotal: "90.89",
        deliveryFee: "0.00",
        status: "Confirmed",
        paymentStatus: "បានទូទាត់ (Paid)",
      },
    ],
  },
];

export default function BuyerInvoicesTab() {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const handleOpenReceipt = (invoice) => {
    setSelectedReceipt(invoice);
    setIsReceiptOpen(true);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* View 1: Main Overview - Spending by Farm */}
      {!selectedFarm ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                វិក្កយបត្រ & ចំណាយតាមចម្ការ (Expenditures by Farm)
              </h1>
              <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">
                ជ្រើសរើសចម្ការណាមួយ ដើម្បីពិនិត្យមើលបញ្ជីវិក្កយបត្រ និងទាញយកបង្កាន់ដៃទូទាត់
              </p>
            </div>

            <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl shadow-2xs self-start sm:self-auto">
              <span className="text-xs text-gray-500 block uppercase tracking-wider font-semibold">
                ចំណាយលទ្ធកម្មសរុប
              </span>
              <span className="text-2xl font-black text-[#1B5E20]">
                $1,200.89
              </span>
            </div>
          </div>

          {/* Farm Spending Cards - Full Width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FARM_SPENDING_BREAKDOWN.map((farm) => (
              <div
                key={farm.id}
                onClick={() => setSelectedFarm(farm)}
                className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs hover:border-[#1B5E20] hover:shadow-md transition-all cursor-pointer space-y-4 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#1B5E20] flex items-center justify-center font-bold text-base shadow-2xs group-hover:scale-105 transition-transform">
                      <Sprout className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#1B5E20] transition-colors">
                        {farm.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                        <span>ខេត្ត{farm.province}</span>
                        <span>•</span>
                        <span>{farm.phone}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#1B5E20] border border-emerald-200">
                    {farm.percentage}% នៃថវិកា
                  </span>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 flex items-center justify-between">
                  <span>កសិផលផ្គត់ផ្គង់ ៖</span>
                  <span className="font-bold text-gray-900">{farm.specialty}</span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${farm.color}`}
                      style={{ width: `${farm.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-500 block">ចំណាយសរុប ({farm.orderCount} វិក្កយបត្រ)</span>
                    <span className="text-xl font-bold text-gray-900">${farm.totalSpent}</span>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#144717] group-hover:bg-[#1B5E20] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>មើលបង្កាន់ដៃ ({farm.invoices.length})</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* View 2: Selected Farm's Invoices & Receipts Table */
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Back Button & Farm Banner */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSelectedFarm(null)}
              className="p-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              title="ត្រឡប់ទៅបញ្ជីចម្ការទាំងអស់វិញ"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>វិក្កយបត្រ</span>
                <span>&gt;</span>
                <span className="text-gray-800 font-bold">{selectedFarm.name}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-0.5">
                វិក្កយបត្រពី {selectedFarm.name}
              </h1>
            </div>
          </div>

          {/* Farm Detail Strip */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#1B5E20] flex items-center justify-center font-bold">
                <Sprout className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{selectedFarm.name}</h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  ខេត្ត ៖ {selectedFarm.province} • ទូរស័ព្ទ ៖ {selectedFarm.phone}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  មុខកសិផល ៖ {selectedFarm.specialty}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
              <span className="text-xs text-gray-500 block uppercase tracking-wider font-medium">
                ទឹកប្រាក់បានទូទាត់សរុប
              </span>
              <span className="text-2xl font-black text-[#1B5E20]">
                ${selectedFarm.totalSpent}
              </span>
              <span className="text-xs text-gray-400 block mt-0.5">
                {selectedFarm.invoices.length} វិក្កយបត្រ / បង្កាន់ដៃ
              </span>
            </div>
          </div>

          {/* Receipts Table for Selected Farm */}
          <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#144717] text-white font-semibold">
                  <tr>
                    <th className="py-4 px-4 sm:px-6">Invoice No</th>
                    <th className="py-4 px-4 sm:px-6">Order ID</th>
                    <th className="py-4 px-4 sm:px-6">កសិផល & បរិមាណ</th>
                    <th className="py-4 px-4 sm:px-6">ទឹកប្រាក់សរុប</th>
                    <th className="py-4 px-4 sm:px-6">កាលបរិច្ឆេទ</th>
                    <th className="py-4 px-4 sm:px-6">ស្ថានភាព</th>
                    <th className="py-4 px-4 sm:px-6 text-right">បង្កាន់ដៃ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-800">
                  {selectedFarm.invoices.map((inv) => (
                    <tr key={inv.invoiceId} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-mono font-bold text-[#1B5E20]">
                        {inv.invoiceId}
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-mono font-semibold text-gray-700">
                        #{inv.id}
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <p className="font-bold text-gray-900 text-xs sm:text-sm">{inv.productName}</p>
                        <p className="text-xs text-gray-500">{inv.quantity}</p>
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-bold text-gray-900 text-sm sm:text-base">
                        ${inv.totalPrice}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                        {inv.date}
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-[#1B5E20]">
                          <CheckCircle2 className="w-3 h-3" />
                          {inv.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenReceipt(inv)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#144717] hover:bg-[#1B5E20] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Official Receipt Modal */}
      <BuyerReceiptModal
        order={selectedReceipt}
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
      />
    </div>
  );
}
