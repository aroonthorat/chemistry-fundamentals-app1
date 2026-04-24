import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Info, Skull, ShieldAlert, Sparkles, Droplets } from 'lucide-react';

interface PremiumContext {
  setMetalIntensity: (val: number) => void;
  setMetalColor: (val: string) => void;
}

const METALS = [
  { 
    id: 'k', 
    name: 'Potassium (K)', 
    intensity: 1.0, 
    color: '#ff00ff',
    desc: 'Extremely violent exothermic reaction. Ignites instantly producing lilac flames and explosive Hydrogen gas.',
    danger: 'Critical',
    icon: <Flame size={16} />
  },
  { 
    id: 'na', 
    name: 'Sodium (Na)', 
    intensity: 0.8, 
    color: '#ffff00',
    desc: 'Violent exothermic reaction. Melts into a sphere and darts around, often igniting with a yellow flame.',
    danger: 'High',
    icon: <Flame size={16} />
  },
  { 
    id: 'li', 
    name: 'Lithium (Li)', 
    intensity: 0.7, 
    color: '#ff3333',
    desc: 'Vigorous reaction, fizzing and bubbling but usually does not ignite. Produces hydrogen gas steadily.',
    danger: 'High',
    icon: <Flame size={16} />
  },
  { 
    id: 'ca', 
    name: 'Calcium (Ca)', 
    intensity: 0.6, 
    color: '#ff9933',
    desc: 'Reacts rapidly, producing hydrogen gas and forming a cloudy solution. Generates significant heat.',
    danger: 'Medium-High',
    icon: <Droplets size={16} />
  },
  { 
    id: 'mg', 
    name: 'Magnesium (Mg)', 
    intensity: 0.5, 
    color: '#ffffff',
    desc: 'Vigorous reaction. Rapid bubbling of Hydrogen gas, dissolving the metal quickly while getting very hot.',
    danger: 'Medium',
    icon: <Droplets size={16} />
  },
  { 
    id: 'zn', 
    name: 'Zinc (Zn)', 
    intensity: 0.4, 
    color: '#a0b2c6',
    desc: 'Moderate reaction. Bubbles steadily, producing hydrogen gas. Often used to prepare hydrogen in the lab.',
    danger: 'Medium',
    icon: <Droplets size={16} />
  },
  { 
    id: 'fe', 
    name: 'Iron (Fe)', 
    intensity: 0.3, 
    color: '#ff6600',
    desc: 'Slow reaction with dilute acids. Gradually dissolves to form light green Iron(II) solutions and hydrogen gas.',
    danger: 'Low',
    icon: <Droplets size={16} />
  },
  { 
    id: 'cu', 
    name: 'Copper (Cu)', 
    intensity: 0.2, 
    color: '#00ffff',
    desc: 'Mild or no reaction with standard acids. Reacts with Nitric acid to produce toxic brown NO2 gas and green/blue solution.',
    danger: 'Low (Toxic Gas)',
    icon: <Skull size={16} />
  },
  { 
    id: 'ag', 
    name: 'Silver (Ag)', 
    intensity: 0.1, 
    color: '#e0e0e0',
    desc: 'No reaction with hydrochloric or dilute sulfuric acid. Reacts with nitric acid or hot concentrated sulfuric acid.',
    danger: 'Low',
    icon: <ShieldAlert size={16} />
  },
  { 
    id: 'au', 
    name: 'Gold (Au)', 
    intensity: 0.0, 
    color: '#ffd700',
    desc: 'No reaction with single acids. Only dissolves in Aqua Regia (mixture of Nitric and Hydrochloric acid).',
    danger: 'None',
    icon: <ShieldAlert size={16} />
  },
];

const AcidReactions = () => {
  const { setMetalIntensity, setMetalColor } = useOutletContext<PremiumContext>();
  const [activeMetal, setActiveMetal] = useState(METALS[4]); // Start with Gold (no reaction)
  const [isExperimentMode, setIsExperimentMode] = useState(false);

  // Update background context whenever metal changes
  useEffect(() => {
    setMetalIntensity(activeMetal.intensity);
    setMetalColor(activeMetal.color);
  }, [activeMetal, setMetalIntensity, setMetalColor]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setMetalIntensity(0);
      setMetalColor('#ffffff');
    };
  }, [setMetalIntensity, setMetalColor]);

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: 'white', position: 'relative', zIndex: 10, minHeight: '100%' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isExperimentMode ? 0 : 1, y: 0 }}
        style={{ marginBottom: '40px', pointerEvents: isExperimentMode ? 'none' : 'auto' }}
      >
        <div className="hero-badge" style={{ marginBottom: '20px', display: 'inline-flex' }}>
          <Sparkles size={16} style={{ marginRight: '8px' }} /> Interactive Reaction Simulation
        </div>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Acid-Metal <span className="text-gradient">Reactions</span></h1>
        <p style={{ color: '#aaa', fontSize: '1.1rem', maxWidth: '600px' }}>
          Select a metal below and move your mouse across the acid background to witness its relative reactivity. Highly reactive metals will cause violent localized reactions.
        </p>
      </motion.div>

      {isExperimentMode && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: 'white', textShadow: '0 0 20px rgba(0,0,0,0.8)', opacity: 0.5 }}>Move your mouse to react</h2>
          <button 
            onClick={() => setIsExperimentMode(false)}
            style={{ 
              marginTop: '20px', 
              padding: '15px 30px', 
              background: 'rgba(0,0,0,0.6)', 
              border: '1px solid rgba(255,255,255,0.3)', 
              color: 'white', 
              borderRadius: '100px', 
              cursor: 'pointer',
              fontSize: '1.1rem',
              backdropFilter: 'blur(10px)'
            }}
          >
            Exit Experiment Mode
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', opacity: isExperimentMode ? 0 : 1, pointerEvents: isExperimentMode ? 'none' : 'auto', transition: 'opacity 0.3s' }}>
        
        {/* Metal Selection Panel */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Droplets size={20} className="text-gradient" /> Select Metal
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {METALS.map(metal => (
              <button
                key={metal.id}
                onClick={() => setActiveMetal(metal)}
                style={{
                  background: activeMetal.id === metal.id ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${activeMetal.id === metal.id ? 'rgba(0, 240, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                  padding: '15px 20px',
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => {
                  if (activeMetal.id !== metal.id) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseOut={e => {
                  if (activeMetal.id !== metal.id) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{metal.name}</span>
                <div style={{ 
                  width: '16px', height: '16px', 
                  borderRadius: '50%', 
                  background: metal.color,
                  boxShadow: `0 0 10px ${metal.color}`
                }}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Reaction Info Panel */}
        <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '16px',
            padding: '30px',
            border: `1px solid ${activeMetal.color}55`,
            boxShadow: `0 0 40px ${activeMetal.color}22 inset`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '2rem', margin: 0, color: activeMetal.color }}>{activeMetal.name}</h2>
              <div style={{ 
                background: `${activeMetal.color}22`, 
                padding: '5px 12px', 
                borderRadius: '100px',
                color: activeMetal.color,
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: `1px solid ${activeMetal.color}55`
              }}>
                {activeMetal.icon}
                Danger: {activeMetal.danger}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', color: '#ccc', lineHeight: 1.6 }}>
              <Info size={24} style={{ color: activeMetal.color, flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '1.1rem', margin: 0 }}>
                {activeMetal.desc}
              </p>
            </div>
            
            <button
              onClick={() => setIsExperimentMode(true)}
              style={{
                marginTop: '30px',
                padding: '15px',
                width: '100%',
                background: `linear-gradient(45deg, ${activeMetal.color}22, ${activeMetal.color}44)`,
                border: `1px solid ${activeMetal.color}88`,
                color: 'white',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Sparkles size={20} />
              Start Full-Screen Experiment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AcidReactions;
