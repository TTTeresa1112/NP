import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockJournals = [
  { id: 1, name: 'Exploration of Asthma & Allergy', doi: '10.37349', pissn: '', eissn: '2833-214X' },
  { id: 2, name: 'Journal of Advanced Research', doi: '10.37349', pissn: '1234-5678', eissn: '8765-4321' },
  { id: 3, name: 'Medical Science Monitor', doi: '10.37349', pissn: '', eissn: '1643-3750' },
];

export default function JournalManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJournals = mockJournals.filter(journal => 
    journal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    journal.doi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    journal.pissn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    journal.eissn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (journal: any = null) => {
    setEditingJournal(journal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingJournal(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col max-w-[1200px] mx-auto pb-10"
    >
      {/* Top Actions - Sticky */}
      <div className="flex justify-between items-end mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-zinc-700 text-[11px] font-medium tracking-widest uppercase">
            {filteredJournals.length} Items
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <label className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest">Journal Name:</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600" strokeWidth={1.5} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search journals..." 
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
            onClick={() => openModal()}
            className="flex items-center px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg shadow-[0_2px_8px_0_rgb(0,0,0,0.1)] transition-all font-medium text-xs tracking-tight"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
            Create
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm overflow-hidden flex-1 flex flex-col">
        {/* Top Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-100">
          <span className="text-[11px] text-zinc-600 font-medium tracking-widest uppercase">Page 1 of 1</span>
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
              <button className="p-1.5 rounded-md border border-zinc-200/80 text-zinc-600 hover:text-zinc-600 hover:bg-white disabled:opacity-50 transition-colors bg-white shadow-sm" disabled>
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200/80 bg-zinc-50/50 text-[11px] uppercase tracking-widest text-zinc-600 font-medium">
                <th className="px-5 py-3 font-medium w-16 text-center">Edit</th>
                <th className="px-5 py-3 font-medium w-16 text-center">Delete</th>
                <th className="px-5 py-3 font-medium">Journal Name</th>
                <th className="px-5 py-3 font-medium w-32">DOI</th>
                <th className="px-5 py-3 font-medium w-32">PISSN</th>
                <th className="px-5 py-3 font-medium w-32">EISSN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100/80">
              {filteredJournals.length > 0 ? filteredJournals.map((row) => (
                <tr key={row.id} className="even:bg-zinc-50/30 hover:bg-zinc-50 transition-colors duration-300 group">
                  <td className="px-5 py-2 text-center">
                    <button 
                      onClick={() => openModal(row)}
                      className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-zinc-200/50 rounded-md transition-all inline-flex"
                    >
                      <Edit className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                  </td>
                  <td className="px-5 py-2 text-center">
                    <button className="p-1.5 text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors inline-flex">
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                  </td>
                  <td className="px-5 py-2 font-medium text-zinc-800 text-[13px] tracking-tight">{row.name}</td>
                  <td className="px-5 py-2 text-[13px] text-zinc-700 font-mono">{row.doi}</td>
                  <td className="px-5 py-2 text-[13px] text-zinc-700 font-mono">{row.pissn || '-'}</td>
                  <td className="px-5 py-2 text-[13px] text-zinc-700 font-mono">{row.eissn}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-[13px] text-zinc-700 font-normal">
                    No journals found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Bottom Pagination */}
        <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/30">
          <span className="text-[11px] text-zinc-600 font-medium tracking-widest uppercase">Page 1 of 1</span>
          <div className="flex items-center space-x-1">
            <button className="p-1.5 rounded-md border border-zinc-200/80 text-zinc-600 hover:text-zinc-600 hover:bg-white disabled:opacity-50 transition-colors bg-white shadow-sm" disabled>
              <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button className="w-7 h-7 rounded-md bg-zinc-900 text-white text-[11px] font-medium flex items-center justify-center shadow-sm">
              1
            </button>
            <button className="p-1.5 rounded-md border border-zinc-200/80 text-zinc-600 hover:text-zinc-600 hover:bg-white disabled:opacity-50 transition-colors bg-white shadow-sm" disabled>
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-900/20 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-2xl shadow-xl border border-zinc-200/80 w-full max-w-md overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                <h3 className="text-lg font-medium text-zinc-900 tracking-tight">
                  {editingJournal ? 'Edit Journal' : 'Create Journal'}
                </h3>
                <button 
                  onClick={closeModal}
                  className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-zinc-200/50 rounded-md transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 uppercase tracking-widest mb-1.5">Journal Name</label>
                  <input 
                    type="text" 
                    defaultValue={editingJournal?.name || ''}
                    className="w-full px-3 py-2 bg-white border border-zinc-200/80 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-900 shadow-sm"
                    placeholder="e.g. Journal of Advanced Research"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 uppercase tracking-widest mb-1.5">DOI Prefix</label>
                  <input 
                    type="text" 
                    defaultValue={editingJournal?.doi || ''}
                    className="w-full px-3 py-2 bg-white border border-zinc-200/80 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-900 shadow-sm font-mono"
                    placeholder="e.g. 10.37349"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-700 uppercase tracking-widest mb-1.5">PISSN</label>
                    <input 
                      type="text" 
                      defaultValue={editingJournal?.pissn || ''}
                      className="w-full px-3 py-2 bg-white border border-zinc-200/80 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-900 shadow-sm font-mono"
                      placeholder="e.g. 1234-5678"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-700 uppercase tracking-widest mb-1.5">EISSN</label>
                    <input 
                      type="text" 
                      defaultValue={editingJournal?.eissn || ''}
                      className="w-full px-3 py-2 bg-white border border-zinc-200/80 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-900 shadow-sm font-mono"
                      placeholder="e.g. 8765-4321"
                    />
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50/50 flex justify-end space-x-2">
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 text-[13px] font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 text-[13px] font-medium bg-zinc-900 text-white hover:bg-zinc-800 rounded-lg shadow-sm transition-colors"
                >
                  {editingJournal ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
