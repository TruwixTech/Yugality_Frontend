"use client";

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

export default function TableResizePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const rootElement = editor.getRootElement();
    if (!rootElement) return;

    let isResizingColumn = false;
    let isResizingTable = false;
    let currentCell = null;
    let currentTable = null;
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;

    const isInResizeCorner = (table, clientX, clientY) => {
      const rect = table.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;
      
      // Only trigger in the exact 16x16px corner
      return (rect.width - offsetX <= 16 && rect.height - offsetY <= 16);
    };

    const handleMouseDown = (e) => {
      const target = e.target;
      
      // Check if clicking on table resize handle (bottom-right corner only)
      if (target.tagName === 'TABLE' && target.classList.contains('editor-table')) {
        if (isInResizeCorner(target, e.clientX, e.clientY)) {
          isResizingTable = true;
          currentTable = target;
          startX = e.clientX;
          startY = e.clientY;
          const rect = target.getBoundingClientRect();
          startWidth = rect.width;
          startHeight = rect.height;
          document.body.style.cursor = 'nwse-resize';
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
      
      // Check if clicking near the right edge of a table cell (column resize)
      if (target.tagName === 'TD' || target.tagName === 'TH') {
        const rect = target.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        
        // If within 8px of right edge, start resizing column
        if (rect.width - offsetX <= 8) {
          isResizingColumn = true;
          currentCell = target;
          startX = e.clientX;
          startWidth = rect.width;
          document.body.style.cursor = 'col-resize';
          e.preventDefault();
        }
      }
    };

    const handleMouseMove = (e) => {
      // Handle table resize
      if (isResizingTable && currentTable) {
        const diffX = e.clientX - startX;
        const diffY = e.clientY - startY;
        const newWidth = Math.max(300, startWidth + diffX);
        const newHeight = Math.max(100, startHeight + diffY);
        
        currentTable.style.width = `${newWidth}px`;
        currentTable.style.height = `${newHeight}px`;
        return;
      }

      // Handle column resize
      if (isResizingColumn && currentCell) {
        const diff = e.clientX - startX;
        const newWidth = Math.max(80, startWidth + diff);
        
        currentCell.style.width = `${newWidth}px`;
        currentCell.style.minWidth = `${newWidth}px`;
        currentCell.style.maxWidth = `${newWidth}px`;
        return;
      }

      // Show appropriate cursor when hovering
      const target = e.target;
      
      // Check for table corner resize - only show cursor in corner
      if (target.tagName === 'TABLE' && target.classList.contains('editor-table')) {
        if (isInResizeCorner(target, e.clientX, e.clientY)) {
          target.style.cursor = 'nwse-resize';
        } else {
          target.style.cursor = '';
        }
        return;
      }
      
      // Check for column resize
      if (target.tagName === 'TD' || target.tagName === 'TH') {
        const rect = target.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        
        if (rect.width - offsetX <= 8) {
          target.style.cursor = 'col-resize';
        } else {
          target.style.cursor = '';
        }
      }
    };

    const handleMouseUp = () => {
      if (isResizingColumn || isResizingTable) {
        isResizingColumn = false;
        isResizingTable = false;
        currentCell = null;
        currentTable = null;
        document.body.style.cursor = '';
      }
    };

    rootElement.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      rootElement.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [editor]);

  return null;
}
