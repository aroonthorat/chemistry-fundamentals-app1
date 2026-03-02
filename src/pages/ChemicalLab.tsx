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


// Main Lab Component
export default function ChemicalLab() {
    const [activeTab, setActiveTab] = useState(0);

    const labCategories = [
        {
            title: "Combination Reactions", icon: <Zap size={18} />, reactions: [
                { id: 1, name: "Hydrogen + Oxygen → Water", active: true, comp: <HydrogenOxygenReaction /> },
                { id: 2, name: "Magnesium + Oxygen → MgO", active: false },
                { id: 3, name: "Calcium Oxide + Water", active: false }
            ]
        },
        {
            title: "Decomposition Reactions", icon: <BoxSelect size={18} />, reactions: [
                { id: 4, name: "CaCO₃ → CaO + CO₂", active: false },
                { id: 5, name: "Electrolysis of Water", active: false },
                { id: 6, name: "Hydrogen Peroxide → Water + Oxygen", active: false }
            ]
        },
        {
            title: "Single Displacement", icon: <ArrowLeft size={18} />, reactions: [
                { id: 7, name: "Zinc + Copper Sulfate", active: true, comp: <DisplacementReaction /> },
                { id: 8, name: "Iron + Copper Sulfate", active: false },
                { id: 9, name: "Copper + Silver Nitrate", active: false }
            ]
        },
        {
            title: "Double Displacement", icon: <Beaker size={18} />, reactions: [
                { id: 10, name: "Silver Nitrate + NaCl", active: false },
                { id: 11, name: "Barium Chloride + Na₂SO₄", active: false },
                { id: 12, name: "Lead Nitrate + KI", active: false }
            ]
        },
        {
            title: "Acid–Base Reactions", icon: <FlaskConical size={18} />, reactions: [
                { id: 13, name: "HCl + NaOH (Neutralization)", active: true, comp: <TitrationLab /> },
                { id: 14, name: "Acetic Acid + NaOH", active: false },
                { id: 15, name: "Ammonia + HCl Gas", active: false }
            ]
        },
        {
            title: "Combustion Reactions", icon: <Zap size={18} />, reactions: [
                { id: 16, name: "Methane Combustion", active: false },
                { id: 17, name: "Ethanol Burning", active: false },
                { id: 18, name: "Candle Combustion Zones", active: false }
            ]
        },
        {
            title: "Redox Reactions", icon: <Activity size={18} />, reactions: [
                { id: 19, name: "Iron Rusting", active: false },
                { id: 20, name: "Thermite Reaction", active: false },
                { id: 21, name: "Copper Oxide + Hydrogen", active: false }
            ]
        },
        {
            title: "Gas Evolution", icon: <Filter size={18} />, reactions: [
                { id: 22, name: "Zinc + HCl → H₂ Gas", active: false },
                { id: 23, name: "Marble + HCl → CO₂", active: false },
                { id: 24, name: "Ammonium Chloride + NaOH", active: false }
            ]
        },
        {
            title: "Endo/Exothermic", icon: <Thermometer size={18} />, reactions: [
                { id: 25, name: "Ammonium Nitrate + Water", active: false },
                { id: 26, name: "Calcium Chloride + Water", active: false }
            ]
        },
        {
            title: "Advanced Concepts", icon: <BoxSelect size={18} />, reactions: [
                { id: 27, name: "SN1 vs SN2 Reaction", active: false },
                { id: 28, name: "Esterification", active: false },
                { id: 29, name: "Le Chatelier's Principle", active: false },
                { id: 30, name: "Electrochemical Cell", active: false }
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
