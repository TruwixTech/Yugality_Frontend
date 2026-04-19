"use client";

import { Plus, Search, MessageSquare, X, Trash2, Loader2 } from "lucide-react";

export default function ChatSidebar({ open, onClose, history, activeChatId, onSelectChat, onNewChat, onDeleteChat, loading }) {
  // Group history by date periods
  const groupHistory = (chats) => {
    const groups = { Today: [], Yesterday: [], "Previous 7 Days": [], Older: [] };
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    chats.forEach(chat => {
      const chatDate = new Date(chat.updatedAt);
      if (chatDate >= today) groups.Today.push(chat);
      else if (chatDate >= yesterday) groups.Yesterday.push(chat);
      else if (chatDate >= lastWeek) groups["Previous 7 Days"].push(chat);
      else groups.Older.push(chat);
    });

    return Object.entries(groups).filter(([_, items]) => items.length > 0);
  };

  const sections = groupHistory(history || []);

  return (
    <div className={`
      fixed lg:relative inset-y-0 left-0 z-50
      w-[260px] border-r border-colordark/8 bg-colorlight flex flex-col
      transform transition-transform duration-300 ease-in-out
      ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}>
      {/* Header */}
      <div className="px-5 py-5 border-b border-colordark/8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[0.9375rem] font-semibold text-colordark tracking-[-0.01em]">Conversations</h2>
          <button onClick={onClose} className="lg:hidden p-1.5 text-colordark/40 hover:text-colordark hover:bg-white rounded-lg transition-all cursor-pointer">
            <X size={16} strokeWidth={2} />
          </button>
        </div>
        <button 
          onClick={() => { onNewChat(); onClose(); }}
          className="flex items-center justify-center gap-2 w-full h-9 text-[0.8125rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-lg rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <Plus size={14} strokeWidth={2} />
          New Chat
        </button>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <Loader2 size={18} className="animate-spin text-blue-from/40" />
            <p className="text-[0.625rem] font-bold text-colordark/25 uppercase tracking-wider">Syncing history</p>
          </div>
        ) : sections.length > 0 ? (
          sections.map(([section, chats]) => (
            <div key={section} className="px-4 py-2">
              <p className="text-[0.625rem] font-bold text-colordark/35 uppercase tracking-wider mb-2 px-2">{section}</p>
              <div className="space-y-1">
                {chats.map((chat) => (
                  <div key={chat._id} className="relative group">
                    <button
                      onClick={() => { onSelectChat(chat._id); onClose(); }}
                      className={`flex items-center gap-2.5 w-full px-3 py-2.5 text-left rounded-xl transition-all group/btn cursor-pointer ${
                        activeChatId === chat._id 
                          ? "bg-white border border-colordark/6 shadow-sm" 
                          : "hover:bg-white hover:border-colordark/4"
                      }`}
                    >
                      <MessageSquare size={14} strokeWidth={2} className={`${activeChatId === chat._id ? "text-blue-from" : "text-colordark/25"} shrink-0`} />
                      <span className={`text-[0.8125rem] font-semibold truncate transition-colors ${
                        activeChatId === chat._id ? "text-colordark" : "text-colordark/55 group-hover/btn:text-colordark"
                      }`}>
                        {chat.title}
                      </span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onDeleteChat(chat._id); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-colordark/10 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-rose-50"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-10 text-center">
            <div className="w-10 h-10 rounded-xl bg-colordark/[0.03] flex items-center justify-center mx-auto mb-3">
               <MessageSquare size={16} className="text-colordark/15" />
            </div>
            <p className="text-[0.75rem] font-bold text-colordark/30 tracking-tight">No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
}
