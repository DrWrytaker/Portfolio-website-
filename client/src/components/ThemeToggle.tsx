import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
    const [isLight, setIsLight] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }, [isLight]);

    return (
        <div
            style={{
                position: 'fixed',
                top: '20px',
                right: '12%', /* Matches 12% padding of other elements */
                zIndex: 2000,
                pointerEvents: 'auto'
            }}
        >
            <div
                onClick={() => setIsLight(!isLight)}
                style={{
                    width: '60px',
                    height: '32px',
                    backgroundColor: '#1a1a1a', // Dark pill background
                    borderRadius: '50px',
                    cursor: 'pointer',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: isLight ? '#34C759' : '#FF3B30', // Green in Light, Red in Dark
                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                    }}
                    animate={{
                        x: isLight ? 28 : 0 // Slide effect
                    }}
                />
            </div>
        </div>
    );
};

export default ThemeToggle;
