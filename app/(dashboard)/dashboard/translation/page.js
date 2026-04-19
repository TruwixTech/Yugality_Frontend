"use client";

import { useState } from "react";
import UploadPanel from "@/app/components/translation/UploadPanel";
import TranslationPanel from "@/app/components/translation/TranslationPanel";

export default function TranslationPage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState("Hindi");
  const [isTranslating, setIsTranslating] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    if (file.type === "text/plain") {
      reader.onload = (ev) => setUploadedFile({ name: file.name, size: (file.size / 1024).toFixed(2) + " KB", type: file.type, content: ev.target.result, file });
      reader.readAsText(file);
    } else if (file.type === "application/pdf") {
      reader.onload = (ev) => setUploadedFile({ name: file.name, size: (file.size / 1024).toFixed(2) + " KB", type: file.type, content: ev.target.result, file });
      reader.readAsDataURL(file);
    } else {
      setUploadedFile({ name: file.name, size: (file.size / 1024).toFixed(2) + " KB", type: file.type, content: null, file });
    }
  };

  const handleTranslate = async () => {
    if (!uploadedFile) return;
    setIsTranslating(true);
    
    try {
      const type = uploadedFile.type === "application/pdf" ? "pdf" : "docx";
      const formData = new FormData();
      formData.append("file", uploadedFile.file);
      formData.append("targetLanguage", targetLanguage);
      formData.append("preview", "true");

      const response = await fetch(`/api/translation/${type}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setTranslatedContent({
          text: data.translatedText,
          type: uploadedFile.type,
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Translation failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Translation error:", err);
      alert("An error occurred during translation");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleDownload = async (format) => {
    if (!uploadedFile) return;
    
    try {
      const type = uploadedFile.type === "application/pdf" ? "pdf" : "docx";
      const formData = new FormData();
      formData.append("file", uploadedFile.file);
      formData.append("targetLanguage", targetLanguage);

      const response = await fetch(`/api/translation/${type}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `translated_${uploadedFile.name}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert("Download failed");
      }
    } catch (err) {
      console.error("Download error:", err);
      alert("Error downloading file");
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row border-t border-colordark/[0.06]">
        <UploadPanel uploadedFile={uploadedFile} onUpload={handleFileUpload} onClear={() => { setUploadedFile(null); setTranslatedContent(null); }} />
        <TranslationPanel uploadedFile={uploadedFile} isTranslating={isTranslating} translatedContent={translatedContent} targetLanguage={targetLanguage} onTargetChange={setTargetLanguage} onTranslate={handleTranslate} onDownload={handleDownload} />
      </div>
    </div>
  );
}
