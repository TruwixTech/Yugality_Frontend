"use client";

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $createTextNode,
  $isTextNode,
} from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $setBlocksType } from '@lexical/selection';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from '@lexical/list';
import { $createTableNode, $createTableRowNode, $createTableCellNode } from '@lexical/table';
import { $createImageNode } from './ImageNode';
import { $createHighlightNode, $isHighlightNode } from './HighlightNode';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from '@lexical/rich-text';
import { $createCodeNode } from '@lexical/code';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  Type,
  Image as ImageIcon,
  Table as TableIcon,
  Pencil,
  X,
  Highlighter,
} from 'lucide-react';

const LowPriority = 1;

const blockTypeToBlockName = {
  code: 'Code Block',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  ol: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote',
  ul: 'Bulleted List',
};

function Divider() {
  return <div className="w-px h-6 bg-colordark/8 mx-1" />;
}

function BlockFormatDropDown({ editor, blockType }) {
  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeading = (headingSize) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createCodeNode());
        }
      });
    }
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-colordark/70 hover:text-colordark hover:bg-colordark/5 rounded-lg transition-all">
        <Type size={14} strokeWidth={2} />
        <span>{blockTypeToBlockName[blockType]}</span>
      </button>
      <div className="absolute top-full left-0 mt-1 hidden group-hover:flex flex-col bg-colorwhite border border-colordark/8 rounded-lg shadow-lg z-10 min-w-[160px]">
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={formatParagraph} className="px-3 py-2 text-left text-xs text-colordark/70 hover:bg-colordark/5 first:rounded-t-lg">Normal</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => formatHeading('h1')} className="px-3 py-2 text-left text-base font-semibold text-colordark/70 hover:bg-colordark/5">Heading 1</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => formatHeading('h2')} className="px-3 py-2 text-left text-sm font-semibold text-colordark/70 hover:bg-colordark/5">Heading 2</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => formatHeading('h3')} className="px-3 py-2 text-left text-xs font-semibold text-colordark/70 hover:bg-colordark/5">Heading 3</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={formatBulletList} className="px-3 py-2 text-left text-xs text-colordark/70 hover:bg-colordark/5">Bullet List</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={formatNumberedList} className="px-3 py-2 text-left text-xs text-colordark/70 hover:bg-colordark/5">Numbered List</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={formatQuote} className="px-3 py-2 text-left text-xs text-colordark/70 hover:bg-colordark/5">Quote</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={formatCode} className="px-3 py-2 text-left text-xs text-colordark/70 hover:bg-colordark/5 last:rounded-b-lg">Code Block</button>
      </div>
    </div>
  );
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const fileInputRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }

      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));

      const node = selection.anchor.getNode();
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      // Check if text is highlighted
      if ($isHighlightNode(node)) {
        setIsHighlighted(true);
      } else {
        setIsHighlighted(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, updateToolbar]);

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const insertImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result;
        if (src) {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const imageNode = $createImageNode({ src, altText: file.name });
              selection.insertNodes([imageNode]);
            }
          });
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset input
    event.target.value = '';
  }, [editor]);

  const insertTable = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const tableNode = $createTableNode();
        for (let i = 0; i < 3; i++) {
          const rowNode = $createTableRowNode();
          for (let j = 0; j < 3; j++) {
            const cellNode = $createTableCellNode(i === 0 ? 1 : 0); // First row as header
            const paragraphNode = $createParagraphNode();
            cellNode.append(paragraphNode);
            rowNode.append(cellNode);
          }
          tableNode.append(rowNode);
        }
        selection.insertNodes([tableNode]);
        const paragraphNode = $createParagraphNode();
        tableNode.insertAfter(paragraphNode);
        paragraphNode.select();
      }
    });
  }, [editor]);

  return (
    <>
      <div className="toolbar" ref={toolbarRef}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          className="toolbar-item"
          aria-label="Undo"
        >
          <Undo size={16} strokeWidth={2} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          className="toolbar-item"
          aria-label="Redo"
        >
          <Redo size={16} strokeWidth={2} />
        </button>
      <Divider />
      <BlockFormatDropDown blockType={blockType} editor={editor} />
      <Divider />
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={'toolbar-item' + (isBold ? ' active' : '')}
        aria-label="Format Bold"
      >
        <Bold size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={'toolbar-item' + (isItalic ? ' active' : '')}
        aria-label="Format Italics"
      >
        <Italic size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={'toolbar-item' + (isUnderline ? ' active' : '')}
        aria-label="Format Underline"
      >
        <Underline size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        className={'toolbar-item' + (isStrikethrough ? ' active' : '')}
        aria-label="Format Strikethrough"
      >
        <Strikethrough size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
        }}
        className={'toolbar-item' + (isCode ? ' active' : '')}
        aria-label="Insert Code"
      >
        <Code size={16} strokeWidth={2} />
      </button>
      
      <div className="relative">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className={'toolbar-item' + (isHighlighted ? ' active' : '')}
          aria-label="Highlight"
        >
          <Highlighter size={16} strokeWidth={2} />
        </button>
        {showColorPicker && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowColorPicker(false)}
            />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-colorwhite border border-colordark/8 rounded-full p-3 shadow-xl z-20 flex items-center gap-2">
              {[
                { color: '#ffff00', label: 'Yellow' },
                { color: '#90EE90', label: 'Green' },
                { color: '#87CEEB', label: 'Blue' },
                { color: '#FFB6C1', label: 'Pink' },
                { color: '#FFA500', label: 'Orange' },
              ].map(({ color, label }) => (
                <button
                  key={color}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    editor.update(() => {
                      const selection = $getSelection();
                      if ($isRangeSelection(selection)) {
                        const nodes = selection.extract();
                        nodes.forEach((node) => {
                          if ($isTextNode(node) || $isHighlightNode(node)) {
                            const textContent = node.getTextContent();
                            const format = node.getFormat();
                            const highlightNode = $createHighlightNode(textContent, color);
                            highlightNode.setFormat(format);
                            node.replace(highlightNode);
                          } else if (node.getChildren) {
                             // Handle nested nodes if needed, though selection.extract() usually gives leaf nodes
                             node.getChildren().forEach(child => {
                                if ($isTextNode(child)) {
                                   const highlightNode = $createHighlightNode(child.getTextContent(), color);
                                   highlightNode.setFormat(child.getFormat());
                                   child.replace(highlightNode);
                                }
                             });
                          }
                        });
                      }
                    });
                    setShowColorPicker(false);
                  }}
                  className="w-8 h-8 rounded-full border-2 border-colordark/10 hover:border-colordark/30 hover:scale-110 transition-all cursor-pointer"
                  style={{ backgroundColor: color }}
                  title={label}
                />
              ))}
              <div className="w-px h-6 bg-colordark/10 mx-1" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                      const nodes = selection.extract();
                      nodes.forEach((node) => {
                        if ($isHighlightNode(node)) {
                          const textContent = node.getTextContent();
                          const format = node.getFormat();
                          const textNode = $createTextNode(textContent);
                          textNode.setFormat(format);
                          node.replace(textNode);
                        }
                      });
                    }
                  });
                  setShowColorPicker(false);
                }}
                className="w-8 h-8 rounded-full border-2 border-colordark/10 hover:border-colordark/30 hover:scale-110 transition-all cursor-pointer bg-colorwhite flex items-center justify-center"
                title="Remove Highlight"
              >
                <X size={14} strokeWidth={2} className="text-colordark/50" />
              </button>
            </div>
          </>
        )}
      </div>
      
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={insertLink}
        className={'toolbar-item' + (isLink ? ' active' : '')}
        aria-label="Insert Link"
      >
        <Link size={16} strokeWidth={2} />
      </button>
      <Divider />
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
        className="toolbar-item"
        aria-label="Left Align"
      >
        <AlignLeft size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
        className="toolbar-item"
        aria-label="Center Align"
      >
        <AlignCenter size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
        className="toolbar-item"
        aria-label="Right Align"
      >
        <AlignRight size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
        className="toolbar-item"
        aria-label="Justify Align"
      >
        <AlignJustify size={16} strokeWidth={2} />
      </button>
      <Divider />
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={insertImage}
        className="toolbar-item"
        aria-label="Insert Image"
      >
        <ImageIcon size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={insertTable}
        className="toolbar-item"
        aria-label="Insert Table"
      >
        <TableIcon size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setShowDrawingCanvas(true)}
        className="toolbar-item"
        aria-label="Draw"
      >
        <Pencil size={16} strokeWidth={2} />
      </button>
    </div>

    {showDrawingCanvas && (
      <DrawingCanvas
        onClose={() => setShowDrawingCanvas(false)}
        onSave={(imageData) => {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const imageNode = $createImageNode({ src: imageData, altText: 'Drawing' });
              selection.insertNodes([imageNode]);
            }
          });
          setShowDrawingCanvas(false);
        }}
      />
    )}
  </>
  );
}

function DrawingCanvas({ onClose, onSave }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL('image/png');
    onSave(imageData);
  };

  return (
    <div className="fixed inset-0 bg-colordark/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-colorwhite rounded-2xl shadow-2xl w-full max-w-4xl border border-colordark/8">
        <div className="px-6 py-4 border-b border-colordark/8 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-colordark">Draw</h3>
          <button onClick={onClose} className="p-2 text-colordark/40 hover:text-colordark hover:bg-colordark/5 rounded-lg transition-all">
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-colordark/70">Color:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded border border-colordark/8 cursor-pointer"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm text-colordark/70">Size:</label>
              <input
                type="range"
                min="1"
                max="20"
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="w-32"
              />
              <span className="text-sm text-colordark/70 w-8">{lineWidth}px</span>
            </div>
            
            <button
              onClick={clearCanvas}
              className="px-3 py-1.5 text-sm text-colordark/70 hover:text-colordark hover:bg-colordark/5 rounded-lg transition-all"
            >
              Clear
            </button>
          </div>
          
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="border border-colordark/8 rounded-lg cursor-crosshair bg-white"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        
        <div className="px-6 py-4 border-t border-colordark/8 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-colordark/70 hover:text-colordark hover:bg-colordark/5 rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            onClick={saveDrawing}
            className="px-4 py-2 text-sm font-semibold text-white bg-linear-to-br from-blue-from to-blue-to hover:shadow-lg rounded-lg transition-all"
          >
            Insert Drawing
          </button>
        </div>
      </div>
    </div>
  );
}
