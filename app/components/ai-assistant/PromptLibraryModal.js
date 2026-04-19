"use client";

import { useState } from "react";
import { X, Search, Star, MoreVertical, Eye, Sparkles, Plus, Edit3, Bot, ArrowLeft, Type, AlignLeft, FileText } from "lucide-react";

const categories = [
  {
    group: "Yugality Collection",
    items: [
      { id: "suggested", label: "Suggested Prompts" },
      { id: "dispute", label: "Dispute Resolution" },
      { id: "corporate", label: "General Corporate" },
      { id: "ma", label: "M&A" },
      { id: "contracts", label: "Contracts" },
      { id: "drafting", label: "Drafting" },
      { id: "inhouse", label: "Inhouse Teams" },
    ],
  },
  {
    group: "My Prompts",
    items: [
      { id: "created", label: "Created By Me" },
      { id: "starred", label: "Starred" },
      { id: "shared", label: "Shared With Me" },
    ],
  },
];

const initialPrompts = {
  suggested: [
    { id: "s1", title: "Written Statement", desc: "Create a comprehensive written statement using the provided documents with structured arguments and legal citations.", full: "Draft a detailed written statement for a legal proceeding. Include the following elements, formatted with bullet points and short paragraphs:\n\n• Case Details: Clearly state the case number, parties involved, and relevant dates.\n• Statement of Facts: Provide a chronological outline of the events pertinent to the case.\n• Legal Arguments: Present the legal basis and supporting arguments for your position.\n• Requests and Reliefs: Specify any legal remedies or reliefs being sought.\n• Signature Section: Include spaces for signatures and date.\n\nEnsure all key points are clearly presented with bullet points, headings, and sub-headings to avoid long dense blocks of text.", starred: false },
    { id: "s2", title: "Quick List of Dates and Events", desc: "Analyze the document(s) and extract all significant events along with their corresponding dates in chronological order.", full: "Analyze the provided document(s) and extract all significant events along with their corresponding dates. Present them in a chronological table format with the following columns:\n\n• Date\n• Event Description\n• Relevant Parties\n• Source Document / Page Reference\n\nEnsure accuracy and completeness. Flag any dates that appear ambiguous or conflicting.", starred: true },
    { id: "s3", title: "Draft Written Submission", desc: "Draft a comprehensive written statement for the case, ensuring the following guidelines are met.", full: "Draft a comprehensive written submission for the case. Follow these guidelines:\n\n• Begin with a brief introduction summarizing the matter.\n• Present facts in a clear, numbered format.\n• Cite relevant statutory provisions and case law.\n• Structure arguments logically with headings.\n• Include a prayer clause at the end.\n• Maintain formal legal language throughout.", starred: false },
    { id: "s4", title: "Case Summary & Analysis", desc: "Provide a detailed summary and legal analysis of the case including key issues, holdings, and implications.", full: "Provide a comprehensive case summary and analysis covering:\n\n• Case Citation and Court\n• Facts of the Case\n• Issues Framed by the Court\n• Arguments by Petitioner/Plaintiff\n• Arguments by Respondent/Defendant\n• Court's Analysis and Reasoning\n• Holding/Judgment\n• Ratio Decidendi\n• Implications and Precedent Value\n\nKeep the summary concise but thorough.", starred: false },
  ],
  dispute: [
    { id: "d1", title: "Arbitration Clause Analysis", desc: "Analyze the arbitration clause in the agreement and assess its enforceability under current law.", full: "Analyze the provided arbitration clause and assess:\n\n• Scope of the arbitration agreement\n• Governing law and seat of arbitration\n• Appointment mechanism for arbitrators\n• Enforceability under the Arbitration & Conciliation Act\n• Any potential grounds for challenge\n• Comparison with model arbitration clauses\n\nProvide recommendations for strengthening the clause.", starred: false },
    { id: "d2", title: "Mediation Brief", desc: "Prepare a structured mediation brief outlining the dispute, positions, and potential settlement options.", full: "Prepare a mediation brief with the following structure:\n\n• Background of the Dispute\n• Parties' Positions\n• Key Facts (undisputed and disputed)\n• Legal Issues\n• Previous Settlement Attempts\n• Proposed Settlement Options\n• BATNA/WATNA Analysis\n• Recommended Approach", starred: false },
  ],
  corporate: [
    { id: "gc1", title: "Board Resolution Draft", desc: "Draft a board resolution for the specified corporate action with proper recitals and enabling provisions.", full: "Draft a board resolution covering:\n\n• Meeting details (date, time, quorum)\n• Recitals and background\n• Resolution text with proper \"RESOLVED THAT\" format\n• Enabling provisions and authorizations\n• Filing requirements with MCA/ROC\n• Compliance checklist", starred: false },
    { id: "gc2", title: "Compliance Checklist", desc: "Generate a comprehensive compliance checklist for the specified regulatory framework.", full: "Generate a compliance checklist covering:\n\n• Applicable laws and regulations\n• Filing deadlines and frequency\n• Required forms and documents\n• Responsible person/department\n• Penalty for non-compliance\n• Status tracking columns\n\nOrganize by regulatory authority and deadline.", starred: true },
  ],
  ma: [
    { id: "ma1", title: "Due Diligence Checklist", desc: "Create a comprehensive due diligence checklist for the target company covering all key areas.", full: "Create a due diligence checklist covering:\n\n• Corporate Structure & Governance\n• Financial Statements & Tax Compliance\n• Material Contracts & Agreements\n• Intellectual Property Portfolio\n• Litigation & Regulatory Proceedings\n• Employment & Labor Matters\n• Real Estate & Assets\n• Insurance Coverage\n• Environmental Compliance\n• Data Privacy & IT Systems", starred: false },
  ],
  contracts: [
    { id: "c1", title: "Contract Review Summary", desc: "Review the contract and provide a structured summary of key terms, risks, and recommendations.", full: "Review the provided contract and summarize:\n\n• Parties and Effective Date\n• Key Obligations of Each Party\n• Payment Terms and Conditions\n• Representations & Warranties\n• Indemnification Provisions\n• Termination Clauses\n• Limitation of Liability\n• Governing Law & Dispute Resolution\n• Key Risks Identified\n• Recommended Modifications", starred: false },
  ],
  drafting: [
    { id: "dr1", title: "NDA Generator", desc: "Generate a non-disclosure agreement based on the specified parameters and relationship type.", full: "Generate an NDA with the following parameters:\n\n• Type: [Mutual/Unilateral]\n• Parties and their roles\n• Definition of Confidential Information\n• Exclusions from Confidential Information\n• Obligations of the Receiving Party\n• Term and survival period\n• Return/Destruction of information\n• Remedies for breach\n• Governing law and jurisdiction", starred: false },
  ],
  inhouse: [
    { id: "ih1", title: "Legal Risk Assessment", desc: "Conduct a legal risk assessment for the proposed business activity or transaction.", full: "Conduct a risk assessment covering:\n\n• Description of the Activity/Transaction\n• Applicable Legal Framework\n• Identified Legal Risks (categorized by severity)\n• Regulatory Compliance Requirements\n• Potential Exposure and Liability\n• Risk Mitigation Strategies\n• Recommended Internal Controls\n• Escalation Matrix", starred: false },
  ],
  created: [
    { id: "my1", title: "My Custom Legal Memo", desc: "A personalized template for internal legal memorandums with standardized formatting.", full: "Internal Legal Memorandum Template:\n\n• TO: [Recipient]\n• FROM: [Author]\n• DATE: [Date]\n• RE: [Subject Matter]\n\nQuestion Presented:\n[State the legal question clearly]\n\nShort Answer:\n[Provide a brief answer]\n\nFacts:\n[Relevant facts]\n\nAnalysis:\n[Detailed legal analysis]\n\nConclusion:\n[Final recommendation]", starred: true },
  ],
  starred: [],
  shared: [],
};

const saveCategoryOptions = [
  { id: "suggested", label: "Suggested Prompts" },
  { id: "dispute", label: "Dispute Resolution" },
  { id: "corporate", label: "General Corporate" },
  { id: "ma", label: "M&A" },
  { id: "contracts", label: "Contracts" },
  { id: "drafting", label: "Drafting" },
  { id: "inhouse", label: "Inhouse Teams" },
  { id: "created", label: "Created By Me" },
];

export default function PromptLibraryModal({ isOpen, onClose, onUse }) {
  const [activeCategory, setActiveCategory] = useState("suggested");
  const [search, setSearch] = useState("");
  const [previewPrompt, setPreviewPrompt] = useState(null);
  const [showNewPrompt, setShowNewPrompt] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [promptsData, setPromptsData] = useState(initialPrompts);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newFull, setNewFull] = useState("");
  const [newCategory, setNewCategory] = useState("created");

  if (!isOpen) return null;

  const openEditForm = (prompt) => {
    // Find which category this prompt belongs to
    let foundCat = "created";
    for (const [catId, catPrompts] of Object.entries(promptsData)) {
      if (catPrompts.some && catPrompts.some((p) => p.id === prompt.id)) {
        foundCat = catId;
        break;
      }
    }
    setEditingPrompt(prompt);
    setNewTitle(prompt.title);
    setNewDesc(prompt.desc);
    setNewFull(prompt.full);
    setNewCategory(foundCat);
    setPreviewPrompt(null);
    setShowNewPrompt(true);
  };

  const resetForm = () => {
    setNewTitle("");
    setNewDesc("");
    setNewFull("");
    setNewCategory("created");
    setEditingPrompt(null);
    setShowNewPrompt(false);
  };

  const handleSavePrompt = () => {
    if (!newTitle.trim() || !newFull.trim()) return;

    if (editingPrompt) {
      // Update existing prompt
      setPromptsData((prev) => {
        const updated = { ...prev };
        // Remove from old category
        for (const catId of Object.keys(updated)) {
          if (Array.isArray(updated[catId])) {
            updated[catId] = updated[catId].filter((p) => p.id !== editingPrompt.id);
          }
        }
        // Add to selected category
        const editedPrompt = {
          ...editingPrompt,
          title: newTitle.trim(),
          desc: newDesc.trim() || newFull.trim().slice(0, 100) + "...",
          full: newFull.trim(),
        };
        updated[newCategory] = [...(updated[newCategory] || []), editedPrompt];
        return updated;
      });
    } else {
      // Create new prompt
      const newPrompt = {
        id: `custom-${Date.now()}`,
        title: newTitle.trim(),
        desc: newDesc.trim() || newFull.trim().slice(0, 100) + "...",
        full: newFull.trim(),
        starred: false,
      };
      setPromptsData((prev) => ({
        ...prev,
        [newCategory]: [...(prev[newCategory] || []), newPrompt],
      }));
    }
    setActiveCategory(newCategory);
    resetForm();
  };

  // For starred, collect all starred prompts
  let prompts = activeCategory === "starred"
    ? Object.values(promptsData).flat().filter((p) => p.starred)
    : (promptsData[activeCategory] || []);

  if (search) {
    prompts = prompts.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-colordark/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="w-full sm:max-w-[780px] h-[90vh] sm:h-[560px] rounded-t-2xl sm:rounded-2xl border border-colordark/[0.06] bg-colorlight shadow-[0_30px_80px_-10px_rgba(15,15,12,0.3)] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-colordark/[0.06] shrink-0 gap-3">
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center">
                  <Sparkles size={15} strokeWidth={2} className="text-blue-from" />
                </div>
                <div>
                  <h2 className="text-[0.9375rem] sm:text-[1rem] font-semibold text-colordark tracking-[-0.02em]">Prompt Library</h2>
                  <p className="text-[0.6875rem] sm:text-[0.75rem] text-colordark/50 hidden sm:block">Explore curated prompts or create your own</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-colordark/40 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer sm:hidden">
                <X size={18} strokeWidth={2} />
              </button>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative group flex-1 sm:flex-none">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-colordark/30 group-focus-within:text-blue-from transition-colors" strokeWidth={2} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search All Prompts"
                  className="w-full sm:w-[180px] h-9 pl-9 pr-3 text-[0.8125rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.06] rounded-lg focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] transition-all"
                />
              </div>
              <button onClick={() => setShowNewPrompt(true)} className="flex items-center gap-1.5 h-9 px-3 sm:px-4 text-[0.8125rem] font-semibold text-white bg-gradient-to-r from-blue-from to-blue-to hover:shadow-[0_4px_12px_-2px_rgba(59,130,246,0.3)] shadow-sm rounded-lg transition-all cursor-pointer shrink-0">
                <Plus size={14} strokeWidth={2.5} />
                <span className="hidden xs:inline">New</span>
              </button>
              <button onClick={onClose} className="w-8 h-8 hidden sm:flex items-center justify-center rounded-lg text-colordark/40 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">
                <X size={18} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
            {/* Left sidebar — hidden on mobile, horizontal tabs instead */}
            <div className="hidden sm:block w-[210px] shrink-0 border-r border-colordark/[0.06] overflow-y-auto py-2">
              {categories.map((group) => (
                <div key={group.group} className="mb-2">
                  <div className="px-4 py-2 text-[0.6875rem] font-bold text-colordark/40 uppercase tracking-[0.08em]">{group.group}</div>
                  {group.items.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setSearch(""); }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2 text-left text-[0.8125rem] font-medium transition-all cursor-pointer ${
                        activeCategory === cat.id
                          ? "text-blue-from bg-blue-from/[0.06]"
                          : "text-colordark/60 hover:text-colordark hover:bg-colordark/[0.02]"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full shrink-0 ${activeCategory === cat.id ? "bg-blue-from" : "bg-colordark/20"}`} />
                      {cat.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Mobile horizontal category tabs */}
            <div className="sm:hidden flex overflow-x-auto gap-1.5 px-3 py-2 border-b border-colordark/[0.06] shrink-0">
              {categories.flatMap((g) => g.items).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setSearch(""); }}
                  className={`px-3 py-1.5 text-[0.6875rem] font-semibold rounded-lg border whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    activeCategory === cat.id
                      ? "text-blue-from border-blue-from/30 bg-blue-from/[0.06]"
                      : "text-colordark/50 border-colordark/[0.06] hover:text-colordark"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Right content */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {/* Category title */}
              <div className="hidden sm:block px-6 py-4 border-b border-colordark/[0.06] sticky top-0 bg-colorlight z-10">
                <h3 className="text-[0.875rem] font-semibold text-colordark">
                  {categories.flatMap((g) => g.items).find((c) => c.id === activeCategory)?.label || "Prompts"}
                </h3>
              </div>

              {prompts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[calc(100%-60px)] text-center px-4">
                  <Sparkles size={36} className="text-colordark/15 mb-3" strokeWidth={1.5} />
                  <p className="text-[0.875rem] font-medium text-colordark/45">No prompts found</p>
                  <p className="text-[0.75rem] text-colordark/30 mt-1">{search ? "Try a different search term" : "Create your first prompt"}</p>
                </div>
              ) : (
                <div className="divide-y divide-colordark/[0.06]">
                  {prompts.map((prompt) => (
                    <div key={prompt.id} className="px-4 sm:px-6 py-3.5 sm:py-4 hover:bg-colordark/[0.01] transition-colors group">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="text-[0.9375rem] font-semibold text-colordark leading-snug">{prompt.title}</h4>
                        <div className="flex items-center gap-1 shrink-0">
                          <button className={`p-1.5 rounded-lg transition-all cursor-pointer ${prompt.starred ? "text-amber-400" : "text-colordark/20 hover:text-amber-400 opacity-0 group-hover:opacity-100"}`}>
                            <Star size={14} strokeWidth={2} fill={prompt.starred ? "currentColor" : "none"} />
                          </button>
                          <button className="p-1.5 text-colordark/20 hover:text-colordark rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100">
                            <MoreVertical size={14} strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                      <p className="text-[0.8125rem] text-colordark/50 leading-relaxed mb-3 line-clamp-2">{prompt.desc}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPreviewPrompt(prompt)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-[0.75rem] font-semibold text-colordark/60 border border-colordark/[0.06] rounded-lg hover:border-colordark/15 hover:text-colordark transition-all cursor-pointer"
                        >
                          <Eye size={12} strokeWidth={2} />
                          Preview
                        </button>
                        <button
                          onClick={() => { onUse(prompt.full); onClose(); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-[0.75rem] font-semibold text-blue-from border border-blue-from/20 rounded-lg hover:bg-blue-from/[0.06] transition-all cursor-pointer"
                        >
                          <Sparkles size={12} strokeWidth={2} />
                          Use
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Modal Overlay */}
        {previewPrompt && (
          <>
            <div className="fixed inset-0 bg-colordark/30 z-[60]" onClick={() => setPreviewPrompt(null)} />
            <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setPreviewPrompt(null)}>
              <div className="w-full sm:max-w-[520px] max-h-[80vh] rounded-t-2xl sm:rounded-2xl border border-colordark/[0.06] bg-colorlight shadow-[0_30px_80px_-10px_rgba(15,15,12,0.3)] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-colordark/[0.06] shrink-0">
                  <div className="flex items-start justify-between">
                    <h3 className="text-[1rem] sm:text-[1.125rem] font-bold text-colordark tracking-[-0.02em]">{previewPrompt.title}</h3>
                    <span className="text-[0.6875rem] text-colordark/40 shrink-0 mt-1">Yugality AI</span>
                  </div>
                </div>
                <div className="px-4 sm:px-6 py-4 sm:py-5 flex-1 overflow-y-auto">
                  <div className="text-[0.8125rem] text-colordark/70 leading-relaxed whitespace-pre-line">{previewPrompt.full}</div>
                </div>
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-colordark/[0.06] flex items-center justify-between shrink-0">
                  <button onClick={() => openEditForm(previewPrompt)} className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-colordark/50 hover:text-colordark transition-colors cursor-pointer">
                    <Edit3 size={13} strokeWidth={2} />
                    Edit Prompt
                  </button>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setPreviewPrompt(null)} className="h-9 px-4 rounded-lg text-[0.8125rem] font-medium text-colordark/55 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">Cancel</button>
                    <button
                      onClick={() => { onUse(previewPrompt.full); setPreviewPrompt(null); onClose(); }}
                      className="h-9 px-5 rounded-lg text-[0.8125rem] font-semibold bg-gradient-to-r from-blue-from to-blue-to text-white hover:shadow-[0_4px_12px_-2px_rgba(59,130,246,0.3)] shadow-sm transition-all cursor-pointer"
                    >
                      Use
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* New Prompt Form Overlay */}
        {showNewPrompt && (
          <>
            <div className="fixed inset-0 bg-colordark/30 z-[60]" onClick={() => setShowNewPrompt(false)} />
            <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowNewPrompt(false)}>
              <div className="w-full sm:max-w-[520px] max-h-[90vh] rounded-t-2xl sm:rounded-2xl border border-colordark/[0.06] bg-colorlight shadow-[0_30px_80px_-10px_rgba(15,15,12,0.3)] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-4 sm:py-5 border-b border-colordark/[0.06] shrink-0">
                  <button onClick={resetForm} className="w-8 h-8 flex items-center justify-center rounded-lg text-colordark/40 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">
                    <ArrowLeft size={18} strokeWidth={2} />
                  </button>
                  <div>
                    <h3 className="text-[0.9375rem] sm:text-[1rem] font-semibold text-colordark tracking-[-0.02em]">{editingPrompt ? "Edit Prompt" : "Create New Prompt"}</h3>
                    <p className="text-[0.6875rem] sm:text-[0.75rem] text-colordark/45">{editingPrompt ? "Update your prompt details" : "Build a reusable prompt for your workflow"}</p>
                  </div>
                </div>

                {/* Form */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 space-y-4">
                  {/* Title */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[0.75rem] font-bold text-colordark/50 uppercase tracking-[0.06em] mb-2">
                      <Type size={12} strokeWidth={2} />
                      Prompt Title
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Written Statement Generator"
                      className="w-full h-10 px-4 text-[0.875rem] text-colordark placeholder:text-colordark/30 border border-colordark/[0.06] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] transition-all"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[0.75rem] font-bold text-colordark/50 uppercase tracking-[0.06em] mb-2">
                      <AlignLeft size={12} strokeWidth={2} />
                      Short Description
                    </label>
                    <input
                      type="text"
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Brief description of what this prompt does"
                      className="w-full h-10 px-4 text-[0.875rem] text-colordark placeholder:text-colordark/30 border border-colordark/[0.06] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] transition-all"
                    />
                  </div>

                  {/* Full Prompt */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[0.75rem] font-bold text-colordark/50 uppercase tracking-[0.06em] mb-2">
                      <FileText size={12} strokeWidth={2} />
                      Full Prompt
                    </label>
                    <textarea
                      value={newFull}
                      onChange={(e) => setNewFull(e.target.value)}
                      placeholder="Write the full prompt text here...&#10;&#10;Use bullet points (•) to list instructions."
                      rows={6}
                      className="w-full px-4 py-3 text-[0.875rem] text-colordark placeholder:text-colordark/30 border border-colordark/[0.06] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.06)] transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Save to Category */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[0.75rem] font-bold text-colordark/50 uppercase tracking-[0.06em] mb-2">
                      <Sparkles size={12} strokeWidth={2} />
                      Save to Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {saveCategoryOptions.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setNewCategory(cat.id)}
                          className={`px-3 py-1.5 text-[0.75rem] font-semibold rounded-lg border transition-all cursor-pointer ${
                            newCategory === cat.id
                              ? "text-blue-from border-blue-from/30 bg-blue-from/[0.06]"
                              : "text-colordark/50 border-colordark/[0.06] hover:border-colordark/15 hover:text-colordark"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-colordark/[0.06] flex items-center justify-end gap-2 sm:gap-3 shrink-0">
                  <button onClick={resetForm} className="h-10 px-5 rounded-xl text-[0.875rem] font-medium text-colordark/55 hover:text-colordark hover:bg-colordark/[0.04] transition-all cursor-pointer">
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePrompt}
                    disabled={!newTitle.trim() || !newFull.trim()}
                    className="h-10 px-6 rounded-xl text-[0.875rem] font-semibold bg-gradient-to-r from-blue-from to-blue-to text-white hover:shadow-[0_4px_12px_-2px_rgba(59,130,246,0.3)] shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {editingPrompt ? "Update Prompt" : "Save Prompt"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
