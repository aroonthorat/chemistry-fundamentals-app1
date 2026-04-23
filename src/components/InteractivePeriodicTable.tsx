import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Search
} from 'lucide-react';
import elementsData from '../data/elements.json';

import { CATEGORIES } from '../types/chemistry';
import type { Element } from '../types/chemistry';


const ElementCard: React.FC<{ 
  element: Element; 
  isFiltered: boolean; 
  color: string;
  trendValue?: number;
  trendType: string;
  onHover: (el: Element | null) => void;
  onClick: (el: Element) => void;
}> = ({ element, isFiltered, color, trendValue, trendType, onHover, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);
  
  // High-tech shine effect
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHover(null);
  };

  return (
    <motion.div
      layoutId={`element-${element.number}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => onHover(element)}
      onClick={() => onClick(element)}
      className={isFiltered ? "element-card-interactive" : ""}
      style={{
        gridColumn: element.xpos,
        gridRow: element.ypos,
        aspectRatio: '1/1',
        background: isFiltered ? 'rgba(20, 20, 30, 0.8)' : 'rgba(10, 10, 15, 0.2)',
        border: `1px solid ${isFiltered ? `${color}44` : 'rgba(255,255,255,0.02)'}`,
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        opacity: isFiltered ? 1 : 0.1,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        color: isFiltered ? color : '#333',
        transition: 'opacity 0.5s ease, background 0.3s ease'
      }}
      whileHover={{ 
        scale: 1.25, 
        zIndex: 100,
        border: `2px solid ${color}`,
        background: 'rgba(30, 30, 45, 1)',
        boxShadow: `0 0 40px ${color}66, inset 0 0 15px ${color}33`,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      }}
    >
      {/* Glossy Shine Overlay */}
      <motion.div 
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          borderRadius: '12px',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* Trend Heatmap */}
      {trendType !== 'none' && trendValue !== undefined && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: `radial-gradient(circle at center, ${color} ${trendValue * 100}%, transparent)`,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            zIndex: 1
          }} 
        />
      )}

      <div style={{ transform: 'translateZ(30px)', textAlign: 'center', width: '100%', pointerEvents: 'none', zIndex: 3 }}>
        <span style={{ 
          fontSize: '0.6rem', 
          position: 'absolute', 
          top: '-15px', 
          left: '4px', 
          color: isFiltered ? '#fff' : '#444', 
          fontWeight: 700,
          opacity: 0.6
        }}>
          {element.number}
        </span>
        <span style={{ 
          fontSize: '1.5rem', 
          fontWeight: 900, 
          color: isFiltered ? color : '#222', 
          display: 'block',
          textShadow: isFiltered ? `0 0 10px ${color}44` : 'none',
          lineHeight: 1,
        }}>
          {element.symbol}
        </span>
        <span style={{ 
          fontSize: '0.5rem', 
          color: isFiltered ? '#fff' : '#111', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          width: '90%', 
          margin: '4px auto 0',
          display: 'block',
          fontWeight: 600,
          opacity: isFiltered ? 0.7 : 0.2,
          letterSpacing: '0.5px'
        }}>
          {element.name}
        </span>
      </div>
      
      {/* Category Bottom Bar */}
      {isFiltered && (
        <div style={{ 
          position: 'absolute', 
          bottom: '0', 
          left: '0', 
          right: '0', 
          height: '3px', 
          background: color,
          borderRadius: '0 0 12px 12px',
          boxShadow: `0 0 10px ${color}`
        }} />
      )}
    </motion.div>
  );
};

const HUDPopup: React.FC<{ element: Element; mousePos: { x: number, y: number } }> = ({ element, mousePos }) => {
  const color = CATEGORIES.find(c => element.category.includes(c.id))?.color || '#fff';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      style={{
        position: 'fixed',
        left: mousePos.x + 25,
        top: mousePos.y + 25,
        width: '320px',
        background: 'rgba(10, 10, 15, 0.95)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${color}66`,
        borderRadius: '20px',
        padding: '20px',
        zIndex: 5000,
        pointerEvents: 'none',
        boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${color}22`,
        overflow: 'hidden'
      }}
    >
      <div className="scanner-line" style={{ background: color, boxShadow: `0 0 15px ${color}` }} />
      
      <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', alignItems: 'center' }}>
        <div style={{ 
          width: '70px', 
          height: '70px', 
          background: `${color}15`,
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${color}33`,
          position: 'relative'
        }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fff', opacity: 0.5, position: 'absolute', top: '5px', left: '8px' }}>{element.number}</span>
          <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', textShadow: `0 0 10px ${color}` }}>{element.symbol}</span>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '2px' }}>{element.name}</h3>
          <span style={{ 
            fontSize: '0.65rem', 
            color: color, 
            fontWeight: 700, 
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>{element.category}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ fontSize: '0.6rem', color: '#888', display: 'block', textTransform: 'uppercase', marginBottom: '2px' }}>Atomic Mass</span>
          <span style={{ fontSize: '1rem', fontWeight: 700 }}>{element.atomic_mass.toFixed(3)}</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ fontSize: '0.6rem', color: '#888', display: 'block', textTransform: 'uppercase', marginBottom: '2px' }}>Electronegativity</span>
          <span style={{ fontSize: '1rem', fontWeight: 700 }}>{element.electronegativity_pauling || 'N/A'}</span>
        </div>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ fontSize: '0.85rem', color: '#ccc', lineHeight: 1.5, margin: 0 }}>
          {element.summary.substring(0, 120)}...
        </p>
      </div>

      <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
        <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '1px', opacity: 0.8 }}>CLICK TO ANALYZE</span>
      </div>
    </motion.div>
  );
};

interface InteractivePeriodicTableProps {
  onElementSelect?: (element: Element) => void;
  showFilters?: boolean;
  compact?: boolean;
}

const InteractivePeriodicTable: React.FC<InteractivePeriodicTableProps> = ({ 
  onElementSelect, 
  showFilters = true,
  compact = false
}) => {
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentTrend, setCurrentTrend] = useState<'none' | 'mass' | 'electronegativity' | 'density'>('none');
  const containerRef = useRef<HTMLDivElement>(null);

  const elements = elementsData.elements as Element[];

  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    return () => window.removeEventListener('mousemove', handleMouseMoveGlobal);
  }, []);

  const filteredElements = useMemo(() => {
    return elements.filter(el => {
      const matchesCategory = selectedCategory === 'all' || el.category.includes(selectedCategory);
      const matchesSearch = el.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           el.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           el.number.toString().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
  }, [elements, selectedCategory, searchTerm]);

  const getCategoryColor = (category: string) => {
    const cat = CATEGORIES.find(c => category.includes(c.id));
    return cat ? cat.color : '#ffffff';
  };

  return (
    <div className="interactive-periodic-table" style={{ position: 'relative', width: '100%' }}>
      {showFilters && (
        <div style={{ 
          marginBottom: '30px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px',
          background: 'rgba(255,255,255,0.03)',
          padding: '24px',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555' }} size={18} />
            <input 
              type="text" 
              placeholder="Search elements..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '12px 12px 12px 40px',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '100px',
                  border: '1px solid',
                  borderColor: selectedCategory === cat.id ? cat.color : 'rgba(255,255,255,0.1)',
                  background: selectedCategory === cat.id ? `${cat.color}22` : 'transparent',
                  color: selectedCategory === cat.id ? cat.color : '#888',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
             <span style={{ fontSize: '0.75rem', color: '#666', fontWeight: 700 }}>TRENDS:</span>
             <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { id: 'none', label: 'Default' },
                  { id: 'mass', label: 'Mass' },
                  { id: 'electronegativity', label: 'Electronegativity' }
                ].map(trend => (
                  <button
                    key={trend.id}
                    onClick={() => setCurrentTrend(trend.id as any)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '8px',
                      background: currentTrend === trend.id ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.02)',
                      border: '1px solid',
                      borderColor: currentTrend === trend.id ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255,255,255,0.05)',
                      color: currentTrend === trend.id ? 'var(--accent-cyan)' : '#777',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {trend.label}
                  </button>
                ))}
             </div>
          </div>
        </div>
      )}

      <div ref={containerRef} style={{ 
        padding: compact ? '10px' : '20px',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.05)',
        overflowX: 'auto'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(18, minmax(40px, 1fr))',
          gap: compact ? '4px' : '6px',
          width: '100%',
          minWidth: compact ? '800px' : '1000px',
          perspective: '1200px'
        }}>
          {elements.map(el => {
            let trendValue = 0;
            if (currentTrend === 'mass') trendValue = el.atomic_mass / 300;
            if (currentTrend === 'electronegativity') trendValue = (el.electronegativity_pauling || 0) / 4;
            if (currentTrend === 'density') trendValue = (el.density || 0) / 23;
            
            return (
              <ElementCard 
                key={el.number}
                element={el}
                isFiltered={filteredElements.some(f => f.number === el.number)}
                color={getCategoryColor(el.category)}
                trendValue={trendValue}
                trendType={currentTrend}
                onHover={setHoveredElement}
                onClick={(el) => onElementSelect && onElementSelect(el)}
              />
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {hoveredElement && (
          <HUDPopup element={hoveredElement} mousePos={mousePos} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractivePeriodicTable;
