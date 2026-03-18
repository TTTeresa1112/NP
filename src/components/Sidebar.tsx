import React from 'react';
import { LayoutDashboard, FileText, FileJson, Settings, Users, BookOpen, FileCode, FileType, FileOutput, Eye, FileUp } from 'lucide-react';

const menuItems = [
  {
    category: 'General',
    items: [
      { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    ]
  },
  {
    category: 'Reference Tools',
    items: [
      { id: 'ref-check', label: 'Ref Check', icon: FileText },
      { id: 'editor', label: 'Ref (Text) Convert Editor', icon: FileCode },
      { id: 'ref-xml', label: 'Ref (XML) Convert', icon: FileJson },
    ]
  },
  {
    category: 'MScon',
    items: [
      { id: 'journal-management', label: 'Journal Management', icon: BookOpen },
      { id: 'article-subject', label: 'Article Subject Types', icon: Settings },
      { id: 'word-to-xml', label: 'WORD to XML', icon: FileType },
      { id: 'xml-to-pdf', label: 'XML to PDF', icon: FileOutput },
      { id: 'xml-preview', label: 'XML Preview', icon: Eye },
    ]
  },
  {
    category: 'Data Processing',
    items: [
      { id: 'reviewer-list', label: 'Reviewer List', icon: Users },
      { id: 'generate-file-url', label: 'Generate File URL', icon: FileUp },
    ]
  }
];

export default function Sidebar({ currentPage, setCurrentPage, editorBackPage }: any) {
  return (
    <div className="w-64 bg-zinc-50/60 backdrop-blur-xl border-r border-zinc-200/50 flex flex-col z-10">
      <div className="h-20 flex items-center px-8">
        <span className="text-lg font-medium text-zinc-900 tracking-tight">NP.</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
        {menuItems.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest mb-2 px-4">
              {group.category}
            </h3>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = currentPage === item.id || (currentPage === 'editor-workspace' && item.id === editorBackPage);
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center px-4 py-2 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-zinc-900 shadow-md text-white font-medium' 
                        : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200/50'
                    }`}
                  >
                    <Icon 
                      className={`w-[18px] h-[18px] mr-3 transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-600'}`} 
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    <span className="text-sm tracking-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
