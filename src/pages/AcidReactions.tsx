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

// Removed three.js dependencies for performance

const AcidReactions = () => {
  const { setMetalIntensity, setMetalColor } = useOutletContext<PremiumContext>();
  const [activeMetal, setActiveMetal] = useState(METALS[4]); // Start with Gold/Mg

  // Reset global background to prevent freezing
  useEffect(() => {
    setMetalIntensity(0);
    setMetalColor('#ffffff');
  }, [setMetalIntensity, setMetalColor]);

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: 'white', position: 'relative', zIndex: 10, minHeight: '100%' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '40px' }}
      >
        <div className="hero-badge" style={{ marginBottom: '20px', display: 'inline-flex' }}>
          <Sparkles size={16} style={{ marginRight: '8px' }} /> Interactive Reaction Simulation
        </div>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Acid-Metal <span className="text-gradient">Reactions</span></h1>
        <p style={{ color: '#aaa', fontSize: '1.1rem', maxWidth: '600px' }}>
          Select a metal below to observe its relative reactivity in an acidic environment.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        
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
            boxShadow: `0 0 40px ${activeMetal.color}22 inset`,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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

            {/* Small Metal View */}
            <div style={{
              width: '100%',
              height: '250px',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative',
              background: 'radial-gradient(circle at center, rgba(30,30,30,1) 0%, rgba(0,0,0,1) 100%)',
              border: `1px solid ${activeMetal.color}33`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <motion.div
                animate={activeMetal.intensity > 0 ? {
                  scale: [1, 1 + (activeMetal.intensity * 0.15), 1],
                  boxShadow: [
                    `0 0 20px ${activeMetal.color}`, 
                    `0 0 ${40 + activeMetal.intensity * 40}px ${activeMetal.color}`, 
                    `0 0 20px ${activeMetal.color}`
                  ]
                } : {
                  scale: 1,
                  boxShadow: `0 0 20px ${activeMetal.color}88`
                }}
                transition={{
                  duration: Math.max(0.5, 2 - activeMetal.intensity * 1.5),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 30% 30%, #fff, ${activeMetal.color} 40%, #222 90%)`,
                  border: `2px solid ${activeMetal.color}`,
                }}
              />
              
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.5)',
                pointerEvents: 'none'
              }}>
                CSS Visualizer (Optimized Performance)
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};
