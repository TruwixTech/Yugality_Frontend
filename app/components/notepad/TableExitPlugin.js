"use client";

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { 
  $getSelection, 
  $isRangeSelection,
  $createParagraphNode,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  COMMAND_PRIORITY_LOW,
} from 'lexical';
import { $isTableCellNode, $isTableNode } from '@lexical/table';

export default function TableExitPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Handle arrow down to exit table
    const removeDownListener = editor.registerCommand(
      KEY_ARROW_DOWN_COMMAND,
      (event) => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return false;

        const anchorNode = selection.anchor.getNode();
        const parent = anchorNode.getParent();
        
        // Check if we're in a table cell
        if ($isTableCellNode(parent)) {
          const tableNode = parent.getParent()?.getParent();
          if ($isTableNode(tableNode)) {
            const tableRows = tableNode.getChildren();
            const lastRow = tableRows[tableRows.length - 1];
            const lastRowCells = lastRow.getChildren();
            
            // Check if we're in the last row
            if (lastRowCells.includes(parent)) {
              // Check if cursor is at the end of the cell
              const textContent = anchorNode.getTextContent();
              const offset = selection.anchor.offset;
              
              if (offset >= textContent.length) {
                // Exit table - insert paragraph after table
                editor.update(() => {
                  const newParagraph = $createParagraphNode();
                  tableNode.insertAfter(newParagraph);
                  newParagraph.select();
                });
                event?.preventDefault();
                return true;
              }
            }
          }
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    return () => {
      removeDownListener();
    };
  }, [editor]);

  return null;
}
