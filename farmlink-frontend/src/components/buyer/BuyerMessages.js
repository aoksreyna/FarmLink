"use client";

import React, { useState, useRef } from "react";
import {
  Send,
  Image as ImageIcon,
  Paperclip,
  Smile,
  CheckCheck,
  Search,
  Phone,
  MoreVertical,
  X,
  User,
} from "lucide-react";

export default function BuyerMessages() {
  const [activeChat, setActiveChat] = useState(0);
  const [inputMsg, setInputMsg] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const chatBottomRef = useRef(null);

  const [chats, setChats] = useState([
    {
      id: 1,
      sender: "ចម្ការតារា (Dara Farm)",
      role: "កសិករផ្គត់ផ្គង់បន្លែ និងផ្លែឈើ (Takeo)",
      phone: "098 474 843",
      time: "10:30 ព្រឹក",
      unread: 2,
      avatarBg: "bg-emerald-100 text-[#1B5E20]",
      messages: [
        {
          id: 101,
          sender: "other",
          type: "text",
          text: "សួស្តីបង! ខ្ញុំបានទទួលសំណើកុម្ម៉ង់ប៉េងប៉ោះស្រស់ 50kg របស់បងលេខកូដ #FL-8492 រួចហើយបាទ។",
          time: "10:28 ព្រឹក",
        },
        {
          id: 102,
          sender: "me",
          type: "text",
          text: "បាទអរគុណបង! តើអាចធានាបានថាប៉េងប៉ោះស្រស់ល្អ មិនទាន់ទន់ជ្រុលទេ?",
          time: "10:29 ព្រឹក",
        },
        {
          id: 103,
          sender: "other",
          type: "text",
          text: "ធានា ១០០% បង! ខ្ញុំទើបប្រមូលផលពីចម្ការតាកែវព្រឹកមិញ ផ្លែក្រហមស្អាតណាស់។ ខ្ញុំនឹងដឹកជូនដល់ភោជនីយដ្ឋានបងនៅស្អែកព្រឹក។",
          time: "10:30 ព្រឹក",
        },
      ],
    },
    {
      id: 2,
      sender: "ចម្ការភ្នំខ្ពស់ (Phnom Khpos)",
      role: "កសិករស្វាយកែវរមៀត (Battambang)",
      phone: "088 765 4321",
      time: "09:15 ព្រឹក",
      unread: 0,
      avatarBg: "bg-blue-100 text-blue-700",
      messages: [
        {
          id: 201,
          sender: "me",
          type: "text",
          text: "ជម្រាបសួរខាងចម្ការភ្នំខ្ពស់! តើស្វាយកែវរមៀត ១,០០០ គ.ក អាចផ្គត់ផ្គង់ទាន់ថ្ងៃទី ១៦ នេះទេ?",
          time: "09:00 ព្រឹក",
        },
        {
          id: 202,
          sender: "other",
          type: "text",
          text: "បាទជម្រាបសួរលោកស្រី! យើងខ្ញុំបានរៀបចំវេចខ្ចប់ដាក់កេសរួចរាល់ហើយ អាចដឹកចេញនៅល្ងាចនេះបានបាទ។",
          time: "09:15 ព្រឹក",
        },
      ],
    },
    {
      id: 3,
      sender: "រោងម៉ាស៊ីនស្រូវបាត់ដំបង",
      role: "ផ្គត់ផ្គង់អង្ករផ្ការំដួលកម្រិត១",
      phone: "017 889 900",
      time: "ម្សិលមិញ",
      unread: 0,
      avatarBg: "bg-amber-100 text-amber-800",
      messages: [
        {
          id: 301,
          sender: "other",
          type: "text",
          text: "វិក្កយបត្របញ្ជាទិញអង្ករ ៥០០ គ.ក បានចេញរួចរាល់ហើយបាទ។ សូមពិនិត្យមើលក្នុងប្រព័ន្ធ។",
          time: "03:45 ល្ងាច",
        },
      ],
    },
  ]);

  const currentChat = chats[activeChat] || chats[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      type: "text",
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedChats = [...chats];
    updatedChats[activeChat].messages.push(newMsg);
    updatedChats[activeChat].time = "មុននេះបន្តិច";
    setChats(updatedChats);
    setInputMsg("");

    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const filteredChats = chats.filter((c) =>
    c.sender.toLowerCase().includes(searchContact.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden flex flex-col md:flex-row h-[calc(100vh-140px)] min-h-[550px]">
      {/* 1. Left Contact Pane */}
      <div className="w-full md:w-80 border-r border-gray-200 flex flex-col shrink-0 bg-white">
        <div className="p-4 border-b border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">សារទំនាក់ទំនង (Messages)</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-[#1B5E20]">
              {chats.reduce((acc, c) => acc + c.unread, 0)} ថ្មី
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="ស្វែងរកកសិករ ឬចម្ការ..."
              value={searchContact}
              onChange={(e) => setSearchContact(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#1B5E20]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {filteredChats.map((chat, idx) => {
            const isSelected = activeChat === idx;
            const lastMessage = chat.messages[chat.messages.length - 1];

            return (
              <button
                key={chat.id}
                type="button"
                onClick={() => {
                  setActiveChat(idx);
                  const updated = [...chats];
                  updated[idx].unread = 0;
                  setChats(updated);
                }}
                className={`w-full p-4 flex items-start gap-3 text-left transition-colors cursor-pointer ${
                  isSelected ? "bg-emerald-50/60 border-l-4 border-[#1B5E20]" : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs ${chat.avatarBg}`}
                >
                  <User className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-bold text-sm text-gray-900 truncate">
                      {chat.sender}
                    </span>
                    <span className="text-[11px] text-gray-400 shrink-0 font-medium">
                      {chat.time}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 truncate mb-1">
                    {chat.role}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600 truncate max-w-[170px]">
                      {lastMessage?.text || "សាររូបភាព"}
                    </p>
                    {chat.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-[#1B5E20] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Right Chat Conversation Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-2xs ${currentChat.avatarBg}`}
            >
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-gray-900 leading-tight">
                {currentChat.sender}
              </h3>
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>អនឡាញ (Online) · {currentChat.phone}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${currentChat.phone.replace(/\s+/g, "")}`}
              className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
              title="ទូរស័ព្ទទាក់ទង"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {currentChat.messages.map((msg) => {
            const isMe = msg.sender === "me";

            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
              >
                {!isMe && (
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mb-1 ${currentChat.avatarBg}`}
                  >
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] sm:max-w-md rounded-2xl p-3.5 text-xs sm:text-sm shadow-2xs ${
                    isMe
                      ? "bg-[#144717] text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200/80 rounded-bl-none"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                      isMe ? "text-emerald-200" : "text-gray-400"
                    }`}
                  >
                    <span>{msg.time}</span>
                    {isMe && <CheckCheck className="w-3.5 h-3.5 text-emerald-300" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={chatBottomRef} />
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 sm:p-4 bg-white border-t border-gray-200 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => alert("ជ្រើសរើសរូបភាពកសិផល ឬឯកសារដើម្បីផ្ញើ")}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            title="ភ្ជាប់រូបភាព"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          <input
            type="text"
            placeholder="សរសេរសារផ្ញើទៅកាន់កសិករ..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#1B5E20] focus:bg-white text-gray-800"
          />

          <button
            type="submit"
            disabled={!inputMsg.trim()}
            className="p-2.5 bg-[#1B5E20] hover:bg-[#144717] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-colors cursor-pointer shadow-xs shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
