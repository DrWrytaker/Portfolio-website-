import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ScrollShowcase from './ScrollShowcase';
import Timeline from './Timeline';
import TechStack from './TechStack';
import BlogList from './BlogList';
import JourneyAhead from './JourneyAhead';
import ConnectFooter from './ConnectFooter';

const HomePage: React.FC = () => {
    return (
        <>
            <HeroSection />
            <ScrollShowcase />
            <AboutSection />
            <Timeline />
            <TechStack />
            <BlogList />
            <JourneyAhead />

            {/* Achievements CTA */}
            <section style={{ padding: '80px 10%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '20px' }}>
                    Every Milestone Matters
                </h2>
                <div style={{ marginBottom: '40px' }}>
                    <Link
                        to="/achievements"
                        style={{
                            display: 'inline-block',
                            padding: '15px 40px',
                            backgroundColor: '#e50914',
                            color: 'white',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            borderRadius: '4px',
                            transition: 'transform 0.2s',
                            boxShadow: '0 4px 15px rgba(229, 9, 20, 0.4)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Explore Achievements →
                    </Link>
                </div>
            </section>

            <ConnectFooter />
        </>
    );
};

export default HomePage;
