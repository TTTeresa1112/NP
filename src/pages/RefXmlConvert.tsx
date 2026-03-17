import React, { useRef, useState } from 'react';
import { Upload, Search, Edit2, ChevronLeft, ChevronRight, Trash2, X, FileCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const statuses = ['Completed', 'Processing', 'Queued', 'Failed'];

const mockData = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  fileName: `EM-${71 + i}`,
  progress: i % 4 === 0 ? '35/35' : `${Math.floor(Math.random() * 35)}/35`,
  creator: 'John Doe',
  status: statuses[i % 4],
  createdAt: '2026-03-05 17:20:54',
  completedAt: i % 4 === 0 ? '2026-03-05 17:23:50' : '-',
}));

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'text-zinc-900';
    case 'Processing':
      return 'text-emerald-600';
    case 'Queued':
      return 'text-orange-500';
    case 'Failed':
      return 'text-red-500';
    default:
      return 'text-zinc-700';
  }
};

interface RefXmlConvertProps {
  onOpenEditor: () => void;
}

export default function RefXmlConvert({ onOpenEditor }: RefXmlConvertProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const filteredData = mockData.filter(row => 
    row.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPendingFile(e.target.files[0]);
      setShowConfirmModal(true);
    }
    // Reset input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirmUpload = () => {
    // Here you would typically start the upload/processing
    console.log('Confirmed upload for:', pendingFile?.name);
    setShowConfirmModal(false);
    setPendingFile(null);
  };

  const handleCancelUpload = () => {
    setShowConfirmModal(false);
    setPendingFile(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1200px] mx-auto pb-10"
    >
      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-zinc-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-zinc-200/60 w-full max-w-md overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                <h3 className="text-base font-medium text-zinc-900 tracking-tight">Confirm Upload</h3>
                <button 
                  onClick={handleCancelUpload}
                  className="p-1 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-center flex-shrink-0">
                    <FileCode className="w-5 h-5 text-zinc-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 mb-1 tracking-tight">
                      {pendingFile?.name}
                    </p>
                    <p className="text-[13px] text-zinc-500 leading-relaxed">
                      Are you sure you want to upload this XML file? It will be added to the processing queue.
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-zinc-50/50 border-t border-zinc-100 flex justify-end space-x-3">
                <button 
                  onClick={handleCancelUpload}
                  className="px-4 py-2 text-[13px] font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors tracking-tight"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmUpload}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg shadow-[0_2px_8px_0_rgb(0,0,0,0.1)] transition-all font-medium text-[13px] tracking-tight"
                >
                  Confirm & Process
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Top Actions */}
      <div className="flex justify-between items-end mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-zinc-700 text-[11px] font-medium tracking-widest uppercase">
            {filteredData.length} Files
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600" strokeWidth={1.5} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search file or creator" 
                className="pl-8 pr-3 py-1.5 w-64 bg-white border border-zinc-200/80 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all shadow-sm placeholder:text-zinc-600 text-zinc-900 font-normal"
              />
            </div>
          </div>
          <button className="px-3 py-1.5 bg-white border border-zinc-200/80 hover:bg-zinc-50 text-zinc-700 rounded-lg shadow-sm transition-all font-medium text-xs flex items-center tracking-tight">
            <Search className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
            Search
          </button>
          <div className="w-px h-4 bg-zinc-200 mx-1"></div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            className="hidden" 
            accept=".xml"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg shadow-[0_2px_8px_0_rgb(0,0,0,0.1)] transition-all font-medium text-xs tracking-tight"
          >
            <Upload className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
            Upload XML
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm overflow-hidden">
        {/* Top Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-100">
          <span className="text-[11px] text-zinc-600 font-medium tracking-widest uppercase">Page 1 of 10</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] text-zinc-600 font-medium tracking-widest uppercase">Page size:</span>
              <select className="bg-white border border-zinc-200/80 rounded-md text-xs py-1 px-2 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-zinc-700 shadow-sm font-normal">
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-1.5 rounded-md border border-zinc-200/80 text-zinc-600 hover:text-zinc-600 hover:bg-white disabled:opacity-50 transition-colors bg-white shadow-sm" disabled>
                <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <button className="w-7 h-7 rounded-md bg-zinc-900 text-white text-[11px] font-medium flex items-center justify-center shadow-sm">
                1
              </button>
              <button className="w-7 h-7 rounded-md border border-zinc-200/80 text-zinc-600 hover:bg-white text-[11px] font-medium flex items-center justify-center transition-colors bg-white shadow-sm">
                2
              </button>
              <button className="w-7 h-7 rounded-md border border-zinc-200/80 text-zinc-600 hover:bg-white text-[11px] font-medium flex items-center justify-center transition-colors bg-white shadow-sm">
                3
              </button>
              <button className="p-1.5 rounded-md border border-zinc-200/80 text-zinc-600 hover:bg-white transition-colors bg-white shadow-sm">
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200/80 bg-zinc-50/50 text-[11px] uppercase tracking-widest text-zinc-600 font-medium">
                <th className="px-6 py-4 font-medium">File Name</th>
                <th className="px-6 py-4 font-medium">Progress</th>
                <th className="px-6 py-4 font-medium">Creator</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Created At</th>
                <th className="px-6 py-4 font-medium">Completed At</th>
                <th className="px-6 py-4 font-medium w-24 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100/80">
              {filteredData.length > 0 ? filteredData.map((row) => {
                return (
                  <React.Fragment key={row.id}>
                    <tr className="even:bg-zinc-50/30 hover:bg-zinc-50 transition-colors duration-300 group">
                      <td className="px-6 py-4 font-medium text-zinc-900 text-[14px] tracking-tight">{row.fileName}</td>
                      <td className="px-6 py-4 text-[13px] text-zinc-700 font-normal">{row.progress}</td>
                      <td className="px-6 py-4 text-[13px] text-zinc-700 font-normal">{row.creator}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[13px] font-medium tracking-tight ${getStatusStyles(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-600 font-mono text-[11px]">{row.createdAt}</td>
                      <td className="px-6 py-4 text-zinc-600 font-mono text-[11px]">{row.completedAt}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button 
                            onClick={onOpenEditor}
                            className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-zinc-200/50 rounded-md transition-all inline-flex"
                          >
                            <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                          <button className="p-1.5 text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors inline-flex">
                            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              }) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[13px] text-zinc-700 font-normal">
                    No files found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Bottom Pagination */}
        <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/30">
          <span className="text-[11px] text-zinc-600 font-medium tracking-widest uppercase">Page 1 of 10</span>
          <div className="flex items-center space-x-1">
            <button className="p-1.5 rounded-md border border-zinc-200/80 text-zinc-600 hover:text-zinc-600 hover:bg-white disabled:opacity-50 transition-colors bg-white shadow-sm" disabled>
              <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button className="w-7 h-7 rounded-md bg-zinc-900 text-white text-[11px] font-medium flex items-center justify-center shadow-sm">
              1
            </button>
            <button className="w-7 h-7 rounded-md border border-zinc-200/80 text-zinc-600 hover:bg-white text-[11px] font-medium flex items-center justify-center transition-colors bg-white shadow-sm">
              2
            </button>
            <button className="w-7 h-7 rounded-md border border-zinc-200/80 text-zinc-600 hover:bg-white text-[11px] font-medium flex items-center justify-center transition-colors bg-white shadow-sm">
              3
            </button>
            <button className="p-1.5 rounded-md border border-zinc-200/80 text-zinc-600 hover:bg-white transition-colors bg-white shadow-sm">
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
