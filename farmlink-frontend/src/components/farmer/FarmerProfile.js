"use client";

import React, { useState, useRef } from "react";
import {
  User,
  Phone,
  MapPin,
  Building,
  Save,
  Star,
  ShieldCheck,
  CheckCircle2,
  Camera,
  Image as ImageIcon,
  Edit3,
  Calendar,
  Award,
  Sprout,
  Plus,
  Trash2,
  X,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function FarmerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Profile State
  const [profile, setProfile] = useState({
    name: "សុខ សាន",
    farmName: "កសិដ្ឋានបៃតងធម្មជាតិ (Green Nature Farm)",
    role: "កសិករម្ចាស់កសិដ្ឋាន",
    phone: "012 888 999",
    email: "soksan.farm@gmail.com",
    province: "ខេត្តកណ្តាល",
    district: "ស្រុកកណ្តាលស្ទឹង",
    address: "ភូមិព្រែកតាពៅ ឃុំដើមឫស ស្រុកកណ្តាលស្ទឹង ខេត្តកណ្តាល",
    experienceYears: "៨ ឆ្នាំ",
    farmSize: "៥ ហិកតា (5 Hectares)",
    rating: 4.9,
    totalReviews: 48,
    successfulOrders: 124,
    responseRate: "៩៨%",
    responseTime: "១៥ នាទី",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    cover:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
    bio: "កសិដ្ឋានបៃតងធម្មជាតិ មានឯកទេសដាំដុះបន្លែស្លឹក និងបន្លែយកផ្លែតាមស្តង់ដារធម្មជាតិ GAP មិនប្រើប្រាស់គីមីពុល។ យើងខ្ញុំផ្តោតលើសុវត្ថិភាពម្ហូបអាហារ និងការផ្គត់ផ្គង់បន្លែស្រស់ៗប្រចាំថ្ងៃជូនផ្សារទំនើប ភោជនីយដ្ឋាន និងសណ្ឋាគារលំដាប់ខ្ពស់នៅរាជធានីភ្នំពេញ។",
    certifications: [
      "ស្តង់ដារការអនុវត្តកសិកម្មល្អកម្ពុជា (CamGAP)",
      "បន្លែសុវត្ថិភាពធម្មជាតិ (Organic Certified)",
      "វិញ្ញាបនបត្រអនាម័យ និងភូតគាមអនាម័យ (SPS)",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80",
    ],
    reviews: [
      {
        id: 1,
        buyerName: "ភោជនីយដ្ឋាន ទន្លេបាសាក់",
        buyerRole: "ប្រធានចុងភៅ / Chef",
        rating: 5,
        date: "១០ កញ្ញា ២០២៦",
        comment:
          "បន្លែស្រស់ល្អណាស់ គ្មានស្លោក ឬខូចឡើយ។ ដឹកជញ្ជូនមកដល់ទាន់ពេលព្រឹកព្រលឹម សេវាកម្មរហ័សទាន់ចិត្ត និងមានទំនួលខុសត្រូវខ្ពស់!",
      },
      {
        id: 2,
        buyerName: "ផ្សារទំនើប ឡាក់គី (Lucky Supermarket)",
        buyerRole: "ផ្នែកលទ្ធកម្មកណ្តាល",
        rating: 5,
        date: "០៥ កញ្ញា ២០២៦",
        comment:
          "ទំនិញមានគុណភាពតាមស្តង់ដារ GAP ត្រឹមត្រូវ វេចខ្ចប់ប្រអប់ស្អាតបាត។ ខាងយើងខ្ញុំនឹងបន្តកិច្ចសន្យាផ្គត់ផ្គង់យូរអង្វែង។",
      },
      {
        id: 3,
        buyerName: "សណ្ឋាគារ ហ្គាដិនភ្នំពេញ",
        buyerRole: "អ្នកគ្រប់គ្រងផ្ទះបាយ",
        rating: 5,
        date: "២៨ សីហា ២០២៦",
        comment:
          "ម្ទេសដៃនាង និងប៉េងប៉ោះទុំក្រហមស្មើល្អ ភ្ញៀវសរសើរថាបន្លែមានរសជាតិផ្អែមស្រួយបែបធម្មជាតិពិតៗ។",
      },
    ],
  });

  // Edit form state
  const [editForm, setEditForm] = useState({ ...profile });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...editForm });
    setIsEditing(false);
    alert("ព័ត៌មានកសិដ្ឋានត្រូវបានធ្វើបច្ចុប្បន្នភាពដោយជោគជ័យ!");
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditForm((prev) => ({ ...prev, cover: url }));
      setProfile((prev) => ({ ...prev, cover: url }));
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditForm((prev) => ({ ...prev, avatar: url }));
      setProfile((prev) => ({ ...prev, avatar: url }));
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const urls = files.map((f) => URL.createObjectURL(f));
      setEditForm((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...urls],
      }));
      setProfile((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...urls],
      }));
    }
  };

  const handleRemoveGalleryImage = (idx) => {
    const updated = profile.gallery.filter((_, i) => i !== idx);
    setProfile((prev) => ({ ...prev, gallery: updated }));
    setEditForm((prev) => ({ ...prev, gallery: updated }));
  };

  return (
    <div className="space-y-6 w-full font-sans pb-12">
      {/* 1. Breadcrumbs & Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span>គណនី</span>
            <span>&gt;</span>
            <span className="text-gray-800 font-semibold">ព័ត៌មានគណនីកសិករ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 tracking-tight">
            កម្រងព័ត៌មានកសិដ្ឋាន (Farm Profile)
          </h1>
        </div>

        {/* Action: Edit Profile Button */}
        <button
          type="button"
          onClick={() => {
            setEditForm({ ...profile });
            setIsEditing(!isEditing);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B5E20] hover:bg-[#144717] text-white text-sm font-bold rounded-xl cursor-pointer shadow-xs transition-colors self-start sm:self-auto"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? "មើលទម្រង់ Profile" : "កែប្រែព័ត៌មានកសិដ្ឋាន"}</span>
        </button>
      </div>

      {/* Hidden file inputs for photo updates */}
      <input
        type="file"
        ref={coverInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleCoverUpload}
      />
      <input
        type="file"
        ref={avatarInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleAvatarUpload}
      />
      <input
        type="file"
        ref={galleryInputRef}
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleGalleryUpload}
      />

      {/* 2. Main Profile Banner & Identity Header */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs">
        {/* Cover Photo */}
        <div className="relative h-60 sm:h-72 w-full bg-gray-100 overflow-hidden group">
          <img
            src={profile.cover}
            alt="Farm Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Change Cover Button */}
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            className="absolute top-4 right-4 inline-flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors shadow-sm"
          >
            <Camera className="w-4 h-4" />
            <span>ប្តូររូបភាពគម្រប (Cover)</span>
          </button>
        </div>

        {/* Profile Info Bar */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            {/* Avatar */}
            <div className="relative group">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
              />
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-2 right-2 p-2 bg-[#1B5E20] hover:bg-[#144717] text-white rounded-xl shadow-md cursor-pointer transition-transform hover:scale-105"
                title="ប្តូររូបថត Profile"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions / Verified Badge */}
            <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-[#1B5E20] border border-emerald-200 rounded-full text-xs font-bold shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#1B5E20]" />
                <span>កសិករបានផ្ទៀងផ្ទាត់ផ្លូវការ (Verified Seller)</span>
              </span>
            </div>
          </div>

          {/* Farm Name & Basic Info */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  {profile.farmName}
                </h2>
                <p className="text-base text-gray-600 font-semibold mt-0.5">
                  ម្ចាស់កសិដ្ឋាន៖ <span className="text-gray-900">{profile.name}</span> • {profile.role}
                </p>
              </div>

              {/* Star Rating Badge */}
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl self-start sm:self-auto">
                <div className="flex items-center text-amber-500">
                  <Star className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900 leading-none">
                    {profile.rating}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    ({profile.totalReviews} ការវាយតម្លៃ)
                  </span>
                </div>
              </div>
            </div>

            {/* Location & Contact Meta */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-600 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{profile.address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>បទពិសោធន៍ {profile.experienceYears}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Performance Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
            ផ្ទៃដីដាំដុះ
          </span>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{profile.farmSize}</p>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">
            ផ្ទះសំណាញ់ & ចម្ការវាល
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
            ការផ្គត់ផ្គង់ជោគជ័យ
          </span>
          <p className="text-xl sm:text-2xl font-bold text-[#1B5E20]">
            {profile.successfulOrders}+ ដង
          </p>
          <span className="text-xs text-gray-500 mt-1 inline-block">ការបញ្ជាទិញរួចរាល់</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
            អត្រាឆ្លើយតប
          </span>
          <p className="text-xl sm:text-2xl font-bold text-blue-700">{profile.responseRate}</p>
          <span className="text-xs text-gray-500 mt-1 inline-block">
            ក្នុងរយៈពេល {profile.responseTime}
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
            កសិផលសកម្ម
          </span>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">៨ មុខ</p>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">
            កំពុងដាក់លក់លើទីផ្សារ
          </span>
        </div>
      </div>

      {/* 4. Two-Column Layout: About & Standards (Left), Farm Photo Gallery (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: About & Standards */}
        <div className="lg:col-span-2 space-y-6">
          {/* About the Farm */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-[#1B5E20]" />
              <span>អំពីកសិដ្ឋាន</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {profile.bio}
            </p>

            {/* Certifications & Standards */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                វិញ្ញាបនបត្រ និងស្តង់ដារគុណភាព
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {profile.certifications.map((cert, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 border border-emerald-200 text-[#1B5E20] rounded-xl text-xs font-bold shadow-2xs"
                  >
                    <Award className="w-4 h-4 text-[#1B5E20]" />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span>ការវាយតម្លៃ និងមតិយោបល់ពីអ្នកទិញ ({profile.reviews.length})</span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  មតិពិតៗពីភោជនីយដ្ឋាន និងផ្សារទំនើបដែលបានទិញកសិផល
                </p>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {profile.rating}{" "}
                <span className="text-xs text-gray-400 font-normal">/ 5.0</span>
              </span>
            </div>

            <div className="divide-y divide-gray-100 space-y-4">
              {profile.reviews.map((rev) => (
                <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{rev.buyerName}</h4>
                      <p className="text-xs text-gray-500">{rev.buyerRole}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-0.5 text-amber-400 justify-end">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-400 mt-0.5 block">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 bg-gray-50/70 p-3.5 rounded-xl border border-gray-100 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Farm Photo Gallery */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#1B5E20]" />
                <span>កម្រងរូបភាពកសិដ្ឋាន ({profile.gallery.length})</span>
              </h3>
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#1B5E20] hover:text-[#144717] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>បន្ថែមរូបភាព</span>
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 gap-3">
              {profile.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden aspect-square border border-gray-200 shadow-2xs"
                >
                  <img
                    src={imgUrl}
                    alt={`Farm ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {/* Delete button on hover */}
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                    title="លុបរូបភាព"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 text-center pt-2">
              រូបភាពចម្ការជួយបង្កើនទំនុកចិត្តអ្នកទិញបានរហូតដល់ ៨០%
            </p>
          </div>
        </div>
      </div>

      {/* 5. Full Edit Profile Modal / Panel */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 pb-4 flex items-center justify-between border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  កែប្រែព័ត៌មានកសិដ្ឋាន និងគណនី
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  ព័ត៌មានដែលបានកែប្រែនឹងបង្ហាញលើទំព័រ Profile របស់អ្នកទិញ
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProfile} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Farmer Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    ឈ្មោះកសិករ *
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white"
                  />
                </div>

                {/* Farm Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    ឈ្មោះកសិដ្ឋាន / អាជីវកម្ម *
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.farmName}
                    onChange={(e) => setEditForm({ ...editForm, farmName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    លេខទូរស័ព្ទទំនាក់ទំនង *
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white"
                  />
                </div>

                {/* Farm Size */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    ផ្ទៃដីដាំដុះ (ទំហំកសិដ្ឋាន)
                  </label>
                  <input
                    type="text"
                    value={editForm.farmSize}
                    onChange={(e) => setEditForm({ ...editForm, farmSize: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white"
                  />
                </div>

                {/* Full Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    អាសយដ្ឋានកសិដ្ឋានលម្អិត *
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white"
                  />
                </div>

                {/* Bio */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    អំពីកសិដ្ឋាន និងគោលការណ៍ដាំដុះ
                  </label>
                  <textarea
                    rows={4}
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white"
                  />
                </div>
              </div>

              {/* Photo Upload Shortcuts */}
              <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-gray-500" />
                  <span>ប្តូររូបថត Avatar</span>
                </button>
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-gray-500" />
                  <span>ប្តូររូបភាពគម្រប (Cover)</span>
                </button>
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-gray-500" />
                  <span>បន្ថែមរូបភាពចម្ការ (Gallery)</span>
                </button>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1B5E20] hover:bg-[#144717] text-white text-sm font-bold rounded-xl cursor-pointer shadow-xs transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>រក្សាទុកការផ្លាស់ប្តូរ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
