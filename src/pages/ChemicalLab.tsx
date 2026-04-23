import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Beaker, FlaskConical, Thermometer, Zap, Activity, Filter, BoxSelect } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Basic Lab Equipment Icons/Components
const GlassBeaker = ({ color, liquidHeight = 50, hasSolid = false, solidColor = "#9ba1a6", solidOpacity = 1 }: any) => (
    <div style={{ position: 'relative', width: '120px', height: '150px', margin: '0 auto' }}>
        {/* Liquid */}
        <motion.div
            initial={false}
            animate={{ height: `${liquidHeight}%`, backgroundColor: color }}
            style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                right: '10px',
                borderRadius: '5px 5px 20px 20px',
                transition: 'background-color 2s ease, height 0.5s ease'
            }}
        />
        {/* Solid Object (like Zinc) */}
        {hasSolid && (
            <motion.div
                initial={false}
                animate={{ backgroundColor: solidColor, opacity: solidOpacity }}
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '30px',
                    height: '40px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'background-color 3s ease, opacity 1s ease'
                }}
            />
        )}
        {/* Beaker Glass */}
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: 'none',
            borderRadius: '0 0 25px 25px',
            boxShadow: 'inset 0 -10px 20px rgba(255,255,255,0.1), 0 10px 20px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(2px)'
        }}>
            {/* Lip */}
            <div style={{ position: 'absolute', top: '-4px', left: '-10px', right: '-10px', height: '8px', border: '4px solid rgba(255, 255, 255, 0.3)', borderRadius: '50%', borderBottom: 'none' }} />
        </div>
    </div>
);

// Reaction 1: Combination (H2 + O2)
const HydrogenOxygenReaction = () => {
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

// Reaction 2: Single Displacement (Zn + CuSO4)
const DisplacementReaction = () => {
    const [zincDropped, setZincDropped] = useState(false);
    const [reactionProgress, setReactionProgress] = useState(0);

    useEffect(() => {
        if (zincDropped && reactionProgress < 100) {
            const timer = setInterval(() => {
                setReactionProgress(p => Math.min(p + 2, 100));
            }, 100);
            return () => clearInterval(timer);
        }
    }, [zincDropped, reactionProgress]);

    // Color transitions based on progress
    // Blue (rgba(0,100,255,0.6)) -> Colorless (rgba(200,200,200,0.1))
    const blueOpacity = 0.6 - (reactionProgress * 0.005);
    const liquidColor = `rgba(0, 150, 255, ${blueOpacity})`;

    // Zinc Color: Silver (#b0c4de) -> Reddish Brown Copper (#b87333)
    const isComplete = reactionProgress === 100;
    const zincColor = isComplete ? '#b87333' : '#b0c4de';

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', alignItems: 'flex-end', height: '250px' }}>

                {/* The Zinc piece to drag/click */}
                <AnimatePresence>
                    {!zincDropped && (
                        <motion.div
                            exit={{ y: 150, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ paddingBottom: '50px' }}
                        >
                            <div style={{ marginBottom: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>Zn (Solid)</div>
                            <button
                                onClick={() => setZincDropped(true)}
                                style={{ width: '60px', height: '60px', background: '#b0c4de', border: '2px solid #8ba4c4', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
                            />
                            <div style={{ marginTop: '10px', color: 'var(--accent-cyan)', fontSize: '0.9rem' }}>Click to drop</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-40px', width: '100%', textAlign: 'center', fontWeight: 'bold' }}>
                        {isComplete ? 'ZnSO₄ (aq)' : 'CuSO₄ (aq)'}
                    </div>
                    <GlassBeaker
                        color={liquidColor}
                        liquidHeight={60}
                        hasSolid={zincDropped}
                        solidColor={zincColor}
                    />
                </div>
            </div>

            <div style={{ marginTop: '40px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <h4 style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>Reaction Progress</h4>
                <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${reactionProgress}%`, background: 'var(--gradient-main)', transition: 'width 0.1s linear' }} />
                </div>
                <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
                    {zincDropped && reactionProgress < 100 && "Zinc is displacing Copper... Solution losing blue color as Cu fades out."}
                    {isComplete && "Reaction Complete! Zinc is coated in Copper, making it reddish-brown. Solution is now colorless Zinc Sulfate."}
                    {!zincDropped && "Single Displacement: Zn + CuSO₄ → ZnSO₄ + Cu."}
                </p>
            </div>
        </div>
    );
};

// Reaction 3: Titration (HCl + NaOH)
const TitrationLab = () => {
    const [naohDrops, setNaohDrops] = useState(0);

    // Base volume 50ml, each drop is ~1ml
    const currentVolume = 50 + naohDrops;

    // PH Calculation simplified logic
    // Initial pH = 1 (Strong Acid). Point of equivalence is around drop 50.
    let ph = 1;
    if (naohDrops < 45) ph = 1 + (naohDrops * 0.02);
    else if (naohDrops >= 45 && naohDrops < 50) ph = 2 + ((naohDrops - 45) * 0.4);
    else if (naohDrops === 50) ph = 7;
    else if (naohDrops > 50 && naohDrops <= 55) ph = 7 + ((naohDrops - 50) * 0.6);
    else ph = 10 + ((naohDrops - 55) * 0.05);

    ph = Math.min(14, Math.max(0, ph));

    // Phenolphthalein turns pink around pH 8.2
    const isPink = ph > 8.2;
    const liquidColor = isPink ? `rgba(255, 0, 127, ${Math.min(0.8, (ph - 8.2) * 0.3)})` : `rgba(255, 255, 255, 0.1)`;

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Activity color={ph === 7 ? '#00ff00' : (ph < 7 ? '#ffaa00' : 'var(--accent-pink)')} />
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>pH Meter</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{ph.toFixed(2)}</div>
                    </div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <FlaskConical color="var(--accent-cyan)" />
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Volume</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{currentVolume} ml</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '220px', position: 'relative' }}>

                {/* Burette Simulation (Dropper) */}
                <div style={{ position: 'absolute', top: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '20px', height: '100px', background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.3)', borderBottom: 'none', borderRadius: '5px 5px 0 0' }}>
                        <div style={{ width: '100%', height: `${100 - (naohDrops)}%`, background: 'rgba(255,255,255,0.5)', transition: 'height 0.2s', alignSelf: 'flex-end' }} />
                    </div>
                    <div style={{ width: '4px', height: '15px', background: 'rgba(255,255,255,0.3)' }} />
                    {/* Drop animation space */}
                    <div style={{ height: '30px' }} />
                </div>

                <GlassBeaker color={liquidColor} liquidHeight={Math.min(90, 30 + (naohDrops * 0.5))} />
            </div>

            <div style={{ marginTop: '30px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <p style={{ marginBottom: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Neutralization: <strong>HCl + NaOH → NaCl + H₂O</strong><br />
                    Indicator: Phenolphthalein. Slowly add NaOH from burette to the acidic solution.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ whiteSpace: 'nowrap' }}>+ NaOH Drops</span>
                    <input
                        type="range"
                        min="0" max="100"
                        value={naohDrops}
                        onChange={(e) => setNaohDrops(parseInt(e.target.value))}
                        style={{ flex: 1, accentColor: 'var(--accent-pink)' }}
                    />
                    <span style={{ width: '40px', textAlign: 'right', fontWeight: 'bold' }}>{naohDrops}</span>
                </div>
            </div>
        </div>
    );
};

// Reaction: Magnesium Combustion (Mg + O2 -> MgO)
const MagnesiumCombustion = () => {
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
                    {/* Ribbon or Ash */}
                    {!burnt ? (
                        <motion.div
                            animate={ignite ? { opacity: [1, 0.8, 1], filter: ['brightness(1)', 'brightness(10)', 'brightness(1)'] } : {}}
                            transition={ignite ? { repeat: Infinity, duration: 0.1 } as any : {}}
                            style={{ width: '150px', height: '15px', background: '#d3d3d3', border: '1px solid #777', borderRadius: '2px', alignSelf: 'center', boxShadow: ignite ? '0 0 20px white' : 'none' }}
                        />
                    ) : (
                        <div style={{ width: '100px', height: '20px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {/* Ash pieces */}
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

// Reaction: Decomposition (CaCO3 -> CaO + CO2)
const DecompositionReaction = () => {
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
// Generic Drop Reaction (Metal + Solution)
const GenericDropReaction = ({ solidName, solidStartColor, solidEndColor, liquidStartColor, liquidEndColor, liquidStartName, liquidEndName, equation, description, reactionSpeed = 2, hasBubbles = false, dissolveSolid = false }: any) => {
    const [dropped, setDropped] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (dropped && progress < 100) {
            const timer = setInterval(() => setProgress(p => Math.min(p + reactionSpeed, 100)), 100);
            return () => clearInterval(timer);
        }
    }, [dropped, progress, reactionSpeed]);

    const isComplete = progress === 100;

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', alignItems: 'flex-end', height: '250px' }}>
                <AnimatePresence>
                    {!dropped && (
                        <motion.div exit={{ y: 150, opacity: 0 }} transition={{ duration: 0.5 }} style={{ paddingBottom: '50px' }}>
                            <div style={{ marginBottom: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>{solidName}</div>
                            <button onClick={() => setDropped(true)} style={{ width: '60px', height: '60px', background: solidStartColor, border: '2px solid rgba(255,255,255,0.3)', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }} />
                            <div style={{ marginTop: '10px', color: 'var(--accent-cyan)', fontSize: '0.9rem' }}>Click to drop</div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-40px', width: '100%', textAlign: 'center', fontWeight: 'bold' }}>
                        {isComplete ? liquidEndName : liquidStartName}
                    </div>
                    <GlassBeaker
                        color={isComplete ? liquidEndColor : liquidStartColor}
                        liquidHeight={60}
                        hasSolid={dropped}
                        solidColor={isComplete ? solidEndColor : solidStartColor}
                        solidOpacity={dissolveSolid ? 1 - (progress / 100) : 1}
                    />
                    {dropped && hasBubbles && progress < 100 && (
                        <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
                            <motion.div animate={{ y: [0, -60], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.5 } as any} style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)' }} />
                            <motion.div animate={{ y: [0, -70], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 } as any} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)', marginLeft: '10px' }} />
                        </div>
                    )}
                </div>
            </div>
            <div style={{ marginTop: '40px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <h4 style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>Reaction Progress</h4>
                <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: 'var(--gradient-main)', transition: 'width 0.1s linear' }} />
                </div>
                <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
                    <strong>{equation}</strong><br />{description}
                </p>
            </div>
        </div>
    );
};

// Generic Mix Reaction (Two Liquids pouring into one)
const GenericMixReaction = ({ liquid1Name, liquid1Color, liquid2Name, liquid2Color, resultName, resultColor, hasPpt, pptColor, equation, description }: any) => {
    const [mixed, setMixed] = useState(false);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', alignItems: 'flex-end', height: '250px' }}>
                <AnimatePresence>
                    {!mixed && (
                        <motion.div exit={{ opacity: 0, y: -50, x: 50, rotate: 45 }} transition={{ duration: 1 }} style={{ paddingBottom: '20px' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '-40px', width: '100%', textAlign: 'center', fontWeight: 'bold' }}>{liquid1Name}</div>
                                <GlassBeaker color={liquid1Color} liquidHeight={40} />
                                <button onClick={() => setMixed(true)} style={{ marginTop: '20px', padding: '10px 20px', background: 'var(--accent-cyan)', color: 'black', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(0,255,255,0.3)' }}>Pour Liquid</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-40px', width: '100%', textAlign: 'center', fontWeight: 'bold' }}>
                        {mixed ? resultName : liquid2Name}
                    </div>
                    <GlassBeaker
                        color={mixed ? resultColor : liquid2Color}
                        liquidHeight={mixed ? 80 : 40}
                        hasSolid={mixed && hasPpt}
                        solidColor={pptColor}
                        solidOpacity={1}
                    />
                </div>
            </div>
            <div style={{ marginTop: '40px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
                    <strong>{equation}</strong><br />{description}
                </p>
            </div>
        </div>
    );
};

// Reaction: Slaking of Lime (CaO + H2O)
const SlakingOfLime = () => {
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
            <div style={{ marginTop: '40px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
                    <strong>CaO(s) + H₂O(l) → Ca(OH)₂(s) + Heat</strong><br />
                    This is a highly exothermic combination reaction. Quicklime reacts vigorously with water to form slaked lime, releasing a large amount of heat!
                </p>
            </div>
        </div>
    );
};

// Reaction: Decomposition of H2O2
const PeroxideDecomposition = () => {
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

// Reaction: Iron Rusting (Redox)
const IronRusting = () => {
    const [days, setDays] = useState(0);

    // Color transition: Grey (#8a8a8a) -> Rusty (#b7410e)
    const rustIntensity = days / 30;
    const nailColor = `rgb(${138 - (rustIntensity * 10)}, ${138 - (rustIntensity * 70)}, ${138 - (rustIntensity * 120)})`;

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'relative', padding: '40px', border: '4px solid rgba(255,255,255,0.2)', borderRadius: '20px', background: 'rgba(255,255,255,0.05)' }}>
                    {/* Water Level */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'rgba(0,150,255,0.1)', borderRadius: '0 0 16px 16px' }} />
                    {/* The Nail */}
                    <motion.div
                        style={{ width: '10px', height: '120px', background: nailColor, borderRadius: '2px', position: 'relative', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}
                    >
                        {/* Nail Head */}
                        <div style={{ position: 'absolute', top: '-5px', left: '-5px', width: '20px', height: '5px', background: nailColor, borderRadius: '2px' }} />
                        {/* Rust Patches */}
                        {days > 5 && Array.from({ length: Math.floor(days / 2) }).map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 8 - 4}px`,
                                    width: '6px',
                                    height: '6px',
                                    background: '#b7410e',
                                    borderRadius: '50%',
                                    opacity: 0.6,
                                    filter: 'blur(1px)'
                                }}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
            <div style={{ marginTop: '40px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <Activity color="var(--accent-cyan)" />
                    <input type="range" min="0" max="30" value={days} onChange={(e) => setDays(parseInt(e.target.value))} style={{ flex: 1, accentColor: 'var(--accent-pink)' }} />
                    <span style={{ width: '80px', textAlign: 'right', fontWeight: 'bold' }}>{days} Days</span>
                </div>
                <p style={{ fontSize: '0.9rem' }}>
                    <strong>4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ (Rust)</strong><br />
                    Rusting is a slow redox reaction where iron reacts with oxygen and moisture. The grey iron turns into reddish-brown hydrated iron(III) oxide.
                </p>
            </div>
        </div>
    );
};

// Reaction: Candle Combustion Zones
const CandleFlame = () => {
    const [lit, setLit] = useState(false);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', position: 'relative' }}>
                {lit && (
                    <div style={{ marginBottom: '10px', position: 'relative' }}>
                        {/* Flame Zones */}
                        {/* Outer Zone (Non-luminous) */}
                        <motion.div
                            animate={{ scale: [1, 1.05, 1], opacity: [0.7, 0.8, 0.7] }}
                            transition={{ repeat: Infinity, duration: 0.5 } as any}
                            style={{ width: '40px', height: '80px', background: 'rgba(0,100,255,0.3)', borderRadius: '50% 50% 20% 20%', filter: 'blur(4px)', position: 'absolute', bottom: 0, left: '-20px' }}
                        />
                        {/* Middle Zone (Luminous) */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 0.4 } as any}
                            style={{ width: '30px', height: '60px', background: 'linear-gradient(to top, #ffaa00, #ffff00)', borderRadius: '50% 50% 20% 20%', position: 'absolute', bottom: '5px', left: '-15px', zIndex: 2 }}
                        />
                        {/* Inner Zone (Dark) */}
                        <div style={{ width: '12px', height: '25px', background: '#333', borderRadius: '50% 50% 20% 20%', position: 'absolute', bottom: '10px', left: '-6px', zIndex: 3, opacity: 0.8 }} />
                    </div>
                )}
                {/* Candle Body */}
                <div style={{ width: '40px', height: '120px', background: '#f5f5f5', borderRadius: '4px', border: '1px solid #ddd', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-10px', left: '19px', width: '2px', height: '10px', background: '#333' }} /> {/* Wick */}
                </div>
            </div>
            <div style={{ marginTop: '30px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <button
                    onClick={() => setLit(!lit)}
                    style={{ width: '100%', padding: '15px', borderRadius: '10px', border: 'none', background: lit ? 'gray' : 'var(--accent-pink)', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px' }}
                >
                    {lit ? 'Extinguish Candle' : 'Light Candle'}
                </button>
                <div style={{ textAlign: 'left', fontSize: '0.85rem' }}>
                    <p><strong>Zones of Candle Flame:</strong></p>
                    <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                        <li style={{ color: 'var(--accent-cyan)' }}><strong>Outer Zone (Blue):</strong> Hottest part, complete combustion.</li>
                        <li style={{ color: '#ffaa00' }}><strong>Middle Zone (Yellow):</strong> Moderately hot, partial combustion.</li>
                        <li style={{ color: '#888' }}><strong>Inner Zone (Black):</strong> Least hot, contains unburnt wax vapors.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Reaction: Esterification
const Esterification = () => {
    const [temp, setTemp] = useState(25);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (temp > 60 && progress < 100) {
            const timer = setInterval(() => setProgress(p => Math.min(p + 1, 100)), 200);
            return () => clearInterval(timer);
        }
    }, [temp, progress]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', alignItems: 'flex-end', height: '250px' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-40px', width: '100%', textAlign: 'center', fontWeight: 'bold' }}>Ethanol + Ethanoic Acid</div>
                    <GlassBeaker color={progress > 50 ? 'rgba(255, 200, 255, 0.3)' : 'rgba(255,255,255,0.1)'} liquidHeight={50} />
                    {temp > 60 && progress < 100 && (
                        <motion.div
                            animate={{ y: [0, -40], opacity: [0, 0.5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 } as any}
                            style={{ position: 'absolute', top: '30%', left: '40%', right: '40%', height: '10px', background: 'rgba(255,255,255,0.2)', filter: 'blur(5px)' }}
                        />
                    )}
                </div>
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Thermometer color={temp > 60 ? 'red' : 'white'} />
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Water Bath</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{temp}°C</div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '40px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <span>Heat Control</span>
                    <input type="range" min="25" max="80" value={temp} onChange={(e) => setTemp(parseInt(e.target.value))} style={{ flex: 1, accentColor: 'var(--accent-cyan)' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: progress === 100 ? 'rgba(0,255,0,0.1)' : 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <Activity color={progress === 100 ? '#00ff00' : 'white'} />
                    <span style={{ fontSize: '0.9rem' }}>
                        {progress === 100 ? "🌸 Fruity Smell Detected! (Ethyl Acetate Formed)" : "Heating in progress... Reaction needs heat and H₂SO₄ catalyst."}
                    </span>
                </div>
                <p style={{ marginTop: '15px', fontSize: '0.85rem' }}>
                    <strong>CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O</strong><br />
                    Acid-catalyzed reaction between a carboxylic acid and an alcohol to form a sweet-smelling Ester.
                </p>
            </div>
        </div>
    );
};

// Reaction: Acetic Acid + NaOH
const AceticAcidNaOH = () => {
    const [naohDrops, setNaohDrops] = useState(0);
    // Weak acid titration curve
    let ph = 2.8; // Starting pH of 0.1M Acetic Acid
    if (naohDrops < 20) ph = 2.8 + (naohDrops * 0.1);
    else if (naohDrops < 50) ph = 4.8 + ((naohDrops - 20) * 0.05); // Buffer region
    else if (naohDrops < 55) ph = 6 + ((naohDrops - 50) * 0.8); // Equivalence point
    else ph = 10 + ((naohDrops - 55) * 0.1);

    const isPink = ph > 8.2;
    const liquidColor = isPink ? `rgba(255, 0, 127, ${Math.min(0.8, (ph - 8.2) * 0.2)})` : `rgba(255, 255, 255, 0.1)`;

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '220px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: '20px', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>pH</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{ph.toFixed(1)}</div>
                </div>
                <GlassBeaker color={liquidColor} liquidHeight={50 + (naohDrops * 0.5)} />
            </div>
            <div style={{ marginTop: '30px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <input type="range" min="0" max="100" value={naohDrops} onChange={(e) => setNaohDrops(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-pink)' }} />
                <p style={{ marginTop: '10px', fontSize: '0.85rem' }}>
                    <strong>CH₃COOH + NaOH → CH₃COONa + H₂O</strong><br />
                    Weak Acid-Strong Base Titration. Note the buffer region where pH changes slowly.
                </p>
            </div>
        </div>
    );
};

// Reaction: Ammonia + HCl Gas
const AmmoniaHClGas = () => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '50px' }}>
                <div style={{ position: 'relative', width: '30px', height: '150px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '15px' }}>
                    <div style={{ position: 'absolute', top: '-10px', left: '5px', width: '20px', height: '10px', background: '#555', borderRadius: '50%' }} />
                    <div style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center', fontSize: '0.7rem' }}>NH₃</div>
                    {open && (
                        <motion.div animate={{ x: [0, 50], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 } as any} style={{ position: 'absolute', top: '20%', right: '-20px', color: 'white', fontSize: '1.2rem' }}>💨</motion.div>
                    )}
                </div>
                <div style={{ height: '100px', display: 'flex', alignItems: 'center' }}>
                    {open && (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1.5 }} style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', filter: 'blur(10px)' }} />
                    )}
                </div>
                <div style={{ position: 'relative', width: '30px', height: '150px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '15px' }}>
                    <div style={{ position: 'absolute', top: '-10px', left: '5px', width: '20px', height: '10px', background: '#555', borderRadius: '50%' }} />
                    <div style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center', fontSize: '0.7rem' }}>HCl</div>
                    {open && (
                        <motion.div animate={{ x: [0, -50], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 } as any} style={{ position: 'absolute', top: '20%', left: '-20px', color: 'white', fontSize: '1.2rem' }}>💨</motion.div>
                    )}
                </div>
            </div>
            <button onClick={() => setOpen(!open)} style={{ marginTop: '20px', padding: '12px 24px', borderRadius: '10px', border: 'none', background: 'var(--accent-cyan)', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>
                {open ? 'Stop Reaction' : 'Open Gas Jars'}
            </button>
            <p style={{ marginTop: '20px', fontSize: '0.85rem' }}>
                <strong>NH₃(g) + HCl(g) → NH₄Cl(s)</strong><br />
                Two colorless gases react to form dense white fumes of solid Ammonium Chloride.
            </p>
        </div>
    );
};

// Reaction: Methane Combustion
const MethaneCombustion = () => {
    const [gas, setGas] = useState(0);
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ height: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                <div style={{ width: '40px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    {gas > 0 && (
                        <motion.div
                            animate={{ height: `${gas * 1.5}px`, opacity: gas / 100 }}
                            style={{ width: '30px', background: 'linear-gradient(to top, rgba(0,100,255,0.8), rgba(100,200,255,0.4), transparent)', borderRadius: '50% 50% 10% 10%', filter: 'blur(1px)' }}
                        />
                    )}
                </div>
                <div style={{ width: '20px', height: '60px', background: '#888', borderRadius: '2px' }} />
                <div style={{ width: '50px', height: '10px', background: '#444', borderRadius: '5px' }} />
            </div>
            <div style={{ marginTop: '30px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <input type="range" min="0" max="100" value={gas} onChange={(e) => setGas(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-cyan)' }} />
                <p style={{ marginTop: '10px', fontSize: '0.85rem' }}>
                    <strong>CH₄ + 2O₂ → CO₂ + 2H₂O</strong><br />
                    Methane burns with a blue flame. Adjust the gas flow to see the flame size change.
                </p>
            </div>
        </div>
    );
};

// Reaction: Ethanol Burning
const EthanolBurning = () => {
    const [ignited, setIgnited] = useState(false);
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100px', height: '20px', background: 'rgba(255,255,255,0.2)', borderRadius: '0 0 50px 50px', border: '2px solid rgba(255,255,255,0.3)' }}>
                    {ignited && (
                        <motion.div
                            animate={{ y: [-10, -15, -10], opacity: [0.7, 0.9, 0.7] }}
                            transition={{ repeat: Infinity, duration: 0.6 } as any}
                            style={{ position: 'absolute', bottom: '10px', left: '10%', right: '10%', height: '80px', background: 'linear-gradient(to top, rgba(255,100,0,0.6), rgba(255,200,0,0.2), transparent)', borderRadius: '50% 50% 0 0', filter: 'blur(4px)' }}
                        />
                    )}
                </div>
            </div>
            <button onClick={() => setIgnited(!ignited)} style={{ marginTop: '20px', padding: '12px 24px', borderRadius: '10px', border: 'none', background: ignited ? 'gray' : '#ff4400', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                {ignited ? 'Extinguish' : 'Ignite Ethanol'}
            </button>
            <p style={{ marginTop: '20px', fontSize: '0.85rem' }}>
                <strong>C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O</strong><br />
                Ethanol burns with a slightly luminous flame compared to methane.
            </p>
        </div>
    );
};

// Reaction: Thermite Reaction
const ThermiteReaction = () => {
    const [ignited, setIgnited] = useState(false);
    const [complete, setComplete] = useState(false);

    const handleIgnite = () => {
        setIgnited(true);
        setTimeout(() => {
            setIgnited(false);
            setComplete(true);
        }, 2000);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'relative', width: '80px', height: '100px', border: '4px solid #555', borderTop: 'none', borderRadius: '0 0 10px 10px', background: complete ? 'rgba(255,100,0,0.2)' : 'rgba(255,255,255,0.05)' }}>
                    {ignited && (
                        <div style={{ position: 'absolute', top: '-50px', left: '-10px', width: '100px', height: '100px' }}>
                            {Array.from({ length: 20 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ x: [0, Math.random() * 200 - 100], y: [0, Math.random() * 200 - 100], opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.5 } as any}
                                    style={{ position: 'absolute', left: '50%', top: '50%', width: '4px', height: '4px', background: '#fff', borderRadius: '50%', boxShadow: '0 0 10px #ffaa00' }}
                                />
                            ))}
                        </div>
                    )}
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', height: '30px', background: complete ? '#555' : '#8b4513', borderRadius: '4px' }}>
                        {complete && <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 } as any} style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, #ff4400, transparent)', borderRadius: '4px' }} />}
                    </div>
                </div>
            </div>
            <button onClick={handleIgnite} disabled={ignited || complete} style={{ marginTop: '20px', padding: '12px 24px', borderRadius: '10px', border: 'none', background: ignited || complete ? 'gray' : '#ff4400', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                {complete ? 'Molten Iron Formed' : ignited ? 'REACTION VIGOROUS' : 'Ignite Thermite'}
            </button>
            <p style={{ marginTop: '20px', fontSize: '0.85rem' }}>
                <strong>Fe₂O₃ + 2Al → 2Fe + Al₂O₃ + Heat</strong><br />
                The thermite reaction is highly exothermic and produces molten iron.
            </p>
        </div>
    );
};

// Reaction: Copper Oxide + Hydrogen
const CopperOxideHydrogen = () => {
    const [gas, setGas] = useState(false);
    const [temp, setTemp] = useState(25);
    const progress = (gas && temp > 300) ? 100 : 0;

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '150px', height: '30px', border: '2px solid rgba(255,255,255,0.4)', borderRadius: '15px' }}>
                    <div style={{ position: 'absolute', left: '10px', right: '10px', top: '5px', bottom: '5px', background: progress === 100 ? '#b87333' : '#1a1a1a', borderRadius: '10px', transition: 'background 2s' }} />
                    {gas && (
                        <motion.div animate={{ x: [-20, 170], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 } as any} style={{ position: 'absolute', top: '50%', left: '-10px', color: 'white' }}>💨</motion.div>
                    )}
                </div>
            </div>
            <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <span>Temperature</span>
                    <input type="range" min="25" max="500" value={temp} onChange={(e) => setTemp(parseInt(e.target.value))} style={{ flex: 1, accentColor: temp > 300 ? 'red' : 'cyan' }} />
                    <span style={{ width: '60px' }}>{temp}°C</span>
                </div>
                <button onClick={() => setGas(!gas)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: gas ? 'var(--accent-pink)' : 'var(--accent-cyan)', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>
                    {gas ? 'Stop H₂ Gas' : 'Flow H₂ Gas'}
                </button>
                <p style={{ marginTop: '15px', fontSize: '0.85rem' }}>
                    <strong>CuO(s) + H₂(g) → Cu(s) + H₂O(g)</strong><br />
                    Black Copper(II) oxide is reduced to reddish Copper metal by Hydrogen gas when heated.
                </p>
            </div>
        </div>
    );
};

// Reaction: Ammonium Chloride + NaOH
const AmmoniumChlorideNaOH = () => {
    const [added, setAdded] = useState(false);
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ height: '220px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-40px', width: '100%', textAlign: 'center', fontWeight: 'bold' }}>NaOH (aq)</div>
                    <GlassBeaker color="rgba(255,255,255,0.1)" liquidHeight={50} />
                    {added && (
                        <motion.div animate={{ y: [0, -100], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 } as any} style={{ position: 'absolute', top: '20%', left: '50%', color: 'white', fontSize: '1.2rem' }}>💨</motion.div>
                    )}
                </div>
                {!added && (
                    <motion.div exit={{ y: 150, opacity: 0 }} style={{ marginLeft: '40px', paddingBottom: '50px' }}>
                        <div style={{ marginBottom: '10px', fontSize: '0.8rem' }}>NH₄Cl (s)</div>
                        <button onClick={() => setAdded(true)} style={{ width: '40px', height: '40px', background: 'white', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }} />
                    </motion.div>
                )}
            </div>
            <div style={{ marginTop: '40px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <p style={{ fontSize: '0.85rem' }}>
                    <strong>NH₄Cl + NaOH → NaCl + H₂O + NH₃↑</strong><br />
                    Evolution of Ammonia gas. Pungent smell!
                </p>
            </div>
        </div>
    );
};

// Reaction: Ammonium Nitrate + Water
const AmmoniumNitrateWater = () => {
    const [added, setAdded] = useState(false);
    const [temp, setTemp] = useState(25);

    useEffect(() => {
        if (added && temp > 5) {
            const timer = setTimeout(() => setTemp(temp - 1), 100);
            return () => clearTimeout(timer);
        }
    }, [added, temp]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '220px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: '20px', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Temp</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00ffff' }}>{temp}°C</div>
                </div>
                <GlassBeaker color="rgba(0, 200, 255, 0.1)" liquidHeight={added ? 60 : 50} />
            </div>
            <button onClick={() => setAdded(true)} disabled={added} style={{ marginTop: '30px', padding: '12px 24px', borderRadius: '10px', border: 'none', background: added ? 'gray' : 'var(--accent-cyan)', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>
                {added ? 'Dissolving...' : 'Add NH₄NO₃'}
            </button>
            <p style={{ marginTop: '20px', fontSize: '0.85rem' }}>
                <strong>NH₄NO₃(s) + H₂O(l) → NH₄⁺(aq) + NO₃⁻(aq)</strong><br />
                Endothermic Dissolution. Heat is absorbed from the surroundings.
            </p>
        </div>
    );
};

// Reaction: Calcium Chloride + Water
const CalciumChlorideWater = () => {
    const [added, setAdded] = useState(false);
    const [temp, setTemp] = useState(25);

    useEffect(() => {
        if (added && temp < 85) {
            const timer = setTimeout(() => setTemp(temp + 2), 100);
            return () => clearTimeout(timer);
        }
    }, [added, temp]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '220px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: '20px', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Temp</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ff4400' }}>{temp}°C</div>
                </div>
                <GlassBeaker color="rgba(255, 50, 0, 0.1)" liquidHeight={added ? 60 : 50} />
            </div>
            <button onClick={() => setAdded(true)} disabled={added} style={{ marginTop: '30px', padding: '12px 24px', borderRadius: '10px', border: 'none', background: added ? 'gray' : 'var(--accent-pink)', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                {added ? 'Dissolving...' : 'Add CaCl₂'}
            </button>
            <p style={{ marginTop: '20px', fontSize: '0.85rem' }}>
                <strong>CaCl₂(s) + H₂O(l) → Ca²⁺(aq) + 2Cl⁻(aq)</strong><br />
                Exothermic Dissolution. Heat is released to the surroundings.
            </p>
        </div>
    );
};

// Reaction: SN1 vs SN2 Comparison
const SN1_SN2_Comparison = () => {
    const [mode, setMode] = useState<'SN1' | 'SN2'>('SN1');
    const [playing, setPlaying] = useState(false);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
                <button onClick={() => setMode('SN1')} style={{ padding: '8px 16px', borderRadius: '5px', border: 'none', background: mode === 'SN1' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)', color: mode === 'SN1' ? 'black' : 'white', cursor: 'pointer' }}>SN1</button>
                <button onClick={() => setMode('SN2')} style={{ padding: '8px 16px', borderRadius: '5px', border: 'none', background: mode === 'SN2' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)', color: mode === 'SN2' ? 'black' : 'white', cursor: 'pointer' }}>SN2</button>
            </div>
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                {/* Central Carbon */}
                <div id="carbon" style={{ width: '40px', height: '40px', background: '#444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>C</div>
                
                {/* Nucleophile */}
                <motion.div
                    animate={playing ? (mode === 'SN1' ? { x: [100, 20], opacity: [0, 1] } : { x: [-100, -20], opacity: [0, 1] }) : { x: mode === 'SN1' ? 100 : -100, opacity: 0 }}
                    transition={{ delay: mode === 'SN1' ? 1 : 0, duration: 1 } as any}
                    style={{ position: 'absolute', width: '30px', height: '30px', background: 'var(--accent-cyan)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontSize: '0.7rem' }}>Nu⁻</motion.div>
                
                {/* Leaving Group */}
                <motion.div
                    animate={playing ? (mode === 'SN1' ? { x: [-20, -100], opacity: [1, 0] } : { x: [20, 100], opacity: [1, 0] }) : { x: mode === 'SN1' ? -20 : 20, opacity: 1 }}
                    transition={{ duration: 1 } as any}
                    style={{ position: 'absolute', width: '30px', height: '30px', background: 'var(--accent-pink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem' }}>L</motion.div>
            </div>
            <button onClick={() => { setPlaying(false); setTimeout(() => setPlaying(true), 100); }} style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'white', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>Play Animation</button>
            <p style={{ marginTop: '20px', fontSize: '0.85rem' }}>
                {mode === 'SN1' ? 'SN1: Two-step mechanism. Leaving group leaves first to form a carbocation.' : 'SN2: One-step mechanism. Backside attack occurs simultaneously with leaving group departure.'}
            </p>
        </div>
    );
};

// Reaction: Le Chatelier's Principle
const LeChatelierEquilibrium = () => {
    const [temp, setTemp] = useState(25);
    // 2NO2 (Brown) <=> N2O4 (Colorless) + Heat
    // High temp favors reverse (more NO2 - Brown)
    // Low temp favors forward (more N2O4 - Colorless)
    const opacity = (temp - 0) / 100; // 0 to 1

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ height: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '60px', height: '180px', border: '2px solid rgba(255,255,255,0.4)', borderRadius: '30px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: `rgba(139, 69, 19, ${opacity})`, transition: 'background 0.5s' }} />
                </div>
            </div>
            <div style={{ marginTop: '30px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                    <span>Temp</span>
                    <input type="range" min="0" max="100" value={temp} onChange={(e) => setTemp(parseInt(e.target.value))} style={{ flex: 1, accentColor: temp > 50 ? 'orange' : 'blue' }} />
                    <span style={{ width: '40px' }}>{temp}°C</span>
                </div>
                <p style={{ fontSize: '0.85rem' }}>
                    <strong>2NO₂(g) ⇌ N₂O₄(g) + Heat</strong><br />
                    Cooling shifts equilibrium to the right (colorless). Heating shifts it left (brown).
                </p>
            </div>
        </div>
    );
};

// Reaction: Electrochemical Cell
const ElectrochemicalCell = () => {
    const [connected, setConnected] = useState(false);
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '40px', position: 'relative' }}>
                {/* Voltmeter */}
                <div style={{ position: 'absolute', top: 0, background: '#222', border: '2px solid #555', padding: '5px 15px', borderRadius: '5px' }}>
                    <div style={{ fontSize: '0.6rem' }}>Voltmeter</div>
                    <div style={{ color: connected ? '#00ff00' : '#444', fontWeight: 'bold' }}>{connected ? '1.10 V' : '0.00 V'}</div>
                </div>

                {/* Left Beaker (Zn) */}
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-40px', left: '0', width: '20px', height: '100px', background: '#aaa', border: '1px solid #777' }} />
                    <GlassBeaker color="rgba(200,200,255,0.1)" liquidHeight={60} />
                    <div style={{ fontSize: '0.7rem', marginTop: '5px' }}>Zn Electrode</div>
                </div>

                {/* Salt Bridge */}
                <div style={{ position: 'absolute', bottom: '60px', width: '120px', height: '15px', border: '2px solid rgba(255,255,255,0.3)', borderTop: 'none', borderRadius: '0 0 10px 10px' }} />

                {/* Right Beaker (Cu) */}
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-40px', left: '0', width: '20px', height: '100px', background: '#b87333', border: '1px solid #8b4513' }} />
                    <GlassBeaker color="rgba(0,100,255,0.2)" liquidHeight={60} />
                    <div style={{ fontSize: '0.7rem', marginTop: '5px' }}>Cu Electrode</div>
                </div>

                {/* Wire */}
                {connected && (
                    <svg style={{ position: 'absolute', top: '-20px', width: '180px', height: '50px' }}>
                        <motion.path
                            d="M 40,30 L 90,0 L 140,30"
                            fill="none"
                            stroke="yellow"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                        />
                        <motion.circle r="3" fill="yellow" animate={{ offsetDistance: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 1.5 } as any} style={{ offsetPath: "path('M 40,30 L 90,0 L 140,30')" }} />
                    </svg>
                )}
            </div>
            <button onClick={() => setConnected(!connected)} style={{ marginTop: '30px', padding: '12px 24px', borderRadius: '10px', border: 'none', background: connected ? 'gray' : 'var(--accent-cyan)', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>
                {connected ? 'Disconnect' : 'Connect Circuit'}
            </button>
            <p style={{ marginTop: '20px', fontSize: '0.85rem' }}>
                <strong>Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s)</strong><br />
                A Galvanic cell converting chemical energy into electrical energy.
            </p>
        </div>
    );
};

// Reaction: Electrolysis of Water
const ElectrolysisLab = () => {
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
}

// Main Lab Component
export default function ChemicalLab() {
    const [activeTab, setActiveTab] = useState(0);

    const labCategories = [
        {
            title: "Combination Reactions", icon: <Zap size={18} />, reactions: [
                { id: 1, name: "Hydrogen + Oxygen → Water", active: true, comp: <HydrogenOxygenReaction /> },
                { id: 2, name: "Magnesium + Oxygen → MgO", active: true, comp: <MagnesiumCombustion /> },
                { id: 3, name: "Calcium Oxide + Water", active: true, comp: <SlakingOfLime /> }
            ]
        },
        {
            title: "Decomposition Reactions", icon: <BoxSelect size={18} />, reactions: [
                { id: 4, name: "CaCO₃ → CaO + CO₂", active: true, comp: <DecompositionReaction /> },
                { id: 5, name: "Electrolysis of Water", active: true, comp: <ElectrolysisLab /> },
                { id: 6, name: "Hydrogen Peroxide → Water + Oxygen", active: true, comp: <PeroxideDecomposition /> }
            ]
        },
        {
            title: "Single Displacement", icon: <ArrowLeft size={18} />, reactions: [
                { id: 7, name: "Zinc + Copper Sulfate", active: true, comp: <DisplacementReaction /> },
                { id: 8, name: "Iron + Copper Sulfate", active: true, comp: <GenericDropReaction solidName="Fe (Iron)" solidStartColor="#8a8a8a" solidEndColor="#b87333" liquidStartColor="rgba(0, 150, 255, 0.6)" liquidEndColor="rgba(144, 238, 144, 0.4)" liquidStartName="CuSO₄ (aq)" liquidEndName="FeSO₄ (aq)" equation="Fe + CuSO₄ → FeSO₄ + Cu" description="Iron displaces Copper, turning the blue solution green and coating the iron in reddish-brown copper." /> },
                { id: 9, name: "Copper + Silver Nitrate", active: true, comp: <GenericDropReaction solidName="Cu (Copper)" solidStartColor="#b87333" solidEndColor="#e0e0e0" liquidStartColor="rgba(255, 255, 255, 0.1)" liquidEndColor="rgba(0, 150, 255, 0.6)" liquidStartName="AgNO₃ (aq)" liquidEndName="Cu(NO₃)₂ (aq)" equation="Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag" description="Copper displaces Silver. The solution turns blue (Copper Nitrate) and shiny silver crystals form." /> }
            ]
        },
        {
            title: "Double Displacement", icon: <Beaker size={18} />, reactions: [
                { id: 10, name: "Silver Nitrate + NaCl", active: true, comp: <GenericMixReaction liquid1Name="AgNO₃" liquid1Color="rgba(255,255,255,0.1)" liquid2Name="NaCl" liquid2Color="rgba(255,255,255,0.1)" resultName="NaNO₃ (aq) + AgCl (s)" resultColor="rgba(255,255,255,0.2)" hasPpt={true} pptColor="#ffffff" equation="AgNO₃ + NaCl → AgCl↓ + NaNO₃" description="Mixing two clear solutions forms a cloudy white precipitate of solid Silver Chloride." /> },
                { id: 11, name: "Barium Chloride + Na₂SO₄", active: true, comp: <GenericMixReaction liquid1Name="BaCl₂" liquid1Color="rgba(255,255,255,0.1)" liquid2Name="Na₂SO₄" liquid2Color="rgba(255,255,255,0.1)" resultName="NaCl (aq) + BaSO₄ (s)" resultColor="rgba(255,255,255,0.2)" hasPpt={true} pptColor="#e8e8e8" equation="BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl" description="Forms a thick, heavy white precipitate of Barium Sulfate." /> },
                { id: 12, name: "Lead Nitrate + KI", active: true, comp: <GenericMixReaction liquid1Name="Pb(NO₃)₂" liquid1Color="rgba(255,255,255,0.1)" liquid2Name="KI" liquid2Color="rgba(255,255,255,0.1)" resultName="KNO₃ (aq) + PbI₂ (s)" resultColor="rgba(255, 255, 0, 0.3)" hasPpt={true} pptColor="#ffcc00" equation="Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃" description="The famous 'Golden Rain' reaction. Mixing clear liquids instantly creates a bright yellow precipitate of Lead(II) Iodide." /> }
            ]
        },
        {
            title: "Acid–Base Reactions", icon: <FlaskConical size={18} />, reactions: [
                { id: 13, name: "HCl + NaOH (Neutralization)", active: true, comp: <TitrationLab /> },
                { id: 14, name: "Acetic Acid + NaOH", active: true, comp: <AceticAcidNaOH /> },
                { id: 15, name: "Ammonia + HCl Gas", active: true, comp: <AmmoniaHClGas /> }
            ]
        },
        {
            title: "Combustion Reactions", icon: <Zap size={18} />, reactions: [
                { id: 16, name: "Methane Combustion", active: true, comp: <MethaneCombustion /> },
                { id: 17, name: "Ethanol Burning", active: true, comp: <EthanolBurning /> },
                { id: 18, name: "Candle Combustion Zones", active: true, comp: <CandleFlame /> }
            ]
        },
        {
            title: "Redox Reactions", icon: <Activity size={18} />, reactions: [
                { id: 19, name: "Iron Rusting", active: true, comp: <IronRusting /> },
                { id: 20, name: "Thermite Reaction", active: true, comp: <ThermiteReaction /> },
                { id: 21, name: "Copper Oxide + Hydrogen", active: true, comp: <CopperOxideHydrogen /> }
            ]
        },
        {
            title: "Gas Evolution", icon: <Filter size={18} />, reactions: [
                { id: 22, name: "Zinc + HCl → H₂ Gas", active: true, comp: <GenericDropReaction solidName="Zn (Solid)" solidStartColor="#b0c4de" solidEndColor="#b0c4de" liquidStartColor="rgba(255,255,255,0.1)" liquidEndColor="rgba(255,255,255,0.1)" liquidStartName="HCl (aq)" liquidEndName="ZnCl₂ (aq)" equation="Zn + 2HCl → ZnCl₂ + H₂↑" description="Zinc metal dissolves in hydrochloric acid, producing rapid bubbling from Hydrogen gas!" hasBubbles={true} dissolveSolid={true} reactionSpeed={4} /> },
                { id: 23, name: "Marble + HCl → CO₂", active: true, comp: <GenericDropReaction solidName="Marble (CaCO₃)" solidStartColor="#e0e0e0" solidEndColor="#e0e0e0" liquidStartColor="rgba(255,255,255,0.1)" liquidEndColor="rgba(255,255,255,0.1)" liquidStartName="HCl (aq)" liquidEndName="CaCl₂ (aq)" equation="CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑" description="Marble chips react with hydrochloric acid to produce Calcium Chloride and Carbon Dioxide gas bubbles." hasBubbles={true} dissolveSolid={true} reactionSpeed={3} /> },
                { id: 24, name: "Ammonium Chloride + NaOH", active: true, comp: <AmmoniumChlorideNaOH /> }
            ]
        },
        {
            title: "Endo/Exothermic", icon: <Thermometer size={18} />, reactions: [
                { id: 25, name: "Ammonium Nitrate + Water", active: true, comp: <AmmoniumNitrateWater /> },
                { id: 26, name: "Calcium Chloride + Water", active: true, comp: <CalciumChlorideWater /> }
            ]
        },
        {
            title: "Advanced Concepts", icon: <BoxSelect size={18} />, reactions: [
                { id: 27, name: "SN1 vs SN2 Reaction", active: true, comp: <SN1_SN2_Comparison /> },
                { id: 28, name: "Esterification", active: true, comp: <Esterification /> },
                { id: 29, name: "Le Chatelier's Principle", active: true, comp: <LeChatelierEquilibrium /> },
                { id: 30, name: "Electrochemical Cell", active: true, comp: <ElectrochemicalCell /> }
            ]
        }
    ];

    // Flatten active reactions to find the currently selected one
    const allReactions = labCategories.flatMap(cat => cat.reactions);
    const activeReactionData = allReactions[activeTab] || allReactions[0];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)', color: 'white' }}>

            {/* Header */}
            <header style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', background: 'rgba(5, 5, 5, 0.8)' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', textDecoration: 'none', fontWeight: 600 }}>
                    <ArrowLeft size={20} /> Home
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 700 }}>
                    <FlaskConical color="var(--accent-pink)" /> Virtual <span className="text-gradient">Chemical Lab</span>
                </div>
                <div style={{ width: '100px' }}></div>
            </header>

            {/* Main Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', flex: 1, overflow: 'hidden' }}>

                {/* Sidebar: List of 30 Reactions */}
                <div style={{ borderRight: '1px solid var(--border-color)', background: 'rgba(20,20,25,0.4)', padding: '20px', overflowY: 'auto' }}>
                    <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
                        <Filter size={16} /> Select Experiment
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {labCategories.map((cat, catIdx) => (
                            <div key={catIdx}>
                                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-cyan)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {cat.icon} {cat.title}
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {cat.reactions.map((rxn) => {
                                        const globalIdx = allReactions.findIndex(r => r.id === rxn.id);
                                        return (
                                            <button
                                                key={rxn.id}
                                                onClick={() => rxn.active && setActiveTab(globalIdx)}
                                                disabled={!rxn.active}
                                                style={{
                                                    textAlign: 'left',
                                                    padding: '12px',
                                                    borderRadius: '8px',
                                                    border: `1px solid ${activeTab === globalIdx ? 'var(--accent-pink)' : 'transparent'}`,
                                                    background: activeTab === globalIdx ? 'rgba(255, 0, 127, 0.1)' : (rxn.active ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.01)'),
                                                    color: rxn.active ? 'white' : 'var(--text-secondary)',
                                                    cursor: rxn.active ? 'pointer' : 'not-allowed',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <span style={{ fontSize: '0.9rem' }}>{rxn.name}</span>
                                                {!rxn.active && <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>Soon</span>}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experiment Area */}
                <div style={{ padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ width: '100%', maxWidth: '800px' }}>
                        <div style={{ marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>{activeReactionData.name}</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>Welcome to the interactive sandbox. Use the controls below to parameterize the environment and observe the chemical reaction in real-time.</p>
                        </div>

                        <div className="glass-panel" style={{ padding: '40px', minHeight: '500px' }}>
                            {activeReactionData.comp}
                        </div>

                        <div style={{ marginTop: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            {/* Digital Lab Tools Tags */}
                            <span style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent-cyan)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', border: '1px solid var(--accent-cyan)' }}>Simulated Environment</span>
                            <span style={{ background: 'rgba(255, 0, 127, 0.1)', color: 'var(--accent-pink)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', border: '1px solid var(--accent-pink)' }}>Interactive Controls</span>
                            <span style={{ background: 'rgba(138, 43, 226, 0.1)', color: 'var(--accent-purple)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', border: '1px solid var(--accent-purple)' }}>Real-time Visualization</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
