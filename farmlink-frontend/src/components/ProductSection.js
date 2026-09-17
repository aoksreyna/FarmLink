"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, PackageOpen } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./marketplace/ProductDetailModal";

export default function ProductSection({ products = [] }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-white py-14 sm:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#1B5E20] text-xs font-bold mb-2">
              <span>🌾 កសិផលស្រស់ប្រមូលផលថ្មីៗ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              កសិផលផ្ទាល់ពីចម្ការ & សហគមន៍ (រាយ និង បោះដុំ)
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              បញ្ជាទិញបានចាប់ពី ១ គ.ក ឡើងទៅ ជាមួយតម្លៃសមរម្យ និងបញ្ចុះតម្លៃពិសេសសម្រាប់ការទិញដុំរាប់រយគីឡូ។
            </p>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold border border-[#1B5E20] text-[#1B5E20] hover:bg-emerald-50 transition-colors shrink-0 self-start sm:self-auto"
          >
            មើលកសិផលទាំងអស់ <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Grid or Clean Empty State */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                wholesalePrice={product.wholesalePrice}
                unit={product.unit}
                rating={product.rating}
                farmerName={product.farmerName}
                communityName={product.communityName}
                location={product.location}
                availableQty={product.availableQty}
                isVerified={product.isVerified}
                standard={product.standard || "ស្តង់ដារ GAP"}
                moq={product.moq || "ចាប់ពី ១ គ.ក (រាយ/ដុំ)"}
                onViewDetail={() => handleViewDetail(product)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50/70 border border-gray-200 rounded-2xl p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 text-[#1B5E20] mx-auto flex items-center justify-center mb-3.5 shadow-2xs">
              <PackageOpen className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="text-base font-bold text-gray-900">
              No produce listed yet
            </h3>
            <p className="mt-1 text-xs text-gray-500 font-medium leading-relaxed">
              New harvests will appear here once farmers list their agricultural products.
            </p>
          </div>
        )}

      </div>

      {/* Frame 13 Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
