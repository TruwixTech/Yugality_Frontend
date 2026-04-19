"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Plus, Trash2, Edit3, FileEdit, Clock, Loader2 } from "lucide-react";
import NoteEditorModal from "@/app/components/notepad/NoteEditorModal";

export default function NotepadPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/notepad");
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleNewNote = () => {
    setSelectedNote(null);
    setNoteTitle("");
    setEditorContent("");
    setShowEditor(true);
  };

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setNoteTitle(note.title);
    setEditorContent(note.content ? JSON.stringify(note.content) : "");
    setShowEditor(true);
  };

  const handleSaveNote = async () => {
    setSaving(true);
    try {
      const body = {
        title: noteTitle || "Untitled Note",
        content: editorContent ? JSON.parse(editorContent) : {},
      };

      if (selectedNote) {
        body.notebookId = selectedNote._id;
      }

      const response = await fetch("/api/notepad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await fetchNotes();
        setShowEditor(false);
        setSelectedNote(null);
      } else {
        const errorData = await response.json();
        alert(`Failed to save: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Error saving note. Please check your connection.");
    } finally {
      setSaving(false);
    }
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setSelectedNote(null);
    setNoteTitle("");
    setEditorContent("");
  };

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const response = await fetch(`/api/notepad/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNotes(notes.filter(n => n._id !== id));
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">

        <div>
          {/* Header — stacks on mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <h2 className="text-[1.125rem] sm:text-[1.25rem] font-semibold text-colordark tracking-[-0.01em]">All Notes</h2>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex-1 sm:flex-none">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-colordark/40" strokeWidth={2} />
                <input type="text" placeholder="Search notes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-[200px] md:w-[240px] h-10 pl-10 pr-4 text-[0.8125rem] text-colordark placeholder:text-colordark/35 border border-colordark/[0.08] rounded-xl focus:outline-none focus:border-blue-from/40 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] transition-all" />
              </div>
              <button onClick={handleNewNote}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 h-9 sm:h-10 text-[0.8125rem] sm:text-[0.875rem] font-semibold text-white bg-linear-to-br from-blue-from to-blue-to hover:shadow-lg rounded-xl transition-all shrink-0">
                <Plus size={15} strokeWidth={2} />
                <span className="hidden sm:inline">New Note</span>
                <span className="sm:hidden">New</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 size={32} className="text-blue-from animate-spin" />
              <p className="text-[0.875rem] text-colordark/40">Loading your notes...</p>
            </div>
          ) : (
            <>
              {/* ─── Desktop Table (hidden on mobile) ─── */}
              <div className="hidden md:block rounded-2xl border border-colordark/[0.06] overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-colordark/[0.06]">
                      <th className="text-left px-6 py-3 text-[0.8125rem] font-medium text-colordark/60 w-[50%]">Title</th>
                      <th className="text-left px-4 py-3 text-[0.8125rem] font-medium text-colordark/60">Last Updated</th>
                      <th className="text-right px-6 py-3 text-[0.8125rem] font-medium text-colordark/60">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-colordark/[0.04]">
                    {filteredNotes.map((note) => (
                      <tr
                        key={note._id}
                        className="hover:bg-colorlight/60 transition-colors cursor-pointer group"
                        onClick={() => handleSelectNote(note)}
                      >
                        <td className="px-6 py-3.5 text-[0.875rem] font-medium text-colordark group-hover:text-blue-from transition-colors">{note.title}</td>
                        <td className="px-4 py-3.5 text-[0.875rem] text-colordark/70">{formatDate(note.updatedAt)}</td>
                        <td className="px-6 py-3.5">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={(e) => { e.stopPropagation(); handleSelectNote(note); }} className="p-1.5 text-colordark/30 hover:text-colordark hover:bg-colordark/5 rounded-lg transition-all" title="Edit">
                              <Edit3 size={15} strokeWidth={2} />
                            </button>
                            <button onClick={(e) => handleDelete(e, note._id)} className="p-1.5 text-colordark/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                              <Trash2 size={15} strokeWidth={2} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredNotes.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-[0.875rem] text-colordark/40">
                          {searchQuery ? "No notes matching your search." : "No notes found. Create one to get started!"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* ─── Mobile Card List (visible only on mobile) ─── */}
              <div className="md:hidden space-y-3">
                {filteredNotes.map((note) => (
                  <div
                    key={note._id}
                    className="rounded-2xl border border-colordark/[0.06] p-4 active:bg-colordark/[0.02] transition-colors cursor-pointer"
                    onClick={() => handleSelectNote(note)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-from/10 to-blue-to/10 flex items-center justify-center shrink-0">
                        <FileEdit size={18} strokeWidth={1.8} className="text-blue-from" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[0.875rem] font-semibold text-colordark leading-snug truncate">{note.title}</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Clock size={12} strokeWidth={2} className="text-colordark/35 shrink-0" />
                          <span className="text-[0.75rem] text-colordark/45">{formatDate(note.updatedAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); handleSelectNote(note); }} className="p-1.5 text-colordark/30 rounded-lg transition-all" title="Edit">
                          <Edit3 size={15} strokeWidth={2} />
                        </button>
                        <button onClick={(e) => handleDelete(e, note._id)} className="p-1.5 text-colordark/30 rounded-lg transition-all" title="Delete">
                          <Trash2 size={15} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredNotes.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-[0.875rem] text-colordark/40">
                      {searchQuery ? "No notes matching your search." : "No notes found. Create one to get started!"}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {showEditor && (
        <NoteEditorModal
          noteTitle={noteTitle}
          editorContent={editorContent}
          onTitleChange={setNoteTitle}
          onContentChange={setEditorContent}
          onSave={handleSaveNote}
          onClose={handleCloseEditor}
          isSaving={saving}
        />
      )}
    </div>
  );
}
