import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Globe, 
  User, 
  Calendar, 
  Layers, 
  Zap, 
  Activity, 
  ChevronRight, 
  Thermometer
} from 'lucide-react';
import { CATEGORIES } from '../types/chemistry';
import type { Element } from '../types/chemistry';

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
            {/* Shell Electron Count Badge */}
            <div style={{
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#050505',
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '0.65rem',
              color: color,
              border: `1px solid ${color}55`,
              fontWeight: 800,
              zIndex: 5,
              boxShadow: `0 2px 10px rgba(0,0,0,0.8)`
            }}>
              {electrons}e⁻
            </div>
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

const InfoItem: React.FC<{ icon: React.ReactNode, label: string, value: React.ReactNode, color: string }> = ({ icon, label, value, color }) => (
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
              maxWidth: '1100px',
              maxHeight: '85vh',
              background: '#040408',
              borderRadius: '40px',
              border: `1px solid ${color}44`,
              position: 'relative',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '400px 1fr',
              boxShadow: `0 0 80px ${color}15`,
              zIndex: 9001
            }}
          >
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
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
              <X size={20} />
            </button>

            {/* Left Column: Core Identity */}
            <div style={{ 
              background: `linear-gradient(180deg, ${color}10, transparent)`,
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              overflowY: 'auto',
              scrollbarWidth: 'none'
            }}>
              <div style={{ marginBottom: '30px', position: 'relative', transform: 'scale(0.85)' }}>
                 <BohrModel element={element} color={color} />
              </div>

              <div style={{ textAlign: 'center', zIndex: 1, width: '100%' }}>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '4px', letterSpacing: '-2px', color: '#fff' }}>{element.name}</h2>
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: color,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  background: `${color}15`,
                  padding: '4px 16px',
                  borderRadius: '100px',
                  border: `1px solid ${color}33`,
                  display: 'inline-block',
                  marginBottom: '30px'
                }}>{element.category}</div>
              </div>

              <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  padding: '20px', 
                  borderRadius: '24px', 
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <span style={{ color: '#666', fontSize: '0.65rem', display: 'block', textTransform: 'uppercase', fontWeight: 800, marginBottom: '4px' }}>Number</span>
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: color }}>{element.number}</span>
                </div>
                <div style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  padding: '20px', 
                  borderRadius: '24px', 
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <span style={{ color: '#666', fontSize: '0.65rem', display: 'block', textTransform: 'uppercase', fontWeight: 800, marginBottom: '4px' }}>Mass</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{element.atomic_mass.toFixed(2)}</span>
                </div>
              </div>

              {element.image && (
                <div style={{ marginTop: '30px', width: '100%', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                  <img src={element.image.url} alt={element.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  <div style={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '8px 12px', 
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', 
                    fontSize: '0.6rem', 
                    color: '#aaa',
                    fontWeight: 500
                  }}>
                    {element.image.title}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Detailed Insights */}
            <div style={{ padding: '40px', overflowY: 'auto', background: '#05050a' }}>
              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: color, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={18} /> Overview
                </h3>
                <p style={{ fontSize: '1rem', color: '#aaa', lineHeight: 1.7, fontWeight: 400 }}>{element.summary}</p>
              </section>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '35px' }}>
                {/* Atomic & Chemical Section */}
                <section>
                  <h4 style={{ fontSize: '0.8rem', color: '#555', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800, marginBottom: '15px' }}>Atomic & Chemical</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                    <InfoItem icon={<Layers size={16} />} label="Configuration" value={element.electron_configuration} color={color} />
                    <InfoItem icon={<Zap size={16} />} label="Electronegativity" value={element.electronegativity_pauling || 'N/A'} color={color} />
                    <InfoItem icon={<User size={16} />} label="Discovered By" value={element.discovered_by || 'Unknown'} color={color} />
                    <InfoItem icon={<Calendar size={16} />} label="Phase" value={element.phase} color={color} />
                  </div>
                </section>

                {/* Thermal Properties Section */}
                <section>
                  <h4 style={{ fontSize: '0.8rem', color: '#555', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800, marginBottom: '15px' }}>Thermal Properties</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                    <InfoItem icon={<Thermometer size={16} />} label="Melting Point" value={element.melt ? `${element.melt} K` : 'N/A'} color={color} />
                    <InfoItem icon={<Activity size={16} />} label="Boiling Point" value={element.boil ? `${element.boil} K` : 'N/A'} color={color} />
                  </div>
                </section>
              </div>

              {/* Action Bar */}
              <div style={{ 
                marginTop: '40px',
                paddingTop: '30px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Link 
                    to={`/element/${element.name.toLowerCase()}`} 
                    onClick={onClose} 
                    style={{ 
                      background: color,
                      color: '#000',
                      padding: '12px 24px', 
                      borderRadius: '14px',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'transform 0.2s'
                    }}
                  >
                    View Wiki <ChevronRight size={16} />
                  </Link>
                  <a 
                    href={element.source} 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ 
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      padding: '12px 20px', 
                      borderRadius: '14px',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Source <Globe size={14} />
                  </a>
                </div>
                
                <span style={{ fontSize: '0.7rem', color: '#444', fontWeight: 600 }}>ID: {element.symbol}-{element.number}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ElementDetailModal;
