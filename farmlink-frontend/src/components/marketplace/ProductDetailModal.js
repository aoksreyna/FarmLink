"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Heart,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(20);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSuccessOrder, setIsSuccessOrder] = useState(false);

  // Mock data
  const [reviews, setReviews] = useState([
    {
      id: "r-1",
      author: "Lyheng",
      avatar: "L",
      rating: 5,
      date: "14 កញ្ញា 2026",
      verified: true,
      qtyBought: "50 គ.ក",
      comment: "Good service , tomato is delicous and fresh",
      image: null,
    },
    {
      id: "r-2",
      author: "Lyhour",
      avatar: "H",
      rating: 5,
      date: "12 កញ្ញា 2026",
      verified: true,
      qtyBought: "100 គ.ក",
      comment: "Good service , tomato is delicous and fresh",
      image: null,
    },
    {
      id: "r-3",
      author: "Sokha Mean",
      avatar: "S",
      rating: 5,
      date: "10 កញ្ញា 2026",
      verified: true,
      qtyBought: "30 គ.ក",
      comment: "កសិផលស្រស់ល្អ ដឹកជញ្ជូនរហ័សទាន់ចិត្ត វេចខ្ចប់យ៉ាងមានស្តង់ដារ។",
      image:null,
    },
    {
      id: "r-4",
      author: "Vireak Bun",
      avatar: "V",
      rating: 4,
      date: "08 កញ្ញា 2026",
      verified: true,
      qtyBought: "80 គ.ក",
      comment: "គុណភាពល្អណាស់ តម្លៃសមរម្យសម្រាប់អ្នកទិញបោះដុំយកទៅលក់បន្ត។",
      image: null,
    },
  ]);

  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewQty, setReviewQty] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewImage, setReviewImage] = useState(null);
  const [reviewSubmittedToast, setReviewSubmittedToast] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setReviewImage(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen || !product) return null;

  const {
    id,
    name = "Fresh Tomatoes (ប៉េងប៉ោះស្រស់)",
    image = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    price = "0.75",
    wholesalePrice = null,
    unit = "kg",
    rating = 4.8,
    reviewsCount = 128,
    farmerName = "Dara Farm",
    province = "Takeo",
    location = "Takeo province",
    availableQty = "200kg",
    moq = "5kg",
    category = "Vegetable",
    isVerified = true,
    description = "Farm-Fresh tomatos grown naturally without harmful chemicals.",
    phone = "012 345 678",
  } = product;

  // Gallery of 3 images matching Frame 13
  const gallery = [
    image || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546470427-0d4db154ceb7?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=600&auto=format&fit=crop&q=80",
  ];

  const numPrice = parseFloat(price) || 0.75;
  const totalPrice = (numPrice * quantity).toFixed(2);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const handleRequestOrder = () => {
    setIsSuccessOrder(true);
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
    setTimeout(() => {
      setIsSuccessOrder(false);
      onClose();
    }, 1500);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      alert("សូមសរសេរមតិយោបល់របស់អ្នក");
      return;
    }

    const newRev = {
      id: `r-${Date.now()}`,
      author: reviewAuthor.trim() || "អតិថិជនកសិផល (Buyer)",
      avatar: (reviewAuthor.trim() || "B").charAt(0).toUpperCase(),
      rating: userRating,
      date: "ថ្ងៃនេះ (Today)",
      verified: true,
      qtyBought: reviewQty.trim() ? `${reviewQty} ${unit}` : `${quantity} ${unit}`,
      comment: reviewComment,
      image: reviewImage || null,
    };

    setReviews((prev) => [newRev, ...prev]);
    setIsRatingModalOpen(false);
    setReviewComment("");
    setReviewAuthor("");
    setReviewQty("");
    setReviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setReviewSubmittedToast(true);
    setTimeout(() => setReviewSubmittedToast(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl lg:max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
          {/* Top Section: 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 1. Left Column: Carousel & Farmer Card (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Carousel Container */}
              <div className="space-y-3">
                <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
                  <img
                    src={gallery[activeImageIndex]}
                    alt={name}
                    className="w-full h-full object-cover"
                  />

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => setIsLiked(!isLiked)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-500 hover:text-rose-500 transition-colors shadow-sm cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isLiked ? "fill-rose-500 text-rose-500" : "text-gray-600"
                      }`}
                    />
                  </button>

                  {/* Carousel Prev/Next Buttons */}
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center text-gray-700 shadow-md transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center text-gray-700 shadow-md transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* 3 Thumbnails below */}
                <div className="grid grid-cols-3 gap-3">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? "border-[#1B5E20] ring-2 ring-[#1B5E20]/20"
                          : "border-gray-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Right Column: Product Info & Order Card (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Title, In Stock Badge, Rating */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                      {name}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-[#1B5E20]">
                      In stock
                    </span>
                  </div>
                </div>

                {/* Rating - Clean badge without cartoonish emoji */}
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200/80 rounded-lg text-xs font-bold text-amber-900 shrink-0">
                  <span className="text-amber-500 font-bold">★</span>
                  <span>{rating}</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-[#1B5E20]">
                  $ {price}
                </span>
                <span className="text-sm font-semibold text-gray-500">
                  / {unit}
                </span>
              </div>

              {/* Seller / Farm Info Bar with View Profile button */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-200/80">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 text-[#1B5E20] font-bold flex items-center justify-center text-xs shrink-0">
                    {farmerName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-gray-900 text-xs sm:text-sm truncate">{farmerName}</span>
                      {isVerified && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 truncate">{location} · ឆ្លើយតបរហ័ស</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`កម្រងព័ត៌មានកសិដ្ឋាន៖ ${farmerName} (${location})`)}
                  className="px-3.5 py-1.5 rounded-xl border border-gray-300 hover:bg-white text-gray-700 hover:text-gray-900 text-xs font-semibold transition-colors cursor-pointer shadow-2xs shrink-0"
                >
                  View Profile
                </button>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {description}
              </p>

              {/* Product Specifications - Clean, Professional 2-Column Key-Value Grid (NO ICON CLUTTER) */}
              <div className="rounded-2xl border border-gray-200/90 bg-gray-50/70 p-4 space-y-3">
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500 block text-xs font-medium">Category :</span>
                    <span className="font-bold text-gray-900 capitalize">{category}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block text-xs font-medium">Quantity available :</span>
                    <span className="font-bold text-gray-900">{availableQty}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block text-xs font-medium">Minimum order :</span>
                    <span className="font-bold text-gray-900">{moq}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block text-xs font-medium">Unit :</span>
                    <span className="font-bold text-gray-900">{unit}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block text-xs font-medium">Available date :</span>
                    <span className="font-bold text-gray-900">5/9/2026 - 15/9/2026</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block text-xs font-medium">Location :</span>
                    <span className="font-bold text-gray-900">{province}</span>
                  </div>
                </div>

                {/* Delivery details row with subtle divider */}
                <div className="pt-2.5 border-t border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-1">
                  <span className="text-gray-500 font-medium">Delivery option :</span>
                  <div className="text-left sm:text-right">
                    <span className="text-gray-800 font-semibold">delivery available (1.2$)</span>
                    <span className="text-[#1B5E20] font-bold block text-xs">100kg up (Free delivery)</span>
                  </div>
                </div>
              </div>

              {/* Place Order Box - Clean & Professional */}
              <div className="rounded-2xl border border-gray-200 p-4 sm:p-5 bg-white shadow-2xs">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  
                  {/* Left: Quantity selector & Request */}
                  <div className="sm:col-span-7 space-y-3">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Place order</h4>
                      <p className="text-xs text-gray-500">Select quantity ({unit})</p>
                    </div>

                    {/* Stepper */}
                    <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(5, q - 5))}
                        className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer border-r border-gray-300"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        min="5"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(5, parseInt(e.target.value) || 5))}
                        className="w-16 text-center text-sm font-bold text-gray-900 border-none focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 5)}
                        className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer border-l border-gray-300"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quick quantity chips */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {[20, 50, 100, 200].map((qtyVal) => (
                        <button
                          key={qtyVal}
                          type="button"
                          onClick={() => setQuantity(qtyVal)}
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                            quantity === qtyVal
                              ? "bg-[#1B5E20] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {qtyVal}kg
                        </button>
                      ))}
                    </div>

                    {/* Request Order Button - Clean text, no icon */}
                    <button
                      type="button"
                      onClick={handleRequestOrder}
                      className="inline-flex items-center justify-center px-6 py-2.5 bg-[#144717] hover:bg-[#0f3611] text-white text-sm font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Request</span>
                    </button>
                  </div>

                  {/* Right: Total Price & Chat with farmer */}
                  <div className="sm:col-span-5 sm:border-l sm:border-gray-200 sm:pl-5 space-y-3">
                    <div>
                      <span className="text-xs font-semibold text-gray-500 block">Total Price</span>
                      <div className="text-2xl sm:text-3xl font-black text-[#1B5E20] mt-0.5">
                        $ {totalPrice}
                      </div>
                      <span className="text-[11px] text-gray-400 block">excl. delivery fee</span>
                    </div>

                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-[#1B5E20] text-[#1B5E20] hover:bg-emerald-50 text-xs sm:text-sm font-bold transition-colors cursor-pointer w-full text-center"
                    >
                      <span>Chat with farmer</span>
                    </a>
                  </div>

                </div>
              </div>

              {isSuccessOrder && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-[#1B5E20] text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>បានបញ្ជូនសំណើកុម្ម៉ង់ទិញ {quantity} {unit} ទៅកាន់ {farmerName} ដោយជោគជ័យ!</span>
                </div>
              )}
            </div>

          </div>

          {/* Bottom Section: Customer Reviews and Rating */}
          <div className="pt-6 border-t border-gray-200 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Customer reviews and rating ({reviews.length})
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  មតិវាយតម្លៃពិតប្រាកដពីអតិថិជន និងអ្នកទិញបោះដុំ
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsRatingModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#1B5E20] hover:bg-[#144717] text-white text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
              >
                + សរសេរការវាយតម្លៃ (Write Review)
              </button>
            </div>

            {/* Reviews Summary Card */}
            <div className="bg-gray-50/70 border border-gray-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-3xl sm:text-4xl font-black text-gray-900 leading-none">
                    {rating}
                  </div>
                  <div className="text-amber-500 text-sm mt-1">★★★★★</div>
                  <span className="text-xs text-gray-500 mt-0.5 block">{reviews.length} reviews</span>
                </div>
                <div className="hidden sm:block h-12 w-px bg-gray-200" />
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-gray-500 font-medium">5★</span>
                    <div className="w-24 sm:w-36 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[90%]" />
                    </div>
                    <span className="text-gray-500">90%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-gray-500 font-medium">4★</span>
                    <div className="w-24 sm:w-36 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[10%]" />
                    </div>
                    <span className="text-gray-500">10%</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 sm:text-right">
                <p>• <strong>100%</strong> ធានាគុណភាពស្រស់</p>
                <p>• <strong>98%</strong> អតិថិជនពេញចិត្តសេវាកម្ម</p>
              </div>
            </div>

            {/* Toast Notification when Review is submitted */}
            {reviewSubmittedToast && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-[#1B5E20] text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>អរគុណសម្រាប់ការវាយតម្លៃ! មតិរបស់អ្នកត្រូវបានផ្សព្វផ្សាយដោយជោគជ័យ។</span>
              </div>
            )}

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(showAllReviews ? reviews : reviews.slice(0, 2)).map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-2xl border border-gray-200 p-4 bg-white shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 font-bold text-xs shrink-0">
                        {rev.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-gray-900">{rev.author}</span>
                          {rev.verified && (
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400">{rev.date}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-amber-500 text-xs">
                        {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                      </div>
                      {rev.qtyBought && (
                        <span className="text-[11px] text-gray-500 block">
                          {rev.qtyBought}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {rev.image && (
                      <img
                        src={rev.image}
                        alt="Review produce"
                        className="w-18 h-14 rounded-xl object-cover border border-gray-100 shadow-2xs shrink-0"
                      />
                    )}
                    <p className="text-xs text-gray-700 leading-relaxed font-normal">
                      {rev.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* See more reviews button */}
            {reviews.length > 2 && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  {showAllReviews ? "Show less reviews" : `See more reviews (${reviews.length})...`}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Rating & Review Dialog Modal */}
      {isRatingModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h4 className="text-lg font-bold text-gray-900">វាយតម្លៃកសិដ្ឋាន & គុណភាព</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {farmerName} · {name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsRatingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Selector */}
              <div className="space-y-1.5 text-center">
                <label className="block text-xs font-semibold text-gray-600">
                  ជ្រើសរើសពិន្ទុផ្កាយ (Rating Score)
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isFilled = starVal <= (hoverRating || userRating);
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setUserRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 cursor-pointer"
                        aria-label={`Rate ${starVal} stars`}
                      >
                        <span
                          className={`text-3xl select-none ${
                            isFilled ? "text-amber-400" : "text-gray-200"
                          }`}
                        >
                          ★
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs font-bold text-[#1B5E20]">
                  {(hoverRating || userRating) === 5 && "ល្អឥតខ្ចោះ (5/5 · Excellent)"}
                  {(hoverRating || userRating) === 4 && "ល្អខ្លាំង (4/5 · Very Good)"}
                  {(hoverRating || userRating) === 3 && "ល្អបង្គួរ (3/5 · Good)"}
                  {(hoverRating || userRating) === 2 && "ធម្មតា (2/5 · Fair)"}
                  {(hoverRating || userRating) === 1 && "មិនពេញចិត្ត (1/5 · Poor)"}
                </p>
              </div>

              {/* Reviewer Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ឈ្មោះរបស់អ្នក (Your Name) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ឧទាហរណ៍៖ សុខ ហេង, Sokha..."
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-800"
                />
              </div>

              {/* Quantity Purchased */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  បរិមាណដែលបានបញ្ជាទិញ (Quantity Purchased)
                </label>
                <input
                  type="text"
                  placeholder="ឧ. 20 គ.ក ឬ 50 គ.ក..."
                  value={reviewQty}
                  onChange={(e) => setReviewQty(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-800"
                />
              </div>

              {/* Comment Textarea */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  មតិយោបល់របស់អ្នក (Your Review) *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="ចែករំលែកបទពិសោធន៍អំពីគុណភាពកសិផល ការវេចខ្ចប់ និងការដឹកជញ្ជូន..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-800 resize-none leading-relaxed"
                />
              </div>

              {/* Produce Photo Upload for Rating */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  រូបភាពកសិផលជាក់ស្តែង (Produce Photo - Optional)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                {reviewImage ? (
                  <div className="flex items-center gap-3">
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden border-2 border-[#1B5E20] shadow-2xs">
                      <img
                        src={reviewImage}
                        alt="Uploaded review"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setReviewImage(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                        title="លុបរូបភាព"
                      >
                        ✕
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">បានភ្ជាប់រូបភាពកសិផល ១ សន្លឹក</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 px-4 border-2 border-dashed border-gray-300 hover:border-[#1B5E20] hover:bg-emerald-50/40 rounded-xl text-xs font-semibold text-gray-600 hover:text-[#1B5E20] transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5"
                  >
                    <span className="font-bold">+ ជ្រើសរើសរូបភាពកសិផល (Upload Photo)</span>
                    <span className="text-[11px] text-gray-400 font-normal">PNG, JPG, WEBP</span>
                  </button>
                )}
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsRatingModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  បោះបង់ (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#144717] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
                >
                  បញ្ជូនការវាយតម្លៃ (Submit)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
