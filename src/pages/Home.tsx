import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, FileCode, FileJson, BookOpen, Users, FileType, FileOutput, 
  ArrowRight 
} from 'lucide-react';

const tools = [
  { 
    id: 'ref-check', 
    label: 'Ref Check', 
    desc: 'Batch check, validate, and track the progress of reference documents.', 
    icon: FileText
  },
  { 
    id: 'editor', 
    label: 'Ref (Text) Convert Editor', 
    desc: 'Rich text editor for reference correction with PubMed/DOI integration.', 
    icon: FileCode
  },
  { 
    id: 'ref-xml', 
    label: 'Ref (XML) Convert Editor', 
    desc: 'Upload XML files for reference correction and validation.', 
    icon: FileJson
  },
  { 
    id: 'word-to-xml', 
    label: 'WORD to XML', 
    desc: 'Convert Word documents to JATS XML based on journal specifications.', 
    icon: FileType
  },
  { 
    id: 'xml-to-pdf', 
    label: 'XML to PDF', 
    desc: 'Generate PDF documents with highly granular style and layout configurations.', 
    icon: FileOutput
  },
  { 
    id: 'reviewer-list', 
    label: 'Reviewer List', 
    desc: 'Manage manuscript reviewers, authors, and generate batch emails/ZIPs.', 
    icon: Users
  },
];

export default function Home({ setCurrentPage }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-5xl mx-auto pb-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div 
              key={tool.id}
              onClick={() => setCurrentPage(tool.id)}
              className="group bg-white p-6 rounded-2xl border border-zinc-200/70 hover:border-zinc-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="mb-6 flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center border border-zinc-100 group-hover:bg-zinc-100/80 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-zinc-700" strokeWidth={1.5} />
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-800 transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 mt-1" strokeWidth={2} />
              </div>
              <h3 className="text-[15px] font-semibold text-zinc-900 mb-2 tracking-tight">
                {tool.label}
              </h3>
              <p className="text-[13px] text-zinc-700 leading-relaxed font-normal">
                {tool.desc}
              </p>
            </div>
          )
        })}
      </div>
    </motion.div>
  );
}
