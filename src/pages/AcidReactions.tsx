import { useEffect, useState, useRef, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Info, 
  Skull, 
  ShieldAlert, 
  Sparkles, 
  Droplets, 
  Thermometer, 
  Activity,
  RefreshCw, 
  Play, 
  Gauge, 
  Compass,
  Wind
} from 'lucide-react';

interface PremiumContext {
  setMetalIntensity: (val: number) => void;
  setMetalColor: (val: string) => void;
}

interface AcidType {
  id: string;
  name: string;
  formula: string;
  color: string;
  strengthMultiplier: number;
  desc: string;
}

const ACIDS: AcidType[] = [
  { id: 'hcl', name: 'Hydrochloric Acid', formula: 'HCl', color: '#00ff88', strengthMultiplier: 1.0, desc: 'A strong monoprotic acid that fully dissociates. Standard for testing metal reactivity.' },
  { id: 'h2so4', name: 'Sulfuric Acid', formula: 'H₂SO₄', color: '#ffaa00', strengthMultiplier: 1.2, desc: 'A strong diprotic acid. Highly corrosive with strong dehydrating and heat-releasing properties.' },
  { id: 'hno3', name: 'Nitric Acid', formula: 'HNO₃', color: '#00d2ff', strengthMultiplier: 1.3, desc: 'A powerful oxidizing acid. Reacts with less reactive metals like copper, producing nitrogen oxide gases.' },
  { id: 'aqua_regia', name: 'Aqua Regia', formula: 'HNO₃ + 3HCl', color: '#ff00aa', strengthMultiplier: 1.5, desc: 'A highly corrosive fumes mixture. The only acid capable of dissolving gold by forming complex gold ions.' }
];

interface MetalType {
  id: string;
  symbol: string;
  name: string;
  reactivity: number;
  color: string;
  desc: string;
  danger: 'None' | 'Low' | 'Medium' | 'High' | 'Critical';
  flameColor?: string;
}

const METALS: MetalType[] = [
  { id: 'k', symbol: 'K', name: 'Potassium', reactivity: 1.0, color: '#bcc2f2', desc: 'Reacts explosively with dilute acids. Instantly ignites producing violent purple/lilac flames and thermal shocks.', danger: 'Critical', flameColor: '#d666ff' },
  { id: 'na', symbol: 'Na', name: 'Sodium', reactivity: 0.85, color: '#d1d5db', desc: 'Vigorous exothermic reaction. Melts into a small white sphere, darts rapidly across the surface, often exploding with yellow flames.', danger: 'Critical', flameColor: '#ffbb00' },
  { id: 'li', symbol: 'Li', name: 'Lithium', reactivity: 0.72, color: '#a1a1aa', desc: 'Vigorous bubbling. Fizzes intensely and steadily, releasing hydrogen gas rapidly without exploding.', danger: 'High' },
  { id: 'ca', symbol: 'Ca', name: 'Calcium', reactivity: 0.62, color: '#cbd5e1', desc: 'Highly reactive. Dissolves rapidly, clouding the solution with white calcium salt precipitate while heating up intensely.', danger: 'High' },
  { id: 'mg', symbol: 'Mg', name: 'Magnesium', reactivity: 0.52, color: '#f3f4f6', desc: 'Vigorous reaction. Fast energetic bubbling, heating the tube highly and quickly dissolving the ribbon.', danger: 'Medium' },
  { id: 'zn', symbol: 'Zn', name: 'Zinc', reactivity: 0.42, color: '#94a3b8', desc: 'Moderate, steady reaction. Bubbles rise rapidly in a stable stream, commonly used for hydrogen gas synthesis.', danger: 'Medium' },
  { id: 'fe', symbol: 'Fe', name: 'Iron', reactivity: 0.32, color: '#475569', desc: 'Slow, mild reaction. Fizzes slowly, forming a light greenish iron salt solution over extended exposure.', danger: 'Low' },
  { id: 'cu', symbol: 'Cu', name: 'Copper', reactivity: 0.12, color: '#b87333', desc: 'No reaction with HCl or H₂SO₄. Reacts with Nitric acid to yield rich blue copper complexes and toxic brown nitrogen dioxide gas.', danger: 'Medium', flameColor: '#00ffcc' },
  { id: 'ag', symbol: 'Ag', name: 'Silver', reactivity: 0.05, color: '#e2e8f0', desc: 'Highly resistant. Unreactive in most acids; dissolves slowly in hot concentrated nitric acid.', danger: 'Low' },
  { id: 'au', symbol: 'Au', name: 'Gold', reactivity: 0.0, color: '#ffd700', desc: 'Completely unreactive to single acids. Dissolves exclusively in Aqua Regia via coordination complexing.', danger: 'None' }
];

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  startX: number;
  wobbleSpeed: number;
  wobbleWidth: number;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const AcidReactions = () => {
  const { setMetalIntensity, setMetalColor } = useOutletContext<PremiumContext>();
  
  // Selection States
  const [activeMetal, setActiveMetal] = useState<MetalType>(METALS[4]); // Magnesium by default
  const [activeAcid, setActiveAcid] = useState<AcidType>(ACIDS[0]); // HCl by default
  const [concentration, setConcentration] = useState(3.0); // 3.0 M
  const [temperature, setTemperature] = useState(25); // 25°C

  // Simulation States
  const [isReacting, setIsReacting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [dissolvedPct, setDissolvedPct] = useState(0); // 0 to 100%
  const [collectedGas, setCollectedGas] = useState(0); // in mL
  const [reactionTemp, setReactionTemp] = useState(25); // Dynamic temperature
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [metalX, setMetalX] = useState(100);

  // Simulation Loop References
  const requestRef = useRef<number | null>(null);
  const bubbleIdRef = useRef(0);
  const sparkIdRef = useRef(0);
  const metalXRef = useRef(100);

  // Sync background effect with selected metal
  useEffect(() => {
    if (isReacting && !isCompleted) {
      setMetalIntensity(activeMetal.reactivity * (concentration / 12));
      setMetalColor(activeMetal.color);
    } else {
      setMetalIntensity(0);
      setMetalColor('#ffffff');
    }
  }, [isReacting, isCompleted, activeMetal, concentration, setMetalIntensity, setMetalColor]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Determine if there is a chemical reaction possible based on standard electrochemical series rules
  const reactionPossible = useMemo(() => {
    // Gold only reacts with Aqua Regia
    if (activeMetal.id === 'au') {
      return activeAcid.id === 'aqua_regia';
    }
    // Silver and Copper only react with Nitric Acid (or hot conc H2SO4, which we simplify to HNO3/Aqua Regia here)
    if (activeMetal.id === 'cu' || activeMetal.id === 'ag') {
      return activeAcid.id === 'hno3' || activeAcid.id === 'aqua_regia';
    }
    // Potassium, Sodium, Lithium, Calcium, Magnesium, Zinc, Iron react with HCl, H2SO4, HNO3, Aqua Regia
    return true;
  }, [activeMetal, activeAcid]);

  // Calculate local rate of reaction based on metal reactivity, acid, concentration, and temperature
  const reactionRate = useMemo(() => {
    if (!reactionPossible || !isReacting || isCompleted) return 0;
    
    // speed modifiers
    const metalMod = activeMetal.reactivity;
    const acidMod = activeAcid.strengthMultiplier;
    const concMod = concentration / 3.0; // standard base is 3M
    const tempMod = 1.0 + (reactionTemp - 20) / 40.0; // reaction doubles roughly every 40 degrees in our model

    // Safe base rate
    return 0.15 * metalMod * acidMod * concMod * tempMod;
  }, [reactionPossible, isReacting, isCompleted, activeMetal, activeAcid, concentration, reactionTemp]);

  // Dynamic chemical equations
  const chemicalEquations = useMemo(() => {
    const m = activeMetal.symbol;
    if (!reactionPossible) {
      return {
        molecular: `${m} (s) + ${activeAcid.formula} (aq) → No Reaction`,
        netIonic: 'No Reaction',
        type: 'Inert / Non-reactive under these conditions'
      };
    }

    if (activeMetal.id === 'au') {
      return {
        molecular: `Au (s) + HNO₃ (aq) + 4HCl (aq) → H[AuCl₄] (aq) + NO (g) + 2H₂O (l)`,
        netIonic: `Au (s) + NO₃⁻ (aq) + 4Cl⁻ (aq) + 4H⁺ (aq) → [AuCl₄]⁻ (aq) + NO (g) + 2H₂O (l)`,
        type: 'Coordination Oxidation & Dissolution'
      };
    }

    if (activeMetal.id === 'cu') {
      return {
        molecular: `Cu (s) + 4HNO₃ (aq) → Cu(NO₃)₂ (aq) + 2NO₂ (g) + 2H₂O (l)`,
        netIonic: `Cu (s) + 2NO₃⁻ (aq) + 4H⁺ (aq) → Cu²⁺ (aq) + 2NO₂ (g) + 2H₂O (l)`,
        type: 'Redox Oxidation (Nitric Acid Complexing)'
      };
    }

    if (activeMetal.id === 'ag') {
      return {
        molecular: `3Ag (s) + 4HNO₃ (aq) → 3AgNO₃ (aq) + NO (g) + 2H₂O (l)`,
        netIonic: `3Ag (s) + NO₃⁻ (aq) + 4H⁺ (aq) → 3Ag⁺ (aq) + NO (g) + 2H₂O (l)`,
        type: 'Redox Oxidation'
      };
    }

    // Standard metals (K, Na, Li react extremely fast, others moderately)
    // Valence charge model
    const charge = ['k', 'na', 'li'].includes(activeMetal.id) ? 1 : 2;
    if (activeAcid.id === 'hcl') {
      if (charge === 1) {
        return {
          molecular: `2${m} (s) + 2HCl (aq) → 2${m}Cl (aq) + H₂ (g)`,
          netIonic: `2${m} (s) + 2H⁺ (aq) → 2${m}⁺ (aq) + H₂ (g)`,
          type: 'Single Displacement'
        };
      } else {
        return {
          molecular: `${m} (s) + 2HCl (aq) → ${m}Cl₂ (aq) + H₂ (g)`,
          netIonic: `${m} (s) + 2H⁺ (aq) → ${m}²⁺ (aq) + H₂ (g)`,
          type: 'Single Displacement'
        };
      }
    } else if (activeAcid.id === 'h2so4') {
      if (charge === 1) {
        return {
          molecular: `2${m} (s) + H₂SO₄ (aq) → ${m}₂SO₄ (aq) + H₂ (g)`,
          netIonic: `2${m} (s) + 2H⁺ (aq) → 2${m}⁺ (aq) + H₂ (g)`,
          type: 'Single Displacement'
        };
      } else {
        return {
          molecular: `${m} (s) + H₂SO₄ (aq) → ${m}SO₄ (aq) + H₂ (g)`,
          netIonic: `${m} (s) + 2H⁺ (aq) → ${m}²⁺ (aq) + H₂ (g)`,
          type: 'Single Displacement'
        };
      }
    } else {
      // Nitric acid standard reaction for active metals
      if (charge === 1) {
        return {
          molecular: `2${m} (s) + 2HNO₃ (aq) → 2${m}NO₃ (aq) + H₂ (g)`,
          netIonic: `2${m} (s) + 2H⁺ (aq) → 2${m}⁺ (aq) + H₂ (g)`,
          type: 'Single Displacement / Redox'
        };
      } else {
        return {
          molecular: `${m} (s) + 2HNO₃ (aq) → ${m}(NO₃)₂ (aq) + H₂ (g)`,
          netIonic: `${m} (s) + 2H⁺ (aq) → ${m}²⁺ (aq) + H₂ (g)`,
          type: 'Single Displacement / Redox'
        };
      }
    }
  }, [activeMetal, activeAcid, reactionPossible]);

  // pH Level Calculations
  const calculatedPH = useMemo(() => {
    // Strong acids pH calculation: -log10(concentration)
    // Sulfuric has 2 H+ per molecule (simplified base)
    const ionFactor = activeAcid.id === 'h2so4' ? 2 : 1;
    const baseH = concentration * ionFactor;
    const initialPH = Math.max(0.0, -Math.log10(baseH));
    if (!isReacting) return initialPH.toFixed(2);
    
    // As metal dissolves, H+ ions are consumed, raising pH toward neutral
    const consumedH = (dissolvedPct / 100) * baseH * 0.95;
    const remainingH = Math.max(0.0001, baseH - consumedH);
    const dynamicPH = Math.max(initialPH, -Math.log10(remainingH));
    return dynamicPH.toFixed(2);
  }, [concentration, activeAcid, isReacting, dissolvedPct]);

  // Helper to calculate dynamic liquid colors based on metal, acid, and reaction progress
  const dynamicLiquidColor = useMemo(() => {
    const baseColor = activeAcid.color;
    
    if (!isReacting && dissolvedPct === 0) return baseColor;
    
    // Copper + Nitric Acid -> Deep Turquoise / Emerald Blue
    if (activeMetal.id === 'cu' && activeAcid.id === 'hno3') {
      const pct = dissolvedPct / 100;
      // Interpolate from activeAcid.color (#00d2ff) to a beautiful copper nitrate teal (#006666 / #0077b6)
      return pct > 0.5 ? '#0077b6' : '#00b4d8';
    }
    
    // Calcium -> cloudy white precipitate
    if (activeMetal.id === 'ca') {
      const pct = dissolvedPct / 100;
      return pct > 0.5 ? '#e2ece9' : '#b2c8c4'; // turns into a milky/chalky white-ish aqua
    }

    // Iron + Acid -> pale green iron salts
    if (activeMetal.id === 'fe') {
      const pct = dissolvedPct / 100;
      return pct > 0.5 ? '#d8f3dc' : baseColor;
    }
    
    return baseColor;
  }, [activeAcid, activeMetal, isReacting, dissolvedPct]);

  // Main simulation render cycle
  const updateSimulation = () => {
    if (!isReacting || isCompleted) return;

    // Dissolve metal
    setDissolvedPct(prev => {
      const next = prev + reactionRate * 0.12;
      if (next >= 100) {
        setIsCompleted(true);
        setIsReacting(false);
        return 100;
      }
      return next;
    });

    // Exothermic Temperature spike
    setReactionTemp(prev => {
      const maxRise = activeMetal.reactivity * 65 * (concentration / 6);
      const targetTemp = temperature + (dissolvedPct / 100) * maxRise;
      // Approach target smoothly
      return prev + (targetTemp - prev) * 0.05;
    });

    // Accumulate gas
    setCollectedGas(() => {
      // Liters of gas depends on metal valence charge and moles
      const scale = activeMetal.reactivity * concentration * 45;
      return (dissolvedPct / 100) * scale;
    });

    // Drift metal coordinate for floating Na/K
    let nextMetalX = 100;
    if (['k', 'na'].includes(activeMetal.id)) {
      const drift = (Math.random() - 0.5) * 6 * activeMetal.reactivity;
      nextMetalX = Math.max(82, Math.min(118, metalXRef.current + drift));
      metalXRef.current = nextMetalX;
      setMetalX(nextMetalX);
    } else {
      metalXRef.current = 100;
      setMetalX(100);
    }

    // Handle Bubbles (hydrogen/nitrogen oxides)
    setBubbles(prev => {
      // Filter out bubbles that rose beyond surface of liquid (y < 110)
      const updated = prev.map(b => {
        const nextY = b.y - b.speed;
        // Wobbling sway motion
        const nextX = b.startX + Math.sin(nextY * b.wobbleSpeed + b.id) * b.wobbleWidth;
        // Fade out as it pops at the liquid surface
        const opacity = nextY < 125 ? Math.max(0, (nextY - 110) / 15) * 0.8 : 0.8;
        return {
          ...b,
          x: nextX,
          y: nextY,
          opacity: opacity
        };
      }).filter(b => b.y >= 110);

      // Generate new bubbles based on reaction rate
      const spawnCount = Math.floor(Math.random() * (reactionRate * 15)) + 1;
      if (spawnCount > 0 && prev.length < 150 && dissolvedPct < 98) {
        const isFloating = ['k', 'na'].includes(activeMetal.id);
        const metalWidth = 40 * (1 - dissolvedPct / 100);

        for (let i = 0; i < spawnCount; i++) {
          bubbleIdRef.current += 1;
          
          let spawnX = 80 + Math.random() * 40;
          let spawnY = 220;
          let size = 1.5 + Math.random() * (3 + activeMetal.reactivity * 3);
          let speed = 1.2 + Math.random() * 2 + (temperature / 40);

          if (isFloating) {
            // Spawning near the floating metal piece at the surface
            spawnX = nextMetalX - 12 + Math.random() * 24;
            spawnY = 112 + Math.random() * 10;
            size = 1 + Math.random() * 3;
            speed = 0.5 + Math.random() * 1.5; // slow bubbles bubbling around the floating globule
          } else {
            // Sinking metals - spawn directly on the eroding metal piece!
            spawnX = 100 - metalWidth / 2 + Math.random() * metalWidth;
            spawnY = 210 + Math.random() * 8;
          }

          updated.push({
            id: bubbleIdRef.current,
            x: spawnX,
            y: spawnY,
            startX: spawnX,
            wobbleWidth: 1.2 + Math.random() * 3.5,
            wobbleSpeed: 0.04 + Math.random() * 0.06,
            size: size,
            speed: speed,
            opacity: 0.8
          });
        }
      }
      return updated;
    });

    // Handle sparks/explosive particles for extremely active metals (K, Na)
    if (['k', 'na'].includes(activeMetal.id) && dissolvedPct < 98) {
      setSparks(prev => {
        const updated = prev.map(s => ({
          ...s,
          x: s.x + s.vx,
          y: s.y + s.vy,
          vy: s.vy + 0.12, // gravity
          size: s.size * 0.94
        })).filter(s => s.size > 0.5);

        const sparkSpawn = Math.floor(Math.random() * (activeMetal.reactivity * 6)) + 1;
        const color = activeMetal.flameColor || '#ffaa00';
        if (sparkSpawn > 0 && prev.length < 60) {
          for (let i = 0; i < sparkSpawn; i++) {
            sparkIdRef.current += 1;
            updated.push({
              id: sparkIdRef.current,
              x: nextMetalX - 55, // Center around dynamic floating metal
              y: 108 - 80, // Top surface inside spark container coordinates
              vx: (Math.random() - 0.5) * 5,
              vy: -2.5 - Math.random() * 4,
              size: 2.5 + Math.random() * 5.5,
              color: color
            });
          }
        }
        return updated;
      });
    }

    requestRef.current = requestAnimationFrame(updateSimulation);
  };

  // Trigger loop execution
  useEffect(() => {
    if (isReacting && !isCompleted) {
      requestRef.current = requestAnimationFrame(updateSimulation);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReacting, isCompleted, reactionRate]);

  // Restart / Dropping handlers
  const handleDropMetal = () => {
    if (!reactionPossible) {
      setIsCompleted(true);
      return;
    }
    setIsReacting(true);
    setIsCompleted(false);
    setDissolvedPct(0);
    setCollectedGas(0);
    setReactionTemp(temperature);
  };

  const handleReset = () => {
    setIsReacting(false);
    setIsCompleted(false);
    setDissolvedPct(0);
    setCollectedGas(0);
    setReactionTemp(temperature);
    setBubbles([]);
    setSparks([]);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  // Reactivity index badge mapping
  const getReactivityBadge = (val: number) => {
    if (val >= 0.8) return { label: 'Extremely Violent', bg: 'rgba(255,0,255,0.2)', border: '#ff00ff' };
    if (val >= 0.5) return { label: 'Vigorous', bg: 'rgba(255,170,0,0.2)', border: '#ffaa00' };
    if (val >= 0.2) return { label: 'Moderate', bg: 'rgba(0,255,136,0.2)', border: '#00ff88' };
    return { label: 'Slow/Inert', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.2)' };
  };

  return (
    <div className="relative w-full min-h-screen text-white select-none overflow-x-hidden p-6 sm:p-10" style={{ zIndex: 10 }}>
      
      {/* Intro Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-widest mb-4">
          <Sparkles size={14} className="animate-pulse" /> Virtual Reaction Chamber
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
          Acid-Metal <span className="text-gradient">Lab Simulator</span>
        </h1>
        <p className="text-white/65 text-sm sm:text-base max-w-2xl">
          Explore single-displacement reactions, exothermicity, and coordinate chemical complexing with adjustable thermodynamic and concentration indices.
        </p>
      </motion.div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* 1. Control Panel Sidebar (Left - Col 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Acid Selection */}
          <div className="glass-panel p-6 rounded-[2rem] border border-white/10 flex flex-col gap-4">
            <h3 className="text-md font-extrabold flex items-center gap-2 text-cyan-400">
              <Droplets size={18} /> 1. Select Reactant Acid
            </h3>
            
            <div className="grid grid-cols-1 gap-2.5">
              {ACIDS.map(acid => (
                <button
                  key={acid.id}
                  onClick={() => {
                    setActiveAcid(acid);
                    handleReset();
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    activeAcid.id === acid.id 
                      ? 'bg-white/10 shadow-lg' 
                      : 'bg-white/5 border-transparent hover:bg-white/10'
                  }`}
                  style={{ borderColor: activeAcid.id === acid.id ? acid.color : 'transparent' }}
                >
                  <div>
                    <h4 className="font-black text-sm" style={{ color: activeAcid.id === acid.id ? acid.color : '#fff' }}>{acid.name}</h4>
                    <span className="text-[10px] text-white/40 font-mono mt-0.5 block">{acid.formula}</span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-black/30 border border-white/5 text-white/60">
                    Strength: {acid.strengthMultiplier.toFixed(1)}x
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Metal Selection Panel */}
          <div className="glass-panel p-6 rounded-[2rem] border border-white/10 flex flex-col gap-4 flex-1">
            <h3 className="text-md font-extrabold flex items-center gap-2 text-cyan-400">
              <Compass size={18} /> 2. Choose Reactant Metal
            </h3>

            <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
              {METALS.map(metal => {
                const isSelected = activeMetal.id === metal.id;
                const badge = getReactivityBadge(metal.reactivity);
                return (
                  <button
                    key={metal.id}
                    onClick={() => {
                      setActiveMetal(metal);
                      handleReset();
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 ${
                      isSelected 
                        ? 'bg-white/10 border-white/20' 
                        : 'bg-white/5 border-transparent hover:bg-white/10'
                    }`}
                    style={{ borderColor: isSelected ? metal.color : 'transparent' }}
                  >
                    <div className="flex items-center gap-3.5">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black border"
                        style={{ 
                          backgroundColor: `${metal.color}15`, 
                          borderColor: `${metal.color}44`,
                          color: metal.color,
                          boxShadow: isSelected ? `0 0 15px ${metal.color}22` : 'none'
                        }}
                      >
                        {metal.symbol}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs">{metal.name}</h4>
                        <span className="text-[9px] font-bold tracking-widest uppercase mt-0.5 block" style={{ color: badge.border }}>
                          {badge.label}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-white/55">Index: {metal.reactivity.toFixed(2)}</span>
                      <div 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ 
                          backgroundColor: metal.color,
                          boxShadow: `0 0 8px ${metal.color}`
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Virtual Chamber Simulator (Center - Col 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-[2rem] border border-white/10 flex flex-col items-center justify-between flex-1 relative min-h-[450px]">
            
            {/* Title / Info */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Chamber Viewport</span>
              
              <div 
                className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border"
                style={{ 
                  backgroundColor: `rgba(0, 240, 255, 0.08)`, 
                  borderColor: `rgba(0, 240, 255, 0.2)`,
                  color: 'var(--accent-cyan)'
                }}
              >
                <Activity size={10} className={isReacting ? "animate-pulse text-red-500" : ""} />
                {isCompleted ? 'Complete' : isReacting ? 'Reacting' : 'Ready'}
              </div>
            </div>

            {/* Simulated Glass Flask Container */}
            <div className="relative w-64 h-72 my-6 flex items-center justify-center">
              
              {/* Dynamic Fume overlays (Brown for NO2 / Purple for Gold) */}
              <AnimatePresence>
                {isReacting && activeMetal.id === 'cu' && activeAcid.id === 'hno3' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 0.65,
                      y: [0, -4, 0],
                      scale: [1, 1.05, 1]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                    className="absolute top-10 w-28 h-36 rounded-full blur-2xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #b07d62 0%, transparent 70%)' }}
                  />
                )}
                {isReacting && activeMetal.id === 'au' && activeAcid.id === 'aqua_regia' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 0.55,
                      y: [0, -4, 0],
                      scale: [1, 1.05, 1]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                    className="absolute top-10 w-28 h-36 rounded-full blur-2xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #d90429 0%, transparent 70%)' }}
                  />
                )}
              </AnimatePresence>

              {/* Erlenmeyer SVG */}
              <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                <defs>
                  {/* Glass highlights */}
                  <linearGradient id="glassHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.16)" />
                    <stop offset="25%" stopColor="rgba(255, 255, 255, 0.0)" />
                    <stop offset="75%" stopColor="rgba(255, 255, 255, 0.0)" />
                    <stop offset="85%" stopColor="rgba(255, 255, 255, 0.1)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.26)" />
                  </linearGradient>

                  {/* Bubble 3D sphere gradient */}
                  <radialGradient id="bubbleGrad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                    <stop offset="40%" stopColor="#ffffff" stopOpacity="0.15" />
                    <stop offset="85%" stopColor="#ffffff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.65" />
                  </radialGradient>
                  
                  {/* Bubble 3D copper/brown sphere gradient */}
                  <radialGradient id="bubbleBrownGrad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#ffd8be" stopOpacity="0.9" />
                    <stop offset="40%" stopColor="#b07d62" stopOpacity="0.25" />
                    <stop offset="85%" stopColor="#9c6644" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#7f5539" stopOpacity="0.75" />
                  </radialGradient>

                  {/* Shiny liquid-metal sphere for Na/K */}
                  <radialGradient id="metalMetallicGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="35%" stopColor="#e2e2e2" />
                    <stop offset="75%" stopColor="#9aa0a6" />
                    <stop offset="100%" stopColor="#5f6368" />
                  </radialGradient>

                  {/* Dynamic Acid Liquid Body Gradient */}
                  <linearGradient id="acidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={dynamicLiquidColor} stopOpacity="0.55" />
                    <stop offset="50%" stopColor={dynamicLiquidColor} stopOpacity="0.38" />
                    <stop offset="100%" stopColor={activeMetal.id === 'ca' && dissolvedPct > 10 ? '#ffffff' : dynamicLiquidColor} stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Aqua background shadow inside the beaker */}
                <path 
                  d="M 85 40 L 115 40 L 115 80 L 175 210 Q 185 230 165 230 L 35 230 Q 15 230 25 210 L 85 80 Z"
                  fill="rgba(255,255,255,0.01)"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="2"
                />

                {/* Acid Liquid Body */}
                <motion.path 
                  d="M 72 110 L 128 110 L 170 215 C 175 228 160 228 150 228 L 50 228 C 40 228 25 228 30 215 Z"
                  fill="url(#acidGrad)"
                  opacity={0.7}
                  animate={isReacting && reactionPossible ? {
                    d: [
                      "M 72 110 L 128 110 L 170 215 C 175 228 160 228 150 228 L 50 228 C 40 228 25 228 30 215 Z",
                      "M 71 108 L 129 112 L 170 215 C 175 228 160 228 150 228 L 50 228 C 40 228 25 228 30 215 Z",
                      "M 73 112 L 127 108 L 170 215 C 175 228 160 228 150 228 L 50 228 C 40 228 25 228 30 215 Z"
                    ]
                  } : {}}
                  transition={{ repeat: Infinity, duration: Math.max(0.2, 1 - (reactionRate * 2)), ease: "easeInOut" }}
                />

                {/* Curved Liquid Surface Meniscus */}
                <ellipse 
                  cx={100} 
                  cy={110} 
                  rx={28} 
                  ry={5} 
                  fill={dynamicLiquidColor} 
                  opacity={0.4} 
                  stroke={activeMetal.id === 'ca' && dissolvedPct > 10 ? '#ffffff' : dynamicLiquidColor} 
                  strokeWidth={1}
                  style={{
                    filter: isReacting ? `drop-shadow(0 0 ${2 + (reactionRate * 6)}px ${dynamicLiquidColor})` : 'none'
                  }}
                />

                {/* Active bubbles layer */}
                {bubbles.map(b => {
                  const isNO2 = activeMetal.id === 'cu' && activeAcid.id === 'hno3';
                  return (
                    <g key={b.id}>
                      {/* Bubble 3D sphere */}
                      <circle
                        cx={b.x}
                        cy={b.y}
                        r={b.size}
                        fill={isNO2 ? 'url(#bubbleBrownGrad)' : 'url(#bubbleGrad)'}
                        stroke={isNO2 ? 'rgba(127,85,57,0.3)' : 'rgba(255,255,255,0.55)'}
                        strokeWidth="0.4"
                        opacity={b.opacity}
                      />
                      {/* 3D Specular Highlight Dot */}
                      <circle
                        cx={b.x - b.size * 0.35}
                        cy={b.y - b.size * 0.35}
                        r={b.size * 0.18}
                        fill="#ffffff"
                        opacity={b.opacity * 0.95}
                      />
                    </g>
                  );
                })}

                {/* Metal Piece (shrinks as it dissolves) - Sinking */}
                {isReacting && dissolvedPct < 100 && !['k', 'na'].includes(activeMetal.id) && (
                  <motion.rect
                    x={100 - (20 * (1 - dissolvedPct/100))}
                    y={210}
                    width={40 * (1 - dissolvedPct/100)}
                    height={12 * (1 - dissolvedPct/100)}
                    rx={4 * (1 - dissolvedPct/100)}
                    fill={activeMetal.color}
                    stroke="#ffffff"
                    strokeWidth="1"
                    opacity={0.9}
                    style={{
                      filter: `drop-shadow(0 0 ${4 + (reactionRate * 10)}px ${activeMetal.color})`
                    }}
                  />
                )}

                {/* Floating Metal Piece (Na/K) - melts into a sphere and darts on the surface */}
                {isReacting && dissolvedPct < 100 && ['k', 'na'].includes(activeMetal.id) && (
                  <circle
                    cx={metalX}
                    cy={108}
                    r={8 * (1 - dissolvedPct/100)}
                    fill="url(#metalMetallicGrad)"
                    stroke="#ffffff"
                    strokeWidth="1"
                    opacity={0.95}
                    style={{
                      filter: `drop-shadow(0 0 ${6 + (reactionRate * 15)}px ${activeMetal.color})`
                    }}
                  />
                )}

                {/* Beaker Reflection Overlay */}
                <path 
                  d="M 85 30 L 115 30 L 115 80 L 175 210 C 185 230 165 230 150 230 L 50 230 C 35 230 15 230 25 210 L 85 80 Z"
                  fill="url(#glassHighlight)"
                  pointerEvents="none"
                />

                {/* Flask Glass Outline Grid Layer */}
                <path 
                  d="M 85 30 L 115 30 M 85 30 L 85 80 L 25 210 C 15 230 35 230 50 230 L 150 230 C 165 230 185 230 175 210 L 115 80 L 115 30"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Measurement scale lines */}
                <line x1="60" y1="180" x2="80" y2="180" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                <text x="90" y="183" fill="rgba(255,255,255,0.3)" fontSize="8" fontWeight="bold">100 mL</text>
                <line x1="72" y1="150" x2="92" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                <text x="100" y="153" fill="rgba(255,255,255,0.3)" fontSize="8" fontWeight="bold">200 mL</text>
              </svg>

              {/* Dynamic Sparks escaping the neck of the Erlenmeyer (x center around 100 on 200 grid) */}
              <div className="absolute top-[80px] left-[55px] w-24 h-40 pointer-events-none">
                {sparks.map(s => (
                  <div
                    key={s.id}
                    className="absolute rounded-full"
                    style={{
                      left: `${s.x}px`,
                      top: `${s.y}px`,
                      width: `${s.size}px`,
                      height: `${s.size}px`,
                      background: s.color,
                      boxShadow: `0 0 10px ${s.color}, 0 0 20px ${s.color}`,
                      opacity: s.size / 7
                    }}
                  />
                ))}
              </div>

            </div>

            {/* Reaction Triggers */}
            <div className="w-full flex items-center gap-4 z-10">
              <button
                onClick={handleReset}
                disabled={!isReacting && dissolvedPct === 0}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 transition-all flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none"
              >
                <RefreshCw size={18} />
              </button>

              {!isReacting ? (
                <button
                  onClick={handleDropMetal}
                  disabled={isCompleted}
                  className="flex-1 py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                  style={{
                    background: isCompleted ? 'rgba(255,255,255,0.05)' : activeAcid.color,
                    color: isCompleted ? 'rgba(255,255,255,0.3)' : 'black',
                    boxShadow: isCompleted ? 'none' : `0 10px 25px ${activeAcid.color}33`
                  }}
                >
                  <Play size={16} /> Drop Metal & Start
                </button>
              ) : (
                <button
                  onClick={() => setIsReacting(false)}
                  className="flex-1 py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider bg-red-500 hover:bg-red-600 text-white shadow-lg active:scale-95 transition-all"
                >
                  Pause Reaction
                </button>
              )}
            </div>

          </div>

          {/* Adjustable Parameter Controllers */}
          <div className="glass-panel p-6 rounded-[2rem] border border-white/10 flex flex-col gap-5">
            <h4 className="text-xs font-black uppercase tracking-wider text-white/40 flex items-center gap-1.5">
              <Thermometer size={14} /> Adjust Initial Parameters
            </h4>

            {/* Molar concentration slider */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-white/75">Acid Concentration (Molar)</span>
                <span className="font-black text-cyan-400 font-mono">{concentration.toFixed(1)} M</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="12.0"
                step="0.1"
                disabled={isReacting}
                value={concentration}
                onChange={(e) => setConcentration(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400 disabled:opacity-40"
              />
              <div className="flex justify-between text-[9px] font-bold text-white/30">
                <span>0.1M (Dilute)</span>
                <span>6.0M (Intermediate)</span>
                <span>12.0M (Concentrated)</span>
              </div>
            </div>

            {/* Initial Temperature Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-white/75">Starting Temperature (°C)</span>
                <span className="font-black text-cyan-400 font-mono">{temperature} °C</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="1"
                disabled={isReacting}
                value={temperature}
                onChange={(e) => {
                  setTemperature(parseInt(e.target.value));
                  setReactionTemp(parseInt(e.target.value));
                }}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400 disabled:opacity-40"
              />
              <div className="flex justify-between text-[9px] font-bold text-white/30">
                <span>20°C (Room Temp)</span>
                <span>60°C (Warm)</span>
                <span>100°C (Boiling)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Telemetry Indicators & Chemical Equations (Right - Col 3) */}
        <div className="lg:col-span-3 flex flex-col gap-6">

          {/* Telemetry Panel */}
          <div className="glass-panel p-6 rounded-[2rem] border border-white/10 flex flex-col gap-5">
            <h3 className="text-md font-extrabold flex items-center gap-2 text-cyan-400">
              <Gauge size={18} /> Telemetry Feeds
            </h3>

            {/* Temperature Feed */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-500/10 border border-orange-500/20 text-orange-400">
                <Thermometer size={22} className={isReacting ? "animate-bounce" : ""} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-white/40 block">Dynamic Temperature</span>
                <h4 className="text-xl font-mono font-black">{reactionTemp.toFixed(1)}°C</h4>
              </div>
            </div>

            {/* pH Meter */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-500/10 border border-green-500/20 text-green-400">
                <span className="text-md font-black font-mono">pH</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-white/40 block">Solution Acidity</span>
                <h4 className="text-xl font-mono font-black">pH {calculatedPH}</h4>
              </div>
            </div>

            {/* Gas Evolution Syringe Gas Collector */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Wind size={22} className={isReacting ? "animate-pulse" : ""} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-white/40 block">Gas Collected</span>
                  <h4 className="text-lg font-mono font-black">{collectedGas.toFixed(1)} mL</h4>
                </div>
              </div>

              {/* Graphical representation of the Gas syringe cylinder */}
              <div className="w-full h-8 bg-black/40 border border-white/10 rounded-xl relative overflow-hidden flex items-center pr-1.5 pl-4">
                <span className="text-[8px] font-bold text-white/20 font-mono tracking-widest absolute left-3 select-none">H₂ COLLECTION VALVE</span>
                <div 
                  className="h-full bg-cyan-400/20 border-r-2 border-cyan-400 absolute left-0 top-0 transition-all duration-300"
                  style={{ width: `${Math.min(100, (collectedGas / 450) * 100)}%` }}
                />
              </div>
            </div>

            {/* Dissolution Bar */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white/50">Reactant Consumed</span>
                <span className="font-black text-cyan-400 font-mono">{dissolvedPct.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2.5 bg-black/40 border border-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${dissolvedPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Wiki Formula & Equation Cards */}
          <div className="glass-panel p-6 rounded-[2rem] border border-white/10 flex flex-col gap-4 flex-1">
            <h3 className="text-md font-extrabold flex items-center gap-2 text-cyan-400">
              <Info size={18} /> Reaction Chemistry
            </h3>

            <div className="flex flex-col gap-4">
              
              {/* Type Badge */}
              <div>
                <span className="text-[9px] font-bold text-white/35 block uppercase tracking-wider mb-1">Reaction Category</span>
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400">
                  {chemicalEquations.type}
                </span>
              </div>

              {/* Balanced Equation */}
              <div>
                <span className="text-[9px] font-bold text-white/35 block uppercase tracking-wider mb-1">Balanced Equation</span>
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-xs font-mono select-text font-black overflow-x-auto text-white/90">
                  {chemicalEquations.molecular}
                </div>
              </div>

              {/* Net Ionic Equation */}
              <div>
                <span className="text-[9px] font-bold text-white/35 block uppercase tracking-wider mb-1">Net Ionic Formula</span>
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-xs font-mono select-text font-black overflow-x-auto text-white/90">
                  {chemicalEquations.netIonic}
                </div>
              </div>

              {/* Informative Safety Details */}
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 flex gap-3 text-white/70 leading-normal">
                {activeMetal.reactivity >= 0.8 ? (
                  <Skull size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                ) : activeMetal.reactivity >= 0.4 ? (
                  <ShieldAlert size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <Info size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                )}
                
                <p className="text-[11px] font-medium leading-relaxed">
                  {reactionPossible 
                    ? `This reaction generates heat and gaseous products rapidly. Initial room thermodynamics indicate ${activeMetal.name} has highly dynamic electron-releasing capability inside ${activeAcid.name}.`
                    : `Inert reaction mismatch. Under these thermodynamic conditions, ${activeMetal.name} has an electron-affinity index which prevents hydrogen displacement within ${activeAcid.name}.`
                  }
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
      
    </div>
  );
};

export default AcidReactions;
