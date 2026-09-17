"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Building2,
  User,
  Phone,
  MapPin,
  RotateCcw,
  Eye,
  Filter,
  ChevronDown,
  Check,
  ShieldAlert,
} from "lucide-react";
import AdminUserVerifyModal from "@/components/admin/AdminUserVerifyModal";

//Mock data
export const MOCK_ADMIN_USERS = [
  {
    id: "USR-001",
    name: "ចម្ការសំបូរផល",
    ownerName: "លោក សុខ សំបូរ",
    type: "farmer",
    roleKh: "កសិករ / សហគមន៍កសិកម្ម",
    phone: "088 765 4321",
    village: "ភូមិព្រែកតាគង់",
    commune: "ឃុំអន្លង់វិល",
    district: "ស្រុកសង្កែ",
    province: "បាត់ដំបង",
    farmSize: "៥.៥ ហិកតា",
    experience: "៨ ឆ្នាំ",
    monthlyCapacity: "១៥ - ២០ តោន/ខែ",
    status: "Active",
    isVerified: true,
    certType: "CamGAP ផ្លូវការ",
    totalOrders: 42,
    cropTypes: "ស្វាយកែវរមៀតនាំចេញ, ក្រូចពោធិ៍សាត់ & ស្រូវផ្ការំដួល",
    bio: "កសិដ្ឋានចម្ការសំបូរផល ជំនាញដាំដុះស្វាយកែវរមៀតនាំចេញកម្រិតលេខ១ និងក្រូចពោធិ៍សាត់ធម្មជាតិ ស្របតាមស្តង់ដារកសិកម្មល្អកម្ពុជា (CamGAP) គ្មានជាតិគីមីពុល ធានាសុវត្ថិភាពទាំងស្រុង។",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80",
    coverPhoto: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000&auto=format&fit=crop&q=80",
    farmPhoto1: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80",
    farmPhoto2: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80",
    farmPhoto3: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    joinedDate: "12 មករា 2026",
  },
  {
    id: "USR-002",
    name: "សហគមន៍កសិកម្មមោងឫស្សី",
    ownerName: "លោកស្រី គង់ វណ្ណា",
    type: "farmer",
    roleKh: "សហគមន៍កសិកម្មបៃតង",
    phone: "012 345 678",
    village: "ភូមិកណ្តាល",
    commune: "ឃុំមោង",
    district: "ស្រុកមោងឫស្សី",
    province: "បាត់ដំបង",
    farmSize: "១២.០ ហិកតា",
    experience: "៥ ឆ្នាំ",
    monthlyCapacity: "២៥ - ៣០ តោន/ខែ",
    status: "Pending Verification",
    isVerified: false,
    certType: "កំពុងរង់ចាំពិនិត្យ",
    totalOrders: 18,
    cropTypes: "បន្លែសុវត្ថិភាព, ស្ពៃក្តោប & ត្រសក់ផ្អែម",
    bio: "សហគមន៍កសិកម្មប្រមូលផ្តុំកសិករដាំបន្លែសុវត្ថិភាពជាច្រើនគ្រួសារ ដោយមានកិច្ចសន្យាផ្គត់ផ្គង់បន្លែស្រស់ជារៀងរាល់ថ្ងៃជូនផ្សារទំនើប និងដេប៉ូបោះដុំ។",
    avatar: null,
    coverPhoto: null  ,
    farmPhoto1: null,
    farmPhoto2: null,
    farmPhoto3: null,
    joinedDate: "05 កញ្ញា 2026",
  },
  {
    id: "USR-003",
    name: "ចម្ការតារា",
    ownerName: "លោក ហេង តារា",
    type: "farmer",
    roleKh: "កសិករដាំដុះឯកជន",
    phone: "098 474 843",
    village: "ភូមិត្រពាំងធំ",
    commune: "ឃុំត្រាំកក់",
    district: "ស្រុកត្រាំកក់",
    province: "តាកែវ",
    farmSize: "៣.៨ ហិកតា",
    experience: "១០ ឆ្នាំ",
    monthlyCapacity: "៨ - ១០ តោន/ខែ",
    status: "Active",
    isVerified: true,
    certType: "CamGAP ផ្លូវការ",
    totalOrders: 26,
    cropTypes: "ប៉េងប៉ោះធម្មជាតិ & ម្ទេសហាវៃស្រស់",
    bio: "ចម្ការតារាផ្តោតលើការដាំប៉េងប៉ោះក្នុងផ្ទះសំណាញ់ទំនើប និងម្ទេសហាវៃចម្រុះពណ៌ មានស្តង់ដារអនាម័យខ្ពស់ និងស្រោចស្រពតាមប្រព័ន្ធដំណក់ទឹក។",
    avatar: null,
    coverPhoto: null,
    farmPhoto1: null,
    farmPhoto2: null,
    farmPhoto3: null,
    joinedDate: "20 កុម្ភៈ 2026",
  },
  {
    id: "USR-004",
    name: "ផ្សារទំនើប ឡាក់គី",
    ownerName: "លោកស្រី ម៉ី លីណា",
    type: "buyer",
    roleKh: "សហគ្រាសទិញបោះដុំ",
    phone: "023 888 999",
    village: "សង្កាត់ផ្សារថ្មី",
    commune: "ខណ្ឌដូនពេញ",
    district: "រាជធានីភ្នំពេញ",
    province: "ភ្នំពេញ",
    farmSize: "សាខាចំនួន ១៥",
    experience: "១២ ឆ្នាំ",
    monthlyCapacity: "៤០ - ៦០ តោន/ខែ",
    status: "Active",
    isVerified: true,
    certType: "អាជីវកម្មផ្ទៀងផ្ទាត់រួច",
    totalOrders: 64,
    bio: "ផ្សារទំនើបឈានមុខគេនៅកម្ពុជា ស្វែងរកការផ្គត់ផ្គង់បន្លែ ផ្លែឈើ និងអង្ករមានវិញ្ញាបនបត្រ CamGAP ពីកសិករក្នុងស្រុកជាប្រចាំ។",
    avatar: null,
    coverPhoto:null,
    joinedDate: "10 មករា 2026",
  },
  {
    id: "USR-005",
    name: "ភោជនីយដ្ឋាន អង្គរ",
    ownerName: "លោក ជា សុផល",
    type: "buyer",
    roleKh: "សណ្ឋាគារ & ភោជនីយដ្ឋាន",
    phone: "098 474 843",
    village: "សង្កាត់បឹងកេងកង",
    commune: "ខណ្ឌចំការមន",
    district: "រាជធានីភ្នំពេញ",
    province: "ភ្នំពេញ",
    farmSize: "សាខាចំនួន ៣",
    experience: "៧ ឆ្នាំ",
    monthlyCapacity: "៥ - ៨ តោន/ខែ",
    status: "Active",
    isVerified: true,
    certType: "អាជីវកម្មផ្ទៀងផ្ទាត់រួច",
    totalOrders: 12,
    bio: "ភោជនីយដ្ឋានម្ហូបខ្មែរទំនើប ត្រូវការបន្លែស្រស់ ត្រសក់ ប៉េងប៉ោះ និងអង្ករផ្ការំដួលកម្រិត១ ពីកសិករផ្ទាល់។",
    avatar: null,
    coverPhoto:null,
    joinedDate: "01 សីហា 2026",
  },
  {
    id: "USR-006",
    name: "ក្រុមហ៊ុន គិរីរម្យ ហ្វូដ",
    ownerName: "លោក អ៊ុំ សារ៉ាត់",
    type: "buyer",
    roleKh: "រោងចក្រកែច្នៃកសិផល",
    phone: "017 889 900",
    village: "ភូមិត្រពាំងក្រឡឹង",
    commune: "ឃុំត្រែងត្រយឹង",
    district: "ស្រុកភ្នំស្រួច",
    province: "កំពង់ស្ពឺ",
    farmSize: "រោងចក្រកែច្នៃ ៣ ហិកតា",
    experience: "៦ ឆ្នាំ",
    monthlyCapacity: "៥០ - ៨០ តោន/ខែ",
    status: "Pending Verification",
    isVerified: false,
    certType: "កំពុងរង់ចាំពិនិត្យ",
    totalOrders: 5,
    bio: "រោងចក្រកែច្នៃស្វាយកែវរមៀតដំណាប់ និងផ្លែឈើស្ងួតសម្រាប់នាំចេញ ត្រូវការប្រមូលទិញស្វាយរាប់រយតោនក្នុងរដូវប្រមូលផល។",
    avatar: null,
    coverPhoto: null,
    joinedDate: "10 កញ្ញា 2026",
  },
  {
    id: "USR-007",
    name: "ម៉ូយបន្លែដេប៉ូ ផ្សារដើមគ",
    ownerName: "លោកស្រី សុខ ស្រីមុំ",
    type: "buyer",
    roleKh: "ឈ្មួញទិញបោះដុំបន្លែ",
    phone: "092 112 334",
    village: "សង្កាត់ផ្សារដេប៉ូ",
    commune: "ខណ្ឌទួលគោក",
    district: "រាជធានីភ្នំពេញ",
    province: "ភ្នំពេញ",
    farmSize: "ដេប៉ូស្តុកបន្លែ ៥០០ ម៉ែត្រការ៉េ",
    experience: "១៥ ឆ្នាំ",
    monthlyCapacity: "៣០ - ៥០ តោន/ខែ",
    status: "Active",
    isVerified: true,
    certType: "ផ្ទៀងផ្ទាត់រួច (Verified)",
    totalOrders: 31,
    bio: "ដេប៉ូបោះដុំបន្លែធំនៅផ្សារដើមគ ប្រមូលទិញបន្លែគ្រប់មុខពីកសិករខេត្តបាត់ដំបង កណ្តាល និងកំពង់ស្ពឺ។",
    avatar: null,
    coverPhoto: null,
    joinedDate: "14 មីនា 2026",
  },
];

export default function AdminUsersTab() {
  const [users, setUsers] = useState(MOCK_ADMIN_USERS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [inspectingUser, setInspectingUser] = useState(null);
  const [openActionId, setOpenActionId] = useState(null);

  const handleVerify = (userId, giveCamGAP = false) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            isVerified: true,
            status: "Active",
            certType: giveCamGAP ? "CamGAP ផ្លូវការ" : "ផ្ទៀងផ្ទាត់រួច (Verified)",
          };
        }
        return u;
      })
    );
  };

  const handleRevoke = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            isVerified: false,
            status: "Pending Verification",
            certType: "កំពុងរង់ចាំពិនិត្យ",
          };
        }
        return u;
      })
    );
  };

  const handleToggleStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const isSuspended = u.status === "Suspended";
          return {
            ...u,
            status: isSuspended ? "Active" : "Suspended",
          };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search) ||
      u.province.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (typeFilter !== "all" && u.type !== typeFilter) return false;
    if (provinceFilter !== "all" && u.province !== provinceFilter) return false;
    return true;
  });

  const provinces = Array.from(new Set(users.map((u) => u.province)));

  return (
    <div className="space-y-6">
      {/* 1. Header & Quick Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            គ្រប់គ្រងអ្នកប្រើប្រាស់
          </h2>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl self-start sm:self-auto">
          {[
            { id: "all", label: "ទាំងអស់" },
            { id: "farmer", label: "កសិករ" },
            { id: "buyer", label: "អ្នកទិញ" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTypeFilter(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                typeFilter === tab.id
                  ? "bg-white text-[#1B5E20] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Unified Search & Table Card */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {/* Search & Province Filter Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="ស្វែងរកតាមឈ្មោះ, លេខទូរស័ព្ទ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white text-slate-800"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Province Select */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm font-medium text-slate-700 shrink-0">ខេត្ត៖</span>
              <select
                value={provinceFilter}
                onChange={(e) => setProvinceFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:border-[#1B5E20] cursor-pointer"
              >
                <option value="all">គ្រប់ខេត្ត</option>
                {provinces.map((prov) => (
                  <option key={prov} value={prov}>
                    ខេត្ត{prov}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setProvinceFilter("all");
            }}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer self-end md:self-auto"
          >
            កំណត់ឡើងវិញ
          </button>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#144717] text-white font-semibold">
              <tr>
                <th className="py-3.5 px-5">កូដ</th>
                <th className="py-3.5 px-5">ឈ្មោះស្ថាប័ន / កសិដ្ឋាន</th>
                <th className="py-3.5 px-5">ប្រភេទ</th>
                <th className="py-3.5 px-5">ទីតាំង</th>
                <th className="py-3.5 px-5">ស្ថានភាព</th>
                <th className="py-3.5 px-5 text-center">ប្រតិបត្តិការ</th>
                <th className="py-3.5 px-5 text-right">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 font-mono font-bold text-slate-900">
                      {user.id}
                    </td>

                    <td className="py-4 px-5">
                      <div>
                        <span className="font-bold text-slate-900 block text-sm sm:text-base">
                          {user.name}
                        </span>
                        <span className="text-xs text-slate-500 block mt-0.5">
                          {user.phone}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-5 font-medium">
                      {user.type === "farmer" ? "កសិករ" : "អ្នកទិញ"}
                    </td>

                    <td className="py-4 px-5 font-medium text-slate-700">
                      ខេត្ត{user.province}
                    </td>

                    <td className="py-4 px-5 font-medium">
                      {user.isVerified ? (
                        <span className="text-[#1B5E20] font-semibold">
                          បានផ្ទៀងផ្ទាត់
                        </span>
                      ) : (
                        <span className="text-amber-700">
                          រង់ចាំពិនិត្យ
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-5 text-center font-semibold text-slate-900">
                      {user.totalOrders}
                    </td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="relative inline-block text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenActionId(openActionId === user.id ? null : user.id)
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 transition-colors cursor-pointer"
                        >
                          <span>សកម្មភាព</span>
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        </button>

                        {openActionId === user.id && (
                          <>
                            <div
                              className="fixed inset-0 z-20"
                              onClick={() => setOpenActionId(null)}
                            />
                            <div className="absolute right-0 mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 text-left divide-y divide-slate-100">
                              <div className="py-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenActionId(null);
                                    setInspectingUser(user);
                                  }}
                                  className="w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer font-medium"
                                >
                                  <Eye className="w-4 h-4 text-slate-500" />
                                  <span>មើលព័ត៌មានលម្អិត</span>
                                </button>
                              </div>

                              <div className="py-1">
                                {!user.isVerified ? (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setOpenActionId(null);
                                      handleVerify(user.id);
                                    }}
                                    className="w-full px-4 py-2.5 text-sm text-[#1B5E20] hover:bg-emerald-50 flex items-center gap-2.5 cursor-pointer font-bold"
                                  >
                                    <Check className="w-4 h-4 text-[#1B5E20]" />
                                    <span>អនុម័ត / ផ្ទៀងផ្ទាត់</span>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setOpenActionId(null);
                                      handleRevoke(user.id);
                                    }}
                                    className="w-full px-4 py-2.5 text-sm text-amber-700 hover:bg-amber-50 flex items-center gap-2.5 cursor-pointer font-medium"
                                  >
                                    <RotateCcw className="w-4 h-4 text-amber-600" />
                                    <span>ដកសិទ្ធិផ្ទៀងផ្ទាត់</span>
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenActionId(null);
                                    handleToggleStatus(user.id);
                                  }}
                                  className={`w-full px-4 py-2.5 text-sm flex items-center gap-2.5 cursor-pointer font-medium ${
                                    user.status === "Suspended"
                                      ? "text-emerald-700 hover:bg-emerald-50"
                                      : "text-rose-600 hover:bg-rose-50"
                                  }`}
                                >
                                  <ShieldAlert className="w-4 h-4" />
                                  <span>
                                    {user.status === "Suspended"
                                      ? "បើកដំណើរការឡើងវិញ"
                                      : "ផ្អាកគណនី"}
                                  </span>
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-medium">
                    មិនមានអ្នកប្រើប្រាស់ត្រូវនឹងតម្រងស្វែងរកនេះទេ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Verification Modal */}
      <AdminUserVerifyModal
        user={inspectingUser}
        isOpen={Boolean(inspectingUser)}
        onClose={() => setInspectingUser(null)}
        onVerify={handleVerify}
        onReject={handleRevoke}
      />
    </div>
  );
}

