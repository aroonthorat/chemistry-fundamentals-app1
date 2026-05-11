import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import InteractivePeriodicTable from '../components/InteractivePeriodicTable';
import ElementDetailModal from '../components/ElementDetailModal';
import type { Element } from '../types/chemistry';

const PeriodicTablePage: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  return (
    <div className="main-content min-h-screen pb-24 relative">
      {/* Background Decor */}
      <div className="orb orb-1 opacity-10 top-[10%] left-[5%] w-[500px] h-[500px] pointer-events-none"></div>
      <div className="orb orb-2 opacity-5 bottom-[5%] right-[5%] w-[400px] h-[400px] pointer-events-none"></div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="static bg-transparent backdrop-filter-none border-none p-0 mb-12 sm:mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-accent-cyan hover:text-white transition-all duration-300 mb-8 font-semibold">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
            <h1 className="text-gradient text-5xl sm:text-7xl font-black mb-6 tracking-tighter leading-tight">
              The Periodic Table
            </h1>
            <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Explore the fundamental building blocks of the universe through a high-definition interactive experience.
            </p>
          </motion.div>
        </header>

        {/* Main Interactive Component */}
        <InteractivePeriodicTable onElementSelect={(el) => setSelectedElement(el)} />

        {/* Spotlight Modal */}
        <ElementDetailModal 
          element={selectedElement} 
          onClose={() => setSelectedElement(null)} 
        />
      </div>
    </div>
  );
};

export default PeriodicTablePage;
