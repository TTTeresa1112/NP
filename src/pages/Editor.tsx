import React, { useRef } from 'react';
import { Save, ExternalLink, RefreshCw, Search, Italic, Superscript, Subscript, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const mockEditorData = [
  {
    id: 1,
    original: "Smith J, Doe A. The effects of green tea on metabolism. J Nutr. 2020;150(2):123-130.",
    tags: ["CORRECTED"],
    converted: "Smith J, Doe A. The effects of green tea on metabolism. <i>Journal of Nutrition</i>. 2020;150(2):123-130.",
    pubmed: "32012345",
    doi: "10.1093/jn/nxaa012",
    pmc: "PMC7123456",
    status: "Success"
  },
  {
    id: 2,
    original: "Johnson M. Advanced React patterns. Web Dev J. 2021;5(1):45-50.",
    tags: [],
    converted: "Johnson M. Advanced React patterns. <i>Web Development Journal</i>. 2021;5(1):45-50.",
    pubmed: "",
    doi: "10.1234/wdj.2021.05",
    pmc: "",
    status: "Success"
  },
  {
    id: 3,
    original: "Williams R, et al. Invalid reference example with missing year. Journal of Science.",
    tags: ["RETRACTED"],
    converted: "Williams R, et al. Invalid reference example with missing year. <i>Journal of Science</i>.",
    pubmed: "19283746",
    doi: "10.5678/jos.retracted",
    pmc: "",
    status: "Failed"
  },
  {
    id: 4,
    original: "Brown T. Duplicate entry test. Medical Journal. 2019;10(4):111-115.",
    tags: ["DUPLICATE"],
    converted: "Brown T. Duplicate entry test. <i>Medical Journal</i>. 2019;10(4):111-115.",
    pubmed: "28374651",
    doi: "10.9101/mj.2019.dup",
    pmc: "PMC9876543",
    status: "Success"
  },
  {
    id: 5,
    original: "Davis K. Completely unparseable reference string that fails the regex.",
    tags: [],
    converted: "Davis K. Completely unparseable reference string that fails the regex.",
    pubmed: "",
    doi: "",
    pmc: "",
    status: "Failed"
  }
];

const referenceTemplates = {
  journal: "Author AA, Author BB. Article title. <i>Journal Name</i>. Year;Volume(Issue):Page-Page.",
  website: "Author AA. Title of the web page. Website Name. Published Date. Accessed Date. URL",
  patent: "Inventor AA, Inventor BB, inventors; Assignee Name, assignee. Title of patent. Patent Country Patent Number. Date.",
  book: "Author AA. <i>Book Title</i>. Edition. Publisher; Year."
};

const RichTextEditor = ({ initialValue, onChange }: { initialValue: string, onChange: (val: string) => void }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const format = (command: string) => {
    document.execCommand(command, false, undefined);
    editorRef.current?.focus();
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const insertTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateKey = e.target.value as keyof typeof referenceTemplates;
    if (templateKey && referenceTemplates[templateKey]) {
      if (editorRef.current) {
        editorRef.current.innerHTML = referenceTemplates[templateKey];
        editorRef.current.focus();
        onChange(editorRef.current.innerHTML);
      }
    }
    e.target.value = ""; // reset dropdown
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border border-zinc-200/80 rounded-lg overflow-hidden bg-white focus-within:ring-1 focus-within:ring-zinc-900 focus-within:border-zinc-900 transition-all shadow-sm">
      <div className="bg-zinc-50/50 border-b border-zinc-200/80 px-2 py-1.5 flex items-center space-x-0.5">
        <button 
          onClick={() => format('italic')} 
          className="p-1 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-md transition-colors" 
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <div className="w-px h-3 bg-zinc-200 mx-1"></div>
        <button 
          onClick={() => format('superscript')} 
          className="p-1 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-md transition-colors" 
          title="Superscript"
        >
          <Superscript className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <button 
          onClick={() => format('subscript')} 
          className="p-1 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-md transition-colors" 
          title="Subscript"
        >
          <Subscript className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <div className="w-px h-3 bg-zinc-200 mx-1"></div>
        <select 
          onChange={insertTemplate}
          className="text-[11px] bg-transparent border-none text-zinc-700 hover:text-zinc-900 focus:outline-none cursor-pointer py-1 px-1 font-medium"
          title="Insert Template"
        >
          <option value="">Insert Template...</option>
          <option value="journal">Journal Article</option>
          <option value="website">Website / Webpage</option>
          <option value="patent">Patent</option>
          <option value="book">Book</option>
        </select>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        className="p-3 min-h-[40px] text-[13px] text-zinc-800 focus:outline-none leading-relaxed font-normal"
        dangerouslySetInnerHTML={{ __html: initialValue }}
      />
    </div>
  );
};

export default function Editor({ onBack, onComplete }: any) {
  const [editorData, setEditorData] = React.useState(mockEditorData);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(100);

  const totalPages = Math.ceil(editorData.length / pageSize) || 1;
  const paginatedData = editorData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleContentChange = (id: number, newContent: string) => {
    setEditorData(prev => prev.map(item => item.id === id ? { ...item, converted: newContent } : item));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-full flex flex-col max-w-[1200px] mx-auto pb-20"
    >
      {/* Top Actions */}
      <div className="flex justify-between items-center pb-4 border-b border-zinc-200/60 mb-2">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-zinc-200/50 rounded-md transition-all inline-flex mr-2"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <span className="text-zinc-700 text-[11px] font-medium tracking-widest uppercase">
            {editorData.length} Items
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-white border border-zinc-200/80 text-zinc-700 hover:bg-zinc-50 rounded-lg shadow-sm transition-all font-medium text-xs flex items-center tracking-tight">
            <Save className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
            Save Draft
          </button>
          <button 
            onClick={() => onComplete && onComplete(editorData)}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg shadow-[0_2px_8px_0_rgb(0,0,0,0.1)] transition-all font-medium text-xs flex items-center tracking-tight"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
            Save & Complete
          </button>
        </div>
      </div>

      {/* Editor List */}
      <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm overflow-hidden flex flex-col">
        <div>
          {paginatedData.map((row, index) => (
            <div key={row.id} className={`py-6 hover:bg-zinc-50 transition-colors duration-300 px-6 ${index !== paginatedData.length - 1 ? 'border-b border-zinc-200/60' : ''}`}>
            
            {/* Row 1: Header & Metadata */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-6">
                {/* ID & Status */}
                <div className="flex items-center space-x-3 w-24">
                  <span className="text-zinc-600 font-mono text-xs">#{String(row.id).padStart(3, '0')}</span>
                  <div className="flex items-center space-x-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Success' ? 'bg-zinc-800' : row.status === 'Failed' ? 'bg-red-500' : 'bg-zinc-300'}`}></div>
                    <span className={`text-[11px] font-medium tracking-tight ${row.status === 'Success' ? 'text-zinc-800' : row.status === 'Failed' ? 'text-red-600' : 'text-zinc-700'}`}>
                      {row.status}
                    </span>
                  </div>
                </div>

                {/* Metadata Inline */}
                <div className="flex items-center space-x-4">
                  {/* PUBMED */}
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest">PMID</span>
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        defaultValue={row.pubmed} 
                        className="w-24 pl-2 pr-6 py-1 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-all font-mono text-zinc-700 shadow-sm" 
                      />
                      {row.pubmed && (
                        <a 
                          href={`https://pubmed.ncbi.nlm.nih.gov/${row.pubmed}/`}
                          target="_blank"
                          rel="noreferrer"
                          className="absolute right-1.5 text-zinc-600 hover:text-blue-500 transition-colors" 
                          title="Open in PubMed"
                        >
                          <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  </div>
                  {/* DOI */}
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest">DOI</span>
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        defaultValue={row.doi} 
                        className="w-36 pl-2 pr-6 py-1 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-all font-mono text-zinc-700 shadow-sm" 
                      />
                      {row.doi && (
                        <a 
                          href={`https://doi.org/${row.doi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="absolute right-1.5 text-zinc-600 hover:text-blue-500 transition-colors" 
                          title="Open DOI"
                        >
                          <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  </div>
                  {/* PMC */}
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest">PMC</span>
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        defaultValue={row.pmc} 
                        className="w-28 pl-2 pr-6 py-1 bg-white border border-zinc-200/80 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-all font-mono text-zinc-700 shadow-sm" 
                      />
                      {row.pmc && (
                        <a 
                          href={`https://www.ncbi.nlm.nih.gov/pmc/articles/${row.pmc}/`}
                          target="_blank"
                          rel="noreferrer"
                          className="absolute right-1.5 text-zinc-600 hover:text-blue-500 transition-colors" 
                          title="Open in PMC"
                        >
                          <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button className="text-zinc-600 hover:text-zinc-900 text-[11px] font-medium flex items-center transition-colors px-2 py-1 rounded-md hover:bg-zinc-50">
                <RefreshCw className="w-3 h-3 mr-1.5" strokeWidth={1.5} />
                Refetch
              </button>
            </div>

            {/* Row 2 & 3: Content */}
            <div className="space-y-4 pl-[120px]">
              {/* Original */}
              <div>
                <div className="flex items-center mb-1">
                  <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest">Original</span>
                  {row.tags && row.tags.map(tag => (
                    <span key={tag} className="ml-2 text-red-600 font-medium text-[9px] bg-red-50 border border-red-200 px-1.5 py-0.5 rounded uppercase tracking-widest inline-flex items-center">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-[13px] text-zinc-800 leading-relaxed font-normal">
                  {row.original}
                </div>
              </div>

              {/* Converted */}
              <div>
                <div className="flex items-center mb-1">
                  <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest">Converted</span>
                </div>
                <RichTextEditor initialValue={row.converted} onChange={(val) => handleContentChange(row.id, val)} />
              </div>
            </div>

          </div>
        ))}
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/30">
          <span className="text-[11px] text-zinc-600 font-medium tracking-widest uppercase">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] text-zinc-600 font-medium tracking-widest uppercase">Page size:</span>
              <select 
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-zinc-200/80 rounded-md text-xs py-1 px-2 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-zinc-700 shadow-sm font-normal"
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md border border-zinc-200/80 text-zinc-600 hover:text-zinc-600 hover:bg-white disabled:opacity-50 transition-colors bg-white shadow-sm"
              >
                <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <button className="w-7 h-7 rounded-md bg-zinc-900 text-white text-[11px] font-medium flex items-center justify-center shadow-sm">
                {currentPage}
              </button>
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-md border border-zinc-200/80 text-zinc-600 hover:text-zinc-600 hover:bg-white disabled:opacity-50 transition-colors bg-white shadow-sm"
              >
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
