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
    <div className="periodic-table-page" style={{ 
      color: '#fff',
      paddingTop: '60px',
      paddingBottom: '100px',
      position: 'relative',
    }}>
      {/* Background Decor */}
      <div className="orb orb-1" style={{ opacity: 0.1, top: '10%', left: '5%', width: '500px', height: '500px' }}></div>
      <div className="orb orb-2" style={{ opacity: 0.05, bottom: '5%', right: '5%', width: '400px', height: '400px' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <header style={{ 
          position: 'static', 
          background: 'transparent', 
          backdropFilter: 'none', 
          border: 'none', 
          padding: '0', 
          marginBottom: '60px',
          textAlign: 'center' 
        }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: 'var(--accent-cyan)', 
              textDecoration: 'none',
              marginBottom: '20px',
              fontWeight: 600,
              padding: '8px 20px',
              background: 'rgba(0, 240, 255, 0.05)',
              borderRadius: '100px',
              border: '1px solid rgba(0, 240, 255, 0.2)'
            }}>
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
            <h1 className="text-gradient" style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '16px', letterSpacing: '-2px' }}>
              The Periodic Table
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
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
