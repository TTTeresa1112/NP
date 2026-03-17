import React, { useState, useRef } from 'react';
import { Upload, FileText, Settings2, ChevronDown, ChevronRight, Image as ImageIcon, AlignLeft, BookOpen, LayoutTemplate, FileCode, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ConfigSection = ({ title, icon: Icon, defaultOpen = false, children }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm mb-6 overflow-hidden">
      <div 
        className="flex items-center justify-between px-6 py-4 cursor-pointer group bg-zinc-50/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          {isOpen ? <ChevronDown className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors" strokeWidth={1.5} /> : <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors" strokeWidth={1.5} />}
          <h3 className="text-[13px] font-medium text-zinc-900 tracking-tight">{title}</h3>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-zinc-100"
          >
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const mockFigures = [
  { id: 'fig1', type: 'image', width: '', drawAtPage: '', rotation: '', following: true, largeTable: false, cellFontSize: '', colWidth: '' },
  { id: 'fig2', type: 'image', width: '', drawAtPage: '', rotation: '', following: true, largeTable: false, cellFontSize: '', colWidth: '' },
  { id: 't1', type: 'table', width: '', drawAtPage: '', rotation: '', following: true, largeTable: false, cellFontSize: '', colWidth: '' },
];

const mockParagraphs = [
  "Antibiotic resistance is a global threat, driven b...",
  "The rapid emergence and global dissemination of an...",
  "Global surveillance initiatives, including the WHO...",
  "Despite the escalating clinical need, the antibiot..."
];

const mockReferences = ['B1 Antibiotic resistance is a global threat, driven b...', 'B2 The rapid emergence and global dissemination of an...', 'B3 Global surveillance initiatives, including the WHO...', 'B4 Despite the escalating clinical need, the antibiot...', 'B5 Antibiotic resistance is a global threat, driven b...'];

export default function XmlToPdf() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processUpload = (file: File) => {
    setIsUploading(true);
    setUploadError('');
    setTimeout(() => {
      // Mock random success/failure
      if (Math.random() > 0.5) {
        setFileName(file.name);
        setIsUploaded(true);
      } else {
        setUploadError('Failed to parse the uploaded file. Please ensure it is a valid XML or ZIP archive.');
      }
      setIsUploading(false);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processUpload(e.dataTransfer.files[0]);
    }
  };

  const handleGeneratePdf = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // Create a dummy PDF blob to open in a new tab
      const pdfContent = '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n5 0 obj\n<< /Length 44 >>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(Generated PDF Document) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000224 00000 n \n0000000312 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n417\n%%EOF';
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1000px] mx-auto pb-20 h-full flex flex-col">
      
      {/* Top Actions */}
      <div className="flex justify-between items-end pb-4 border-b border-zinc-200/60 mb-6">
        <div className="flex flex-col space-y-1">
          <p className="text-[11px] text-zinc-700 font-normal tracking-wide">
            {isUploaded ? `Configuring layout for: ${fileName}` : 'Upload your XML manuscript to configure layout and generate a PDF.'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isUploaded && (
            <>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-white border border-zinc-200/80 text-zinc-700 hover:bg-zinc-50 rounded-lg shadow-sm transition-all font-medium text-xs flex items-center tracking-tight"
              >
                <Upload className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                Re-upload
              </button>
              <button 
                onClick={handleGeneratePdf}
                disabled={isGenerating}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg shadow-[0_2px_8px_0_rgb(0,0,0,0.1)] transition-all font-medium text-xs flex items-center tracking-tight disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" strokeWidth={1.5} />
                ) : (
                  <FileText className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                )}
                {isGenerating ? 'Generating...' : 'Generate PDF'}
              </button>
            </>
          )}
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept=".xml,.zip" 
        className="hidden" 
      />

      {!isUploaded ? (
        <div className="flex-1 flex flex-col items-center justify-center mt-12 mb-20">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-zinc-200/60 shadow-sm p-8">
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`w-full border-2 border-dashed border-zinc-200/80 hover:border-zinc-400 bg-zinc-50/30 hover:bg-zinc-50/80 transition-all rounded-xl p-12 flex flex-col items-center justify-center ${isUploading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer group'}`}
            >
              <div className="w-16 h-16 bg-white border border-zinc-200/80 rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                {isUploading ? (
                  <Loader2 className="w-8 h-8 text-zinc-600 animate-spin" strokeWidth={1.5} />
                ) : (
                  <FileCode className="w-8 h-8 text-zinc-600 group-hover:text-zinc-900 transition-colors" strokeWidth={1.5} />
                )}
              </div>
              <h3 className="text-base font-medium text-zinc-900 tracking-tight mb-2">
                {isUploading ? 'Uploading...' : 'Upload XML Manuscript'}
              </h3>
              <p className="text-[13px] text-zinc-700 font-normal text-center max-w-sm mb-8">
                Drag and drop your .zip file (including XML and figure (optional) files) here, or click to browse your computer.
              </p>
              <button 
                disabled={isUploading}
                className="px-5 py-2.5 bg-white border border-zinc-200/80 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 rounded-lg shadow-sm transition-all font-medium text-xs tracking-tight disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Processing...' : 'Select File'}
              </button>
              {uploadError && (
                <p className="text-red-500 text-xs mt-4 font-medium">{uploadError}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-0"
        >
        
        {/* Style Config */}
        <ConfigSection title="Style Config" icon={LayoutTemplate} defaultOpen={true}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <div>
              <label className="block text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-1.5">Title Space Font Size</label>
              <input type="text" className="w-full px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal" />
              <p className="text-[11px] text-zinc-600 mt-1.5 font-normal">Default Title Font Size: 15.5</p>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-1.5">Title Character Spacing</label>
              <input type="text" className="w-full px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-1.5">Author(s) Space Font Size</label>
              <input type="text" className="w-full px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal" />
              <p className="text-[11px] text-zinc-600 mt-1.5 font-normal">Default Author(s) Font Size: 11</p>
            </div>
            <div className="md:col-span-3">
              <label className="block text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-1.5">Page Bottom Margin</label>
              <input type="text" className="w-full px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal" />
              <div className="text-[11px] text-zinc-600 mt-2 space-y-1 font-normal">
                <p>Default Page Bottom Margin: 1st page (<span className="font-medium text-zinc-600">110</span>), other pages (<span className="font-medium text-zinc-600">56.69</span>)</p>
                <p><span className="font-medium text-zinc-600">'1, 116; 5, 62'</span> means page 1's bottom margin is 116, and page 5's bottom margin is 62</p>
              </div>
            </div>
          </div>
        </ConfigSection>

        {/* Tables/Figures Config */}
        <ConfigSection title="Tables/Figures Config" icon={ImageIcon} defaultOpen={true}>
          <div className="flex flex-col">
            {mockFigures.map((item, idx) => (
              <div key={item.id} className={`py-5 ${idx !== mockFigures.length - 1 ? 'border-b border-zinc-200/60' : ''}`}>
                <h4 className="text-xs font-mono text-zinc-900 mb-4 tracking-tight">{item.id}</h4>
                <div className={`grid grid-cols-1 ${item.type === 'table' ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6 mb-4`}>
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-1.5">Width</label>
                    <input type="text" defaultValue={item.width} className="w-full px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal" />
                    <p className="text-[11px] text-zinc-500 mt-1.5 font-normal">PDF Page Width: 481.5</p>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-1.5">Draw at Page</label>
                    <input type="text" defaultValue={item.drawAtPage} className="w-full px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-1.5">Rotation</label>
                    <select className="w-full px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal">
                      <option value=""></option>
                      <option value="90">90°</option>
                      <option value="180">180°</option>
                      <option value="270">270°</option>
                    </select>
                  </div>
                  {item.type === 'table' && (
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-1.5">Table Cell Font Size</label>
                      <input type="text" className="w-full px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal" />
                      <p className="text-[11px] text-zinc-500 mt-1.5 font-normal">Default: 8.5</p>
                    </div>
                  )}
                </div>
                
                {item.type === 'table' && (
                  <div className="mb-4">
                    <label className="block text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-1.5">Table Column Width</label>
                    <input type="text" defaultValue={item.colWidth} className="w-full px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal" />
                    <p className="text-[11px] text-zinc-600 mt-1.5 font-normal">Default: 1,100;2,200 (Column 1: minimum width is 100, Column 2: minimum width is 200)</p>
                  </div>
                )}

                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input type="checkbox" defaultChecked={item.following} className="w-3.5 h-3.5 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-900" />
                    <span className="text-[11px] font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors tracking-tight">Following with Content</span>
                  </label>
                  {item.type === 'table' && (
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input type="checkbox" defaultChecked={item.largeTable} className="w-3.5 h-3.5 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-900" />
                      <span className="text-[11px] font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors tracking-tight">Large Table</span>
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ConfigSection>

        {/* Hyphenation Config */}
        <ConfigSection title="Hyphenation Config" icon={AlignLeft}>
          <div className="flex flex-col">
            {mockParagraphs.map((text, idx) => (
              <div key={idx} className={`py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ${idx !== mockParagraphs.length - 1 ? 'border-b border-zinc-200/60' : ''}`}>
                <div className="flex-1">
                  <p className="text-[13px] font-normal text-zinc-700">{text}</p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <label className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest whitespace-nowrap">Min Before:</label>
                    <input type="text" className="w-16 px-2.5 py-1 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal text-center" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <label className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest whitespace-nowrap">Min After:</label>
                    <input type="text" className="w-16 px-2.5 py-1 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal text-center" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ConfigSection>

        {/* Reference Config */}
        <ConfigSection title="Reference Config" icon={BookOpen}>
          <div className="flex flex-col">
            {mockReferences.map((ref, idx) => (
              <div key={idx} className={`py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ${idx !== mockReferences.length - 1 ? 'border-b border-zinc-200/60' : ''}`}>
                <div className="flex-1">
                  <p className="text-[13px] font-normal text-zinc-700">{ref}</p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <label className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest whitespace-nowrap">Min Before Point:</label>
                    <input type="text" className="w-16 px-2.5 py-1 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal text-center" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <label className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest whitespace-nowrap">Min After Point:</label>
                    <input type="text" className="w-16 px-2.5 py-1 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal text-center" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ConfigSection>

        </motion.div>
      )}
    </motion.div>
  );
}