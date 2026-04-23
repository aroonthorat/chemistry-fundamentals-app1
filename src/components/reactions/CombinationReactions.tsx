import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Thermometer } from 'lucide-react';
import { GlassBeaker } from './BaseComponents';

export const HydrogenOxygenReaction = () => {
    const [temperature, setTemperature] = useState(20);
    const [sparked, setSparked] = useState(false);
    const [exploded, setExploded] = useState(false);

    const handleSpark = () => {
        if (temperature > 50) {
            setSparked(true);
            setTimeout(() => setExploded(true), 200);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <AnimatePresence>
                {sparked && !exploded && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 2 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, #fff, #ffaa00, transparent)', width: '300px', height: '300px', borderRadius: '50%', zIndex: 50, filter: 'blur(10px)' }}
                    />
                )}
            </AnimatePresence>

            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {exploded ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#00f0ff', fontSize: '1.5rem', fontWeight: 600 }}>
                        <span style={{ fontSize: '3rem' }}>💧</span><br />
                        2H₂O (Water Formed)
                    </motion.div>
                ) : (
                    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,100,100,0.3)', border: '2px solid red', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>2H₂</div>
                        </motion.div>
                        <div style={{ fontSize: '2rem' }}>+</div>
                        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(100,200,255,0.3)', border: '2px solid cyan', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>O₂</div>
                        </motion.div>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '30px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <Thermometer color={temperature > 50 ? 'red' : 'white'} />
                    <input
                        type="range"
                        min="20" max="100"
                        value={temperature}
                        onChange={(e) => setTemperature(parseInt(e.target.value))}
                        disabled={exploded}
                        style={{ flex: 1, accentColor: temperature > 50 ? 'red' : 'cyan' }}
                    />
                    <span style={{ width: '50px', textAlign: 'right' }}>{temperature}°C</span>
                </div>

                <button
                    onClick={handleSpark}
                    disabled={exploded}
                    style={{
                        width: '100%', padding: '15px', borderRadius: '10px', border: 'none',
                        background: temperature > 50 ? 'var(--accent-cyan)' : 'gray',
                        color: temperature > 50 ? 'black' : 'white',
                        cursor: temperature > 50 ? 'pointer' : 'not-allowed',
                        fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                    }}>
                    <Zap /> {exploded ? 'Reaction Complete' : 'Ignite Spark (Requires > 50°C)'}
                </button>
            </div>
        </div>
    );
};

export const MagnesiumCombustion = () => {
    const [ignite, setIgnite] = useState(false);
    const [burnt, setBurnt] = useState(false);

    const handleIgnite = () => {
        setIgnite(true);
        setTimeout(() => {
            setIgnite(false);
            setBurnt(true);
        }, 1500); // 1.5 seconds of intense light
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <AnimatePresence>
                {ignite && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 5 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, #ffffff, #eeffff, transparent)', width: '300px', height: '300px', borderRadius: '50%', zIndex: 100, filter: 'blur(5px)', boxShadow: '0 0 100px 50px white' }}
                    />
                )}
            </AnimatePresence>

            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Tongs</div>
                    {!burnt ? (
                        <motion.div
                            animate={ignite ? { opacity: [1, 0.8, 1], filter: ['brightness(1)', 'brightness(10)', 'brightness(1)'] } : {}}
                            transition={ignite ? { repeat: Infinity, duration: 0.1 } as any : {}}
                            style={{ width: '150px', height: '15px', background: '#d3d3d3', border: '1px solid #777', borderRadius: '2px', alignSelf: 'center', boxShadow: ignite ? '0 0 20px white' : 'none' }}
                        />
                    ) : (
                        <div style={{ width: '100px', height: '20px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {Array.from({ length: 15 }).map((_, i) => (
                                <div key={i} style={{ width: '10px', height: '10px', background: 'white', borderRadius: '50%', opacity: 0.8 }} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '30px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', position: 'relative', zIndex: 10 }}>
                <p style={{ marginBottom: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Combustion: <strong>2Mg + O₂ → 2MgO</strong><br />
                    Igniting magnesium produces an extremely bright white flame.
                </p>
                <button
                    onClick={handleIgnite}
                    disabled={ignite || burnt}
                    style={{
                        width: '100%', padding: '15px', borderRadius: '10px', border: 'none',
                        background: (ignite || burnt) ? 'gray' : 'var(--accent-cyan)',
                        color: (ignite || burnt) ? 'white' : 'black',
                        cursor: (ignite || burnt) ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                    }}>
                    <Zap /> {burnt ? 'Reaction Complete (MgO ash)' : ignite ? 'Burning...' : 'Ignite Ribbon'}
                </button>
            </div>
        </div>
    );
};

export const SlakingOfLime = () => {
    const [added, setAdded] = useState(false);
    const [temp, setTemp] = useState(25);

    useEffect(() => {
        if (added && temp < 85) {
            const timer = setInterval(() => setTemp(t => Math.min(t + 2, 85)), 100);
            return () => clearInterval(timer);
        }
    }, [added, temp]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', alignItems: 'flex-end', height: '250px' }}>
                <AnimatePresence>
                    {!added && (
                        <motion.div exit={{ y: 150, opacity: 0 }} transition={{ duration: 0.5 }} style={{ paddingBottom: '50px' }}>
                            <div style={{ marginBottom: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>CaO (Quicklime)</div>
                            <button onClick={() => setAdded(true)} style={{ width: '60px', height: '60px', background: '#f5f5f5', border: '2px solid #ddd', borderRadius: '8px', cursor: 'pointer' }} />
                            <div style={{ marginTop: '10px', color: 'var(--accent-cyan)', fontSize: '0.9rem' }}>Click to add</div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-40px', width: '100%', textAlign: 'center', fontWeight: 'bold' }}>
                        {added ? 'Ca(OH)₂ (Slaked Lime)' : 'H₂O (Water)'}
                    </div>
                    <GlassBeaker color="rgba(255,255,255,0.1)" liquidHeight={60} />
                    {added && temp > 40 && (
                        <motion.div
                            animate={{ opacity: [0.1, 0.3, 0.1], y: [-20, -60] }}
                            transition={{ repeat: Infinity, duration: 2 } as any}
                            style={{ position: 'absolute', top: '20%', left: '20%', right: '20%', height: '40px', background: 'rgba(255,255,255,0.2)', filter: 'blur(10px)', borderRadius: '50%' }}
                        />
                    )}
                </div>
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <Thermometer color={temp > 60 ? 'red' : 'white'} />
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Temperature</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: temp > 60 ? '#ff4444' : 'white' }}>{temp}°C</div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '30px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <p style={{ marginBottom: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Combination: <strong>CaO + H₂O → Ca(OH)₂ + Heat</strong><br />
                    Adding quicklime to water is highly exothermic.
                </p>
            </div>
        </div>
    );
};
