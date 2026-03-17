import React, { useState } from 'react';
import { Search, Plus, ChevronDown, ChevronRight, Info, FileArchive, Upload, Users, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Section = ({ title, hasInfo = false, defaultOpen = true, children }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-200/60 last:border-0">
      <div 
        className="flex items-center justify-between py-3 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <div className="w-5 flex justify-center mr-1">
            {isOpen ? <ChevronDown className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors" strokeWidth={1.5} /> : <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors" strokeWidth={1.5} />}
          </div>
          <h3 className="text-[13px] font-medium text-zinc-900 tracking-tight mr-1.5">{title}</h3>
          {hasInfo && (
            <div className="text-zinc-600 hover:text-zinc-600 cursor-help transition-colors" title="More information">
              <Info className="w-3.5 h-3.5" strokeWidth={1.5} />
            </div>
          )}
        </div>
        <button 
          className="flex items-center px-2.5 py-1 text-[11px] font-medium text-zinc-600 bg-white border border-zinc-200/80 hover:bg-zinc-50 rounded-md transition-colors shadow-sm tracking-tight"
          onClick={(e) => { e.stopPropagation(); /* Add action */ }}
        >
          <Plus className="w-3 h-3 mr-1" strokeWidth={1.5} />
          Add
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-5 pt-1 pl-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PersonRow = ({ data }: any) => (
  <div className="flex items-center mb-3 last:mb-0 group">
    <div className="grid grid-cols-4 gap-4 flex-1">
      <div>
        <label className="block text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-1.5">First Name</label>
        <input type="text" defaultValue={data.firstName} className="w-full px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal" />
      </div>
      <div>
        <label className="block text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-1.5">Middle Name</label>
        <input type="text" defaultValue={data.middleName} className="w-full px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal" />
      </div>
      <div>
        <label className="block text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-1.5">Last Name</label>
        <input type="text" defaultValue={data.lastName} className="w-full px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal" />
      </div>
      <div>
        <label className="block text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-1.5">Email</label>
        <input type="email" defaultValue={data.email} className="w-full px-2.5 py-1.5 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-800 shadow-sm font-normal" />
      </div>
    </div>
  </div>
);

export default function ReviewerList() {
  const [manuscriptId, setManuscriptId] = useState('');
  const [hasFetched, setHasFetched] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleFetch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!manuscriptId.trim()) return;

    setIsFetching(true);
    // Simulate API call
    setTimeout(() => {
      setIsFetching(false);
      setHasFetched(true);
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col max-w-[1000px] mx-auto w-full pb-20"
    >
      {!hasFetched ? (
        <div className="flex-1 flex flex-col items-center justify-center h-full mt-32 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl flex flex-col items-center"
          >
            <h2 className="text-xl font-medium text-zinc-900 tracking-tight mb-2">Reviewer Management</h2>
            <p className="text-[13px] text-zinc-700 font-normal text-center mb-8">
              Enter a Manuscript ID to fetch author, editor, and reviewer details.
            </p>

            <form onSubmit={handleFetch} className="w-full flex items-center space-x-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" strokeWidth={1.5} />
                <input
                  type="text"
                  value={manuscriptId}
                  onChange={(e) => setManuscriptId(e.target.value)}
                  placeholder="e.g., ENT-2025-00080"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all shadow-sm font-mono text-zinc-800 placeholder:text-zinc-600 placeholder:font-sans"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={!manuscriptId.trim() || isFetching}
                className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-[0_2px_8px_0_rgb(0,0,0,0.1)] transition-all font-medium text-sm tracking-tight disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {isFetching ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" strokeWidth={1.5} />
                ) : null}
                {isFetching ? 'Fetching...' : 'Fetch Data'}
              </button>
            </form>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col w-full"
        >
          {/* Top Search Area - Sticky */}
          <div className="flex justify-between items-end pb-4 border-b border-zinc-200/60 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-[11px] text-zinc-700 font-normal">
                <span>Current ID:</span>
                <span className="text-zinc-700 font-mono">{manuscriptId}</span>
              </div>
            </div>

            <form onSubmit={handleFetch} className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600" strokeWidth={1.5} />
                <input 
                  type="text" 
                  value={manuscriptId}
                  onChange={(e) => setManuscriptId(e.target.value)}
                  className="w-56 pl-8 pr-3 py-1.5 bg-white border border-zinc-200/80 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all shadow-sm font-mono text-zinc-800"
                />
              </div>
              <button 
                type="submit"
                disabled={!manuscriptId.trim() || isFetching}
                className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg shadow-[0_2px_8px_0_rgb(0,0,0,0.1)] transition-all font-medium text-xs tracking-tight disabled:opacity-70 flex items-center"
              >
                {isFetching ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" strokeWidth={1.5} /> : null}
                {isFetching ? 'Fetching...' : 'Fetch Data'}
              </button>
            </form>
          </div>

          {/* Personnel Modules */}
          <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm mb-8 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
              <h3 className="text-[13px] font-medium text-zinc-900 tracking-tight">Personnel Modules</h3>
            </div>
            <div className="px-6">
              <Section title="Author(s)">
                <PersonRow data={{ firstName: 'John', middleName: '', lastName: 'Doe', email: 'john.doe@example.com' }} />
                <PersonRow data={{ firstName: 'Jane', middleName: 'A.', lastName: 'Smith', email: 'jane.smith@example.com' }} />
              </Section>

              <Section title="Editor in Chief">
                <PersonRow data={{ firstName: 'Robert', middleName: '', lastName: 'Brown', email: 'editor@journal.com' }} />
              </Section>

              <Section title="Academic Editor(s)" defaultOpen={false}>
                <div className="py-3 text-zinc-600 text-[11px] font-normal italic">No data, click Add to create</div>
              </Section>

              <Section title="ARES Reviewer(s)" hasInfo={true}>
                <PersonRow data={{ firstName: 'Michael', middleName: '', lastName: 'Johnson', email: 'mj@university.edu' }} />
              </Section>

              <Section title="Authors' Recommended Reviewer(s)" defaultOpen={false}>
                <div className="py-3 text-zinc-600 text-[11px] font-normal italic">No data, click Add to create</div>
              </Section>
            </div>
          </div>

          {/* Batch Info & File Generation */}
          <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm mb-8 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
              <h3 className="text-[13px] font-medium text-zinc-900 tracking-tight">Batch Information</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="flex items-center text-[11px] font-medium text-zinc-700 uppercase tracking-widest mb-2">
                    <span>E-mail(s)</span>
                    <div className="ml-1.5 text-zinc-600 hover:text-zinc-600 cursor-help transition-colors" title="Enter one email per line">
                      <Info className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                  </label>
                  <textarea 
                    className="w-full p-3 bg-white border border-zinc-200/80 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 min-h-[100px] text-zinc-700 font-normal shadow-sm leading-relaxed"
                    defaultValue="john.doe@example.com&#10;jane.smith@example.com&#10;editor@journal.com&#10;mj@university.edu"
                  />
                </div>
                <div>
                  <label className="flex items-center text-[11px] font-medium text-zinc-700 uppercase tracking-widest mb-2">
                    <span>Institution Email Domains</span>
                    <div className="ml-1.5 text-zinc-600 hover:text-zinc-600 cursor-help transition-colors" title="Enter one domain per line">
                      <Info className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                  </label>
                  <textarea 
                    className="w-full p-3 bg-white border border-zinc-200/80 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 min-h-[100px] text-zinc-700 font-normal shadow-sm leading-relaxed"
                    defaultValue="example.com&#10;journal.com&#10;university.edu"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm mb-12 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
              <h3 className="text-[13px] font-medium text-zinc-900 tracking-tight">File Generation</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button className="flex items-center px-3 py-1.5 bg-white border border-zinc-200/80 hover:bg-zinc-50 text-zinc-700 rounded-lg shadow-sm transition-all font-medium text-[11px] tracking-tight">
                    <Upload className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                    Select File <span className="text-zinc-600 ml-2 font-normal">No file selected</span>
                  </button>
                  <div className="ml-3 text-zinc-600 hover:text-zinc-600 cursor-help transition-colors" title="Select a ZIP file for processing">
                    <Info className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                </div>
                <button className="flex items-center px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg shadow-[0_2px_8px_0_rgb(0,0,0,0.1)] transition-all font-medium text-xs tracking-tight">
                  <FileArchive className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                  Generate File
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
