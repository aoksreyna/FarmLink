import React from "react";
import { Wheat, Search, Handshake } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "ភ្ជាប់ផ្ទាល់គ្មានឈ្មួញកណ្តាល",
      description: "កសិករលក់បានថ្លៃសមរម្យ ចំណែកអ្នកទិញដុំទទួលបានកសិផលស្រស់ថ្មីក្នុងតម្លៃដើមផ្ទាល់ពីចម្ការ។",
      icon: <Wheat className="w-8 h-8 text-[#1B5E20] stroke-[2.2]" />,
    },
    {
      title: "តម្លៃតម្លាភាព & កិច្ចសន្យាពិត",
      description: "តាមដានតម្លៃទីផ្សារជាក់ស្តែង ចរចា និងធ្វើកិច្ចសន្យាផ្គត់ផ្គង់កសិកម្មប្រកបដោយទំនុកចិត្ត និងស្របច្បាប់។",
      icon: <Search className="w-8 h-8 text-[#1B5E20] stroke-[2.2]" />,
    },
    {
      title: "ធានាស្តង់ដារ GAP & សុវត្ថិភាព",
      description: "កសិផលទាំងអស់មានប្រភពច្បាស់លាស់ ឆ្លងកាត់ការត្រួតពិនិត្យគុណភាព និងដឹកជញ្ជូនទាន់ពេលវេលា។",
      icon: <Handshake className="w-8 h-8 text-[#1B5E20] stroke-[2.2]" />,
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            ហេតុអ្វីគួរជ្រើសរើស FarmLink?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 leading-relaxed">
            យើងបង្កើតឡើងដើម្បីពង្រឹងខ្សែច្រវាក់តម្លៃកសិកម្មកម្ពុជា ផ្តល់ផលប្រយោជន៍ស្មើភាពគ្នាទាំងកសិករ និងអាជីវកម្ម។
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="group bg-gray-50/60 rounded-3xl border border-gray-200/80 p-8 flex flex-col items-center text-center shadow-xs hover:shadow-xl hover:bg-white hover:border-[#1B5E20]/30 transition-all duration-300"
            >
              {/* Icon Container with glowing aura */}
              <div className="w-18 h-18 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-100/70 transition-all duration-300 shadow-2xs">
                {item.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-base sm:text-lg font-black text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
