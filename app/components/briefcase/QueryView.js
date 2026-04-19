"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import QueryItem from "./QueryItem";
import AddQueryModal from "./AddQueryModal";

export default function QueryView({ queries: initialQueries }) {
  const [queries, setQueries] = useState(initialQueries);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [showModal, setShowModal] = useState(false);

  const handleToggle = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAdd = (query) => {
    setQueries((prev) => [...prev, query]);
  };

  return (
    <>
      <div className="space-y-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-3 w-full justify-center border-2 border-dashed border-colordark/[0.06] hover:border-blue-from/30 rounded-2xl text-[0.875rem] font-medium text-colordark/50 hover:text-blue-from transition-all cursor-pointer mb-2"
        >
          <Plus size={15} strokeWidth={2} />
          Add a new Query
        </button>

        {queries.map((q, i) => (
          <QueryItem
            key={q.id}
            query={q}
            index={i}
            isExpanded={expandedIds.has(q.id)}
            onToggle={() => handleToggle(q.id)}
          />
        ))}
      </div>

      <AddQueryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAdd}
      />
    </>
  );
}
