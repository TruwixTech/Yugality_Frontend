"use client";

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useState, useCallback, useRef } from 'react';
import { $getSelection, $isRangeSelection } from 'lexical';
import { 
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableColumnIndexFromTableCellNode,
  $getTableRowIndexFromTableCellNode,
  $insertTableRow__EXPERIMENTAL,
  $insertTableColumn__EXPERIMENTAL,
  $deleteTableRow__EXPERIMENTAL,
  $deleteTableColumn__EXPERIMENTAL,
  $isTableCellNode,
  $isTableNode,
} from '@lexical/table';
import { 
  Plus, 
  Minus, 
  Trash2,
  ArrowDown,
  ArrowRight,
} from 'lucide-react';

export default function TableActionMenuPlugin() {
  const [editor] = useLexicalComposerContext();
  const [tableCellNode, setTableCellNode] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const updateListener = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          
          if ($isTableCellNode(anchorNode)) {
            setTableCellNode(anchorNode);
            setShowMenu(true);
          } else {
            // Check if parent is table cell
            const parent = anchorNode.getParent();
            if (parent && $isTableCellNode(parent)) {
              setTableCellNode(parent);
              setShowMenu(true);
            } else {
              setShowMenu(false);
              setTableCellNode(null);
            }
          }
        } else {
          setShowMenu(false);
          setTableCellNode(null);
        }
      });
    });

    return updateListener;
  }, [editor]);

  // Close menu only when clicking completely outside table and menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      
      // Don't close if clicking on menu
      if (menuRef.current && menuRef.current.contains(target)) {
        return;
      }
      
      // Don't close if clicking inside any table
      if (target.closest('table.editor-table')) {
        return;
      }
      
      // Close if clicking outside both menu and table
      setShowMenu(false);
      setTableCellNode(null);
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const insertTableRowAtSelection = useCallback((shouldInsertAfter) => {
    editor.update(() => {
      $insertTableRow__EXPERIMENTAL(shouldInsertAfter);
    });
  }, [editor]);

  const insertTableColumnAtSelection = useCallback((shouldInsertAfter) => {
    editor.update(() => {
      $insertTableColumn__EXPERIMENTAL(shouldInsertAfter);
    });
  }, [editor]);

  const deleteTableRowAtSelection = useCallback(() => {
    editor.update(() => {
      $deleteTableRow__EXPERIMENTAL();
    });
  }, [editor]);

  const deleteTableColumnAtSelection = useCallback(() => {
    editor.update(() => {
      $deleteTableColumn__EXPERIMENTAL();
    });
  }, [editor]);

  const deleteTable = useCallback(() => {
    editor.update(() => {
      if (tableCellNode) {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
        tableNode.remove();
        setShowMenu(false);
        setTableCellNode(null);
      }
    });
  }, [editor, tableCellNode]);

  if (!showMenu) {
    return null;
  }

  return (
    <div 
      ref={menuRef}
      className="fixed bottom-6 right-6 bg-colorlight border border-colordark/10 rounded-xl shadow-xl p-1.5 z-40 flex flex-col gap-0.5 backdrop-blur-sm"
      style={{ 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(15, 15, 12, 0.05)'
      }}
    >
      <div className="text-[0.6875rem] font-semibold text-colordark/40 uppercase tracking-wider px-3 py-2 border-b border-colordark/8">
        Table Tools
      </div>
      
      <div className="flex flex-col gap-0.5 py-1">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => insertTableRowAtSelection(false)}
          className="flex items-center gap-2.5 px-3 py-2 text-[0.8125rem] text-colordark/70 hover:text-colordark hover:bg-colordark/5 rounded-lg transition-all text-left group"
        >
          <div className="w-5 h-5 rounded bg-blue-from/10 flex items-center justify-center group-hover:bg-blue-from/20 transition-colors">
            <Plus size={12} strokeWidth={2.5} className="text-blue-from" />
          </div>
          <span className="flex-1">Insert Row Above</span>
          <ArrowDown size={11} strokeWidth={2} className="text-colordark/30" />
        </button>
        
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => insertTableRowAtSelection(true)}
          className="flex items-center gap-2.5 px-3 py-2 text-[0.8125rem] text-colordark/70 hover:text-colordark hover:bg-colordark/5 rounded-lg transition-all text-left group"
        >
          <div className="w-5 h-5 rounded bg-blue-from/10 flex items-center justify-center group-hover:bg-blue-from/20 transition-colors">
            <Plus size={12} strokeWidth={2.5} className="text-blue-from" />
          </div>
          <span className="flex-1">Insert Row Below</span>
          <ArrowDown size={11} strokeWidth={2} className="text-colordark/30" />
        </button>
        
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => insertTableColumnAtSelection(false)}
          className="flex items-center gap-2.5 px-3 py-2 text-[0.8125rem] text-colordark/70 hover:text-colordark hover:bg-colordark/5 rounded-lg transition-all text-left group"
        >
          <div className="w-5 h-5 rounded bg-blue-from/10 flex items-center justify-center group-hover:bg-blue-from/20 transition-colors">
            <Plus size={12} strokeWidth={2.5} className="text-blue-from" />
          </div>
          <span className="flex-1">Insert Column Left</span>
          <ArrowRight size={11} strokeWidth={2} className="text-colordark/30" />
        </button>
        
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => insertTableColumnAtSelection(true)}
          className="flex items-center gap-2.5 px-3 py-2 text-[0.8125rem] text-colordark/70 hover:text-colordark hover:bg-colordark/5 rounded-lg transition-all text-left group"
        >
          <div className="w-5 h-5 rounded bg-blue-from/10 flex items-center justify-center group-hover:bg-blue-from/20 transition-colors">
            <Plus size={12} strokeWidth={2.5} className="text-blue-from" />
          </div>
          <span className="flex-1">Insert Column Right</span>
          <ArrowRight size={11} strokeWidth={2} className="text-colordark/30" />
        </button>
      </div>
      
      <div className="h-px bg-colordark/8 my-0.5" />
      
      <div className="flex flex-col gap-0.5 py-1">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={deleteTableRowAtSelection}
          className="flex items-center gap-2.5 px-3 py-2 text-[0.8125rem] text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all text-left group"
        >
          <div className="w-5 h-5 rounded bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <Minus size={12} strokeWidth={2.5} className="text-red-600" />
          </div>
          <span className="flex-1">Delete Row</span>
        </button>
        
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={deleteTableColumnAtSelection}
          className="flex items-center gap-2.5 px-3 py-2 text-[0.8125rem] text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all text-left group"
        >
          <div className="w-5 h-5 rounded bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <Minus size={12} strokeWidth={2.5} className="text-red-600" />
          </div>
          <span className="flex-1">Delete Column</span>
        </button>
        
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={deleteTable}
          className="flex items-center gap-2.5 px-3 py-2 text-[0.8125rem] text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all text-left group"
        >
          <div className="w-5 h-5 rounded bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <Trash2 size={12} strokeWidth={2.5} className="text-red-600" />
          </div>
          <span className="flex-1">Delete Table</span>
        </button>
      </div>
    </div>
  );
}
