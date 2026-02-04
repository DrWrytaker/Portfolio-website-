import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProjectDetails from './components/ProjectDetails';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="progress-bar"
      style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '5px', background: 'var(--accent-color)', transformOrigin: '0%', zIndex: 1000 }}
    />
  );
};

import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import CursorParticles from './components/CursorParticles';
import SmartSearch from './components/SmartSearch';

import AchievementsPage from './components/AchievementsPage';
import ReflectiveBackground from './components/ReflectiveBackground';
import CinematicTexture from './components/CinematicTexture';

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <ReflectiveBackground />
        <CinematicTexture />
        <ScrollToTop />
        <CursorParticles />
        <SmartSearch />
        <Header />
        <ScrollProgress />
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/achievements" element={<AchievementsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
