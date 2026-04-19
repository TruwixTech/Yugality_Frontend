"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Filter, Search, Plus, Trash2, ChevronLeft, Loader2, Sparkles } from "lucide-react";
import ChronologyTable from "@/app/components/chronology/ChronologyTable";
import AddEventModal from "@/app/components/chronology/AddEventModal";

export default function ProjectDetailPage() {
  const router = useRouter();
  const { projectId } = useParams();
  const fileInputRef = useRef(null);

  const [projectName, setProjectName] = useState("Loading Project...");
  const [chronologies, setChronologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchTimeline = useCallback(async () => {
    setLoading(true);
    try {
      // First get project name from briefcase
      const projectRes = await fetch(`/api/briefcase/${projectId}`);
      if (projectRes.ok) {
        const projectData = await projectRes.json();
        setProjectName(projectData.name || projectData.caseName);
      }

      // Then get timeline events
      const response = await fetch(`/api/chronology/timeline/${projectId}`);
      if (response.ok) {
        const data = await response.json();
        const formattedEvents = data.data.map(event => ({
          id: event._id,
          date: new Date(event.eventDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
          }),
          event: event.description,
          source: event.sourceFile || "Manual Entry",
          issue: event.importance || "Medium",
          tags: event.tags || []
        }));
        setChronologies(formattedEvents);
      } else {
        console.error("Failed to fetch timeline");
      }
    } catch (err) {
      console.error("Error fetching timeline:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchTimeline();
  }, [fetchTimeline]);

  const handleManualAdd = async (eventData) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/chronology/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...eventData, briefCaseId: projectId }),
      });

      if (response.ok) {
        await fetchTimeline();
        setShowAddModal(false);
      } else {
        alert("Failed to add event");
      }
    } catch (err) {
      console.error("Error adding event:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = chronologies.filter(c =>
    c.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRow = (id) => setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  const toggleAll = () => setSelectedRows(selectedRows.length === chronologies.length ? [] : chronologies.map(c => c.id));

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const response = await fetch(`/api/chronology/event/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setChronologies(prev => prev.filter(c => c.id !== id));
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedRows.length} events?`)) return;
    for (const id of selectedRows) {
      await fetch(`/api/chronology/event/${id}`, { method: "DELETE" });
    }
    setChronologies(prev => prev.filter(c => !selectedRows.includes(c.id)));
    setSelectedRows([]);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsGenerating(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('briefCaseId', projectId);

    try {
      const response = await fetch('/api/chronology/generate', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await fetchTimeline();
        alert("Chronology generated successfully!");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to generate chronology");
      }
    } catch (err) {
      console.error("Error generating chronology:", err);
      alert("An error occurred during generation");
    } finally {
      setIsGenerating(false);
      e.target.value = null;
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">
      
      {/* Header */}
      <div className="mb-5 sm:mb-6 flex flex-col gap-4 sm:gap-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <button onClick={() => router.push("/dashboard/chronology")} className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl border border-colordark/[0.08] text-colordark/50 hover:text-blue-from hover:border-blue-from/40 transition-all shrink-0 cursor-pointer shadow-sm mt-0.5">
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-[1.125rem] sm:text-[1.375rem] md:text-[1.75rem] font-semibold text-colordark tracking-[-0.02em] leading-tight break-words">
              {projectName}
            </h1>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[0.8125rem] sm:text-[0.875rem] text-colordark/45 mt-1 overflow-hidden">
              <span className="cursor-pointer hover:text-blue-from transition-colors whitespace-nowrap" onClick={() => router.push("/dashboard/chronology")}>Chronology</span>
              <span>/</span>
              <span className="truncate">{projectName}</span>
            </div>
          </div>
        </div>

        {/* Action buttons — wrap on mobile */}
        <div className="flex flex-wrap items-center justify-between w-full">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {selectedRows.length > 0 && (
              <button onClick={handleBulkDelete}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 h-9 text-[0.8125rem] font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all cursor-pointer whitespace-nowrap">
                <Trash2 size={15} strokeWidth={2} />Delete Selected
              </button>
            )}
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 h-9 text-[0.8125rem] font-medium text-colordark/60 hover:text-colordark border border-colordark/[0.08] hover:border-colordark/15 rounded-xl transition-all cursor-pointer shadow-sm whitespace-nowrap">
              <Plus size={15} strokeWidth={2} />Add Event
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf,.docx" className="hidden" />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-3 sm:px-4 h-9 text-[0.8125rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-[0_4px_15px_-3px_rgba(59,130,246,0.4)] rounded-xl transition-all cursor-pointer shadow-sm whitespace-nowrap disabled:opacity-50">
              {isGenerating ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Sparkles size={15} strokeWidth={2} />
              )}
              <span className="hidden sm:inline">AI Extract</span> Timeline
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 sm:gap-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 border border-colordark/[0.06] rounded-2xl bg-white">
            <Loader2 size={32} className="text-blue-from animate-spin" />
            <p className="text-[0.875rem] text-colordark/40">Fetching chronology events...</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-colordark/[0.06] overflow-hidden bg-white shadow-sm">
            {/* Toolbar */}
            <div className="px-4 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-colordark/[0.06]">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <button className="flex items-center gap-1.5 px-3 sm:px-3.5 h-9 text-[0.8125rem] font-medium text-colordark/60 hover:text-colordark border border-colordark/[0.08] hover:border-colordark/15 rounded-xl transition-all cursor-pointer">
                  <Filter size={14} strokeWidth={2} />Filters
                </button>
                <div className="w-px h-5 bg-colordark/10" />
                <p className="text-[0.75rem] font-medium text-colordark/40">{chronologies.length} Events Total</p>
              </div>
              
              <div className="flex items-center">
                <div className="relative group w-full sm:w-[220px]">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-colordark/30 group-focus-within:text-blue-from transition-colors" strokeWidth={2} />
                  <input type="text" placeholder="Search chronologies" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-9 pl-9 pr-4 text-[0.8125rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] transition-all cursor-text shadow-sm" />
                </div>
              </div>
            </div>

            <ChronologyTable
              filtered={filtered}
              chronologies={chronologies}
              selectedRows={selectedRows}
              toggleRow={toggleRow}
              toggleAll={toggleAll}
              onDelete={handleDeleteEvent}
            />
          </div>
        )}
      </div>

      <AddEventModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleManualAdd}
        isSaving={isSaving}
      />
    </div>
  );
}
