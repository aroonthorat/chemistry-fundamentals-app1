import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { disciplineNotes } from '../data/disciplineNotes';

declare global {
  interface Window {
    MathJax?: any;
  }
}

const DisciplineWiki: React.FC = () => {
  const { disciplineId } = useParams<{ disciplineId: string }>();
  const discipline = disciplineNotes.find((d) => d.id === disciplineId);
  const contentRef = useRef<HTMLDivElement>(null);

  const [activeSubtopicId, setActiveSubtopicId] = useState<string | null>(
    discipline?.subtopics?.[0]?.id || null
  );

  useEffect(() => {
    if (discipline && discipline.subtopics.length > 0 && !discipline.subtopics.find(s => s.id === activeSubtopicId)) {
      setActiveSubtopicId(discipline.subtopics[0].id);
    }
  }, [discipline, activeSubtopicId]);

  useEffect(() => {
    // Small delay to allow React to render the content before MathJax processes it
    const timer = setTimeout(() => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([contentRef.current]).catch((err: any) => console.log('MathJax error:', err));
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

  const activeSubtopic = discipline.subtopics.find(s => s.id === activeSubtopicId) || discipline.subtopics[0];

  return (
    <div className="pt-12 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white/80 hover:text-white transition-all duration-300"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-white mb-4 px-2">Topics</h3>
            <nav className="space-y-2">
              {discipline.subtopics.map((subtopic) => (
                <button
                  key={subtopic.id}
                  onClick={() => setActiveSubtopicId(subtopic.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                    activeSubtopicId === subtopic.id
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <span className="font-medium text-sm">{subtopic.title}</span>
                  <ChevronRight 
                    size={16} 
                    className={`transition-transform duration-300 ${
                      activeSubtopicId === subtopic.id ? 'translate-x-1 text-blue-400' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                    }`} 
                  />
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8 sm:p-12 border-b border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <BookOpen size={120} />
            </div>
            <div className="relative z-10">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight"
              >
                {discipline.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-base sm:text-lg text-white/70 max-w-3xl"
              >
                {discipline.description}
              </motion.p>
            </div>
          </div>

          <div className="p-8 sm:p-12 text-white/80 min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeSubtopic && (
                <motion.div
                  key={activeSubtopic.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 pb-4 border-b border-white/10">
                    {activeSubtopic.title}
                  </h2>
                  <div
                    ref={contentRef}
                    className="prose prose-invert prose-lg max-w-none 
                      prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight 
                      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-blue-300
                      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                      prose-p:leading-relaxed prose-p:mb-6
                      prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3 prose-ul:mb-6
                      prose-li:marker:text-blue-400
                      prose-b:text-white prose-b:font-semibold"
                    dangerouslySetInnerHTML={{ __html: activeSubtopic.content }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DisciplineWiki;
