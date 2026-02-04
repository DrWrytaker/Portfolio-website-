import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const JourneyAhead: React.FC = () => {
    return (
        <section style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', opacity: 0.7 }}>
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                style={{ fontSize: '2.5rem', marginBottom: '50px', color: '#555' }}
            >
                05. Future Paths
            </motion.h2>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ border: '1px dashed #444', padding: '40px', borderRadius: '10px', minWidth: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Lock size={30} style={{ marginBottom: '15px', color: '#555' }} />
                    <h3 style={{ color: '#888' }}>At IITK</h3>
                    <span style={{ fontSize: '0.8rem', color: '#555', marginTop: '10px' }}>LOCKED</span>
                </div>

                <div style={{ border: '1px dashed #444', padding: '40px', borderRadius: '10px', minWidth: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Lock size={30} style={{ marginBottom: '15px', color: '#555' }} />
                    <h3 style={{ color: '#888' }}>Resources</h3>
                    <span style={{ fontSize: '0.8rem', color: '#555', marginTop: '10px' }}>LOCKED</span>
                </div>
            </div>
        </section>
    );
};

export default JourneyAhead;
