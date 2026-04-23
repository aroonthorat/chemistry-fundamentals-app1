import { useState, useEffect, useMemo } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Lock, FlaskConical, AlertTriangle, Skull, Play, ShieldCheck } from 'lucide-react';
import AcidicBackground from '../components/AcidicBackground';
import { motion } from 'framer-motion';

const ACID_TYPES = [
  { id: 'hcl', name: 'Hydrochloric', color: '#00ff88', icon: <FlaskConical size={16} /> },
  { id: 'h2so4', name: 'Sulfuric', color: '#ffcc00', icon: <AlertTriangle size={16} /> },
  { id: 'hno3', name: 'Nitric', color: '#00ccff', icon: <FlaskConical size={16} /> },
  { id: 'hsbf6', name: 'Fluoroantimonic', color: '#9d00ff', icon: <Skull size={16} /> },
];

const PremiumLayout = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [adProgress, setAdProgress] = useState(0);
  const [activeAcid, setActiveAcid] = useState(ACID_TYPES[0]);
  const [metalIntensity, setMetalIntensity] = useState(0);
  const [metalColor, setMetalColor] = useState('#ffffff');
  const location = useLocation();

  // Simulate Ad Playing
  useEffect(() => {
    if (showAd) {
      const interval = setInterval(() => {
        setAdProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setShowAd(false);
              setIsUnlocked(true);
            }, 500);
            return 100;
          }
          return p + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showAd]);

  if (!isUnlocked) {
    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Subtle grid background */}
        <div className="bg-grid"></div>
        
        {/* Ad Wall Modal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(20,20,20,0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center',
            zIndex: 10
          }}
        >
          <div style={{ width: '80px', height: '80px', background: 'rgba(0, 255, 136, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#00ff88' }}>
            <Lock size={40} />
          </div>
          <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '15px' }}>Premium Lab Access</h2>
          <p style={{ color: '#aaa', marginBottom: '30px', lineHeight: 1.6 }}>
            The 3D Acidic Environment and advanced lab tools require premium access. Support our platform by viewing a short sponsor message to unlock these features for your current session.
          </p>

          {!showAd ? (
            <button 
              onClick={() => setShowAd(true)}
              style={{
                background: '#00ff88',
                color: 'black',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '100px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                transition: 'transform 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Play size={20} /> Watch Ad to Unlock
            </button>
          ) : (
            <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ color: '#fff', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Sponsor Message...</span>
                <span>{Math.ceil((100 - adProgress) / 20)}s</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${adProgress}%`, height: '100%', background: '#00ff88', transition: 'width 0.1s linear' }}></div>
              </div>
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            <Link to="/" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>Return to Home</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      {/* 3D WebGL Background Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <AcidicBackground 
            color={activeAcid.color} 
            metalIntensity={metalIntensity} 
            metalColor={metalColor} 
          />
        </Canvas>
      </div>

      {/* UI Overlay Layer */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Navbar Area for Premium Mode */}
        <div style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${activeAcid.color}33` }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
              ← Home
            </Link>
            
            <div style={{ width: '2px', height: '24px', background: 'rgba(255,255,255,0.2)' }}></div>
            
            <Link to="/lab" style={{ color: location.pathname === '/lab' ? activeAcid.color : '#ccc', textDecoration: 'none', fontWeight: 600 }}>Atomic Lab</Link>
            <Link to="/chemist-lab" style={{ color: location.pathname === '/chemist-lab' ? activeAcid.color : '#ccc', textDecoration: 'none', fontWeight: 600 }}>Chem Lab</Link>
            <Link to="/periodic-table" style={{ color: location.pathname.startsWith('/periodic-table') ? activeAcid.color : '#ccc', textDecoration: 'none', fontWeight: 600 }}>Periodic Table</Link>
            <Link to="/acid-reactions" style={{ color: location.pathname === '/acid-reactions' ? activeAcid.color : '#ccc', textDecoration: 'none', fontWeight: 600 }}>Acid Reactions</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.5)', borderRadius: '100px', padding: '4px', gap: '4px' }}>
              {ACID_TYPES.map(acid => (
                <button
                  key={acid.id}
                  onClick={() => setActiveAcid(acid)}
                  title={acid.name}
                  style={{
                    background: activeAcid.id === acid.id ? `${acid.color}33` : 'transparent',
                    border: 'none',
                    color: activeAcid.id === acid.id ? acid.color : '#666',
                    padding: '8px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s'
                  }}
                >
                  {acid.icon}
                </button>
              ))}
            </div>

            <div style={{ background: `${activeAcid.color}22`, padding: '8px 16px', borderRadius: '100px', border: `1px solid ${activeAcid.color}66`, color: activeAcid.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
              <ShieldCheck size={16} /> Premium Active
            </div>
          </div>
        </div>

        {/* Content Area - Where the actual lab pages render */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
          <Outlet context={useMemo(() => ({ setMetalIntensity, setMetalColor }), [setMetalIntensity, setMetalColor])} />
        </div>
      </div>
    </div>
  );
};

export default PremiumLayout;
