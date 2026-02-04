import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
    return (
        <section style={{ minHeight: '80vh', padding: '100px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.8 }}
            >
                <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', color: 'var(--accent-color)' }}>01. The Beginning</h2>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '20px' }}>
                    My journey started with a curiosity for how things work. From tinkering with hardware to writing my first lines of code, I realized that technology is the closest thing we have to magic.
                </p>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                    Today, I specialize in the PERN stack, crafting performant web applications that tell a story. I believe in clean code, intuitive design, and continuous learning.
                </p>
            </motion.div>
        </section>
    );
};

export default AboutSection;
