import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    link?: string;
    github?: string;
    image?: string;
}

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/api/projects/${id}`) // Ensure backend has this endpoint!
            .then(res => {
                if (!res.ok) throw new Error('Project not found');
                return res.json();
            })
            .then(data => {
                setProject(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading project details...</div>;
    if (!project) return <div style={{ padding: '100px', textAlign: 'center' }}>Project not found. <br /><Link to="/">Return Home</Link></div>;

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 20px', minHeight: '100vh' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px', color: 'var(--accent-color)' }}>
                <ArrowLeft size={20} /> Back to Journey
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: 'var(--text-color)' }}>{project.title}</h1>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
                    {project.techStack?.map((tech) => (
                        <span key={tech} style={{
                            background: 'var(--card-bg)',
                            color: 'var(--highlight-color)',
                            padding: '5px 15px',
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                            border: '1px solid var(--accent-color)'
                        }}>
                            {tech}
                        </span>
                    ))}
                </div>

                {project.image && (
                    <div style={{ marginBottom: '40px', borderRadius: '10px', overflow: 'hidden' }}>
                        <img src={project.image} alt={project.title} style={{ width: '100%', height: 'auto' }} />
                    </div>
                )}

                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '30px', borderRadius: '10px', marginBottom: '40px' }}>
                    <h3 style={{ marginBottom: '15px', color: 'var(--accent-color)' }}>About the Project</h3>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                        {project.description}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', border: '1px solid var(--text-color)', borderRadius: '5px' }}>
                            <Github /> View Source
                        </a>
                    )}
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', background: 'var(--accent-color)', color: 'var(--bg-color)', borderRadius: '5px', fontWeight: 'bold' }}>
                            <ExternalLink /> Live Demo
                        </a>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectDetails;
