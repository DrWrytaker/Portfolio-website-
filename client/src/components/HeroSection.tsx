import React from 'react';
import { motion } from 'framer-motion';
import HeroHandwriting from './HeroHandwriting';

const HeroSection: React.FC = () => {

    return (
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 10%' }}>

            <HeroHandwriting />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                style={{
                    fontSize: '1.5rem',
                    color: 'var(--secondary-text)',
                    maxWidth: '600px',
                    marginTop: '20px'
                }}
            >
                Digital Explorer & Engineer
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                style={{ marginTop: '50px', fontSize: '1rem', color: 'var(--accent-color)' }}
            >
                Scroll to begin the journey ↓
            </motion.div>
        </section>
    );
};

export default HeroSection;
