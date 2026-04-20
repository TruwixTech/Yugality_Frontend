"use client";

import {
  Bot,
  User,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Download,
  FileText,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-lg text-colordark/30 hover:text-blue-from hover:bg-blue-from/[0.06] transition-all cursor-pointer"
      title="Copy"
    >
      {copied ? (
        <Check size={13} strokeWidth={2.5} className="text-emerald-500" />
      ) : (
        <Copy size={13} strokeWidth={2} />
      )}
    </button>
  );
}

function formatContent(content) {
  const parts = content.split("\n");
  return parts.map((line, i) => {
    const formatted = line.split(/(\*\*.*?\*\*)/g).map((segment, j) => {
      if (segment.startsWith("**") && segment.endsWith("**")) {
        return (
          <strong key={j} className="font-semibold text-colordark">
            {segment.slice(2, -2)}
          </strong>
        );
      }
      return segment;
    });
    return (
      <span key={i}>
        {formatted}
        {i < parts.length - 1 && <br />}
      </span>
    );
  });
}

export default function ChatMessages({ messages, isTyping }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const formatForDownload = (content) => {
    return content
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  const handleDownloadPdf = (content) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Draft Document</title><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;padding:40px 20px;line-height:1.8;color:#111;max-width:800px;margin:0 auto}h1,h2,h3{margin-bottom:12px}@media(min-width:640px){body{padding:60px 40px}}</style></head><body><pre style="white-space:pre-wrap;font-family:inherit;background:none;border:none;">${formatForDownload(content)}</pre><script>window.print();window.close();<\/script></body></html>`,
    );
    printWindow.document.close();
  };

  const handleDownloadDoc = (content) => {
    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Draft Document</title></head><body>";
    const footer = "</body></html>";
    const html =
      header +
      "<div style='white-space:pre-wrap;font-family:sans-serif;line-height:1.6;'>" +
      formatForDownload(content) +
      "</div>" +
      footer;

    const blob = new Blob(["\ufeff", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Draft_Document.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 sm:gap-3.5 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {/* Assistant avatar */}
            {msg.type === "assistant" && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-blue-from to-blue-to flex items-center justify-center shrink-0 mt-1 shadow-sm shadow-blue-from/20">
                <Bot
                  size={14}
                  strokeWidth={2}
                  className="text-white sm:hidden"
                />
                <Bot
                  size={15}
                  strokeWidth={2}
                  className="text-white hidden sm:block"
                />
              </div>
            )}

            {/* Message Content */}
            {msg.isDraft ? (
              <div className="w-full max-w-full lg:max-w-[850px] mt-2 sm:mt-4 mb-2 sm:mb-4 group">
                <div className="bg-colorwhite border border-colordark/[0.08] rounded-xl shadow-[0_20px_60px_-15px_rgba(15,15,12,0.1)] overflow-hidden flex flex-col">
                  {/* Document Header Toolbar */}
                  <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-colordark/[0.02] border-b border-colordark/[0.06]">
                    <div className="flex items-center gap-2">
                      <FileText
                        size={14}
                        strokeWidth={2.5}
                        className="text-blue-from sm:hidden"
                      />
                      <FileText
                        size={16}
                        strokeWidth={2.5}
                        className="text-blue-from hidden sm:block"
                      />
                      <span className="text-[0.8125rem] sm:text-[0.875rem] font-semibold text-colordark">
                        Document Draft
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => handleDownloadDoc(msg.content)}
                        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-[0.6875rem] sm:text-[0.75rem] font-medium text-colordark/60 hover:text-colordark hover:bg-colorwhite border border-colordark/[0.04] hover:border-colordark/[0.08] shadow-sm rounded-lg transition-all bg-white cursor-pointer"
                      >
                        <Download size={12} strokeWidth={2} />
                        Word
                      </button>
                      <button
                        onClick={() => handleDownloadPdf(msg.content)}
                        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-[0.6875rem] sm:text-[0.75rem] font-medium text-white hover:shadow-[0_4px_12px_-2px_rgba(59,130,246,0.3)] border border-transparent hover:border-blue-from rounded-lg transition-all bg-gradient-to-br from-blue-from to-blue-to shadow-sm cursor-pointer"
                      >
                        <Download size={12} strokeWidth={2} />
                        PDF
                      </button>
                    </div>
                  </div>

                  {/* Document Body */}
                  <div className="w-full bg-white px-4 sm:px-8 lg:px-14 py-8 sm:py-12 lg:py-16">
                    <div className="prose prose-sm prose-slate max-w-[800px] mx-auto prose-headings:font-bold prose-headings:text-colordark prose-p:text-colordark/80 prose-strong:text-colordark prose-p:leading-[1.8] prose-a:text-blue-from">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>

                {/* Meta row outside */}
                <div className="flex items-center gap-2 mt-2 px-1">
                  <span className="text-[0.6875rem] font-medium text-colordark/30">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <div className="flex items-center gap-0.5 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    <CopyButton text={msg.content} />
                    <button
                      className="p-1.5 rounded-lg text-colordark/30 hover:text-blue-from hover:bg-blue-from/[0.06] transition-all cursor-pointer"
                      title="Good response"
                    >
                      <ThumbsUp size={13} strokeWidth={2} />
                    </button>
                    <button
                      className="p-1.5 rounded-lg text-colordark/30 hover:text-blue-from hover:bg-blue-from/[0.06] transition-all cursor-pointer"
                      title="Bad response"
                    >
                      <ThumbsDown size={13} strokeWidth={2} />
                    </button>
                    <button
                      className="p-1.5 rounded-lg text-colordark/30 hover:text-blue-from hover:bg-blue-from/[0.06] transition-all cursor-pointer"
                      title="Regenerate"
                    >
                      <RotateCcw size={13} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`max-w-[90%] sm:max-w-[80%] group ${msg.type === "user" ? "flex flex-col items-end" : "flex flex-col items-start"}`}
              >
                <div
                  className={`px-3.5 sm:px-4.5 py-3 sm:py-3.5 text-[0.8125rem] sm:text-[0.875rem] leading-[1.7] tracking-[-0.005em] ${
                    msg.type === "user"
                      ? "bg-colorlight border border-colordark/[0.06] text-colordark/90 rounded-2xl rounded-tr-sm shadow-[0_1px_4px_-1px_rgba(15,15,12,0.04)]"
                      : "bg-colorwhite/80 border border-colordark/[0.06] text-colordark/80 rounded-2xl rounded-tl-sm shadow-[0_1px_4px_-1px_rgba(15,15,12,0.04)]"
                  }`}
                >
                  <div className="whitespace-pre-wrap">
                    {formatContent(msg.content)}
                  </div>
                </div>

                {/* Meta row */}
                <div
                  className={`flex items-center gap-2 mt-1.5 px-1 ${msg.type === "user" ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-[0.6875rem] font-medium text-colordark/30">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  {msg.type === "assistant" && (
                    <div className="flex items-center gap-0.5 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                      <CopyButton text={msg.content} />
                      <button
                        className="p-1.5 rounded-lg text-colordark/30 hover:text-blue-from hover:bg-blue-from/[0.06] transition-all cursor-pointer"
                        title="Good response"
                      >
                        <ThumbsUp size={13} strokeWidth={2} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-colordark/30 hover:text-blue-from hover:bg-blue-from/[0.06] transition-all cursor-pointer"
                        title="Bad response"
                      >
                        <ThumbsDown size={13} strokeWidth={2} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-colordark/30 hover:text-blue-from hover:bg-blue-from/[0.06] transition-all cursor-pointer"
                        title="Regenerate"
                      >
                        <RotateCcw size={13} strokeWidth={2} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* User avatar */}
            {msg.type === "user" && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-colorlight border border-colordark/[0.06] flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <User
                  size={13}
                  strokeWidth={2}
                  className="text-colordark/60 sm:hidden"
                />
                <User
                  size={14}
                  strokeWidth={2}
                  className="text-colordark/60 hidden sm:block"
                />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2.5 sm:gap-3.5 justify-start">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-blue-from to-blue-to flex items-center justify-center shrink-0 mt-1 shadow-sm shadow-blue-from/20">
              <Bot size={14} strokeWidth={2} className="text-white sm:hidden" />
              <Bot
                size={15}
                strokeWidth={2}
                className="text-white hidden sm:block"
              />
            </div>
            <div className="px-4 sm:px-5 py-3 sm:py-4 rounded-2xl rounded-tl-sm bg-colorwhite/80 border border-colordark/[0.06] shadow-[0_1px_4px_-1px_rgba(15,15,12,0.04)]">
              <div className="flex items-center gap-1.5">
                {[0, 150, 300].map((delay) => (
                  <div
                    key={delay}
                    className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] bg-gradient-to-br from-blue-from to-blue-to rounded-full animate-bounce"
                    style={{
                      animationDelay: `${delay}ms`,
                      animationDuration: "0.8s",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
