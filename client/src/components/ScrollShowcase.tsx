import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollShowcase: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <section ref={targetRef} style={{ height: '300vh', position: 'relative' }}>
            <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <motion.h2
                    style={{ fontSize: '3rem', marginBottom: '2rem', color: 'var(--accent-color)', zIndex: 10 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    Visual Journey
                </motion.h2>

                <motion.div style={{ opacity, scale, y, width: '80%', maxWidth: '800px', height: '500px', background: 'var(--card-bg)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', position: 'relative' }}>
                    {/* Note to user: Place images here. For now, using a placeholder gradient */}
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, var(--accent-color), var(--highlight-color))', borderRadius: '20px', opacity: 0.5, position: 'absolute' }}></div>
                    <p style={{ zIndex: 1, fontSize: '1.5rem', fontWeight: 'bold' }}>Scroll to Animate</p>
                </motion.div>

                <p style={{ marginTop: '20px', color: 'var(--secondary-text)' }}>
                    (Replace this placeholder with your photo gallery)
                </p>
            </div>
        </section>
    );
};

export default ScrollShowcase;
