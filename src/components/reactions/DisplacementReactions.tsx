import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassBeaker } from './BaseComponents';

// Reaction 7: Single Displacement (Zn + CuSO4)
export const DisplacementReaction = () => {
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
