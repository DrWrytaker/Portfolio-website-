import React from 'react';
import { motion } from 'framer-motion';

const CinematicTexture: React.FC = () => {
    // Generate 40 subtle dust particles
    const particles = Array.from({ length: 40 });

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1400, // Above background, below interactive elements (search is 1500-2000)
            pointerEvents: 'none',
            overflow: 'hidden',
            opacity: 0.6
        }}>
            {/* Layer 1: Film Grain Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
                opacity: 0.04, // Extremely subtle grain
                mixBlendMode: 'overlay',
                pointerEvents: 'none',
            }} />

            {/* Layer 2: Moving Dust Particles */}
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + 'vw',
                        y: Math.random() * 100 + 'vh',
                        opacity: 0,
                        scale: Math.random() * 0.5 + 0.5
                    }}
                    animate={{
                        x: [
                            `${Math.random() * 100}vw`,
                            `${Math.random() * 100}vw`,
                            `${Math.random() * 100}vw`
                        ],
                        y: [
                            `${Math.random() * 100}vh`,
                            `${Math.random() * 100}vh`,
                            `${Math.random() * 100}vh`
                        ],
                        opacity: [0, 0.03, 0.08, 0.03, 0], // Gentle breathing/fade
                    }}
                    transition={{
                        duration: 30 + Math.random() * 40, // 30-70s duration
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10
                    }}
                    style={{
                        position: 'absolute',
                        width: '2px',
                        height: '2px',
                        background: 'var(--text-color)',
                        borderRadius: '50%',
                        filter: 'blur(1px)',
                    }}
                />
            ))}

            {/* Subtle Vignette for cinematic framing - Fades slightly in light mode */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle, transparent 60%, rgba(128,128,128,0.1) 100%)',
                pointerEvents: 'none',
                opacity: 0.8
            }} />
        </div>
    );
};

export default CinematicTexture;
