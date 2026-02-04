import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Server, Layout, Terminal, Coffee } from 'lucide-react';

const skills = [
    { name: 'React', icon: <Layout /> },
    { name: 'Node.js', icon: <Server /> },
    { name: 'Express', icon: <Terminal /> }, // Using Terminal as proxy
    { name: 'PostgreSQL', icon: <Database /> },
    { name: 'TypeScript', icon: <Code /> },
    { name: 'Problem Solving', icon: <Coffee /> },
];

const TechStack: React.FC = () => {
    return (
        <section style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                style={{ fontSize: '2.5rem', marginBottom: '50px', color: 'var(--accent-color)' }}
            >
                03. Tools & Technologies
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '30px' }}>
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <div style={{ color: 'var(--accent-color)', marginBottom: '10px' }}>
                            {skill.icon}
                        </div>
                        <span style={{ fontWeight: 500 }}>{skill.name}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TechStack;
