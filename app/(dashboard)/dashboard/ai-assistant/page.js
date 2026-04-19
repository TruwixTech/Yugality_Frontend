"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, Loader2 } from "lucide-react";
import ChatSidebar from "@/app/components/ai-assistant/ChatSidebar";
import ChatWelcome from "@/app/components/ai-assistant/ChatWelcome";
import ChatMessages from "@/app/components/ai-assistant/ChatMessages";
import ChatInput from "@/app/components/ai-assistant/ChatInput";

export default function AIAssistantPage() {
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState("Ask");
  const [history, setHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [fetchingChat, setFetchingChat] = useState(false);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch("/api/ai/history");
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const loadChat = async (id) => {
    setFetchingChat(true);
    setActiveChatId(id);
    try {
      const res = await fetch(`/api/ai/chat/${id}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
        setMode(data.mode || "Ask");
      }
    } catch (err) {
      console.error("Failed to load chat:", err);
    } finally {
      setFetchingChat(false);
    }
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setMode("Ask");
  };

  const handleDeleteChat = async (id) => {
    try {
      const res = await fetch(`/api/ai/chat/${id}`, { method: "DELETE" });
      if (res.ok) {
        setHistory(prev => prev.filter(chat => chat._id !== id));
        if (activeChatId === id) handleNewChat();
      }
    } catch (err) {
      console.error("Failed to delete chat:", err);
    }
  };

  const handleSend = async (attachedItems = []) => {
    if (!message.trim() && attachedItems.length === 0) return;

    let displayMessage = message;
    if (attachedItems.length > 0) {
      const names = attachedItems.map(i => i.name).join(", ");
      displayMessage = message ? `${message}\n\n[Attached: ${names}]` : `[Attached: ${names}]`;
    }

    // Optimistically update UI
    const tempUserMsg = { id: Date.now(), type: "user", role: "user", content: displayMessage, timestamp: new Date() };
    setMessages(prev => [...prev, tempUserMsg]);
    setMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: activeChatId,
          content: message, // Send raw content to AI
          mode: mode
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update messages from the official backend response
        setMessages(data.chat.messages);
        
        // If it was a new chat, update the active ID and refresh history
        if (!activeChatId) {
          setActiveChatId(data.chatId);
          fetchHistory();
        }
      } else {
         const errorData = await response.json();
         const assistantError = { 
           id: Date.now() + 1, 
           type: "assistant", 
           role: "assistant", 
           content: `Sorry, I encountered an error: ${errorData.error || "Please try again later."}`, 
           timestamp: new Date() 
         };
         setMessages(prev => [...prev, assistantError]);
      }
    } catch (err) {
      console.error("Chat send error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen relative bg-colorlight">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-colordark/50 z-40 lg:hidden backdrop-blur-sm transition-all" onClick={() => setSidebarOpen(false)} />
      )}

      <ChatSidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        history={history}
        activeChatId={activeChatId}
        onSelectChat={loadChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        loading={loadingHistory}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-colordark/6">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-colordark/60 hover:text-colordark hover:bg-colordark/[0.04] rounded-xl transition-all">
            <Menu size={20} strokeWidth={2} />
          </button>
          <span className="text-[0.875rem] font-bold text-colordark tracking-tight">AI Assistant</span>
          <div className="w-9" /> {/* Spacer */}
        </div>

        {/* Chat area */}
        {fetchingChat ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-colordark/5">
                <Loader2 size={24} className="text-blue-from animate-spin" />
             </div>
             <p className="text-[0.75rem] font-bold text-colordark/20 uppercase tracking-[0.2em]">Retrieving Intelligence</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-4 py-8">
            <ChatWelcome onSuggestion={(text) => { setMessage(text); }} />
          </div>
        ) : (
          <ChatMessages messages={messages} isTyping={isTyping} />
        )}

        <ChatInput
          value={message}
          onChange={setMessage}
          onSend={handleSend}
          mode={mode}
          onModeChange={setMode}
          disabled={fetchingChat}
        />
      </div>
    </div>
  );
}
