import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
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

  useEffect(() => {
    // Re-render MathJax when content changes
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([contentRef.current]).catch((err: any) => console.log('MathJax error:', err));
    }
  }, [disciplineId]);

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

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
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

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8 sm:p-12 border-b border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <BookOpen size={120} />
          </div>
          <div className="relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight"
            >
              {discipline.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg sm:text-xl text-white/70 max-w-3xl"
            >
              {discipline.description}
            </motion.p>
          </div>
        </div>

        <div className="p-8 sm:p-12 text-white/80">
          {/* Prose classes for markdown/html styling - using Tailwind typography-like custom styles */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight 
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-white/10
              prose-p:leading-relaxed prose-p:mb-6
              prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3 prose-ul:mb-6
              prose-li:marker:text-blue-400
              prose-b:text-white prose-b:font-semibold"
            dangerouslySetInnerHTML={{ __html: discipline.content }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default DisciplineWiki;
