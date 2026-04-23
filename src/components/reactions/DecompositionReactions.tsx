import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer, Zap } from 'lucide-react';
import { GlassBeaker } from './BaseComponents';

// Reaction 4: Decomposition (CaCO3 -> CaO + CO2)
export const DecompositionReaction = () => {
    const [heat, setHeat] = useState(20);
    const [decomposed, setDecomposed] = useState(0); // 0 to 100

    useEffect(() => {
        if (heat > 800 && decomposed < 100) {
            const timer = setInterval(() => {
                setDecomposed(prev => Math.min(prev + 5, 100));
            }, 500);
            return () => clearInterval(timer);
        }
    }, [heat, decomposed]);

    const isReacting = heat > 800 && decomposed < 100;
    const flameHeight = Math.max(0, (heat - 20) / 1000 * 100);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', position: 'relative' }}>

                {/* Flask and Contents */}
                <div style={{ position: 'relative', width: '100px', height: '120px', border: '4px solid rgba(255,255,255,0.3)', borderTop: 'none', borderRadius: '0 0 30px 30px', backdropFilter: 'blur(2px)', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '10px', zIndex: 10, marginBottom: '20px' }}>
                    {/* CO2 Bubbles / Gas */}
                    <AnimatePresence>
                        {isReacting && (
                            <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: [0, 1, 0], y: -150 }}
                                transition={{ repeat: Infinity, duration: 1 } as any}
                                style={{ position: 'absolute', top: '50%', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 'bold' }}
                            >
                                ↑ CO₂
                            </motion.div>
                        )}
                        {decomposed > 0 && decomposed < 100 && (
                            <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: [0, 1, 0], y: -160 }}
                                transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 } as any}
                                style={{ position: 'absolute', top: '30%', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 'bold' }}
                            >
                                ↑ CO₂
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Solid Powder */}
                    <div style={{ background: 'white', width: '60%', height: '30px', borderRadius: '50% 50% 10px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black', fontSize: '0.7rem', fontWeight: 'bold' }}>
                        {decomposed === 100 ? 'CaO' : 'CaCO₃'}
                    </div>
                </div>

                {/* Wire Gauze / Stand */}
                <div style={{ width: '120px', height: '4px', background: '#555', borderRadius: '2px', position: 'absolute', bottom: '65px', zIndex: 5 }} />

                {/* Bunsen Burner */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute', bottom: '10px' }}>
                    {/* Flame */}
                    <div style={{ width: '30px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginBottom: '-5px', zIndex: 4 }}>
                        <motion.div
                            animate={{ height: `${flameHeight}px` }}
                            transition={{ type: 'spring', bounce: 0.2 } as any}
                            style={{ width: '100%', background: 'linear-gradient(to top, rgba(0, 100, 255, 0.8), rgba(0, 200, 255, 0.4), transparent)', borderRadius: '50% 50% 20% 20%', filter: 'blur(2px)' }}
                        >
                            {/* Inner cone */}
                            <motion.div
                                animate={{ height: `${flameHeight * 0.4}px` }}
                                style={{ width: '60%', margin: '0 auto', background: 'rgba(200, 255, 255, 0.8)', borderRadius: '50% 50% 20% 20%' }}
                            />
                        </motion.div>
                    </div>
                    {/* Burner Body */}
                    <div style={{ width: '15px', height: '40px', background: '#888', border: '1px solid #555', zIndex: 2 }} />
                    <div style={{ width: '40px', height: '10px', background: '#444', borderRadius: '5px' }} />
                </div>
            </div>

            <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <p style={{ marginBottom: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Thermal Decomposition: <strong>CaCO₃(s) + Heat → CaO(s) + CO₂(g)</strong><br />
                    Heat above 800°C to see decomposition happen.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Thermometer color={heat > 800 ? 'red' : 'white'} />
                    <input
                        type="range"
                        min="20" max="1200"
                        value={heat}
                        onChange={(e) => setHeat(parseInt(e.target.value))}
                        style={{ flex: 1, accentColor: heat > 800 ? 'red' : 'cyan' }}
                    />
                    <span style={{ width: '60px', textAlign: 'right', fontWeight: 'bold' }}>{heat}°C</span>
                </div>

                <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--text-secondary)' }}>Reaction Progress</h4>
                <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${decomposed}%`, background: 'var(--gradient-main)', transition: 'width 0.5s linear' }} />
                </div>
            </div>
        </div>
    );
};

// Reaction: Decomposition of H2O2
export const PeroxideDecomposition = () => {
    const [added, setAdded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (added && progress < 100) {
            const timer = setInterval(() => setProgress(p => Math.min(p + 1, 100)), 200);
            return () => clearInterval(timer);
        }
    }, [added, progress]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', alignItems: 'flex-end', height: '250px' }}>
                <AnimatePresence>
                    {!added && (
                        <motion.div exit={{ y: 150, opacity: 0 }} transition={{ duration: 0.5 }} style={{ paddingBottom: '50px' }}>
                            <div style={{ marginBottom: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>MnO₂ (Catalyst)</div>
                            <button onClick={() => setAdded(true)} style={{ width: '40px', height: '40px', background: '#333', border: '1px solid #000', borderRadius: '4px', cursor: 'pointer' }} />
                            <div style={{ marginTop: '10px', color: 'var(--accent-cyan)', fontSize: '0.9rem' }}>Click to add</div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-40px', width: '100%', textAlign: 'center', fontWeight: 'bold' }}>H₂O₂ (aq)</div>
                    <GlassBeaker color="rgba(255,255,255,0.1)" liquidHeight={50} />
                    {added && progress < 100 && (
                        <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', pointerEvents: 'none' }}>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ y: [0, -100], opacity: [0, 1, 0], x: [Math.random() * 40 - 20, Math.random() * 40 - 20] }}
                                    transition={{ repeat: Infinity, duration: 0.8, delay: Math.random() } as any}
                                    style={{ position: 'absolute', left: '50%', width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div style={{ marginTop: '40px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
                    <strong>2H₂O₂(aq) → 2H₂O(l) + O₂(g)</strong><br />
                    Manganese dioxide (MnO₂) acts as a catalyst to speed up the decomposition of hydrogen peroxide into water and oxygen gas.
                </p>
            </div>
        </div>
    );
};

// Reaction: Electrolysis of Water
export const ElectrolysisLab = () => {
    const [voltage, setVoltage] = useState(0);
    const bubbling = voltage > 5;

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative' }}>
                {/* Two Test Tubes over electrodes */}
                <div style={{ position: 'absolute', bottom: '20px', display: 'flex', gap: '20px', zIndex: 5 }}>
                    {/* Anode (O2) */}
                    <div style={{ position: 'relative', width: '30px', height: '120px', border: '2px solid rgba(255,255,255,0.4)', borderBottom: 'none', borderRadius: '15px 15px 0 0', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                        {bubbling && (
                            <motion.div animate={{ y: [0, -130], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2 } as any} style={{ position: 'absolute', bottom: '10px', left: '10px', width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />
                        )}
                        <div style={{ position: 'absolute', bottom: '-20px', width: '10px', height: '40px', background: '#333', left: '10px' }} /> {/* Electrode */}
                        <div style={{ position: 'absolute', top: '10px', width: '100%', textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 0 5px black' }}>O₂</div>
                    </div>
                    {/* Cathode (H2) - more bubbles */}
                    <div style={{ position: 'relative', width: '30px', height: '120px', border: '2px solid rgba(255,255,255,0.4)', borderBottom: 'none', borderRadius: '15px 15px 0 0', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                        {bubbling && (
                            <>
                                <motion.div animate={{ y: [0, -130], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.6 } as any} style={{ position: 'absolute', bottom: '10px', left: '5px', width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />
                                <motion.div animate={{ y: [0, -130], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.7, delay: 0.3 } as any} style={{ position: 'absolute', bottom: '15px', left: '15px', width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />
                            </>
                        )}
                        <div style={{ position: 'absolute', bottom: '-20px', width: '10px', height: '40px', background: '#333', left: '10px' }} />
                        <div style={{ position: 'absolute', top: '10px', width: '100%', textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 0 5px black' }}>H₂</div>
                    </div>
                </div>

                <GlassBeaker color="rgba(0, 150, 255, 0.2)" liquidHeight={90} />
            </div>

            <div style={{ marginTop: '40px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Zap color={voltage > 5 ? 'var(--accent-cyan)' : 'white'} />
                    <input type="range" min="0" max="15" value={voltage} onChange={(e) => setVoltage(parseInt(e.target.value))} style={{ flex: 1, accentColor: voltage > 5 ? 'var(--accent-cyan)' : 'white' }} />
                    <span style={{ width: '60px', textAlign: 'right', fontWeight: 'bold' }}>{voltage} V</span>
                </div>
                <p style={{ marginTop: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <strong>2H₂O(l) → 2H₂(g) + O₂(g)</strong><br />
                    Apply voltage &gt; 5V to split water using electrodes. Notice the Cathode produces 2x more Hydrogen gas bubbles than Oxygen at the Anode!
                </p>
            </div>
        </div>
    );
};
