"use client";

import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import mammoth from 'mammoth';

export default function DocumentViewer({ file, type, content }) {
  const [docxHtml, setDocxHtml] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target.result;
          const result = await mammoth.convertToHtml({ arrayBuffer });
          setDocxHtml(result.value);
        } catch (error) {
          console.error('Error parsing DOCX:', error);
          setDocxHtml('<p>Error loading document</p>');
        } finally {
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file, type]);

  // Text file
  if (type === 'text/plain' && content) {
    return (
      <div className="h-full p-4 sm:p-6 overflow-y-auto">
        <pre className="text-[0.8125rem] sm:text-[0.875rem] text-colordark leading-relaxed whitespace-pre-wrap font-sans">
          {content}
        </pre>
      </div>
    );
  }

  // PDF file
  if (type === 'application/pdf' && content) {
    return (
      <iframe
        src={content}
        className="w-full h-full border-0"
        title="PDF Preview"
      />
    );
  }

  // DOCX file
  if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    if (loading) {
      return (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-[0.8125rem] sm:text-[0.875rem] text-colordark/[0.55]">Loading document...</p>
          </div>
        </div>
      );
    }

    if (docxHtml) {
      return (
        <div className="h-full p-4 sm:p-6 overflow-y-auto">
          <div 
            className="prose prose-sm max-w-none text-colordark"
            dangerouslySetInnerHTML={{ __html: docxHtml }}
          />
        </div>
      );
    }

    return (
      <div className="h-full p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-colordark/30 mx-auto mb-3 sm:mb-4" strokeWidth={1.5} />
          <p className="text-[0.875rem] sm:text-[0.9375rem] font-semibold text-colordark mb-2">
            DOCX Document
          </p>
          <p className="text-[0.75rem] sm:text-[0.8125rem] text-colordark/[0.55]">
            Processing document...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center px-4">
        <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-colordark/30 mx-auto mb-3 sm:mb-4" strokeWidth={1.5} />
        <p className="text-[0.875rem] sm:text-[0.9375rem] font-semibold text-colordark mb-2">
          Unsupported File Type
        </p>
        <p className="text-[0.75rem] sm:text-[0.8125rem] text-colordark/[0.55]">
          Please upload a PDF, DOCX, or TXT file
        </p>
      </div>
    </div>
  );
}
