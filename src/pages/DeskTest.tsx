import React from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export default function DeskTest() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col items-center justify-center max-w-[1000px] mx-auto pb-20"
    >
      <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm p-12 text-center max-w-lg w-full">
        <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Zap className="w-8 h-8" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight mb-3">Desk Test Page</h2>
        <p className="text-zinc-500 text-sm leading-relaxed mb-8">
          This is a placeholder page for the Desk integration. You can build out the full functionality here.
        </p>
        <button 
          className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg shadow-sm transition-all font-medium text-sm tracking-tight"
          onClick={() => alert('Desk action triggered!')}
        >
          Run Desk Action
        </button>
      </div>
    </motion.div>
  );
}
