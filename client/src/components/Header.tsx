import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
    return (
        <motion.header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                padding: '20px 10%', /* Increased to 10% alignment */
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1000,
                color: 'var(--text-color)', // Explicit color instead of white/difference
                pointerEvents: 'none' // Let clicks pass through to toggle
            }}
        >
            {/* Name Removed as per user request */}
        </motion.header>
    );
};

export default Header;
