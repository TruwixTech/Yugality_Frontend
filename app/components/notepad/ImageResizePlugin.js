"use client";

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

export default function ImageResizePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const rootElement = editor.getRootElement();
    if (!rootElement) return;

    let isResizing = false;
    let currentImage = null;
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;
    let aspectRatio = 1;
    let resizeDirection = null;

    const isInResizeCorner = (img, clientX, clientY) => {
      const rect = img.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;
      
      const cornerSize = 16;
      
      // Bottom-right corner
      if (rect.width - offsetX <= cornerSize && rect.height - offsetY <= cornerSize) {
        return 'se';
      }
      // Bottom-left corner
      if (offsetX <= cornerSize && rect.height - offsetY <= cornerSize) {
        return 'sw';
      }
      // Top-right corner
      if (rect.width - offsetX <= cornerSize && offsetY <= cornerSize) {
        return 'ne';
      }
      // Top-left corner
      if (offsetX <= cornerSize && offsetY <= cornerSize) {
        return 'nw';
      }
      
      return null;
    };

    const getCursorStyle = (direction) => {
      switch (direction) {
        case 'nw':
        case 'se':
          return 'nwse-resize';
        case 'ne':
        case 'sw':
          return 'nesw-resize';
        default:
          return '';
      }
    };

    const handleMouseDown = (e) => {
      const target = e.target;
      
      if (target.tagName === 'IMG' && target.closest('.editor-input')) {
        const direction = isInResizeCorner(target, e.clientX, e.clientY);
        
        if (direction) {
          isResizing = true;
          currentImage = target;
          resizeDirection = direction;
          startX = e.clientX;
          startY = e.clientY;
          
          const rect = target.getBoundingClientRect();
          startWidth = rect.width;
          startHeight = rect.height;
          aspectRatio = startWidth / startHeight;
          
          document.body.style.cursor = getCursorStyle(direction);
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    const handleMouseMove = (e) => {
      if (isResizing && currentImage) {
        let diffX = e.clientX - startX;
        let diffY = e.clientY - startY;
        
        // Adjust diff based on resize direction
        if (resizeDirection === 'nw' || resizeDirection === 'sw') {
          diffX = -diffX;
        }
        if (resizeDirection === 'nw' || resizeDirection === 'ne') {
          diffY = -diffY;
        }
        
        // Calculate new dimensions maintaining aspect ratio
        const newWidth = Math.max(100, startWidth + diffX);
        const newHeight = newWidth / aspectRatio;
        
        currentImage.style.width = `${newWidth}px`;
        currentImage.style.height = `${newHeight}px`;
        currentImage.style.maxWidth = '100%';
        
        return;
      }

      // Show resize cursor when hovering over corners
      const target = e.target;
      if (target.tagName === 'IMG' && target.closest('.editor-input')) {
        const direction = isInResizeCorner(target, e.clientX, e.clientY);
        if (direction) {
          target.style.cursor = getCursorStyle(direction);
          // Add visual indicator
          target.style.outline = '2px solid rgba(59, 130, 246, 0.5)';
          target.style.outlineOffset = '2px';
        } else {
          target.style.cursor = '';
          target.style.outline = '';
        }
      }
    };

    const handleMouseUp = () => {
      if (isResizing) {
        isResizing = false;
        currentImage = null;
        resizeDirection = null;
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
