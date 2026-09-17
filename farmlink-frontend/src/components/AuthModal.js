"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Sprout,
} from "lucide-react";
import { signUpUser, signInUser } from "@/lib/auth";

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
  initialRole = "farmer",
}) {
  const [mode, setMode] = useState(initialMode); // "login" | "register"
  const [role, setRole] = useState(initialRole); // "farmer" | "buyer"

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      if (initialRole) setRole(initialRole);
      setErrorMessage("");
      setSuccessMessage("");
    }
  }, [isOpen, initialMode, initialRole]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (mode === "register") {
      if (password !== confirmPassword) {
        setErrorMessage("ពាក្យសម្ងាត់ទាំងពីរមិនផ្ទៀងផ្ទាត់ត្រូវគ្នាទេ!");
        return;
      }
      if (password.length < 6) {
        setErrorMessage("ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងតិច ៦ តួអក្សរ។");
        return;
      }

      setLoading(true);
      try {
        const res = await signUpUser({
          email,
          password,
          role,
          fullName,
          phone,
        });

        if (!res.success) {
          setErrorMessage(res.error || "មិនអាចបង្កើតគណនីបានទេ។ សូមព្យាយាមម្តងទៀត។");
        } else {
          setSuccessMessage("បង្កើតគណនីជោគជ័យ! កំពុងដំណើរការ...");
          setTimeout(() => {
            onClose();
            window.location.href = role === "farmer" ? "/farmer" : "/marketplace";
          }, 600);
        }
      } catch {
        setErrorMessage("បញ្ហាតភ្ជាប់បណ្តាញ។ សូមព្យាយាមម្តងទៀត។");
      } finally {
        setLoading(false);
      }
    } else {
      // Login
      setLoading(true);
      try {
        const res = await signInUser({ email, password });
        if (!res.success) {
          setErrorMessage(res.error || "អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។");
        } else {
          setSuccessMessage("ចូលគណនីជោគជ័យ! កំពុងបញ្ជូនបន្ត...");
          setTimeout(() => {
            onClose();
            if (res.profile?.role === "farmer") {
              window.location.href = "/farmer";
            } else {
              window.location.href = "/marketplace";
            }
          }, 500);
        }
      } catch {
        setErrorMessage("បញ្ហាតភ្ជាប់បណ្តាញ។ សូមព្យាយាមម្តងទៀត។");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1e293b]/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-[440px] bg-[#eef2f6] rounded-3xl shadow-2xl p-7 sm:p-9 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
          aria-label="បិទ"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Centered Circular Logo Emblem */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center shadow-xs">
            <Sprout className="w-8 h-8 text-[#1B5E20]" />
          </div>
        </div>

        {/* Centered Title */}
        <h2 className="text-center text-lg sm:text-xl font-black text-slate-900 mb-6 tracking-tight">
          {mode === "login" ? "ចូលទៅក្នុងគណនីរបស់អ្នក" : "បង្កើតគណនីថ្មីរបស់អ្នក"}
        </h2>

        {/* Error / Success Feedback Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[#1B5E20] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* ================= REGISTER-ONLY: Role Selector ================= */}
          {mode === "register" && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                ជ្រើសរើសតួនាទី<span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setRole("farmer")}
                  className={`py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                    role === "farmer"
                      ? "border-[#1B5E20] bg-white ring-2 ring-[#1B5E20] font-bold text-[#1B5E20]"
                      : "border-slate-300 bg-white/70 text-slate-700 hover:bg-white"
                  }`}
                >
                  <span className="text-sm">🌾 កសិករ</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  className={`py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                    role === "buyer"
                      ? "border-[#1B5E20] bg-white ring-2 ring-[#1B5E20] font-bold text-[#1B5E20]"
                      : "border-slate-300 bg-white/70 text-slate-700 hover:bg-white"
                  }`}
                >
                  <span className="text-sm">🛒 អ្នកទិញដុំ</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= REGISTER-ONLY: Full Name ================= */}
          {mode === "register" && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                ឈ្មោះពេញ<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ឈ្មោះ និងគោត្តនាម"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] transition-all placeholder-slate-400 text-slate-900"
              />
            </div>
          )}

          {/* ================= BOTH: Email Address ================= */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              អាសយដ្ឋានអ៊ីមែល<span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aoksreyna60@gmail.com"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] transition-all placeholder-slate-400 text-slate-900"
            />
          </div>

          {/* ================= REGISTER-ONLY: Phone Number ================= */}
          {mode === "register" && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                លេខទូរស័ព្ទ (ស្រេចចិត្ត)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="012 345 678"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] transition-all placeholder-slate-400 text-slate-900"
              />
            </div>
          )}

          {/* ================= BOTH: Password ================= */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              ពាក្យសម្ងាត់<span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 pr-11 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] transition-all placeholder-slate-400 text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-50 border-l border-slate-300 rounded-r-xl cursor-pointer"
                aria-label="បង្ហាញពាក្យសម្ងាត់"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* ================= REGISTER-ONLY: Confirm Password ================= */}
          {mode === "register" && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                បញ្ជាក់ពាក្យសម្ងាត់<span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 pr-11 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] transition-all placeholder-slate-400 text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-50 border-l border-slate-300 rounded-r-xl cursor-pointer"
                  aria-label="បង្ហាញពាក្យសម្ងាត់"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* ================= LOGIN-ONLY: Remember Me Checkbox ================= */}
          {mode === "login" && (
            <div className="flex items-center gap-2 pt-1">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded-sm border-slate-300 text-[#1B5E20] focus:ring-[#1B5E20] cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-xs text-slate-700 select-none cursor-pointer font-medium">
                ចងចាំក្នុងប្រព័ន្ធនេះ
              </label>
            </div>
          )}

          {/* Submit Button (Dark rounded button as in reference) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#1e293b] hover:bg-[#0f172a] text-white flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-60"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>
                {loading
                  ? "កំពុងដំណើរការ..."
                  : mode === "login"
                  ? "ចុះឈ្មោះចូល"
                  : "ចុះឈ្មោះបង្កើតគណនី"}
              </span>
            </button>
          </div>
        </form>

        {/* Footer Toggle text */}
        <div className="mt-5 text-center text-xs text-slate-600">
          {mode === "login" ? (
            <>
              មិនទាន់មានគណនីមែនទេ?{" "}
              <button
                type="button"
                onClick={() => { setMode("register"); setErrorMessage(""); }}
                className="font-bold text-[#1B5E20] hover:underline cursor-pointer"
              >
                ចុះឈ្មោះនៅទីនេះ
              </button>
            </>
          ) : (
            <>
              មានគណនីរួចហើយមែនទេ?{" "}
              <button
                type="button"
                onClick={() => { setMode("login"); setErrorMessage(""); }}
                className="font-bold text-[#1B5E20] hover:underline cursor-pointer"
              >
                ចុះឈ្មោះចូល
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}