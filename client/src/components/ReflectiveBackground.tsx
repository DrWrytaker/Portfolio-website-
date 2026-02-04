import React from 'react';
import { motion } from 'framer-motion';

const ReflectiveBackground: React.FC = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'var(--bg-color)',
            zIndex: -1,
            overflow: 'hidden',
            transition: 'background-color 0.4s ease'
        }}>
            {/* Very Dark Blue Orb - Extremely Slow & Subtle */}
            <motion.div
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, -50, 30, 0],
                    opacity: [0.1, 0.25, 0.1],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 60, // 1 minute per cycle
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    top: '5%',
                    left: '10%',
                    width: '800px',
                    height: '800px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--orb-color-1, rgba(10, 25, 47, 0.4)) 0%, transparent 75%)',
                    filter: 'blur(120px)',
                    pointerEvents: 'none'
                }}
            />

            {/* Subdued Muted Purple Orb */}
            <motion.div
                animate={{
                    x: [0, -40, 60, 0],
                    y: [0, 80, -50, 0],
                    opacity: [0.05, 0.15, 0.05],
                    scale: [1, 1.15, 1]
                }}
                transition={{
                    duration: 85, // Even slower
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    bottom: '5%',
                    right: '5%',
                    width: '900px',
                    height: '900px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--orb-color-2, rgba(26, 16, 51, 0.3)) 0%, transparent 75%)',
                    filter: 'blur(150px)',
                    pointerEvents: 'none'
                }}
            />

            {/* Faint Charcoal Breathing Layer */}
            <motion.div
                animate={{
                    opacity: [0.05, 0.12, 0.05],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120vw',
                    height: '120vh',
                    background: 'radial-gradient(circle, var(--orb-color-3, rgba(40, 40, 40, 0.2)) 0%, transparent 80%)',
                    filter: 'blur(180px)',
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};

export default ReflectiveBackground;
