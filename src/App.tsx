import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import RefCheck from './pages/RefCheck';
import RefTextConvert from './pages/RefTextConvert';
import RefXmlConvert from './pages/RefXmlConvert';
import Editor from './pages/Editor';
import FormattedReferences from './pages/FormattedReferences';
import JournalManagement from './pages/JournalManagement';
import ArticleSubjectTypes from './pages/ArticleSubjectTypes';
import ReviewerList from './pages/ReviewerList';
import WordToXml from './pages/WordToXml';
import XmlToPdf from './pages/XmlToPdf';
import XmlPreview from './pages/XmlPreview';
import Login from './pages/Login';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [editorBackPage, setEditorBackPage] = useState('editor');
  const [completedReferences, setCompletedReferences] = useState<any[]>([]);

  const handleLogin = (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setCurrentPage('home');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home setCurrentPage={setCurrentPage} />;
      case 'ref-check': return <RefCheck />;
      case 'editor': return <RefTextConvert onOpenEditor={() => { setEditorBackPage('editor'); setCurrentPage('editor-workspace'); }} />;
      case 'ref-xml': return <RefXmlConvert onOpenEditor={() => { setEditorBackPage('ref-xml'); setCurrentPage('editor-workspace'); }} />;
      case 'editor-workspace': return <Editor onBack={() => setCurrentPage(editorBackPage)} onComplete={(data: any) => { setCompletedReferences(data); setCurrentPage('formatted-references'); }} />;
      case 'formatted-references': return <FormattedReferences data={completedReferences} onBack={() => setCurrentPage('editor-workspace')} />;
      case 'journal-management': return <JournalManagement />;
      case 'article-subject': return <ArticleSubjectTypes />;
      case 'reviewer-list': return <ReviewerList />;
      case 'word-to-xml': return <WordToXml />;
      case 'xml-to-pdf': return <XmlToPdf />;
      case 'xml-preview': return <XmlPreview />;
      default: return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-white font-sans text-zinc-900 selection:bg-zinc-200 relative overflow-hidden">
      {/* Decorative Background Elements - Minimalist/Muted */}
      <div className="absolute top-[-5%] left-[15%] w-[600px] h-[600px] bg-slate-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-stone-200/40 rounded-full blur-[120px] pointer-events-none" />

      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} editorBackPage={editorBackPage} />
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} username={username} onLogout={handleLogout} />
        <main className="flex-1 overflow-auto p-8 md:p-12">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
