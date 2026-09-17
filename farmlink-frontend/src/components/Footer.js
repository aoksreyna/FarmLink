import React from "react";
import Link from "next/link";
import { Sprout } from "lucide-react";

// Social SVG Icons
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1B5E20] text-gray-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Columns Grid matching Figma */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
          
          {/* Column 1: FarmLink Logo & Social */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-[#1B5E20] flex items-center justify-center font-bold shadow-xs">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                FarmLink
              </span>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed max-w-xs">
              តភ្ជាប់កសិករខ្មែរផ្ទាល់ជាមួយអាជីវកម្ម ដើម្បីអនាគតកសិកម្មកាន់តែរីកចម្រើន។
            </p>
            
            {/* Social Icons (Facebook, YouTube, Instagram, LinkedIn) */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                title="Facebook"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                title="YouTube"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                title="Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">តំណភ្ជាប់រហ័ស</h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <Link href="/marketplace" className="hover:text-white transition-colors">
                  ផ្សារកសិផល
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  អំពីយើង
                </Link>
              </li>
              <li>
                <Link href="/farmer" className="hover:text-white transition-colors">
                  តម្រូវការទីផ្សារ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  ទំនាក់ទំនង
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">សេវាគាំទ្រ</h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  មជ្ឈមណ្ឌលជំនួយ
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-emerald-300 font-semibold">
                  ច្រកចូលរដ្ឋបាល (Admin Portal)
                </Link>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  លក្ខខណ្ឌប្រើប្រាស់
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  គោលការណ៍ឯកជនភាព
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Box */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">ព្រឹត្តិបត្រព័ត៌មានកសិកម្ម</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="អ៊ីមែលរបស់អ្នក"
                className="bg-black/25 text-white placeholder-emerald-200/50 text-xs px-3.5 py-2.5 rounded-lg border border-white/20 focus:outline-hidden focus:border-white flex-1"
              />
              <button
                type="button"
                className="bg-[#2E7D32] hover:bg-[#256628] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                ចុះឈ្មោះ
              </button>
            </div>
          </div>

        </div>


      </div>
    </footer>
  );
}