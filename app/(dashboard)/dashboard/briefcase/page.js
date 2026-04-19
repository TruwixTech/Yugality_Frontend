"use client"
import { useEffect, useState , useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Briefcase, Loader2 } from "lucide-react";
import BriefcaseHeader from "@/app/components/briefcase/BriefcaseHeader";
import ProjectsTable from "@/app/components/briefcase/ProjectsTable";
import CreateProjectModal from "@/app/components/briefcase/CreateProjectModal";
import UploadModal from "@/app/components/briefcase/UploadModal";

export default function BriefcasePage() {
    const router = useRouter();

    const [cases, setCases] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);

    // Create project modal state
    const [projectName, setProjectName] = useState("");
    const [uploadedDocs, setUploadedDocs] = useState([]);

    // Upload modal state
    const [selectedCase, setSelectedCase] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    console.log(cases , "🧡")
    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/briefcase');
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setCases(data.map(item => ({
                    id: item._id,
                    name: item.caseName,
                    fileCount: item.documents?.length || 0,
                    lastModified: new Date(item.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
                    lastUpdated: new Date(item.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
                    owner: "You",
                    starred: false,
                })));
            }
        } catch (err) {
            console.error("Failed to fetch cases", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const filtered = cases.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleRowClick = (id) => {
        router.push(`/dashboard/briefcase/${id}`);
    };

    const handleStar = (e, id) => {
        e.stopPropagation();
        setCases(cases.map((c) => (c.id === id ? { ...c, starred: !c.starred } : c)));
    };

    const handleDelete = async (e, id) => {
        if (e) e.stopPropagation();
        if (confirm("Delete this briefcase and all its files?")) {
            try {
                const response = await fetch(`/api/briefcase/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    setCases(cases.filter((c) => c.id !== id));
                } else {
                    alert("Failed to delete briefcase");
                }
            } catch (err) {
                console.error("Delete failed", err);
                alert("An error occurred while deleting");
            }
        }
    };


    // TO CREATE A NEW PROJECT
    const handleCreateProject = async () => {
        if (!projectName.trim()) return;
        
        const formData = new FormData();
        formData.append('caseName', projectName);
        // Backend expects 'document' as a single file in createBriefcase
        if (uploadedDocs.length > 0) {
            formData.append('document', uploadedDocs[0]);
        }

        try {
            const response = await fetch('/api/briefcase', {
                method: 'POST',
                body: formData
            });

            console.log(response)
            if (response.ok) {
                await fetchProjects();
                setProjectName("");
                setUploadedDocs([]);
                setShowCreateModal(false);
            } else {
                const error = await response.json();
                alert(error.error || "Failed to create project");
            }
        } catch (err) {
            console.error("Create failed", err);
            alert("An error occurred while creating project");
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !selectedCase) return;
        
        const formData = new FormData();
        // Backend expects 'document' field with array of files
        formData.append('document', selectedFile);

        try {
            const response = await fetch(`/api/briefcase/${selectedCase}/documents`, {
                method: 'PUT',
                body: formData
            });

            if (response.ok) {
                await fetchProjects();
                setSelectedFile(null);
                setSelectedCase("");
                setShowUploadModal(false);
            } else {
                const error = await response.json();
                alert(error.error || "Failed to upload file");
            }
        } catch (err) {
            console.error("Upload failed", err);
            alert("An error occurred while uploading");
        }
    };

    return (
        <div className="min-h-screen px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                    <h1 className="text-[1.25rem] sm:text-[1.5rem] font-semibold text-colordark tracking-[-0.02em]">
                        Briefcase
                    </h1>
                    <p className="text-[0.8125rem] sm:text-[0.875rem] text-colordark/50 font-bold mt-1">
                        {cases.length} projects · Manage your legal documents and cases
                    </p>
                </div>

                {/* THE UPLOAD----NEW  CASE CREATE BUTTON */}
                <BriefcaseHeader
                    currentFolder={null}
                    onUpload={() => setShowUploadModal(true)}
                    onNewCase={() => setShowCreateModal(true)}
                />
            </div>

            {/* Search */}
            <div className="mb-5 sm:mb-6">
                <div className="relative group max-w-full sm:max-w-sm">
                    <Search
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-colordark/30 group-focus-within:text-blue-from transition-colors"
                        strokeWidth={2}
                    />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 text-[0.8125rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-blue-from animate-spin mb-4" />
                    <p className="text-colordark/50 font-medium">Loading projects...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
                    <Briefcase size={48} className="text-colordark/15 mb-4" strokeWidth={1.5} />
                    <p className="text-[1rem] font-medium text-colordark/50 mb-1">No projects found</p>
                    <p className="text-[0.875rem] text-colordark/35">
                        {search ? "Try a different search term" : "Create your first project to get started"}
                    </p>
                </div>
            ) : (
                <ProjectsTable
                    projects={cases}
                    filtered={filtered}
                    onRowClick={handleRowClick}
                    onStar={handleStar}
                    onDelete={handleDelete}
                />
            )}

            {/* Create Project Modal */}
            {showCreateModal && (
                <CreateProjectModal
                    projectName={projectName}
                    setProjectName={setProjectName}
                    uploadedDocs={uploadedDocs}
                    setUploadedDocs={setUploadedDocs}
                    onCreate={handleCreateProject}
                    onClose={() => {
                        setShowCreateModal(false);
                        setProjectName("");
                        setUploadedDocs([]);
                    }}
                />
            )}

            {/* Upload Modal */}
            {showUploadModal && (
                <UploadModal
                    cases={cases}
                    currentFolder={null}
                    selectedCase={selectedCase}
                    onCaseChange={setSelectedCase}
                    selectedFile={selectedFile}
                    onFileSelect={(e) => setSelectedFile(e.target.files[0])}
                    onUpload={handleUpload}
                    onClose={() => {
                        setShowUploadModal(false);
                        setSelectedFile(null);
                        setSelectedCase("");
                    }}
                />
            )}
        </div>
    );
}
