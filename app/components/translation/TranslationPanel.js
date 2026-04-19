"use client";

import { Download, Languages as LanguagesIcon, Loader2 } from "lucide-react";
import LanguageDropdown from "./LanguageDropdown";

export default function TranslationPanel({ uploadedFile, isTranslating, translatedContent, targetLanguage, onTargetChange, onTranslate, onDownload }) {
  return (
    <div className="flex flex-col w-full md:w-1/2 min-h-[40vh] md:min-h-0">
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-colordark/[0.06] flex items-center justify-between shrink-0">
        <div className="min-w-0">
          <h2 className="text-[0.875rem] sm:text-[0.9375rem] font-semibold text-colordark tracking-[-0.01em]">Translated Document</h2>
          <p className="text-[0.6875rem] sm:text-[0.75rem] text-colordark/40 font-bold mt-0.5">
            {translatedContent ? `Translated to ${targetLanguage}` : "Translation will appear here"}
          </p>
        </div>
        {translatedContent && !isTranslating && (
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-2">
            {translatedContent.type === "application/pdf" ? (
              <button 
                onClick={() => onDownload("pdf")}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 h-8 text-[0.75rem] sm:text-[0.8125rem] font-medium text-colordark/60 border border-colordark/[0.06] hover:border-colordark/15 rounded-xl transition-all cursor-pointer">
                <Download size={13} strokeWidth={2} /> PDF
              </button>
            ) : (
              <button 
                onClick={() => onDownload("docx")}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 h-8 text-[0.75rem] sm:text-[0.8125rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-[0_4px_12px_-2px_rgba(59,130,246,0.3)] shadow-sm rounded-xl transition-all cursor-pointer">
                <Download size={13} strokeWidth={2} /> DOCX
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden flex items-center justify-center">
        {!uploadedFile && (
          <div className="text-center p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <LanguagesIcon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-from/50" strokeWidth={1.5} />
            </div>
            <p className="text-[0.875rem] sm:text-[0.9375rem] font-semibold text-colordark/50 mb-1">No Translation Yet</p>
            <p className="text-[0.75rem] sm:text-[0.8125rem] text-colordark/35 font-bold">Upload a document to get started</p>
          </div>
        )}

        {uploadedFile && isTranslating && (
          <div className="text-center p-6 sm:p-8">
            <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-blue-from/50 mx-auto mb-3 sm:mb-4 animate-spin" strokeWidth={1.5} />
            <p className="text-[0.875rem] sm:text-[0.9375rem] font-semibold text-colordark mb-1">Translating...</p>
            <p className="text-[0.75rem] sm:text-[0.8125rem] text-colordark/45 font-bold">This may take a few moments</p>
          </div>
        )}

        {uploadedFile && !isTranslating && !translatedContent && (
          <div className="text-center max-w-xs p-6 sm:p-8 w-full">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-from to-blue-to flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-sm shadow-blue-from/20">
              <LanguagesIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2} />
            </div>
            <p className="text-[0.875rem] sm:text-[0.9375rem] font-semibold text-colordark mb-4">Select Target Language</p>
            <LanguageDropdown value={targetLanguage} onChange={onTargetChange} />
            <button onClick={onTranslate}
              className="flex items-center justify-center gap-2 w-full h-11 text-[0.8125rem] sm:text-[0.875rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-[0_4px_12px_-2px_rgba(59,130,246,0.3)] shadow-sm rounded-xl transition-all cursor-pointer">
              <LanguagesIcon size={16} strokeWidth={2} />
              Translate to {targetLanguage}
            </button>
            <p className="text-[0.6875rem] sm:text-[0.75rem] text-colordark/35 font-bold mt-3">Language auto-detected</p>
          </div>
        )}

        {uploadedFile && !isTranslating && translatedContent && (
          <div className="h-full w-full p-4 sm:p-6 overflow-y-auto self-start">
            <pre className="text-[0.8125rem] sm:text-[0.875rem] text-colordark leading-[1.8] whitespace-pre-wrap font-sans">
              {translatedContent.text}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
