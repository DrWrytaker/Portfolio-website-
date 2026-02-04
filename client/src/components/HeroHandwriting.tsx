import React from 'react';
import { motion } from 'framer-motion';

const HeroHandwriting: React.FC = () => {
    // Animation configuration
    const strokeVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 3, ease: "easeInOut" as const }, // 3s as requested
                opacity: { duration: 0.5 }
            }
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto 20px auto', overflow: 'visible' }}>
            <svg
                viewBox="0 0 600 120"
                style={{ width: '100%', height: 'auto', overflow: 'visible' }}
            >
                {/* 
                    Apple WWDC "Welcome" Style Gradient 
                    Green -> Yellow -> Orange -> Pink
                */}
                <defs>
                    <linearGradient id="appleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4ade80" /> {/* Green */}
                        <stop offset="33%" stopColor="#facc15" /> {/* Yellow */}
                        <stop offset="66%" stopColor="#fb923c" /> {/* Orange */}
                        <stop offset="100%" stopColor="#ec4899" /> {/* Pink */}
                    </linearGradient>
                </defs>

                {/* Text as SVG with Stroke Animation */}
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    stroke="url(#appleGradient)"
                    strokeWidth="3" // Medium consistent thickness
                    fill="transparent"
                    fontSize="70"
                    fontFamily="'Sacramento', cursive"
                    dy=".35em"
                    variants={strokeVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        letterSpacing: '3px',
                        strokeLinecap: 'round', // Rounded ends
                        strokeLinejoin: 'round'
                    }}
                >
                    Ayush Badgujar
                </motion.text>
            </svg>
        </div>
    );
};

export default HeroHandwriting;
