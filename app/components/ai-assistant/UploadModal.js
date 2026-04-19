"use client";

import { useRef } from "react";
import { X, Upload, Image, FileText } from "lucide-react";

export default function UploadModal({ isOpen, onClose, onUpload }) {
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileSelect = (e, type) => {
    const files = Array.from(e.target.files || []);
    const newItems = files.map((f) => ({
      id: `upload-${Date.now()}-${f.name}`,
      name: f.name,
      source: type === "image" ? "Image Upload" : "File Upload",
      type: type,
    }));
    onUpload?.(newItems);
    onClose();
    e.target.value = "";
  };

  const uploadOptions = [
    {
      id: "image",
      label: "Upload Image",
      desc: "PNG, JPG, WEBP, GIF",
      icon: Image,
      color: "purple",
      inputRef: imageInputRef,
      accept: "image/*",
    },
    {
      id: "file",
      label: "Upload Document",
      desc: "PDF, DOC, DOCX, TXT",
      icon: FileText,
      color: "blue",
      inputRef: fileInputRef,
      accept: ".pdf,.doc,.docx,.txt",
    },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-colordark/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="w-full sm:max-w-[480px] rounded-t-2xl sm:rounded-2xl border border-colordark/[0.06] bg-colorlight shadow-[0_30px_80px_-10px_rgba(15,15,12,0.3)] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-colordark/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center">
                <Upload size={16} strokeWidth={2} className="text-blue-from" />
              </div>
              <div>
                <h2 className="text-[1rem] font-semibold text-colordark tracking-[-0.02em]">Upload Files</h2>
                <p className="text-[0.75rem] text-colordark/50">Add images or documents to your chat</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-colordark/40 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 space-y-3">
            {uploadOptions.map((option) => {
              const Icon = option.icon;
              const colorClasses = {
                purple: "bg-purple-100 text-purple-600",
                blue: "bg-blue-100 text-blue-600",
              };
              
              return (
                <div key={option.id}>
                  <button
                    onClick={() => option.inputRef.current?.click()}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white border border-colordark/[0.06] hover:bg-colordark/[0.02] hover:border-colordark/10 transition-all cursor-pointer group"
                  >
                    <div className={`w-12 h-12 rounded-xl ${colorClasses[option.color]} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-[0.9375rem] font-semibold text-colordark mb-0.5">{option.label}</h3>
                      <p className="text-[0.8125rem] text-colordark/50">{option.desc}</p>
                    </div>
                    <div className="text-colordark/30 group-hover:text-colordark/50 transition-colors">
                      <Upload size={18} strokeWidth={2} />
                    </div>
                  </button>
                  <input 
                    ref={option.inputRef} 
                    type="file" 
                    accept={option.accept} 
                    multiple 
                    className="hidden" 
                    onChange={(e) => handleFileSelect(e, option.id)} 
                  />
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-5 sm:px-6 py-4 border-t border-colordark/[0.06] bg-colordark/[0.01]">
            <p className="text-[0.75rem] text-colordark/40 text-center">
              You can upload multiple files at once
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
