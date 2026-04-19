"use client";

import { useRef, useState } from "react";
import { Search, Plus, FileText, X, Loader2 } from "lucide-react";

const typeIcon = (type) => {
  const colors = { pdf: "text-red-500", docx: "text-blue-500", doc: "text-blue-500" };
  return colors[type] || "text-colordark/50";
};

export default function DocumentsPanel({ files, setFiles, fileSearch, setFileSearch, projectId }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('document', file);
    });

    try {
      const response = await fetch(`/api/briefcase/${projectId}/documents`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        // Trigger a re-fetch in the parent component
        setFiles(null); 
      } else {
        alert("Failed to upload files");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading files");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    
    try {
        // Assuming we can delete from documents API
        const response = await fetch(`/api/documents/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            setFiles(null); // Trigger re-fetch
        } else {
            alert("Failed to delete document");
        }
    } catch (err) {
        console.error("Delete error:", err);
    }
  };

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(fileSearch.toLowerCase()));

  return (
    <div className="w-full flex flex-col rounded-2xl border border-colordark/[0.06] shadow-sm max-h-[500px] lg:max-h-[800px]">
      <div className="px-4 sm:px-5 py-4 sm:py-5 border-b border-colordark/[0.06] flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-[0.9375rem] sm:text-[1rem] font-semibold text-colordark">Documents</h2>
          <p className="text-[0.75rem] text-colordark/50 mt-0.5">{files.length} Files</p>
        </div>
        <input ref={fileInputRef} type="file" multiple accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={handleUpload} />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center justify-center w-8 h-8 rounded-xl text-white bg-gradient-to-br from-blue-from to-blue-to hover:shadow-md hover:shadow-blue-from/20 transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} strokeWidth={2.5} />}
        </button>
      </div>

      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-colordark/[0.06] shrink-0">
        <div className="relative group">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-colordark/30 group-focus-within:text-blue-from transition-colors" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search Files"
            value={fileSearch}
            onChange={(e) => setFileSearch(e.target.value)}
            className="w-full h-9 sm:h-10 pl-9 pr-4 text-[0.8125rem] sm:text-[0.875rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] transition-all cursor-text"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-1 sm:py-2">
        {filteredFiles.map((file) => (
          <div key={file.id} className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-colordark/[0.015] transition-colors cursor-pointer group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-colordark/[0.06] flex items-center justify-center shrink-0 bg-white shadow-sm">
              <FileText size={13} strokeWidth={2} className={`${typeIcon(file.type)}`} />
            </div>
            <span className="text-[0.75rem] sm:text-[0.8125rem] font-medium text-colordark/80 truncate flex-1 group-hover:text-blue-from transition-colors">{file.name}</span>
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(file.id); }}
              className="p-1 sm:p-1.5 text-colordark/30 hover:text-red-500 rounded-lg transition-all opacity-0 group-hover:opacity-100 shrink-0 cursor-pointer"
            >
              <X size={13} strokeWidth={2} />
            </button>
          </div>
        ))}
        {filteredFiles.length === 0 && (
          <div className="px-5 py-6 sm:py-8 text-center">
            <p className="text-[0.8125rem] text-colordark/40">No files found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
