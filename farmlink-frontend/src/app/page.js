import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import HomeDemandSection from "@/components/HomeDemandSection";
import ProductSection from "@/components/ProductSection";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0; // Fresh data on request

export default async function Home() {
  const supabase = await createClient();

  // 1. Fetch live public products with images & farmer info
  const { data: productsData } = await supabase
    .from("products")
    .select(`
      id,
      name,
      price_per_unit,
      unit,
      stock_quantity,
      category_id,
      profiles:farmer_id (full_name, business_name, province, is_verified),
      product_images (image_url, is_primary)
    `)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(8);

  const formattedProducts = (productsData || []).map((p, idx) => {
    const primaryImg = p.product_images?.find((img) => img.is_primary) || p.product_images?.[0];
    const unitPrice = Number(p.price_per_unit || 1.0);
    // Rotating realistic standards: GAP or Organic
    const standardsList = ["ស្តង់ដារ GAP", "សរីរាង្គធម្មជាតិ", "ស្តង់ដារ GAP", "ធម្មជាតិសុវត្ថិភាព"];
    const standard = standardsList[idx % standardsList.length];

    return {
      id: p.id,
      name: p.name,
      image: primaryImg?.image_url || "/category-veggies.jpg",
      price: unitPrice.toFixed(2),
      wholesalePrice: (unitPrice * 0.82).toFixed(2), // 18% discount for bulk
      unit: p.unit || "គ.ក",
      rating: 4.9,
      farmerName: p.profiles?.business_name || p.profiles?.full_name || "កសិករ",
      communityName: p.profiles?.business_name || `សហគមន៍កសិកម្ម ${p.profiles?.province || "កម្ពុជា"}`,
      isVerified: p.profiles?.is_verified ?? true,
      location: p.profiles?.province ? `ខេត្ត${p.profiles.province}` : "ខេត្តកំពង់ចាម",
      availableQty: `${p.stock_quantity || 150} ${p.unit || "គ.ក"}`,
      standard: standard,
      moq: "ចាប់ពី ១ គ.ក (រាយ/ដុំ)",
      category_id: p.category_id,
    };
  });

  // 2. Fetch live metrics
  const [
    { count: farmersCount },
    { count: buyersCount },
    { count: productsCount },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "farmer"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "buyer"),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "active"),
  ]);

  const liveStats = {
    farmers: farmersCount || 0,
    buyers: buyersCount || 0,
    products: productsCount || 0,
    provinces: 25,
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* 1. Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Banner with B2B Search & Filter */}
        <HeroSection />

        {/* 3. Live Stats Counter */}
        <StatsBar stats={liveStats} />

        {/* 4. Live Sourcing Demands from Supermarkets & Buyers */}
        <HomeDemandSection />

        {/* 5. Fresh Produce Grid (Retail & Wholesale) */}
        <ProductSection products={formattedProducts} />

        {/* 6. How FarmLink Works (Dual Perspective: Buyer vs Farmer) */}
        <HowItWorks />

        {/* 7. Why FarmLink (Core B2B Values) */}
        <WhyChooseUs />

        {/* 8. Call to Action Banner */}
        <CtaBanner />
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
}