import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Lock, FlaskConical, AlertTriangle, Skull } from 'lucide-react';
import { Link } from 'react-router-dom';
import AcidicBackground from '../components/AcidicBackground';

const ACID_TYPES = [
  { id: 'hcl', name: 'Hydrochloric Acid', color: '#00ff88', icon: <FlaskConical size={20} /> },
  { id: 'h2so4', name: 'Sulfuric Acid', color: '#ffcc00', icon: <AlertTriangle size={20} /> },
  { id: 'hno3', name: 'Nitric Acid', color: '#00ccff', icon: <FlaskConical size={20} /> },
  { id: 'hsbf6', name: 'Fluoroantimonic', color: '#9d00ff', icon: <Skull size={20} /> },
];

const PremiumLab: React.FC = () => {
  const [activeAcid, setActiveAcid] = useState(ACID_TYPES[0]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      {/* 3D WebGL Background Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <AcidicBackground color={activeAcid.color} />
        </Canvas>
      </div>

      {/* UI Overlay Layer */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
        
        {/* Top Navbar Area */}
        <div style={{ padding: '30px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ 
            pointerEvents: 'auto',
            color: '#fff', 
            textDecoration: 'none', 
            fontWeight: 800, 
            fontSize: '1.2rem',
            background: 'rgba(0,0,0,0.5)',
            padding: '10px 20px',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            ← Return to Standard
          </Link>

          <div style={{
            background: 'rgba(0,0,0,0.5)',
            padding: '10px 20px',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${activeAcid.color}66`,
            color: activeAcid.color,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Lock size={16} /> Premium Access
          </div>
        </div>

        {/* Center Content Placeholder */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(20px)',
              padding: '60px',
              borderRadius: '30px',
              border: `1px solid ${activeAcid.color}44`,
              boxShadow: `0 0 100px ${activeAcid.color}22`,
              textAlign: 'center',
              pointerEvents: 'auto',
              maxWidth: '600px'
            }}
          >
            <Lock size={48} color={activeAcid.color} style={{ margin: '0 auto 20px' }} />
            <h1 style={{ fontSize: '3rem', fontWeight: 900, margin: '0 0 10px', color: '#fff' }}>Ad-Wall Active</h1>
            <p style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: 1.6, marginBottom: '30px' }}>
              This highly reactive fluid environment is reserved for premium users. You have successfully unlocked it by engaging with our sponsor. Move your mouse to interact with the acid.
            </p>
            <div style={{
              display: 'inline-block',
              padding: '12px 30px',
              background: activeAcid.color,
              color: '#000',
              fontWeight: 800,
              borderRadius: '100px',
              cursor: 'pointer'
            }}>
              Launch Full Lab
            </div>
          </motion.div>
        </div>

        {/* Bottom Acid Selector */}
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'center', gap: '15px', pointerEvents: 'auto' }}>
          {ACID_TYPES.map(acid => (
            <button
              key={acid.id}
              onClick={() => setActiveAcid(acid)}
              style={{
                background: activeAcid.id === acid.id ? `${acid.color}22` : 'rgba(0,0,0,0.6)',
                border: `1px solid ${activeAcid.id === acid.id ? acid.color : 'rgba(255,255,255,0.1)'}`,
                color: activeAcid.id === acid.id ? acid.color : '#888',
                padding: '12px 24px',
                borderRadius: '100px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 600,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
            >
              {acid.icon} {acid.name}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PremiumLab;
