import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, ChevronLeft } from 'lucide-react';

export default function FormattedReferences({ data, onBack }: { data: any[], onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    if (!contentRef.current) return;
    
    try {
      // Copy rich text to clipboard
      const html = contentRef.current.innerHTML;
      const text = contentRef.current.innerText;
      
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([text], { type: 'text/plain' })
      });
      
      await navigator.clipboard.write([clipboardItem]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback
      navigator.clipboard.writeText(contentRef.current.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col max-w-[1000px] mx-auto pb-20"
    >
      <div className="flex justify-between items-center pb-4 border-b border-zinc-200/60 mb-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-zinc-200/50 rounded-md transition-all inline-flex mr-2"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <h2 className="text-lg font-medium text-zinc-900 tracking-tight">Formatted Output</h2>
        </div>
        <button 
          onClick={handleCopy}
          className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg shadow-[0_2px_8px_0_rgb(0,0,0,0.1)] transition-all font-medium text-xs flex items-center tracking-tight"
        >
          {copied ? <Check className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} /> : <Copy className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />}
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm p-8 md:p-12 overflow-auto flex-1">
        <div 
          ref={contentRef}
          className="space-y-4 text-[14px] text-zinc-800 leading-relaxed font-normal"
        >
          {data.map((item, index) => (
            <div key={item.id || index} dangerouslySetInnerHTML={{ __html: item.converted }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
