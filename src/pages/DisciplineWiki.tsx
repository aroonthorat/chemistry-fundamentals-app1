import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { disciplineNotes } from '../data/disciplineNotes';

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: Array<HTMLElement | null>) => Promise<void>;
    };
  }
}

const DisciplineWiki: React.FC = () => {
  const { disciplineId } = useParams<{ disciplineId: string }>();
  const discipline = disciplineNotes.find((d) => d.id === disciplineId);
  const contentRef = useRef<HTMLDivElement>(null);

  const [activeSubtopicId, setActiveSubtopicId] = useState<string | null>(discipline?.subtopics?.[0]?.id || null);
  const resolvedActiveSubtopic =
    discipline?.subtopics.find((subtopic) => subtopic.id === activeSubtopicId) ?? discipline?.subtopics[0];

  useEffect(() => {
    // Auto-scroll to top when subtopic or discipline changes
    const scrollContainer = document.getElementById('premium-scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [resolvedActiveSubtopic?.id, disciplineId]);

  useEffect(() => {
    // Small delay to allow React to render the content before MathJax processes it
    const timer = setTimeout(() => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([contentRef.current]).catch((err: unknown) => console.log('MathJax error:', err));
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [disciplineId, activeSubtopicId]);

  if (!discipline) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
          <h1 className="text-3xl font-bold mb-4">Discipline Not Found</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center gap-2">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const activeSubtopic = resolvedActiveSubtopic;

  return (
    <div className="wiki-container pb-12 px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto z-10 relative mt-6">
      {/* Breadcrumbs */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-10 text-sm px-2"
      >
        <div className="breadcrumb-item">
          <Link to="/">Dashboard</Link>
          <ChevronRight size={14} className="opacity-30" />
        </div>
        <div className="breadcrumb-item">
          <span className="text-white/40">Wiki</span>
          <ChevronRight size={14} className="opacity-30" />
        </div>
        <div className="breadcrumb-item">
          <span className="text-accent-cyan font-black tracking-wider uppercase text-[10px]">{discipline.title}</span>
        </div>
      </motion.nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Navigation Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 sidebar-sticky no-scrollbar"
        >
          <div className="bg-[#0f0f15]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-8 px-2">
              <div className="w-1.5 h-6 bg-accent-cyan rounded-full shadow-[0_0_10px_var(--accent-cyan)]" />
              <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">Topics</h3>
            </div>
            
            <nav className="space-y-1.5">
              {discipline.subtopics.map((subtopic, index) => (
                <button
                  key={subtopic.id}
                  onClick={() => {
                    setActiveSubtopicId(subtopic.id);
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-3 group ${
                    activeSubtopicId === subtopic.id
                      ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 shadow-[inset_0_0_20px_rgba(0,240,255,0.05)]'
                      : 'text-white/30 hover:bg-white/5 hover:text-white/80 border border-transparent'
                  }`}
                >
                  <span className={`text-[10px] font-black w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    activeSubtopicId === subtopic.id ? 'border-accent-cyan/30 bg-accent-cyan/20' : 'border-white/10 bg-white/5'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="font-bold text-sm flex-1 leading-tight">{subtopic.title}</span>
                  {activeSubtopicId === subtopic.id && (
                    <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 bg-accent-cyan rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-white/5 px-2">
              <div className="bg-gradient-to-br from-accent-cyan/20 to-purple-500/10 p-5 rounded-2xl border border-white/5">
                <h4 className="text-[10px] font-black text-white/80 mb-2 uppercase tracking-widest">Concept AI</h4>
                <p className="text-[11px] text-white/40 leading-relaxed">
                  Need help? Ask about {activeSubtopic?.title.toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-9 bg-[#08080c]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative"
        >
          {/* Refined Header Section */}
          <div className="bg-gradient-to-br from-accent-cyan/10 via-purple-500/5 to-transparent p-6 lg:p-10 border-b border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none transform translate-x-1/4 -translate-y-1/4 rotate-12">
              <BookOpen size={250} />
            </div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-[1px] bg-accent-cyan/50" />
                  <span className="text-accent-cyan font-black text-[9px] tracking-[0.4em] uppercase">Discipline Wiki</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tighter leading-[0.9] max-w-2xl">
                  {discipline.title}
                </h1>
                <p className="text-base text-white/40 max-w-2xl leading-relaxed font-medium">
                  {discipline.description}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Optimized Content Section */}
          <div className="p-6 lg:p-10 text-white/80 relative min-h-[500px]">
            {/* Structural Background Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />
            
            <div className="wiki-prose-container relative z-10">
              <AnimatePresence mode="wait">
                {activeSubtopic && (
                  <motion.div
                    key={activeSubtopic.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-4 mb-10">
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20 text-accent-cyan font-serif italic text-2xl shadow-[0_0_20px_rgba(0,240,255,0.05)]">
                        §
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter leading-none">
                        {activeSubtopic.title}
                      </h2>
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                    </div>
                    
                    <div
                      ref={contentRef}
                      className="prose prose-invert prose-sm sm:prose-base max-w-none
                        prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                        prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:text-accent-cyan/90
                        prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-2 prose-h3:text-white/90
                        prose-p:leading-[1.6] prose-p:mb-4 prose-p:text-white/70 prose-p:font-normal
                        prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-2 prose-ul:mb-5
                        prose-li:relative prose-li:pl-7 prose-li:text-white/60
                        prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[0.7em] prose-li:before:w-1.5 prose-li:before:h-[1.5px] prose-li:before:bg-accent-cyan/40 prose-li:before:rounded-full
                        prose-strong:text-white prose-strong:font-semibold
                        prose-img:rounded-2xl prose-img:border prose-img:border-white/10
                        prose-code:text-accent-cyan prose-code:bg-accent-cyan/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none"

                      dangerouslySetInnerHTML={{ __html: activeSubtopic.content }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DisciplineWiki;
