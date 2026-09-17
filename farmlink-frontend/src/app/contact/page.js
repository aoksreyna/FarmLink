"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapPin,
  Phone,
  Send,
  Clock,
  SendHorizonal,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

function TelegramIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    userType: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      question: "តើ FarmLink ជួយភ្ជាប់អ្នកទិញជាមួយកសិករខ្មែរដោយរបៀបណា?",
      answer:
        "FarmLink ផ្តល់ជូននូវទីផ្សារឌីជីថលផ្ទាល់ និងមានតម្លាភាព ដែលកសិករខ្មែរមានការបញ្ជាក់ត្រឹមត្រូវអាចចុះបញ្ជីកសិផលប្រមូលផលថ្មីៗជាក់ស្តែង។ អ្នកទិញបោះដុំ (ដូចជា ភោជនីយដ្ឋាន ផ្សារទំនើប និងសណ្ឋាគារ) អាចបញ្ជាទិញផ្ទាល់ដោយគ្មានឈ្មួញកណ្តាលកាត់ថ្លៃ ធានាបានចំណូលខ្ពស់ដល់កសិករ និងកសិផលស្រស់បំផុតដល់អ្នកទិញ។",
    },
    {
      question: "តើ FarmLink មានការត្រួតពិនិត្យគុណភាព និងការដឹកជញ្ជូនបែបណា?",
      answer:
        "កសិផលស្រស់ទាំងអស់ត្រូវបានត្រួតពិនិត្យ និងចាត់ថ្នាក់គុណភាពនៅតាមឃ្លាំងប្រមូលផ្តុំកសិផលក្នុងខេត្តគោលដៅ (ដូចជា បាត់ដំបង កណ្តាល និងកំពត)។ យើងសហការជាមួយសេវាដឹកជញ្ជូនត្រជាក់ ដើម្បីរក្សាភាពស្រស់របស់បន្លែ និងផ្លែឈើឱ្យនៅល្អឥតខ្ចោះរហូតដល់កន្លែងទទួលរបស់អ្នក។",
    },
    {
      question: "តើកសិករទទួលបានការទូទាត់ប្រាក់យ៉ាងដូចម្តេច?",
      answer:
        "កសិករទទួលបានប្រាក់ទូទាត់ឆាប់រហ័ស និងមានសុវត្ថិភាពតាមរយៈប្រព័ន្ធធនាគារឌីជីថល (បាគង, ធនាគារ ABA, វីង) ភ្លាមៗបន្ទាប់ពីទំនិញត្រូវបានត្រួតពិនិត្យ និងប្រគល់ជូនដោយជោគជ័យ ដោយគ្មានការកាត់កងមិនសមរម្យឡើយ។",
    },
    {
      question: "តើអាជីវកម្មអាចបង្ហោះតម្រូវការទិញជាប្រចាំ ឬធ្វើកិច្ចសន្យាបានទេ?",
      answer:
        "ពិតជាបាន! អាជីវកម្មអាចបង្ហោះតម្រូវការទិញទុកជាមុនលើប្រព័ន្ធ 'តម្រូវការទីផ្សារ' របស់យើង ដែលអនុញ្ញាតឱ្យសហគមន៍កសិកម្មរៀបចំផែនការដាំដុះ និងប្រមូលផលស្របតាមកាលវិភាគ និងបរិមាណជាក់ស្តែងរបស់អ្នក។",
    },
    {
      question: "តើខ្ញុំអាចចុះឈ្មោះជាកសិករដៃគូ ឬសហគមន៍កសិកម្មដោយរបៀបណា?",
      answer:
        "លោកអ្នកគ្រាន់តែចុចលើប៊ូតុង 'ចុះឈ្មោះ' នៅផ្នែកខាងលើ រួចជ្រើសរើសតួនាទីជា 'កសិករ' និងបំពេញព័ត៌មានកសិដ្ឋានរបស់អ្នក។ ក្រុមការងារសម្របសម្រួលកសិកម្មរបស់យើងនឹងចុះផ្ទៀងផ្ទាត់ និងជួយសម្រួលដល់ការដាក់លក់កសិផលដំបូងរបស់អ្នក។",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate swift submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        userType: "",
        subject: "",
        message: "",
      });
    }, 800);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Header Section */}
        <section className="pt-12 pb-14 sm:pt-16 sm:pb-20 bg-gradient-to-b from-[#edf8ee]/80 via-[#f4faf5]/40 to-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
              ទំនាក់ទំនងមកកាន់ <span className="text-[#1B5E20]">FarmLink</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              មានចម្ងល់ ត្រូវការជំនួយ ឬចង់សហការផ្គត់ផ្គង់ជាមួយកសិករខ្មែរ?<br className="hidden sm:inline" />
              {" "}ក្រុមការងារយើងខ្ញុំរីករាយស្វាគមន៍ និងបម្រើសេវាកម្មជូនជានិច្ច។
            </p>
          </div>
        </section>

        {/* 3. Main Contact Columns Section */}
        <section className="pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Left Column: Contact Information Cards */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Office Address & Map Card */}
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-5 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-[#1B5E20] mb-4">
                    ព័ត៌មានទំនាក់ទំនង
                  </h2>

                  {/* Address line */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1B5E20] flex items-center justify-center shrink-0 border border-emerald-100">
                      <MapPin className="w-5 h-5 text-[#1B5E20]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">អាសយដ្ឋានការិយាល័យ</h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        ផ្លូវ ២៧១, សង្កាត់ស្ទឹងមានជ័យ, រាជធានីភ្នំពេញ
                      </p>
                    </div>
                  </div>

                  {/* Map Preview */}
                  <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-gray-200 group">
                    <Image
                      src="/contact-map.jpg"
                      alt="ផែនទីទីតាំងការិយាល័យភ្នំពេញ"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <a
                      href="https://maps.google.com/?q=Steung+Meanchey+Phnom+Penh+Cambodia"
                      target="_blank"
                      rel="noreferrer"
                      className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[#1B5E20] hover:bg-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs border border-gray-200 flex items-center gap-1.5 transition-colors"
                    >
                      <span>បើកផែនទី</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Direct Phone & Telegram Support (2 mini cards) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Direct Phone */}
                  <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-4 flex items-center gap-3 hover:border-emerald-200 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1B5E20] flex items-center justify-center shrink-0 border border-emerald-100">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">លេខទូរស័ព្ទផ្ទាល់</span>
                      <a
                        href="tel:0123456789"
                        className="text-xs text-gray-600 hover:text-[#1B5E20] font-medium transition-colors"
                      >
                        012 345 6789
                      </a>
                    </div>
                  </div>

                  {/* Telegram Support */}
                  <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-4 flex items-center gap-3 hover:border-emerald-200 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center shrink-0 border border-sky-100">
                      <TelegramIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">តេឡេក្រាមជំនួយ</span>
                      <a
                        href="https://t.me/farmlinkSupport"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-gray-600 hover:text-sky-600 font-medium transition-colors"
                      >
                        @farmlinkSupport
                      </a>
                    </div>
                  </div>
                </div>

                {/* Operating Hours Card */}
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-4 flex items-center gap-3 hover:border-emerald-200 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1B5E20] flex items-center justify-center shrink-0 border border-emerald-100">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">ម៉ោងបំពេញការងារ</span>
                    <p className="text-xs text-gray-600">
                      ច័ន្ទ - សៅរ៍, ៨:០០ ព្រឹក - ៥:០០ ល្ងាច{" "}
                      <span className="text-red-500 font-semibold">(សម្រាកថ្ងៃអាទិត្យ)</span>
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Send us a message form */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-[#1B5E20] mb-6">
                    ផ្ញើសារមកកាន់យើងខ្ញុំ
                  </h2>

                  {isSuccess && (
                    <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-[#1B5E20] text-xs sm:text-sm animate-in fade-in duration-200">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>
                        សូមអរគុណ! សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ។ ក្រុមការងារយើងនឹងឆ្លើយតបត្រឡប់មកវិញក្នុងពេលឆាប់ៗនេះ។
                      </span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Full Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5">
                          ឈ្មោះពេញ
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="ឧ. អោក ស្រីណា"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5">
                          អាសយដ្ឋានអ៊ីមែល
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="aoksreyna@gmail.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all bg-white"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone number & User Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5">
                          លេខទូរស័ព្ទ
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="093 763 526"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1.5">
                          ប្រភេទអ្នកប្រើប្រាស់
                        </label>
                        <select
                          name="userType"
                          value={formData.userType}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all bg-white cursor-pointer"
                        >
                          <option value="">ជ្រើសរើសតួនាទីរបស់អ្នក...</option>
                          <option value="buyer">អ្នកទិញបោះដុំ / ភោជនីយដ្ឋាន</option>
                          <option value="farmer">កសិករ / សហគមន៍កសិកម្ម</option>
                          <option value="distributor">អ្នកដឹកជញ្ជូន / ចែកចាយ</option>
                          <option value="general">ដៃគូសហការ / ការសាកសួរទូទៅ</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Subject */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5">
                        ប្រធានបទ
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="សាកសួរអំពីការបញ្ជាទិញកសិផលដុំ ឬកិច្ចសន្យាផ្គត់ផ្គង់..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all bg-white"
                      />
                    </div>

                    {/* Row 4: Message */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5">
                        សាររបស់អ្នក
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="សរសេរសារលម្អិតរបស់អ្នកនៅទីនេះ..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all bg-white resize-y"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 rounded-xl text-sm font-bold bg-[#1B5E20] hover:bg-[#154a19] text-white flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-70"
                      >
                        <span>{isSubmitting ? "កំពុងផ្ញើ..." : "ផ្ញើសារឥឡូវនេះ"}</span>
                        <SendHorizonal className="w-4 h-4" />
                      </button>
                    </div>
                  </form>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Frequently Asked Questions Section */}
        <section className="py-16 sm:py-20 bg-gray-50/70 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* FAQ Heading matching mockup */}
            <div className="mb-10 text-left sm:text-center">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">
                សំណួរដែលសួរញឹកញាប់ (FAQ)
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                ចម្លើយរហ័សចំពោះចម្ងល់ទូទៅអំពីការទិញ ការលក់ និងការចាប់ដៃគូជាមួយ FarmLink Cambodia។
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-3.5">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-bold text-gray-900">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? "transform rotate-180 text-[#1B5E20]" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs sm:text-[13px] text-gray-600 leading-relaxed border-t border-gray-100/60 bg-emerald-50/20">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
