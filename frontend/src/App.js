//import React, { useState } from 'react';
//import axios from 'axios';
//import './output.css';
//
//function App() {
//  const [input, setInput] = useState('');
//  const [output, setOutput] = useState('');
//  const [loading, setLoading] = useState(false);
//  const [activeTab, setActiveTab] = useState('skills');
//
//  // Parses the dual-output from the AI based on the prompt headers
//  const parseResponse = (text) => {
//    if (!text) return { cv: '', intelligence: '' };
//    const intelligenceMarker = '[STRATEGIC CAREER INTELLIGENCE]';
//    const parts = text.split(intelligenceMarker);
//
//    return {
//      cv: parts[0]?.replace('[PROFESSIONAL CV CONTENT]', '').trim(),
//      intelligence: parts[1]?.trim() || ''
//    };
//  };
//
//  const { cv, intelligence } = parseResponse(output);
//
//  // Main processing function triggered by the Terminal Arrow
//  const handleProcess = async () => {
//    if (!input.trim()) return alert("Please enter your details first!");
//    setLoading(true);
//    try {
//      const res = await axios.post(`http://localhost:5000/generate/${activeTab}`, { input });
//      setOutput(res.data.result);
//    } catch (err) {
//      setOutput("Error: Backend connection failed. Ensure Flask (app.py) is running on port 5000.");
//    }
//    setLoading(false);
//  };
//
//  return (
//    <div className="min-h-screen bg-[#030712] text-slate-300 flex flex-col lg:flex-row font-sans">
//
//      {/* Sidebar: Module Selection */}
//      <aside className="w-full lg:w-72 bg-[#0f172a] border-r border-slate-800 p-8 flex flex-col">
//        <div className="flex items-center gap-3 mb-10">
//          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 text-xl">A</div>
//          <h1 className="text-xl font-bold text-white tracking-tight">Architect<span className="text-indigo-500">AI</span></h1>
//        </div>
//
//        <nav className="space-y-2 flex-grow overflow-y-auto">
//          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Resume Sections</p>
//          {[
//            { id: 'skills', label: 'Skills & Persona', icon: '⚡' },
//            { id: 'objective', label: 'Pro Objective', icon: '🎯' },
//            { id: 'projects', label: 'Key Projects', icon: '💻' },
//            { id: 'education', label: 'Education Audit', icon: '🎓' },
//            { id: 'awards', label: 'Awards & Certs', icon: '🏆' },
//            { id: 'competencies', label: 'Soft Skills', icon: '🤝' },
//            { id: 'languages', label: 'Languages', icon: '🌐' }
//          ].map((tab) => (
//            <button
//              key={tab.id}
//              onClick={() => { setActiveTab(tab.id); setOutput(''); }}
//              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
//                activeTab === tab.id
//                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
//                : 'hover:bg-slate-800 text-slate-500'
//              }`}
//            >
//              <span>{tab.icon}</span> {tab.label}
//            </button>
//          ))}
//        </nav>
//
//        <div className="mt-6 pt-6 border-t border-slate-800">
//          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
//            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Processing Mode</p>
//            <p className="text-xs font-mono text-indigo-400">Local LLM: gpt-oss:120b</p>
//          </div>
//        </div>
//      </aside>
//
//      {/* Main Workspace */}
//      <main className="flex-grow p-6 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8">
//
//        {/* Input Terminal with Right-Corner Arrow */}
//        <div className="relative bg-[#0f172a] border border-slate-800 rounded-3xl p-6 shadow-2xl">
//          <div className="flex justify-between items-center mb-4">
//            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">
//              Input Terminal // {activeTab.toUpperCase()}
//            </h3>
//          </div>
//          <div className="relative">
//            <textarea
//              className="w-full h-44 bg-slate-950/40 border border-slate-800 rounded-2xl p-6 text-slate-200 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none pr-16 text-base leading-relaxed"
//              placeholder={`Enter raw ${activeTab} details here...`}
//              value={input}
//              onChange={(e) => setInput(e.target.value)}
//            />
//            {/* Direct Process Arrow */}
//            <button
//              onClick={handleProcess}
//              disabled={loading}
//              className="absolute bottom-6 right-6 w-12 h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-xl disabled:opacity-50 group"
//            >
//              {loading ? (
//                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//              ) : (
//                <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                </svg>
//              )}
//            </button>
//          </div>
//        </div>
//
//        {/* Dual Output Panels */}
//        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 flex-grow mb-10">
//
//          {/* Left Panel: Professional CV Content */}
//          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col min-h-[480px]">
//            <div className="flex justify-between items-center mb-6 border-b border-slate-800/50 pb-4">
//              <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Professional CV Content</h4>
//              {cv && (
//                <button
//                  onClick={() => {navigator.clipboard.writeText(cv); alert("Copied to clipboard!")}}
//                  className="text-[10px] bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-lg transition-colors font-bold uppercase tracking-tighter"
//                >
//                  Copy Content
//                </button>
//              )}
//            </div>
//            <div className="flex-grow font-mono text-sm leading-relaxed text-indigo-100/90 overflow-y-auto">
//              {loading ? (
//                <div className="h-full flex items-center justify-center">
//                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
//                </div>
//              ) : (
//                <pre className="whitespace-pre-wrap">{cv || "Ready to refine your professional data..."}</pre>
//              )}
//            </div>
//          </div>
//
//          {/* Right Panel: Strategic Career Intelligence */}
//          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col min-h-[480px]">
//            <div className="flex items-center gap-2 mb-6 border-b border-slate-800/50 pb-4">
//              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
//              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Strategic Intelligence</h4>
//            </div>
//            <div className="flex-grow font-sans text-sm leading-relaxed text-slate-400 overflow-y-auto">
//              {loading ? (
//                <div className="h-full flex flex-col items-center justify-center text-emerald-500">
//                  <p className="animate-pulse text-[10px] font-black tracking-widest uppercase">Analyzing Career Path...</p>
//                </div>
//              ) : intelligence ? (
//                <div className="space-y-4">
//                   <pre className="whitespace-pre-wrap font-sans">{intelligence}</pre>
//                </div>
//              ) : (
//                <div className="h-full flex items-center justify-center text-center px-10">
//                  <p className="text-slate-700 italic text-sm">Persona analysis, eligibility audits, and market trends will appear here based on the selected module.</p>
//                </div>
//              )}
//            </div>
//          </div>
//
//        </div>
//      </main>
//    </div>
//  );
//}
//
//export default App;

import React, { useState } from 'react';
import axios from 'axios';
import './output.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');

  const parseResponse = (text) => {
    if (!text) return { cv: '', intelligence: '' };
    const marker = '[STRATEGIC CAREER INTELLIGENCE]';
    const parts = text.split(marker);
    return {
      cv: parts[0]?.replace('[PROFESSIONAL CV CONTENT]', '').trim(),
      intelligence: parts[1]?.trim() || ''
    };
  };

  const { cv, intelligence } = parseResponse(output);

  const handleProcess = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/generate/${activeTab}`, { input });
      setOutput(res.data.result);
    } catch (err) {
      setOutput("System offline. Please check local server connection.");
    }
    setLoading(false);
  };

  const menuItems = [
    { id: 'skills', label: 'Skills', icon: '✦' },
    { id: 'objective', label: 'Career Objective', icon: '◈' },
    { id: 'projects', label: 'Projects', icon: '▣' },
    { id: 'education', label: 'Academic', icon: '◇' },
    { id: 'awards', label: 'Awards & Certificates', icon: '★' },
    { id: 'competencies', label: 'Soft Skills', icon: '◎' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-200 selection:bg-blue-500/30 font-sans">

      {/* Header Navigation */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <span className="text-white font-black">A</span>
            </div>
            <span className="text-xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Architect<span className="font-light italic text-blue-400">Core</span>
            </span>
          </div>

          <nav className="hidden md:flex bg-white/5 border border-white/10 p-1 rounded-full">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setOutput(''); }}
                className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-500 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-8 grid grid-cols-12 gap-8">

        {/* Input Section */}
        <div className="col-span-12 lg:col-span-5">
          <div className="sticky top-28 space-y-6">
            <div className="bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 rounded-[32px] p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-black uppercase tracking-[3px] text-blue-400">Raw Input</h2>
                <span className="px-3 py-1 rounded-md bg-white/5 text-[10px] text-slate-500 border border-white/5">MODE: {activeTab.toUpperCase()}</span>
              </div>

              <textarea
                className="w-full h-72 bg-transparent border-none focus:ring-0 text-slate-100 placeholder-slate-600 text-lg font-light leading-relaxed resize-none"
                placeholder="Paste your raw details here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <button
                onClick={handleProcess}
                disabled={loading}
                className="group relative w-full py-5 overflow-hidden rounded-2xl bg-white text-black font-bold text-sm tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                <span className="relative z-10">{loading ? 'Processing Intelligence...' : 'Refine & Architect'}</span>
                {!loading && <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />}
              </button>
            </div>

            <div className="px-4 flex items-center gap-4 text-xs text-slate-500">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              LLM Engine: GPT-OSS-120B Optimized
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="col-span-12 lg:col-span-7 space-y-8">

          {/* Professional Output Box */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-[#111114] border border-white/10 rounded-[32px] overflow-hidden">
              <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h3 className="text-sm font-bold tracking-widest uppercase">Professional Output</h3>
                {cv && (
                  <button onClick={() => navigator.clipboard.writeText(cv)} className="text-[10px] text-blue-400 font-bold hover:text-blue-300 transition-colors">
                    COPY CONTENT
                  </button>
                )}
              </div>
              <div className="p-8 min-h-[250px]">
                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-white/5 rounded w-3/4" />
                    <div className="h-4 bg-white/5 rounded w-1/2" />
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-8 text-slate-300">
                    {cv || "Waiting for data refinement..."}
                  </pre>
                )}
              </div>
            </div>
          </div>

          {/* Intelligence Section (Now taking full width of the right column) */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-blue-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Career Intelligence</h4>
            </div>
            <div className="text-sm text-slate-300 leading-relaxed font-light min-h-[200px]">
              {loading ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-white/5 rounded w-3/4"></div>
                    <div className="h-4 bg-white/5 rounded"></div>
                  </div>
                </div>
              ) : intelligence ? (
                <div className="whitespace-pre-wrap text-blue-100/80">{intelligence}</div>
              ) : (
                <p className="text-slate-500 italic uppercase text-[10px] tracking-widest">Awaiting architectural analysis...</p>
              )}
            </div>
          </div>

        </div>
      </main>

      <footer className="mt-20 py-10 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-[4px] text-slate-600">Architect AI • Career Logistics Engine 2026</p>
      </footer>
    </div>
  );
}

export default App;