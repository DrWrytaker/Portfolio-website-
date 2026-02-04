import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const ConnectFooter: React.FC = () => {
    return (
        <footer style={{ padding: '80px 20px', textAlign: 'center', borderTop: '1px solid #222', marginTop: '50px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>End of the Current Path.</h2>
            <p style={{ marginBottom: '40px', color: 'var(--secondary-text)' }}>
                Ready to start the next chapter? Let's connect.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '50px' }}>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Github /> GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Linkedin /> LinkedIn
                </a>
                <a href="mailto:email@example.com" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail /> Email
                </a>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#555' }}>
                &copy; {new Date().getFullYear()} Your Name. Built with PERN Stack.
            </p>
        </footer>
    );
};

export default ConnectFooter;
