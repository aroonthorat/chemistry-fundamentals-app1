import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassBeaker } from './BaseComponents';

// Generic Drop Reaction (Metal + Solution)
export const GenericDropReaction = ({ solidName, solidStartColor, solidEndColor, liquidStartColor, liquidEndColor, liquidStartName, liquidEndName, equation, description, reactionSpeed = 2, hasBubbles = false, dissolveSolid = false }: any) => {
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
export const GenericMixReaction = ({ liquid1Name, liquid1Color, liquid2Name, liquid2Color, resultName, resultColor, hasPpt, pptColor, equation, description }: any) => {
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
