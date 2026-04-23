import { motion } from 'framer-motion';

export const GlassBeaker = ({ color, liquidHeight = 50, hasSolid = false, solidColor = "#9ba1a6", solidOpacity = 1 }: any) => (
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
