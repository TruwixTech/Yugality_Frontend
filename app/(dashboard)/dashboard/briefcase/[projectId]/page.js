"use client"
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { Search, Download, AlignLeft, Table, ChevronLeft, Loader2 } from "lucide-react";
import DocumentsPanel from "@/app/components/briefcase/DocumentsPanel";
import QueryView from "@/app/components/briefcase/QueryView";
import TableView from "@/app/components/briefcase/TableView";

export default function BriefcaseProjectPage() {
  const router = useRouter();
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("query");
  const [fileSearch, setFileSearch] = useState("");
  const [resultSearch, setResultSearch] = useState("");

  const fetchProjectDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/briefcase/${projectId}`);
      if (response.ok) {
        const data = await response.json();
        setProject(data);
      } else {
        console.error("Failed to fetch project details");
      }
    } catch (err) {
      console.error("Error fetching project details:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  // Map backend documents to frontend format
  const files = useMemo(() => {
    if (!project?.documents) return [];
    return project.documents.map(doc => ({
      id: doc._id,
      name: doc.fileName,
      url: doc.fileUrl,
      size: "N/A", // Backend doesn't store size yet
      type: doc.fileName.split('.').pop() || 'file'
    }));
  }, [project]);

  // Filter files by search
  const filteredFiles = useMemo(() => {
    return files.filter(f => f.name.toLowerCase().includes(fileSearch.toLowerCase()));
  }, [files, fileSearch]);

  const setFilesProxy = async (newFiles) => {
    // This is called by DocumentsPanel to "setFiles", 
    // but we handle uploads via API and then re-fetch.
    // However, if the component expects a direct state setter, we might need a workaround.
    // For now, we'll re-fetch after any change.
    await fetchProjectDetails();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-from animate-spin mb-4" />
        <p className="text-colordark/50 font-medium text-lg">Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-semibold text-colordark/70 mb-2">Project not found</h2>
        <button 
          onClick={() => router.push("/dashboard/briefcase")}
          className="text-blue-from font-medium hover:underline"
        >
          Back to Briefcase
        </button>
      </div>
    );
  }

  const queries = project.queries || [];

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">
      {/* Header */}
      <div className="mb-5 sm:mb-6 flex flex-col gap-4 sm:gap-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <button onClick={() => router.push("/dashboard/briefcase")} className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl border border-colordark/[0.08] text-colordark/50 hover:text-blue-from hover:border-blue-from/40 transition-all shrink-0 cursor-pointer shadow-sm mt-0.5">
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-[1.125rem] sm:text-[1.375rem] md:text-[1.75rem] font-semibold text-colordark tracking-[-0.02em] leading-tight break-words">
              {project.name}
            </h1>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[0.8125rem] sm:text-[0.875rem] text-colordark/45 mt-1 overflow-hidden">
              <span className="cursor-pointer hover:text-blue-from transition-colors whitespace-nowrap" onClick={() => router.push("/dashboard/briefcase")}>Briefcase</span>
              <span>/</span>
              <span className="truncate">{project.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout — stacks on mobile, side-by-side on lg */}
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_340px] gap-5 sm:gap-6">
        
        {/* Left Content Area */}
        <div className="flex flex-col gap-5 sm:gap-6 min-w-0">
          <div className="rounded-2xl border border-colordark/[0.06]">
            
            {/* Toolbar */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center justify-between border-b border-colordark/[0.06]">
              {/* Tab switcher */}
              <div className="flex items-center bg-colordark/[0.03] p-1 rounded-xl self-start">
                <button onClick={() => setActiveTab("query")}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-[0.8125rem] sm:text-[0.875rem] font-medium rounded-lg transition-all cursor-pointer ${activeTab === "query" ? "bg-white text-blue-from shadow-sm border border-colordark/[0.04]" : "text-colordark/55 hover:text-colordark"}`}>
                  <AlignLeft size={15} strokeWidth={2} />
                  <span className="hidden xs:inline">Query</span> View
                </button>
                <button onClick={() => setActiveTab("table")}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-[0.8125rem] sm:text-[0.875rem] font-medium rounded-lg transition-all cursor-pointer ${activeTab === "table" ? "bg-white text-blue-from shadow-sm border border-colordark/[0.04]" : "text-colordark/55 hover:text-colordark"}`}>
                  <Table size={15} strokeWidth={2} />
                  <span className="hidden xs:inline">Table</span> View
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button className="flex items-center gap-1.5 px-3 sm:px-4 h-9 text-[0.8125rem] font-medium text-colordark/60 hover:text-colordark border border-colordark/[0.08] hover:border-colordark/15 rounded-xl transition-all cursor-pointer shadow-sm">
                  <Download size={14} strokeWidth={2} />
                  <span className="hidden sm:inline">Results</span>
                </button>
                <div className="relative group flex-1 sm:flex-none">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-colordark/30 group-focus-within:text-blue-from transition-colors" strokeWidth={2} />
                  <input type="text" placeholder="Search Results" value={resultSearch} onChange={(e) => setResultSearch(e.target.value)}
                    className="w-full sm:w-[200px] h-9 pl-9 pr-3 text-[0.8125rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] transition-all cursor-text shadow-sm" />
                </div>
              </div>
            </div>

            {/* Content Display */}
            <div className="overflow-x-auto">
              <div className="p-4 sm:p-6 min-w-0">
               {activeTab === "query"
                ? <QueryView queries={queries} />
                : <TableView queries={queries} />
               }
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar — DocumentsPanel */}
        <div className="flex flex-col">
          <DocumentsPanel
            files={files}
            setFiles={setFilesProxy}
            fileSearch={fileSearch}
            setFileSearch={setFileSearch}
            projectId={projectId}
          />
        </div>

      </div>
    </div>
  );
}
