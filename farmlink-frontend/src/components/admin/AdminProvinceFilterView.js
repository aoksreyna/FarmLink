"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

export const PROVINCES_LIST = [
  { id: "all", nameKh: "គ្រប់ខេត្ត-ក្រុង (All Provinces)", farmers: 248, buyers: 135 },
  { id: "បាត់ដំបង", nameKh: "ខេត្តបាត់ដំបង", farmers: 68, buyers: 24 },
  { id: "ភ្នំពេញ", nameKh: "រាជធានីភ្នំពេញ", farmers: 12, buyers: 65 },
  { id: "កណ្តាល", nameKh: "ខេត្តកណ្តាល", farmers: 45, buyers: 38 },
  { id: "កំពង់ស្ពឺ", nameKh: "ខេត្តកំពង់ស្ពឺ", farmers: 34, buyers: 15 },
  { id: "សៀមរាប", nameKh: "ខេត្តសៀមរាប", farmers: 28, buyers: 18 },
  { id: "តាកែវ", nameKh: "ខេត្តតាកែវ", farmers: 26, buyers: 12 },
  { id: "កំពត", nameKh: "ខេត្តកំពត", farmers: 18, buyers: 9 },
  { id: "ពោធិ៍សាត់", nameKh: "ខេត្តពោធិ៍សាត់", farmers: 17, buyers: 6 },
];

export default function AdminProvinceFilterView({
  users = [],
  onInspectUser,
  onQuickVerify,
}) {
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all"); // 'all' | 'farmer' | 'buyer'
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((u) => {
    const matchesProvince =
      selectedProvince === "all" || u.province === selectedProvince;

    const matchesRole =
      roleFilter === "all" || u.type === roleFilter;

    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery);

    return matchesProvince && matchesRole && matchesSearch;
  });

  const currentProvStats =
    PROVINCES_LIST.find((p) => p.id === selectedProvince) || PROVINCES_LIST[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* 1. Header with Province Dropdown */}
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            តម្រងមើលតាមខេត្ត (Province Directory)
          </h3>
          <p className="text-xs text-slate-500">
            ពិនិត្យកសិករ ឬអ្នកទិញក្នុងតំបន់នីមួយៗ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-600">ខេត្ត៖</label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#1B5E20] cursor-pointer"
          >
            {PROVINCES_LIST.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nameKh} ({p.farmers} កសិករ / {p.buyers} អ្នកទិញ)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Secondary Filter Bar: Role Switch + Search */}
      <div className="p-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-lg self-start sm:self-auto text-xs">
          <button
            type="button"
            onClick={() => setRoleFilter("all")}
            className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
              roleFilter === "all"
                ? "bg-white text-slate-900 font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ទាំងអស់ ({filteredUsers.length})
          </button>
          <button
            type="button"
            onClick={() => setRoleFilter("farmer")}
            className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
              roleFilter === "farmer"
                ? "bg-[#1B5E20] text-white font-semibold shadow-xs"
                : "text-slate-700 hover:text-slate-950"
            }`}
          >
            កសិករ ({currentProvStats.farmers})
          </button>
          <button
            type="button"
            onClick={() => setRoleFilter("buyer")}
            className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
              roleFilter === "buyer"
                ? "bg-slate-800 text-white font-semibold shadow-xs"
                : "text-slate-700 hover:text-slate-950"
            }`}
          >
            អ្នកទិញ ({currentProvStats.buyers})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="ស្វែងរកឈ្មោះ ឬលេខទូរស័ព្ទ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#1B5E20] text-slate-800"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* 3. Table of Filtered Farmers & Buyers */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-xs">
            <tr>
              <th className="py-3 px-4">ឈ្មោះ & ប្រភេទ</th>
              <th className="py-3 px-4">លេខទូរស័ព្ទ</th>
              <th className="py-3 px-4">ទីតាំង</th>
              <th className="py-3 px-4">កសិផល / អាជីវកម្ម</th>
              <th className="py-3 px-4">ស្ថានភាព</th>
              <th className="py-3 px-4 text-right">សកម្មភាព</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => {
                const isFarmer = u.type === "farmer";
                return (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {u.id} • {isFarmer ? "កសិករ" : "អ្នកទិញ"}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {u.phone}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      ខេត្ត{u.province}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      {isFarmer ? (u.cropTypes || "បន្លែ & ដំណាំចម្រុះ") : (u.roleKh || "អាជីវករទិញបោះដុំ")}
                    </td>

                    <td className="py-3.5 px-4">
                      {u.isVerified ? (
                        <span className="text-xs font-semibold text-[#1B5E20]">
                          បានផ្ទៀងផ្ទាត់
                        </span>
                      ) : (
                        <span className="text-xs text-amber-700">
                          រង់ចាំពិនិត្យ
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onInspectUser(u)}
                          className="px-2.5 py-1 rounded text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                          ពិនិត្យ
                        </button>

                        {!u.isVerified && (
                          <button
                            type="button"
                            onClick={() => onQuickVerify(u.id)}
                            className="px-2.5 py-1 rounded text-xs font-semibold text-white bg-[#1B5E20] hover:bg-[#144717] transition-colors cursor-pointer"
                          >
                            ផ្ទៀងផ្ទាត់
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-400">
                  មិនមានកសិករ ឬអ្នកទិញនៅក្នុងខេត្តនេះតាមលក្ខខណ្ឌស្វែងរកឡើយ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

