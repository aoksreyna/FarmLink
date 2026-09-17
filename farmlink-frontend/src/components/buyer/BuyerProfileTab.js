"use client";

import React, { useState, useRef } from "react";
import {
  User,
  Building2,
  MapPin,
  Phone,
  Mail,
  Save,
  CheckCircle2,
  Edit3,
  X,
  ShieldCheck,
  Package,
  DollarSign,
  TrendingUp,
  Camera,
  Image as ImageIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function BuyerProfileTab() {
  const { profile: userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // Profile State
  const [profile, setProfile] = useState({
    companyName: userProfile?.business_name || "ភោជនីយដ្ឋាន អង្គរ (Angkor Hotel & Restaurant)",
    contactName: userProfile?.full_name || "អោក ស្រីណា",
    role: "ប្រធានផ្នែកលទ្ធកម្ម (Procurement Manager)",
    businessType: "ភោជនីយដ្ឋាន & បដិសណ្ឋារកិច្ច (Restaurant & Hospitality)",
    phone: userProfile?.phone || "098 474 843",
    email: userProfile?.email || "angkor.procurement@hotel.com.kh",
    province: "រាជធានីភ្នំពេញ",
    address: "ផ្លូវលេខ 271, សង្កាត់ស្ទឹងមានជ័យ, រាជធានីភ្នំពេញ (St 271, Steung Mean Chey, Phnom Penh)",
    bio: "ភោជនីយដ្ឋាន អង្គរ គឺជាសណ្ឋាគារ និងភោជនីយដ្ឋានបម្រើសេវាកម្មម្ហូបអាហារខ្មែរ និងអន្តរជាតិ។ យើងខ្ញុំស្វែងរកការផ្គត់ផ្គង់បន្លែ ផ្លែឈើ និងសាច់ស្រស់ៗផ្ទាល់ពីកសិករខ្មែរជារៀងរាល់សប្តាហ៍ ដើម្បីធានាគុណភាពខ្ពស់ និងតម្លៃសមរម្យ។",
    avatar:null,
    cover:null,
  });

  // Edit form state
  const [editForm, setEditForm] = useState({ ...profile });

  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditForm((prev) => ({ ...prev, cover: url }));
      setProfile((prev) => ({ ...prev, cover: url }));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditForm((prev) => ({ ...prev, avatar: url }));
      setProfile((prev) => ({ ...prev, avatar: url }));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile({ ...editForm });
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCancel = () => {
    setEditForm({ ...profile });
    setIsEditing(false);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Hidden file inputs for cover and avatar updates */}
      <input
        type="file"
        ref={coverInputRef}
        accept="image/*"
        onChange={handleCoverUpload}
        className="hidden"
      />
      <input
        type="file"
        ref={avatarInputRef}
        accept="image/*"
        onChange={handleAvatarUpload}
        className="hidden"
      />

      {/* 1. Header & Edit Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            ព័ត៌មានគណនី (Buyer Profile)
          </h1>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => {
              setEditForm({ ...profile });
              setIsEditing(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#144717] text-white text-sm font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Edit3 className="w-4 h-4" />
            <span>កែសម្រួលព័ត៌មាន (Edit Profile)</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm font-bold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <X className="w-4 h-4" />
            <span>បោះបង់ (Cancel)</span>
          </button>
        )}
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-[#1B5E20] text-sm font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>ព័ត៌មានគណនី និងរូបភាពត្រូវបានកែប្រែដោយជោគជ័យ!</span>
        </div>
      )}

      {/* 2. Profile View (Read-Only Mode) - Full Width like FarmerProfile */}
      {!isEditing ? (
        <div className="w-full space-y-6">
          {/* Cover & Avatar Card */}
          <div className="w-full bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
            {/* Cover Image with Change Button */}
            <div className="h-48 sm:h-64 w-full relative bg-gray-200 group">
              <img
                src={profile.cover}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Change Cover Button */}
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="absolute top-4 right-4 inline-flex items-center gap-2 px-3.5 py-2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-semibold rounded-xl cursor-pointer transition-all shadow-md hover:scale-105"
                title="ប្តូររូបភាពគម្រប (Change Cover)"
              >
                <Camera className="w-4 h-4" />
                <span>ប្តូររូបភាពគម្រប (Cover)</span>
              </button>
            </div>

            {/* Profile Info Strip - Clean spacing with no overlapping */}
            <div className="p-6 sm:p-8 pt-0 relative bg-white">
              {/* Avatar row with badge on the right */}
              <div className="flex items-end justify-between -mt-14 sm:-mt-18 mb-4">
                <div className="relative group shrink-0">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-white bg-white shadow-md">
                    <img
                      src={profile.avatar}
                      alt={profile.contactName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Change Avatar Button */}
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute bottom-1 right-1 p-2.5 bg-[#1B5E20] hover:bg-[#144717] text-white rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-110 border-2 border-white"
                    title="ប្តូររូបថត Profile (Change Avatar)"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 self-end">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-100 text-[#1B5E20] border border-emerald-200 shadow-2xs">
                    <ShieldCheck className="w-4 h-4" />
                    Verified Buyer
                  </span>
                </div>
              </div>

              {/* Company Name & Role completely on white background */}
              <div className="space-y-1 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  {profile.companyName}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 font-semibold">
                  ឈ្មោះ​​ ៖ <span className="text-gray-900">{profile.contactName}</span> • {profile.role}
                </p>
                <span className="inline-block mt-2 px-3.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium">
                  {profile.businessType}
                </span>
              </div>

              {/* Stat Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#1B5E20] flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">សំណើបញ្ជាទិញសរុប</p>
                    <p className="text-xl font-bold text-gray-900 mt-0.5">15 ការកុម្ម៉ង់</p>
                  </div>
                </div>

                <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">តម្រូវការទិញកំពុងប្រកាស</p>
                    <p className="text-xl font-bold text-gray-900 mt-0.5">3 សេចក្តីប្រកាស</p>
                  </div>
                </div>

                <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">ចំណាយកសិផលសរុប</p>
                    <p className="text-xl font-bold text-[#1B5E20] mt-0.5">$1,200.89</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Info Cards - Full Width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-3">
                <User className="w-4 h-4 text-[#1B5E20]" />
                <span>ព័ត៌មានទំនាក់ទំនង (Contact Information)</span>
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="text-gray-500">អ្នកតំណាង ៖</span>
                  <span className="font-semibold text-gray-900">{profile.contactName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">តួនាទី ៖</span>
                  <span className="font-semibold text-gray-900">{profile.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ទូរស័ព្ទ ៖</span>
                  <span className="font-semibold text-gray-900">{profile.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">អ៊ីមែល ៖</span>
                  <span className="font-semibold text-gray-900">{profile.email}</span>
                </div>
              </div>
            </div>

            {/* Delivery Location */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-3">
                <MapPin className="w-4 h-4 text-[#1B5E20]" />
                <span>ទីតាំងទទួលកសិផល (Delivery Location)</span>
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="text-gray-500">រាជធានី/ខេត្ត ៖</span>
                  <span className="font-semibold text-gray-900">{profile.province}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">អាសយដ្ឋានដឹកជញ្ជូន ៖</span>
                  <span className="font-semibold text-gray-900 leading-relaxed block">
                    {profile.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Bio / Procurement note */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-3">
                <Building2 className="w-4 h-4 text-[#1B5E20]" />
                <span>អំពីស្ថាប័ន & តម្រូវការកសិផល (Company Bio)</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {profile.bio}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* 3. Profile Edit*/
        <form onSubmit={handleSave} className="w-full bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 space-y-6 shadow-2xs animate-in fade-in">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold text-gray-900">
              កែសម្រួលទិន្នន័យគណនី (Edit Profile)
            </h2>
            <span className="text-sm text-gray-500">
              ធ្វើបច្ចុប្បន្នភាពព័ត៌មានអាជីវកម្ម រូបភាព និងអាសយដ្ឋានទទួលទំនិញ
            </span>
          </div>

          {/* Visual Avatar & Cover Upload Section in Edit Form */}
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#1B5E20]" />
              <span>រូបភាពគម្រប និងរូបថតគណនី (Cover & Profile Picture)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Cover Preview & Change */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-600 block">
                  រូបភាពគម្រប (Cover Background)
                </span>
                <div className="relative h-32 w-full rounded-xl overflow-hidden border border-gray-200 group bg-gray-100">
                  <img
                    src={editForm.cover}
                    alt="Cover Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center gap-2 text-white text-xs font-bold cursor-pointer"
                  >
                    <div className="px-3.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-xs flex items-center gap-1.5 transition-all">
                      <Camera className="w-4 h-4" />
                      <span>ប្តូររូបភាពគម្រប</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Avatar Preview & Change */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-600 block">
                  រូបថតគណនី (Profile Picture)
                </span>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm shrink-0 bg-gray-100">
                    <img
                      src={editForm.avatar}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
                    >
                      <Camera className="w-4 h-4 text-[#1B5E20]" />
                      <span>ប្តូររូបថត Profile</span>
                    </button>
                    <p className="text-[11px] text-gray-400">
                      គាំទ្រទម្រង់ JPG, PNG ឬ WebP (ទំហំសមរម្យ)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                ឈ្មោះក្រុមហ៊ុន / អាជីវកម្ម *
              </label>
              <input
                type="text"
                required
                value={editForm.companyName}
                onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                className="w-full text-base px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1B5E20] bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                ឈ្មោះអ្នកតំណាងលទ្ធកម្ម *
              </label>
              <input
                type="text"
                required
                value={editForm.contactName}
                onChange={(e) => setEditForm({ ...editForm, contactName: e.target.value })}
                className="w-full text-base px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1B5E20] bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                ប្រភេទអាជីវកម្ម
              </label>
              <input
                type="text"
                value={editForm.businessType}
                onChange={(e) => setEditForm({ ...editForm, businessType: e.target.value })}
                className="w-full text-base px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1B5E20] bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                លេខទូរស័ព្ទទាក់ទង *
              </label>
              <input
                type="tel"
                required
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full text-base px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1B5E20] bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                អ៊ីមែល *
              </label>
              <input
                type="email"
                required
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full text-base px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1B5E20] bg-white font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                អាសយដ្ឋានដឹកជញ្ជូនទទួលកសិផល (Delivery Address) *
              </label>
              <textarea
                rows={3}
                required
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                className="w-full text-base px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1B5E20] bg-white font-medium leading-relaxed"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                ការពិពណ៌នាអំពីស្ថាប័ន & តម្រូវការកសិផល (Bio)
              </label>
              <textarea
                rows={4}
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="w-full text-base px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1B5E20] bg-white font-medium leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-sm transition-colors cursor-pointer"
            >
              បោះបង់ (Cancel)
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#1B5E20] hover:bg-[#144717] text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>រក្សាទុកព័ត៌មាន (Save)</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
