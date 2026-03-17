import React, { useState, useMemo } from 'react';
import { ClipboardPaste, Search, Download, Eye, EyeOff, ChevronLeft, ChevronRight, Trash2, X } from 'lucide-react';
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

export default function RefCheck() {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  
  // Paste Reference Modal State
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [pasteStep, setPasteStep] = useState<1 | 2>(1);
  const [pasteFileName, setPasteFileName] = useState('');
  const [pasteContent, setPasteContent] = useState('');

  const parsedReferences = useMemo(() => {
    return pasteContent.split('\n').map(s => s.trim()).filter(s => s.length > 0);
  }, [pasteContent]);

  const filteredData = mockData.filter(row => 
    row.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1200px] mx-auto pb-10"
    >
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
          <button 
            onClick={() => {
              setIsPasteModalOpen(true);
              setPasteStep(1);
              setPasteFileName('');
              setPasteContent('');
            }}
            className="flex items-center px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg shadow-[0_2px_8px_0_rgb(0,0,0,0.1)] transition-all font-medium text-xs tracking-tight"
          >
            <ClipboardPaste className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
            Paste Reference
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
                <th className="px-6 py-4 font-medium w-20 text-center">Preview</th>
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
                const isExpanded = expandedRows.has(row.id);
                return (
                  <React.Fragment key={row.id}>
                    <tr className={`even:bg-zinc-50/30 hover:bg-zinc-50 transition-colors duration-300 group ${isExpanded ? 'bg-zinc-50/50' : ''}`}>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => toggleRow(row.id)}
                          className={`p-1.5 rounded-md transition-all inline-flex items-center justify-center ${isExpanded ? 'text-zinc-900 bg-white shadow-sm ring-1 ring-zinc-200/50' : 'text-zinc-600 hover:text-zinc-900 hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-zinc-200/50'}`}
                        >
                          {isExpanded ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                        </button>
                      </td>
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
                          <button className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-zinc-200/50 rounded-md transition-all inline-flex">
                            <Download className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                          <button className="p-1.5 text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors inline-flex">
                            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <AnimatePresence>
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} className="p-0 border-b border-zinc-200/80">
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-zinc-50/30"
                            >
                              <div className="p-8 pl-24 flex items-start gap-12">
                                <div className="w-px h-24 bg-zinc-200 shrink-0 mt-1"></div>
                                
                                <div className="flex-1 grid grid-cols-4 gap-8">
                                  <div className="space-y-4">
                                    <h4 className="text-[11px] font-medium text-zinc-600 tracking-widest uppercase">Publication Year</h4>
                                    <div className="space-y-2">
                                      <p className="text-[13px] text-zinc-700 font-normal flex justify-between"><span>Last 5 Years</span> <span className="font-medium text-zinc-900">15/35 <span className="text-zinc-600 font-normal text-[11px] ml-1">(42.9%)</span></span></p>
                                      <p className="text-[13px] text-zinc-700 font-normal flex justify-between"><span>Last 3 Years</span> <span className="font-medium text-zinc-900">8/35 <span className="text-zinc-600 font-normal text-[11px] ml-1">(22.9%)</span></span></p>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h4 className="text-[11px] font-medium text-zinc-600 tracking-widest uppercase">DOI Coverage</h4>
                                    <div className="space-y-2">
                                      <p className="text-[13px] text-zinc-700 font-normal flex justify-between"><span>With DOI</span> <span className="font-medium text-zinc-900">23/35 <span className="text-zinc-600 font-normal text-[11px] ml-1">(65.7%)</span></span></p>
                                      <p className="text-[13px] text-zinc-700 font-normal flex justify-between"><span>Without DOI</span> <span className="font-medium text-zinc-900">12/35 <span className="text-zinc-600 font-normal text-[11px] ml-1">(34.3%)</span></span></p>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h4 className="text-[11px] font-medium text-zinc-600 tracking-widest uppercase">Document Status</h4>
                                    <div className="space-y-2">
                                      <p className="text-[13px] text-zinc-700 font-normal flex justify-between"><span>Corrected</span> <span className="font-medium text-zinc-900">3/35 <span className="text-zinc-600 font-normal text-[11px] ml-1">(8.6%)</span></span></p>
                                      <p className="text-[13px] text-zinc-700 font-normal flex justify-between"><span>Retracted</span> <span className="font-medium text-zinc-900">1/35 <span className="text-zinc-600 font-normal text-[11px] ml-1">(2.9%)</span></span></p>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h4 className="text-[11px] font-medium text-zinc-600 tracking-widest uppercase">Duplicate Issues</h4>
                                    <div className="space-y-2">
                                      <p className="text-[13px] text-zinc-700 font-normal flex justify-between"><span>DOI Duplicates</span> <span className="font-medium text-zinc-900">1</span></p>
                                      <p className="text-[13px] text-zinc-700 font-normal flex justify-between"><span>Text Duplicates</span> <span className="font-medium text-zinc-900">1</span></p>
                                    </div>
                                  </div>
                                </div>

                                <div className="shrink-0 flex flex-col items-end justify-center min-w-[160px] pt-2">
                                  <span className="text-[11px] font-medium text-zinc-600 tracking-widest uppercase mb-2">Successfully Matched</span>
                                  <div className="flex items-baseline space-x-2">
                                    <span className="text-3xl font-normal text-zinc-900 tracking-tight">23<span className="text-xl text-zinc-600">/35</span></span>
                                  </div>
                                  <span className="text-sm text-zinc-700 font-normal mt-1">65.71%</span>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              }) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-[13px] text-zinc-700 font-normal">
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

      {/* Paste Reference Modal */}
      <AnimatePresence>
        {isPasteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-900/20 backdrop-blur-sm"
              onClick={() => setIsPasteModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-2xl shadow-xl border border-zinc-200/80 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 shrink-0">
                <h3 className="text-lg font-medium text-zinc-900 tracking-tight">
                  Paste References
                </h3>
                <button 
                  onClick={() => setIsPasteModalOpen(false)}
                  className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-zinc-200/50 rounded-md transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-6 flex-1 overflow-y-auto">
                {pasteStep === 1 ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-700 uppercase tracking-widest mb-1.5">
                        File Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        value={pasteFileName}
                        onChange={(e) => setPasteFileName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-zinc-200/80 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-900 shadow-sm"
                        placeholder="e.g. Manuscript_References_v1"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-700 uppercase tracking-widest mb-1.5">
                        References
                      </label>
                      <textarea 
                        value={pasteContent}
                        onChange={(e) => setPasteContent(e.target.value)}
                        className="w-full h-64 px-3 py-2 bg-white border border-zinc-200/80 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-900 shadow-sm resize-none leading-relaxed"
                        placeholder="Paste your references here. Each line will be treated as a separate reference..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200/80 p-3 rounded-lg">
                      <div>
                        <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest block mb-0.5">File Name</span>
                        <span className="text-[13px] font-medium text-zinc-900">{pasteFileName}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest block mb-0.5">Total</span>
                        <span className="px-2 py-0.5 bg-white border border-zinc-200/80 text-zinc-600 text-[11px] font-medium tracking-widest uppercase rounded-full inline-block">
                          {parsedReferences.length} References
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-[13px] font-medium text-zinc-900 mb-2">Parsed References</h4>
                      <div className="border border-zinc-200/80 rounded-lg divide-y divide-zinc-100 overflow-hidden bg-zinc-50/30">
                        {parsedReferences.length > 0 ? parsedReferences.map((ref, idx) => (
                          <div key={idx} className="p-3 text-[13px] text-zinc-700 font-normal leading-relaxed hover:bg-white transition-colors">
                            <div className="flex gap-3">
                              <span className="text-zinc-600 font-mono text-xs select-none mt-0.5">{(idx + 1).toString().padStart(2, '0')}.</span>
                              <span>{ref}</span>
                            </div>
                          </div>
                        )) : (
                          <div className="p-6 text-center text-[13px] text-zinc-700 font-normal">
                            No references found. Please go back and paste some text.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50/50 flex justify-end space-x-2 shrink-0">
                {pasteStep === 1 ? (
                  <>
                    <button 
                      onClick={() => setIsPasteModalOpen(false)}
                      className="px-4 py-2 text-[13px] font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => setPasteStep(2)}
                      disabled={!pasteFileName.trim() || !pasteContent.trim()}
                      className="px-4 py-2 text-[13px] font-medium bg-zinc-900 text-white hover:bg-zinc-800 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Preview
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setPasteStep(1)}
                      className="px-4 py-2 text-[13px] font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => {
                        setIsPasteModalOpen(false);
                      }}
                      className="px-4 py-2 text-[13px] font-medium bg-zinc-900 text-white hover:bg-zinc-800 rounded-lg shadow-sm transition-colors"
                    >
                      Submit
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
