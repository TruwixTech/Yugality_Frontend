import { TextNode } from 'lexical';

export class HighlightNode extends TextNode {
  __highlightColor;

  constructor(text, highlightColor, key) {
    super(text, key);
    this.__highlightColor = highlightColor || '#ffff00';
  }

  static getType() {
    return 'highlight';
  }

  static clone(node) {
    return new HighlightNode(node.__text, node.__highlightColor, node.__key);
  }

  createDOM(config) {
    const element = super.createDOM(config);
    element.style.backgroundColor = this.__highlightColor;
    element.style.padding = '0.125rem 0';
    element.style.borderRadius = '0.125rem';
    return element;
  }

  updateDOM(prevNode, dom, config) {
    const isUpdated = super.updateDOM(prevNode, dom, config);
    if (prevNode.__highlightColor !== this.__highlightColor) {
      dom.style.backgroundColor = this.__highlightColor;
    }
    return isUpdated;
  }

  static importJSON(serializedNode) {
    const node = $createHighlightNode(serializedNode.text, serializedNode.highlightColor);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      highlightColor: this.__highlightColor,
      type: 'highlight',
      version: 1,
    };
  }

  getHighlightColor() {
    return this.__highlightColor;
  }

  setHighlightColor(color) {
    const writable = this.getWritable();
    writable.__highlightColor = color;
  }
}

export function $createHighlightNode(text = '', highlightColor = '#ffff00') {
  return new HighlightNode(text, highlightColor);
}

export function $isHighlightNode(node) {
  return node instanceof HighlightNode;
}