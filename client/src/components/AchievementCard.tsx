import React from 'react';
import { motion } from 'framer-motion';

interface AchievementCardProps {
    title: string;
    category: string;
    synopsis?: string;
    meta?: string;
    onClick: () => void;
    index: number; // For staggered animation
    id: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ title, category, synopsis, meta, onClick, index, id }) => {
    return (
        <motion.div
            layoutId={id}
            onClick={onClick}
            // Netflix-style entry animation
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
                duration: 0.6,
                delay: index * 0.1, // Staggered timing
                ease: [0.43, 0.13, 0.23, 0.96] // Netflix easing
            }}
            whileHover={{
                scale: 1.05,
                zIndex: 10,
                transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            style={{
                minWidth: '310px',
                height: '180px',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '12px',
                marginRight: '20px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
                border: '1px solid rgba(128, 128, 128, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'background-color 0.4s ease, border-color 0.4s ease'
            }}
        >
            {/* Background Gradient - Subtler for light mode */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to top, var(--card-bg) 0%, transparent 100%)',
                zIndex: 1,
                opacity: 0.8
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{
                    fontSize: '0.75rem',
                    color: '#e50914',
                    textTransform: 'uppercase',
                    fontWeight: 800,
                    marginBottom: '8px',
                    display: 'block',
                    letterSpacing: '1px'
                }}>
                    {category}
                </span>
                <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--text-color)',
                    marginBottom: '6px',
                    lineHeight: '1.3'
                }}>
                    {title}
                </h3>

                {meta && (
                    <p style={{
                        fontSize: '0.85rem',
                        color: 'var(--secondary-text)',
                        marginBottom: '4px',
                        fontWeight: 500
                    }}>
                        {meta}
                    </p>
                )}

                {synopsis && (
                    <p style={{
                        fontSize: '0.85rem',
                        color: 'var(--secondary-text)',
                        marginTop: '10px',
                        lineHeight: '1.4',
                        opacity: 0.9
                    }}>
                        {synopsis}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default AchievementCard;
