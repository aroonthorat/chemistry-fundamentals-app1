import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Scale, 
  Box, 
  Flame, 
  Globe, 
  User, 
  Calendar, 
  Layers, 
  Zap, 
  Activity, 
  ChevronRight, 
  Thermometer,
  Info
} from 'lucide-react';
import { Element, CATEGORIES } from '../types/chemistry';

interface ElementDetailModalProps {
  element: Element | null;
  onClose: () => void;
}

export const BohrModel: React.FC<{ element: Element; color: string }> = ({ element, color }) => {
  return (
    <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Nucleus */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 30px ${color}`,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000',
          fontWeight: 900,
          fontSize: '0.8rem'
        }}
      >
        {element.symbol}
      </motion.div>

      {/* Shells and Electrons */}
      {element.shells.map((electrons, shellIdx) => {
        const radius = 50 + shellIdx * 35;
        return (
          <div key={shellIdx} style={{
            position: 'absolute',
            width: radius * 2,
            height: radius * 2,
            border: `1px solid ${color}33`,
            borderRadius: '50%',
            pointerEvents: 'none'
          }}>
            {[...Array(electrons)].map((_, electronIdx) => {
              const angle = (electronIdx / electrons) * 360;
              return (
                <motion.div
                  key={electronIdx}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10 + shellIdx * 5, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    transform: `rotate(${angle}deg)`
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: -4,
                    left: '50%',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: `0 0 10px #fff`,
                    marginLeft: '-4px'
                  }} />
                </motion.div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const InfoItem: React.FC<{ icon: React.ReactNode, label: string, value: any, color: string }> = ({ icon, label, value, color }) => (
  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
      <span style={{ color: color }}>{icon}</span>
      <span style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', fontWeight: 800 }}>{label}</span>
    </div>
    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{value}</span>
  </div>
);

const ElementDetailModal: React.FC<ElementDetailModalProps> = ({ element, onClose }) => {
  if (!element) return null;

  const getCategoryColor = (category: string) => {
    const cat = CATEGORIES.find(c => category.includes(c.id));
    return cat ? cat.color : '#ffffff';
  };

  const color = getCategoryColor(element.category);

  return (
    <AnimatePresence>
      {element && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 9000, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px'
        }}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'rgba(0,0,0,0.95)', 
              backdropFilter: 'blur(15px)' 
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            style={{
              width: '100%',
              maxWidth: '1200px',
              maxHeight: '90vh',
              background: '#040408',
              borderRadius: '40px',
              border: `1px solid ${color}66`,
              position: 'relative',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'minmax(400px, 1fr) 1.5fr',
              boxShadow: `0 0 100px ${color}22`,
              zIndex: 9001
            }}
          >
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '25px',
                right: '25px',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s'
              }}
            >
              <X size={24} />
            </button>

            {/* Left Column: Visuals */}
            <div style={{ 
              background: `linear-gradient(180deg, ${color}15, transparent)`,
              padding: '50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              overflowY: 'auto'
            }}>
              <div style={{ marginBottom: '50px', position: 'relative' }}>
                 <BohrModel element={element} color={color} />
              </div>

              <div style={{ textAlign: 'center', zIndex: 1 }}>
                <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '8px', letterSpacing: '-2px' }}>{element.name}</h2>
                <span style={{ 
                  fontSize: '1rem', 
                  color: color,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  background: 'rgba(255,255,255,0.05)',
                  padding: '6px 20px',
                  borderRadius: '100px',
                  border: `1px solid ${color}33`
                }}>{element.category}</span>
              </div>

              <div style={{ marginTop: '50px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="glass-card" style={{ padding: '25px', textAlign: 'center' }}>
                  <span style={{ color: '#666', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontWeight: 800, marginBottom: '8px' }}>Atomic Number</span>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, color: color }}>{element.number}</span>
                </div>
                <div className="glass-card" style={{ padding: '25px', textAlign: 'center' }}>
                  <span style={{ color: '#666', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontWeight: 800, marginBottom: '8px' }}>Atomic Mass</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800 }}>{element.atomic_mass.toFixed(4)}</span>
                </div>
              </div>

              {element.image && (
                <div style={{ marginTop: '40px', width: '100%', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={element.image.url} alt={element.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '12px', background: 'rgba(0,0,0,0.5)', fontSize: '0.7rem', color: '#888' }}>
                    {element.image.title}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Information */}
            <div style={{ padding: '50px', overflowY: 'auto' }}>
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '15px', color: 'var(--accent-cyan)' }}>Overview</h3>
                <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: 1.8 }}>{element.summary}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '40px' }}>
                 <InfoItem icon={<User size={18} />} label="Discovered By" value={element.discovered_by || 'Unknown'} color={color} />
                 <InfoItem icon={<Calendar size={18} />} label="Phase" value={element.phase} color={color} />
                 <InfoItem icon={<Layers size={18} />} label="Electron Config" value={element.electron_configuration} color={color} />
                 <InfoItem icon={<Zap size={18} />} label="Electronegativity" value={element.electronegativity_pauling || 'N/A'} color={color} />
                 <InfoItem icon={<Thermometer size={18} />} label="Melting Point" value={element.melt ? `${element.melt} K` : 'N/A'} color={color} />
                 <InfoItem icon={<Activity size={18} />} label="Boiling Point" value={element.boil ? `${element.boil} K` : 'N/A'} color={color} />
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Globe size={20} color="var(--accent-cyan)" /> Sources & Resources
                </h4>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <a href={element.source} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
                    Wikipedia Article <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ElementDetailModal;
