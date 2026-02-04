import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
}

const Timeline: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/projects')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error('Failed to fetch projects', err));
    }, []);

    const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            style={{
                cursor: 'pointer',
                height: '100%'
            }}
        >
            <Link to={`/project/${project.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', height: '100%' }}>
                <div style={{
                    background: 'var(--card-bg)',
                    padding: '30px',
                    borderRadius: '20px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(128, 128, 128, 0.15)',
                    minHeight: '280px'
                }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--text-color)' }}>{project.title}</h3>
                        <p style={{ marginBottom: '20px', color: 'var(--secondary-text)', fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>
                    </div>

                    <div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                            {project.techStack?.slice(0, 3).map(tech => (
                                <span key={tech} style={{ background: 'var(--bg-color)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', color: 'var(--highlight-color)', border: '1px solid var(--highlight-color)' }}>{tech}</span>
                            ))}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.9rem' }}>
                            View Details <ArrowRight size={16} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );

    return (
        <section style={{ padding: '80px 0', overflow: 'hidden' }} id="timeline-section">
            <div style={{ padding: '0 10%', margin: '0 0 40px 0', textAlign: 'center' }}>
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-color)' }}
                >
                    02. Milestones & Projects
                </motion.h2>
            </div>

            {/* Horizontal Scrollable Container */}
            <div style={{ position: 'relative' }}>
                {/* Left fade indicator */}
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '10%',
                    background: 'linear-gradient(to right, var(--bg-color), transparent)',
                    pointerEvents: 'none',
                    zIndex: 1
                }} />

                {/* Right fade indicator */}
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '10%',
                    background: 'linear-gradient(to left, var(--bg-color), transparent)',
                    pointerEvents: 'none',
                    zIndex: 1
                }} />

                <div
                    style={{
                        display: 'flex',
                        gap: '30px',
                        overflowX: 'auto',
                        padding: '20px 10%',
                        paddingBottom: '40px',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                    className="projects-scroll"
                >
                    {projects.length === 0 ? (
                        <p style={{ padding: '0 20px' }}>Loading journey milestones...</p>
                    ) : (
                        projects.map((project, index) => (
                            <div key={project.id} style={{ flex: '0 0 380px' }}>
                                <ProjectCard project={project} index={index} />
                            </div>
                        ))
                    )}
                </div>
            </div>

            <style>{`
                .projects-scroll::-webkit-scrollbar {
                    display: none;
                }
                .projects-scroll {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                @media (max-width: 768px) {
                    .projects-scroll > div {
                        flex: 0 0 300px;
                    }
                }
            `}</style>
        </section>
    );
};

export default Timeline;
