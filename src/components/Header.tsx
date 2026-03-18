import React, { useState, useRef, useEffect } from 'react';
import { LogOut, ChevronDown, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header({ currentPage, setCurrentPage, username, onLogout }: any) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTitle = () => {
    switch (currentPage) {
      case 'ref-check': return 'Ref Check';
      case 'editor': return 'Ref (Text) Convert Editor';
      case 'ref-xml': return 'Ref (XML) Convert Editor';
      case 'editor-workspace': return 'Batch Edit References';
      case 'formatted-references': return 'Formatted Output';
      case 'journal-management': return 'Journal Management';
      case 'article-subject': return 'Article Subject Types';
      case 'reviewer-list': return 'Reviewer List';
      case 'word-to-xml': return 'WORD to XML';
      case 'xml-to-pdf': return 'XML to PDF';
      case 'xml-preview': return 'XML Preview';
      case 'generate-file-url': return 'Generate File URL';
      case 'desk-test': return 'Desk Test';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="h-20 bg-transparent flex items-center justify-between px-8 md:px-12 z-10 relative">
      <div className="flex items-center">
        <h1 className="text-2xl font-medium tracking-tight text-zinc-900">{getTitle()}</h1>
      </div>
      <div className="flex items-center space-x-6">
        
        {/* Desk Button */}
        <a
          href="http://paidui.wanleibio.cn/center/index"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 bg-white border border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-700 rounded-lg transition-all font-medium text-sm flex items-center shadow-sm"
        >
          Desk
        </a>

        <div className="w-px h-6 bg-zinc-200/80"></div>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 group px-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">
              {username || 'Admin User'}
            </span>
            <ChevronDown className={`w-4 h-4 text-zinc-600 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} strokeWidth={1.5} />
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-100 py-1.5 z-20"
              >
                <button 
                  onClick={() => {
                    setShowDropdown(false);
                    onLogout();
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
