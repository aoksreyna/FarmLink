"use client";

import React, { useState, useRef } from "react";
import {
  Send,
  Image as ImageIcon,
  Video,
  Paperclip,
  Smile,
  CheckCheck,
  Search,
  Phone,
  MoreVertical,
  Play,
  X,
  User,
} from "lucide-react";

export default function FarmerMessages() {
  const [activeChat, setActiveChat] = useState(0);
  const [inputMsg, setInputMsg] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
  const [searchContact, setSearchContact] = useState("");

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const chatBottomRef = useRef(null);

  const [chats, setChats] = useState([
    {
      id: 1,
      sender: "ភោជនីយដ្ឋាន ទន្លេបាសាក់",
      role: "អ្នកទិញបន្លែប្រចាំថ្ងៃ",
      time: "10:30 ព្រឹក",
      unread: 2,
      avatarBg: "bg-emerald-100 text-[#1B5E20]",
      messages: [
        {
          id: 101,
          sender: "other",
          type: "text",
          text: "សួស្តីបង! ខ្ញុំបានកុម្ម៉ង់ស្ពៃក្តោប 50 គីឡូក្រាម។",
          time: "10:28 ព្រឹក",
        },
        {
          id: 102,
          sender: "other",
          type: "image",
          mediaUrl:null,
          caption: "ស្ពៃក្តោបប្រភេទនេះបង តើមានក្នុងស្តុកទេ?",
          time: "10:29 ព្រឹក",
        },
        {
          id: 103,
          sender: "me",
          type: "text",
          text: "បាទមានបង! ខ្ញុំទើបតែកាត់ពីចម្ការព្រឹកមិញ ស្រស់ស្អាតណាស់។",
          time: "10:30 ព្រឹក",
        },
        {
          id: 104,
          sender: "other",
          type: "text",
          text: "តើស្ពៃក្តោបអាចដឹកជញ្ជូនមកដល់ថ្ងៃស្អែកបានទេ?",
          time: "10:30 ព្រឹក",
        },
      ],
    },
    {
      id: 2,
      sender: "ផ្សារទំនើប ឡាក់គី (Lucky)",
      role: "ផ្នែកលទ្ធកម្មកណ្តាល",
      time: "09:15 ព្រឹក",
      unread: 1,
      avatarBg: "bg-blue-100 text-blue-700",
      messages: [
        {
          id: 201,
          sender: "me",
          type: "text",
          text: "ជម្រាបសួរខាងផ្សារឡាក់គី! នេះជាវីដេអូត្រួតពិនិត្យការប្រមូលផលប៉េងប៉ោះឆឺរីព្រឹកនេះបាទ។",
          time: "09:00 ព្រឹក",
        },
        {
          id: 202,
          sender: "me",
          type: "video",
          mediaUrl: null,
          caption: "វីដេអូការប្រមូលផលប៉េងប៉ោះសរីរាង្គ",
          time: "09:05 ព្រឹក",
        },
        {
          id: 203,
          sender: "other",
          type: "text",
          text: "យើងខ្ញុំបានផ្ញើការទូទាត់រួចរាល់ហើយ សូមអរគុណ!",
          time: "09:15 ព្រឹក",
        },
      ],
    },
    {
      id: 3,
      sender: "សណ្ឋាគារ ហ្គាដិនភ្នំពេញ",
      role: "មេការផ្ទះបាយ",
      time: "ម្សិលមិញ",
      unread: 3,
      avatarBg: "bg-amber-100 text-amber-700",
      messages: [
        {
          id: 301,
          sender: "other",
          type: "text",
          text: "សួស្តីបង! តើខាងកសិដ្ឋានមានម្ទេសដៃនាងក្រហម ២០ គ.ក ទេ?",
          time: "ម្សិលមិញ",
        },
        {
          id: 302,
          sender: "other",
          type: "image",
          mediaUrl:null,
          caption: "ត្រូវការម្ទេសទុំក្រហមសុទ្ធបែបនេះ",
          time: "ម្សិលមិញ",
        },
        {
          id: 303,
          sender: "other",
          type: "text",
          text: "បើមានជួយបញ្ជាក់តម្លៃមកខ្ញុំផងណា!",
          time: "ម្សិលមិញ",
        },
      ],
    },
    {
      id: 4,
      sender: "អ្នកស្រី ចាន់ណា (ទិញដុំ)",
      role: "អាជីវករផ្សារដើមគរ",
      time: "២ ថ្ងៃមុន",
      unread: 0,
      avatarBg: "bg-purple-100 text-purple-700",
      messages: [
        {
          id: 401,
          sender: "other",
          type: "text",
          text: "ទំនិញទទួលបានរួចហើយ គុណភាពល្អណាស់!",
          time: "២ ថ្ងៃមុន",
        },
        {
          id: 402,
          sender: "me",
          type: "text",
          text: "អរគុណបងស្រី! លើកក្រោយកុម្ម៉ង់ទៀតខ្ញុំនឹងថែមជូន។",
          time: "២ ថ្ងៃមុន",
        },
      ],
    },
  ]);

  // Handle selecting chat and clear unread badge
  const handleSelectChat = (idx) => {
    setActiveChat(idx);
    setChats((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, unread: 0 } : c))
    );
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Handle Send Text Message
  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputMsg.trim() && !mediaPreview) return;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      type: mediaType || "text",
      text: inputMsg.trim(),
      mediaUrl: mediaPreview,
      caption: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChats((prev) =>
      prev.map((chat, idx) => {
        if (idx === activeChat) {
          return {
            ...chat,
            lastMsg: newMsg.text || (newMsg.type === "image" ? "[រូបភាព]" : "[វីដេអូ]"),
            time: "មុននេះបន្តិច",
            messages: [...chat.messages, newMsg],
          };
        }
        return chat;
      })
    );

    setInputMsg("");
    setMediaPreview(null);
    setMediaType(null);
    scrollToBottom();
  };

  // Handle Photo Picker
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaPreview(url);
      setMediaType("image");
    }
  };

  // Handle Video Picker
  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaPreview(url);
      setMediaType("video");
    }
  };

  const currentChat = chats[activeChat];

  const filteredChatList = chats.filter((c) =>
    c.sender.toLowerCase().includes(searchContact.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full font-sans">
      {/* 1. Breadcrumbs & Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 tracking-tight">
            ប្រអប់សារទំនាក់ទំនង
          </h1>
        </div>
      </div>

      {/* 2. Messenger / Telegram Style Layout */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden flex flex-col md:flex-row h-[700px]">
        {/* Left Side: Chat Contacts List */}
        <div className="w-full md:w-88 border-r border-gray-200 flex flex-col bg-white">
          {/* Header & Search */}
          <div className="p-4 border-b border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-base">សារទាំងអស់</h3>
              <span className="px-2 py-0.5 bg-emerald-100 text-[#1B5E20] text-xs font-bold rounded-full">
                {chats.reduce((acc, c) => acc + (c.unread || 0), 0)} ថ្មី
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="ស្វែងរកការសន្ទនា..."
                value={searchContact}
                onChange={(e) => setSearchContact(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-800"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Contacts List with Telegram/Messenger Badges (1, 2, 3) */}
          <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
            {filteredChatList.map((chat) => {
              const originalIndex = chats.findIndex((c) => c.id === chat.id);
              const isSelected = activeChat === originalIndex;

              return (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => handleSelectChat(originalIndex)}
                  className={`w-full text-left p-4 hover:bg-gray-50/80 transition-all flex items-start gap-3.5 cursor-pointer relative ${
                    isSelected ? "bg-emerald-50/70 border-l-4 border-[#1B5E20]" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base shadow-2xs ${chat.avatarBg}`}
                    >
                      {chat.sender.slice(0, 1)}
                    </div>
                    <span className="w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full absolute -bottom-0.5 -right-0.5"></span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h4 className="font-bold text-gray-900 text-sm truncate">
                        {chat.sender}
                      </h4>
                      <span className="text-[11px] text-gray-400 whitespace-nowrap">
                        {chat.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{chat.lastMsg}</p>
                  </div>

                  {/* Telegram / Messenger Number Badge (1, 2, 3) */}
                  {chat.unread > 0 && (
                    <div className="shrink-0 self-center">
                      <span className="min-w-5 h-5 px-1.5 bg-[#1B5E20] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-xs animate-pulse">
                        {chat.unread}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Telegram / Messenger Chat Window */}
        <div className="flex-1 flex flex-col bg-[#F8FAFC]">
          {/* Chat Header */}
          <div className="p-4 px-6 border-b border-gray-200 flex items-center justify-between bg-white shadow-2xs">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base shadow-2xs ${currentChat.avatarBg}`}
              >
                {currentChat.sender.slice(0, 1)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base">
                  {currentChat.sender}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>កំពុងដំណើរការ (Online) • {currentChat.role}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                title="ទូរស័ព្ទ"
              >
                <Phone className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {currentChat.messages.map((m) => {
              const isMe = m.sender === "me";

              return (
                <div
                  key={m.id}
                  className={`flex items-end gap-2.5 ${
                    isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isMe && (
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${currentChat.avatarBg}`}
                    >
                      {currentChat.sender.slice(0, 1)}
                    </div>
                  )}

                  <div
                    className={`max-w-xs sm:max-w-md md:max-w-lg rounded-2xl p-3 shadow-2xs space-y-1.5 ${
                      isMe
                        ? "bg-[#1B5E20] text-white rounded-br-xs"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-xs"
                    }`}
                  >
                    {/* Media: Image */}
                    {m.type === "image" && (
                      <div className="rounded-xl overflow-hidden border border-black/10">
                        <img
                          src={m.mediaUrl}
                          alt="រូបភាព"
                          className="w-full max-h-72 object-cover hover:scale-102 transition-transform cursor-pointer"
                        />
                      </div>
                    )}

                    {/* Media: Video */}
                    {m.type === "video" && (
                      <div className="rounded-xl overflow-hidden border border-black/10 bg-black">
                        <video
                          src={m.mediaUrl}
                          controls
                          className="w-full max-h-72 object-cover"
                        />
                      </div>
                    )}

                    {/* Text Message */}
                    {m.text && (
                      <p className="text-sm sm:text-base leading-relaxed break-words">
                        {m.text}
                      </p>
                    )}

                    {/* Timestamp & Double Checkmarks (Telegram / Messenger style) */}
                    <div
                      className={`flex items-center justify-end gap-1 text-[11px] pt-0.5 ${
                        isMe ? "text-emerald-200" : "text-gray-400"
                      }`}
                    >
                      <span>{m.time}</span>
                      {isMe && <CheckCheck className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={chatBottomRef} />
          </div>

          {/* Media Upload Preview Bar */}
          {mediaPreview && (
            <div className="p-3 px-6 bg-emerald-50/80 border-t border-emerald-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {mediaType === "image" ? (
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="w-14 h-14 rounded-xl object-cover border border-emerald-300 shadow-2xs"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center text-white">
                    <Play className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <span className="text-xs font-bold text-[#1B5E20]">
                    {mediaType === "image" ? "រូបភាពត្រូវបានជ្រើសរើស" : "វីដេអូត្រូវបានជ្រើសរើស"}
                  </span>
                  <p className="text-xs text-gray-500">ត្រៀមបញ្ជូនទៅកាន់អ្នកទិញ...</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMediaPreview(null);
                  setMediaType(null);
                }}
                className="p-1 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="លុបចោល"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Messenger / Telegram Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white border-t border-gray-200 flex items-center gap-2 sm:gap-3"
          >
            {/* Hidden File Inputs for Photo and Video */}
            <input
              type="file"
              ref={imageInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <input
              type="file"
              ref={videoInputRef}
              accept="video/*"
              className="hidden"
              onChange={handleVideoChange}
            />

            {/* Photo Attachment Button (Messenger / Telegram) */}
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="p-2.5 text-gray-500 hover:text-[#1B5E20] hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer shadow-2xs"
              title="ផ្ញើរូបភាព (Photo)"
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            {/* Video Attachment Button (Messenger / Telegram) */}
            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              className="p-2.5 text-gray-500 hover:text-[#1B5E20] hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer shadow-2xs"
              title="ផ្ញើវីដេអូ (Video)"
            >
              <Video className="w-5 h-5" />
            </button>

            {/* General Attachment */}
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer hidden sm:block shadow-2xs"
              title="ឯកសារភ្ជាប់"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            {/* Text Input Box */}
            <input
              type="text"
              placeholder="វាយសាររបស់អ្នកនៅទីនេះ... (ចុច Enter ដើម្បីផ្ញើ)"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-800"
            />

            {/* Send Button */}
            <button
              type="submit"
              className="p-3 bg-[#1B5E20] hover:bg-[#144717] text-white rounded-2xl transition-all cursor-pointer shadow-md flex items-center justify-center shrink-0 hover:scale-105 active:scale-95"
              title="ផ្ញើសារ"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
