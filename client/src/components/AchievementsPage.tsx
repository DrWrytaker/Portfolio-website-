import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AchievementCard from './AchievementCard';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';

// Data Structure
const achievementsData = {
    "Academic & Competitive Highlights": [
        { id: 'jee-adv', title: 'JEE Advanced – AIR 2864', category: 'Exam', synopsis: 'Among 150,000+ candidates', meta: '2022', details: 'Secured All India Rank 2864 in one of India\'s most competitive entrance examinations. Demonstrated exceptional problem-solving skills across Physics, Chemistry, and Mathematics under high-pressure conditions.' },
        { id: 'jee-mains', title: 'JEE Mains – AIR 11403', category: 'Exam', synopsis: 'Among 1M+ aspirants', meta: '2022', details: 'Qualified among over 1 million+ aspirants with a strong percentile, showcasing consistent academic performance and dedication.' },
        { id: 'kvpy', title: 'KVPY-SA – AIR 1688', category: 'Exam', synopsis: 'National Fellowship Award', meta: '2021', details: 'Awarded the prestigious KVPY fellowship by the Department of Science & Technology, Government of India, for excellence in basic sciences.' },
        { id: 'ioqm', title: 'IOQM-A Certificate of Merit', category: 'Olympiad', synopsis: 'Mathematics Olympiad Qualifier', meta: '2021', details: 'Qualified and awarded Certificate of Merit in the Indian Olympiad Qualifier in Mathematics (IOQM), demonstrating advanced mathematical abilities.' },
    ],
    "Leadership & Responsibility": [
        { id: 'ics', title: 'Core Team Member — ICS', category: 'Leadership', synopsis: 'Led operations for 10,000+ students', meta: 'IIT Kanpur', details: 'Part of the core team at Institute Counseling Service (ICS), IIT Kanpur, leading peer counseling initiatives and mental health awareness programs for the entire student body.' },
        { id: 'orientation', title: 'Orientation\'25 Operations Lead', category: 'Leadership', synopsis: 'Managed 400+ volunteers, ₹35L budget', meta: '2025', details: 'Led operations for IIT Kanpur\'s Orientation 2025, coordinating 400+ volunteers and managing a budget of ₹35 Lakhs to ensure seamless execution of campus-wide events.' },
        { id: 'udghosh', title: 'Udghosh IITK — Senior Executive', category: 'Events', synopsis: 'National-level event coordination', meta: 'Sports Fest', details: 'Senior Executive at Udghosh, IIT Kanpur\'s annual sports festival, managing logistics, sponsorships, and coordination for national-level sporting events.' },
        { id: 'music', title: 'Secretary — Music Club', category: 'Club', synopsis: 'IIT Kanpur', meta: '2023-24', details: 'Served as Secretary of the Music Club at IIT Kanpur, organizing concerts, workshops, and fostering a vibrant musical culture on campus.' },
        { id: 'finearts', title: 'Secretary — Fine Arts', category: 'Club', synopsis: 'IIT Kanpur', meta: '2023-24', details: 'Led the Fine Arts Society, curating exhibitions, conducting art workshops, and promoting creative expression among students.' },
    ],
    "Certifications & Skill Milestones": [
        { id: 'solar', title: 'Solar Rooftop Installation', category: 'Certification', synopsis: 'IDEMI Certified', meta: 'Technical', details: 'Completed professional certification in Solar Rooftop Installation from IDEMI, gaining hands-on expertise in renewable energy systems and sustainable technology.' },
        { id: 'keyboard', title: 'Trinity College London', category: 'Music', synopsis: 'Keyboard Grade 4', meta: 'Creative', details: 'Achieved Grade 4 certification in Keyboard from Trinity College London, demonstrating proficiency in music theory and performance.' },
    ],
    "Creative & Extra-Curricular": [
        { id: 'interiit', title: 'Inter IIT Cultural Meet', category: 'Competition', synopsis: 'Fine Arts Representation', meta: 'National', details: 'Represented IIT Kanpur at the Inter IIT Cultural Meet in the Fine Arts category, competing at a national level against India\'s premier technical institutes.' },
        { id: 'trendwall', title: 'Trendwall (Co-founder)', category: 'Startup', synopsis: 'Creative startup & marketing', meta: 'Entrepreneurship', details: 'Co-founded Trendwall, a creative marketing startup focused on social media branding and digital content creation.' },
        { id: 'video', title: 'Video Editing & Content', category: 'Creative', synopsis: 'Performance Content Creation', meta: 'Digital Art', details: 'Produced and edited performance content, music videos, and creative visual media, blending technical skill with artistic vision.' },
        { id: 'volunteering', title: 'Event Volunteering', category: 'Service', synopsis: 'Techkriti, Antaragni', meta: 'Community', details: 'Actively volunteered at Techkriti (Technical Festival) and Antaragni (Cultural Festival) at IIT Kanpur, contributing to event management and student engagement.' },
    ]
};

const AchievementsPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Flatten achievements to get selected item
    const allAchievements = Object.values(achievementsData).flat();
    const selectedItem = allAchievements.find(i => i.id === selectedId);

    // Calculate global index for staggering
    let globalIndex = 0;

    return (
        <div style={{
            backgroundColor: 'var(--bg-color)',
            minHeight: '100vh',
            color: 'var(--text-color)',
            fontFamily: 'var(--font-main)',
            padding: '40px 0 80px 0',
            transition: 'background-color 0.4s ease, color 0.4s ease'
        }}>
            {/* Nav Back - Positioned to align with fixed search/toggle */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '12%',
                    right: '12%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 1500,
                    pointerEvents: 'none'
                }}
            >
                <button
                    onClick={() => navigate('/')}
                    style={{
                        background: 'var(--card-bg)',
                        backdropFilter: 'blur(15px)',
                        padding: '10px 22px',
                        borderRadius: '30px',
                        border: '1px solid rgba(128, 128, 128, 0.2)',
                        color: 'var(--text-color)',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        pointerEvents: 'auto',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}
                >
                    <ArrowLeft size={16} style={{ marginRight: '8px', color: '#e50914' }} />
                    Back
                </button>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '40px',
                    marginRight: '140px' // Increased room for ThemeToggle and search clearance
                }}>
                    <div style={{
                        fontWeight: 900,
                        fontSize: '0.85rem',
                        color: '#e50914',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        opacity: 0.9,
                        pointerEvents: 'auto'
                    }}>
                        ACHIEVEMENTS
                    </div>
                </div>
            </motion.nav>

            {/* Spacer for fixed nav */}
            <div style={{ height: '140px' }} />

            {/* Content Rows */}
            <div style={{ paddingLeft: '12%', paddingRight: '12%' }}>
                {Object.entries(achievementsData).map(([category, items], categoryIndex) => {
                    return (
                        <div key={category} style={{ marginBottom: '60px' }}>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                                style={{
                                    fontSize: '1.4rem',
                                    fontWeight: 700,
                                    marginBottom: '20px',
                                    color: 'var(--text-color)',
                                    opacity: 0.9
                                }}
                            >
                                {category}
                            </motion.h2>

                            {/* Horizontal Scroll Row */}
                            <div style={{
                                display: 'flex',
                                overflowX: 'auto',
                                paddingBottom: '20px',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                gap: '20px'
                            }} className="hide-scrollbar">
                                {items.map((item) => {
                                    const currentIndex = globalIndex++;
                                    return (
                                        <AchievementCard
                                            key={item.id}
                                            {...item}
                                            index={currentIndex}
                                            onClick={() => setSelectedId(item.id)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Liquid Glass Modal Overlay - NO INTRO HERE */}
            <AnimatePresence>
                {selectedId && selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedId(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 2000,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '20px',
                            backdropFilter: 'blur(15px)',
                            WebkitBackdropFilter: 'blur(15px)',
                        }}
                    >
                        {/* Re-overlay for better control without affecting children opacity */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'var(--bg-color)',
                            opacity: 0.8,
                            zIndex: -1
                        }} />

                        <motion.div
                            layoutId={selectedId}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.43, 0.13, 0.23, 0.96]
                            }}
                            style={{
                                width: '90%',
                                maxWidth: '700px',
                                background: 'var(--card-bg)',
                                backdropFilter: 'blur(30px) saturate(150%)',
                                WebkitBackdropFilter: 'blur(30px) saturate(150%)',
                                borderRadius: '30px',
                                padding: '50px',
                                border: '1px solid rgba(128, 128, 128, 0.2)',
                                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.15)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedId(null)}
                                style={{
                                    position: 'absolute',
                                    top: '25px',
                                    right: '25px',
                                    background: 'var(--bg-color)',
                                    border: '1px solid rgba(128, 128, 128, 0.2)',
                                    borderRadius: '50%',
                                    width: '45px',
                                    height: '45px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: 'var(--text-color)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
                                    e.currentTarget.style.backgroundColor = '#e50914';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                                    e.currentTarget.style.backgroundColor = 'var(--bg-color)';
                                    e.currentTarget.style.color = 'var(--text-color)';
                                }}
                            >
                                <X size={22} />
                            </button>

                            {/* Category Tag */}
                            <motion.span
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                style={{
                                    display: 'inline-block',
                                    padding: '8px 20px',
                                    background: 'rgba(229, 9, 20, 0.1)',
                                    border: '1px solid rgba(229, 9, 20, 0.2)',
                                    borderRadius: '30px',
                                    color: '#e50914',
                                    fontSize: '0.8rem',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    marginBottom: '25px',
                                    letterSpacing: '1px'
                                }}
                            >
                                {selectedItem.category}
                            </motion.span>

                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 800,
                                    marginBottom: '15px',
                                    color: 'var(--text-color)',
                                    lineHeight: '1.2',
                                    letterSpacing: '-1px'
                                }}
                            >
                                {selectedItem.title}
                            </motion.h2>

                            {/* Meta */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                style={{
                                    fontSize: '1rem',
                                    color: 'var(--secondary-text)',
                                    marginBottom: '30px',
                                    fontWeight: 500
                                }}
                            >
                                {selectedItem.meta}
                            </motion.p>

                            {/* Divider */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.4 }}
                                style={{
                                    height: '1px',
                                    background: 'rgba(128, 128, 128, 0.15)',
                                    marginBottom: '30px',
                                    transformOrigin: 'left'
                                }}
                            />

                            {/* Details */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                style={{
                                    fontSize: '1.1rem',
                                    color: 'var(--text-color)',
                                    lineHeight: '1.8',
                                    opacity: 0.95,
                                    fontWeight: 400
                                }}
                            >
                                {selectedItem.details || selectedItem.synopsis}
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scrollbar Hide CSS */}
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default AchievementsPage;
