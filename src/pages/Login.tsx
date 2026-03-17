import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export default function Login({ onLogin }: { onLogin: (username: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onLogin(username);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex bg-white selection:bg-zinc-200">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-zinc-900">
        <img 
          src="https://images.unsplash.com/photo-1536138746221-2c489206ff6c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Workspace" 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-medium tracking-tight mb-4">NP.</h2>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-md font-light">
              Welcome to OEP Internal Document & Data Processing Platform. Easily process your Word, XML, Excel and other files.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24">
        <div className="w-full max-w-[400px]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10">
              <div className="lg:hidden mb-8">
                <span className="text-3xl font-bold tracking-tighter text-zinc-900">NP.</span>
              </div>
              <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Welcome back</h2>
              <p className="text-[13px] text-zinc-500 mt-2">Enter your credentials to continue.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-400"
                  placeholder="Enter your username"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-400"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !username.trim() || !password.trim()}
                className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-all font-medium text-[14px] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-8 shadow-sm"
              >
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 'Log In'}
              </button>
            </form>
            
            <div className="mt-10 text-center text-[12px] text-zinc-400">
              © 2026 NP.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
