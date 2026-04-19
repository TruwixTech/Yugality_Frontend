"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Loader2, Folder } from "lucide-react";
import ProjectsTable from "@/app/components/chronology/ProjectsTable";
import CreateProjectModal from "@/app/components/chronology/CreateProjectModal";

export default function ChronologyPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState([]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/briefcase');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.map(item => ({
          id: item._id,
          name: item.caseName,
          createdAt: new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          }),
        })));
      }
    } catch (err) {
      console.error("Failed to fetch cases:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreate = async () => {
    if (!newProjectName.trim()) return;
    
    // For now, redirect to briefcase to create if needed, 
    // or we could implement project creation here too if they want separate chronology projects.
    // But backend uses briefCaseId, so we should probably stick to briefcases.
    alert("Please create a new project in the Briefcase module.");
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">
        {/* Header — stacks on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h2 className="text-[1.125rem] sm:text-[1.25rem] font-semibold text-colordark tracking-[-0.01em]">
            Projects
          </h2>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex-1 sm:flex-none">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-colordark/40"
                strokeWidth={2}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[200px] md:w-[240px] h-10 pl-10 pr-4 text-[0.8125rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all"
              />
            </div>

            {/* UPLOAD THE FILES BUTTON */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 h-9 sm:h-10 text-[0.8125rem] sm:text-[0.875rem] font-semibold text-white bg-linear-to-br from-blue-from to-blue-to hover:shadow-lg rounded-xl transition-all shrink-0"
            >
              <Plus size={15} strokeWidth={2} />
              <span className="hidden xs:inline">Create</span>{" "}
              <span className="hidden sm:inline">Project</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 size={32} className="text-blue-from animate-spin" />
            <p className="text-[0.875rem] text-colordark/40">Loading projects...</p>
          </div>
        ) : (
          <ProjectsTable
            filtered={filtered}
            onRowClick={(id) => router.push(`/dashboard/chronology/${id}`)}
            onDelete={(id) => setProjects(projects.filter((p) => p.id !== id))}
          />
        )}
      </div>

      {showCreateModal && (
        <CreateProjectModal
          projectName={newProjectName}
          setProjectName={setNewProjectName}
          uploadedDocs={uploadedDocs}
          setUploadedDocs={setUploadedDocs}
          onCreate={handleCreate}
          onClose={() => {
            setShowCreateModal(false);
            setNewProjectName("");
            setUploadedDocs([]);
          }}
        />
      )}
    </div>
  );
}
