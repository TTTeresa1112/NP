import React, { useState, useRef } from 'react';
import { Upload, FileCode, ChevronDown, FileText, Loader2, CheckCircle2, Download } from 'lucide-react';
import { motion } from 'motion/react';

export default function WordToXml() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fileName, setFileName] = useState('');
  const [selectedJournal, setSelectedJournal] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [xmlUrl, setXmlUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setIsUploaded(true);
      setErrorMessage(null);
      setSuccessMsg(null);
      setXmlUrl(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFileName(e.dataTransfer.files[0].name);
      setIsUploaded(true);
      setErrorMessage(null);
      setSuccessMsg(null);
      setXmlUrl(null);
    }
  };

  const handleGenerateXml = () => {
    if (!selectedJournal || !isUploaded) {
      setErrorMessage('Please select a journal and upload a file before generating XML.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setSuccessMsg(null);
    setXmlUrl(null);

    // Mock generation process
    setTimeout(() => {
      setIsGenerating(false);
      
      // Randomly simulate success or error for demonstration
      const isSuccess = Math.random() > 0.2; // Increase success rate for better UX
      
      if (isSuccess) {
        setSuccessMsg('XML Generated successfully! The file is ready for download or preview.');
        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<article>\n  <title>Converted Document</title>\n  <content>This is a mock XML generated from ${fileName}</content>\n</article>`;
        const blob = new Blob([xmlContent], { type: 'text/xml' });
        setXmlUrl(URL.createObjectURL(blob));
      } else {
        setErrorMessage('Date format error. Please check the document and try again.');
      }
    }, 1500);
  };

  const handleDownloadXml = () => {
    if (xmlUrl) {
      const a = document.createElement('a');
      a.href = xmlUrl;
      a.download = `${fileName.replace(/\.[^/.]+$/, "") || 'document'}.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-[800px] mx-auto pb-20 h-full flex flex-col">
      
      {/* Top Actions - Sticky */}
      <div className="flex justify-between items-end pb-4 border-b border-zinc-200/60 mb-8">
        <div className="flex flex-col space-y-1">
          <p className="text-[11px] text-zinc-700 font-normal tracking-wide">
            Convert Word documents to XML format based on journal specifications.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {xmlUrl && (
            <button 
              onClick={handleDownloadXml}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-[0_2px_8px_0_rgb(0,0,0,0.1)] transition-all font-medium text-xs flex items-center tracking-tight mr-2"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
              Download XML
            </button>
          )}
          <button 
            onClick={handleGenerateXml}
            disabled={!isUploaded || !selectedJournal || isGenerating}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg shadow-[0_2px_8px_0_rgb(0,0,0,0.1)] transition-all font-medium text-xs flex items-center tracking-tight disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" strokeWidth={1.5} />
            ) : (
              <FileCode className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
            )}
            {isGenerating ? 'Generating...' : 'Generate XML'}
          </button>
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept=".doc,.docx" 
        className="hidden" 
      />

      <div className="space-y-6">
        {/* 1. Journal Selection */}
        <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center text-xs font-semibold mr-3">1</div>
            <h3 className="text-[13px] font-medium text-zinc-900 tracking-tight">Select Journal</h3>
          </div>
          <div className="pl-9">
            <div className="relative max-w-md">
              <select 
                value={selectedJournal}
                onChange={(e) => setSelectedJournal(e.target.value)}
                className="w-full appearance-none bg-zinc-50 border border-zinc-200/80 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-zinc-800 shadow-sm font-normal transition-all"
              >
                <option value="">Select a journal...</option>
                <option value="1">Exploration of Medicine</option>
                <option value="2">Exploration of Targeted Anti-tumor Therapy</option>
                <option value="3">Exploration of Immunology</option>
                <option value="4">Exploration of Neuroprotective Therapy</option>
                <option value="5">Exploration of Digestive Diseases</option>
                <option value="6">Exploration of Neuroscience</option>
                <option value="7">Exploration of Musculoskeletal Diseases</option>
                <option value="8">Exploration of Drug Science</option>
                <option value="9">Exploration of Asthma & Allergy</option>
                <option value="10">Exploration of Foods and Foodomics</option>
                <option value="11">Exploration of Digital Health Technologies</option>
                <option value="12">Exploration of Cardiology</option>
                <option value="13">Exploration of BioMat-X</option>
                <option value="14">Exploration of Endocrine and Metabolic Diseases</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* 2. File Upload */}
        <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center text-xs font-semibold mr-3">2</div>
            <h3 className="text-[13px] font-medium text-zinc-900 tracking-tight">Upload Document</h3>
          </div>
          
          <div className="pl-9">
            {!isUploaded ? (
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-zinc-200/80 hover:border-zinc-400 bg-zinc-50/50 hover:bg-zinc-50 transition-all rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer group"
              >
                <div className="w-12 h-12 bg-white border border-zinc-200/80 rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <FileText className="w-6 h-6 text-zinc-600 group-hover:text-zinc-900 transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="text-[13px] font-medium text-zinc-900 tracking-tight mb-1">Click or drag file to this area to upload</h3>
                <p className="text-[12px] text-zinc-700 font-normal text-center max-w-sm">
                  Support for .doc and .docx files. Strictly prohibit from uploading company data or other banned files.
                </p>
              </div>
            ) : (
              <div className="w-full border border-zinc-200/80 bg-zinc-50/50 rounded-xl p-5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white border border-zinc-200/80 rounded-lg shadow-sm flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-medium text-zinc-900 tracking-tight">{fileName}</h3>
                    <p className="text-[11px] text-zinc-700 font-normal mt-0.5">Ready for conversion</p>
                  </div>
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white border border-zinc-200/80 text-zinc-700 hover:bg-zinc-50 rounded-md shadow-sm transition-all font-medium text-xs flex items-center tracking-tight"
                >
                  <Upload className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                  Re-upload
                </button>
              </div>
            )}

            {/* Simple Error Message Display */}
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-[13px] text-red-500 font-medium"
              >
                {errorMessage}
              </motion.div>
            )}
          </div>
        </div>

        {/* Success Message */}
        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-medium text-emerald-900">Conversion Successful</h4>
              <p className="text-[12px] text-emerald-700 mt-1">{successMsg}</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
