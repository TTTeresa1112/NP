import React, { useState, useRef } from 'react';
import { Upload, FileCode, Loader2, Copy, Check, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function XmlPreview() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fileName, setFileName] = useState('');
  const [previewLink, setPreviewLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerateLink = () => {
    setIsGenerating(true);
    setPreviewLink('');
    setTimeout(() => {
      setIsGenerating(false);
      setPreviewLink(`https://preview.example.com/xml/${Math.random().toString(36).substring(7)}`);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setIsUploaded(true);
      handleGenerateLink();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFileName(e.dataTransfer.files[0].name);
      setIsUploaded(true);
      handleGenerateLink();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(previewLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1000px] mx-auto pb-20 h-full flex flex-col">
      
      {/* Top Actions - Sticky */}
      <div className="flex justify-between items-end pb-4 border-b border-zinc-200/60 mb-6">
        <div className="flex flex-col space-y-1">
          <p className="text-[11px] text-zinc-700 font-normal tracking-wide">
            {isUploaded ? `Preview for: ${fileName}` : 'Upload an XML file to generate a shareable preview link.'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isUploaded && (
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white border border-zinc-200/80 text-zinc-700 hover:bg-zinc-50 rounded-lg shadow-sm transition-all font-medium text-xs flex items-center tracking-tight"
            >
              <Upload className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
              Re-upload XML
            </button>
          )}
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept=".xml" 
        className="hidden" 
      />

      {!isUploaded ? (
        <div className="flex-1 flex flex-col items-center justify-center mt-12 mb-20">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-zinc-200/60 shadow-sm p-8">
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-zinc-200/80 hover:border-zinc-400 bg-zinc-50/30 hover:bg-zinc-50/80 transition-all rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer group"
            >
              <div className="w-16 h-16 bg-white border border-zinc-200/80 rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <FileCode className="w-8 h-8 text-zinc-600 group-hover:text-zinc-900 transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-medium text-zinc-900 tracking-tight mb-2">Upload XML File</h3>
              <p className="text-[13px] text-zinc-700 font-normal text-center max-w-sm mb-8">
                Drag and drop your .xml file here, or click to browse your computer.
              </p>
              <button className="px-5 py-2.5 bg-white border border-zinc-200/80 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 rounded-lg shadow-sm transition-all font-medium text-xs tracking-tight">
                Select File
              </button>
            </div>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {isGenerating ? (
            <div className="py-12 flex flex-col items-center justify-center border border-zinc-200/60 border-dashed rounded-2xl bg-white shadow-sm">
              <Loader2 className="w-8 h-8 text-zinc-400 mb-3 animate-spin" strokeWidth={1.5} />
              <p className="text-[13px] text-zinc-700 font-normal">Generating preview link...</p>
            </div>
          ) : previewLink ? (
            <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm p-6">
              <label className="block text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-3">Shareable Link</label>
              <div className="flex items-center space-x-2 max-w-2xl">
                <input 
                  type="text" 
                  readOnly 
                  value={previewLink} 
                  className="flex-1 px-3 py-2 bg-zinc-50 border border-zinc-200/80 rounded-md text-xs text-zinc-600 font-mono focus:outline-none shadow-sm" 
                />
                <button 
                  onClick={handleCopy}
                  className="px-4 py-2 bg-white border border-zinc-200/80 text-zinc-700 hover:bg-zinc-50 rounded-md shadow-sm transition-all font-medium text-xs flex items-center tracking-tight"
                >
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" strokeWidth={2} />
                  ) : (
                    <Copy className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                  )}
                  {isCopied ? 'Copied' : 'Copy'}
                </button>
                <a 
                  href={previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md shadow-[0_2px_8px_0_rgb(0,0,0,0.1)] transition-all font-medium text-xs flex items-center tracking-tight"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                  Open Link
                </a>
              </div>
            </div>
          ) : null}
        </motion.div>
      )}
    </motion.div>
  );
}
