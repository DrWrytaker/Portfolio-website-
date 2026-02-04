import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CursorParticles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const location = useLocation();

    // Only show particles on homepage
    if (location.pathname !== '/') {
        return null;
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let theme = 'dark'; // Default
        let lastMouseMoveTime = Date.now();
        let globalOpacity = 0; // Starts hidden until moved
        let hasScrolledPast = false; // Track if user scrolled past hero

        // Configuration
        const particleCount = 300; // Increased count
        const mouseDistance = 150; // Repulsion radius

        // Colors
        const darkColors = ['#ffffff', '#fef08a', '#e9d5ff', '#bfdbfe']; // Stars/Moons
        // Autumn Leaves Palette: Red, Orange, Amber, Brown, Gold
        const lightColors = ['#DC2626', '#EA580C', '#D97706', '#CA8A04', '#78350F', '#B45309'];

        // Mouse State
        const mouse = {
            x: -1000,
            y: -1000
        };

        // Theme Observer
        const updateTheme = () => {
            // ThemeToggle sets attribute on document.documentElement (<html>), not body
            const currentTheme = document.documentElement.getAttribute('data-theme');
            theme = currentTheme || 'dark';
        };

        // Shapes (Same as before)
        const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
            let rot = Math.PI / 2 * 3;
            let x = cx;
            let y = cy;
            let step = Math.PI / spikes;

            ctx.beginPath();
            ctx.moveTo(cx, cy - outerRadius);
            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y);
                rot += step;

                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y);
                rot += step;
            }
            ctx.lineTo(cx, cy - outerRadius);
            ctx.closePath();
            ctx.fill();
        };

        const drawMoon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
            ctx.beginPath();
            ctx.arc(x, y, size, 0.5 * Math.PI, 1.5 * Math.PI, true);
            ctx.bezierCurveTo(x + size * 0.5, y - size * 0.5, x + size * 0.5, y + size * 0.5, x, y + size);
            ctx.closePath();
            ctx.fill();
        };

        const drawLeaf = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(-size, 0);
            ctx.quadraticCurveTo(0, -size, size, 0);
            ctx.quadraticCurveTo(0, size, -size, 0);
            ctx.fill();
            ctx.restore();
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            type: 'star' | 'moon' | 'leaf';
            color: string;
            angle: number;
            spinSpeed: number;
            waveAngle: number; // For random wave motion

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;

                this.size = Math.random() * 4 + 2;
                this.angle = Math.random() * Math.PI * 2;
                this.spinSpeed = (Math.random() - 0.5) * 0.05;
                this.waveAngle = Math.random() * Math.PI * 2;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;

                // Initialize theme
                this.color = '#ffffff';
                this.type = 'star';
                this.randomizeType();
            }

            randomizeType() {
                if (theme === 'light') {
                    this.type = 'leaf';
                    this.color = lightColors[Math.floor(Math.random() * lightColors.length)];
                } else {
                    this.type = Math.random() > 0.8 ? 'moon' : 'star';
                    this.color = darkColors[Math.floor(Math.random() * darkColors.length)];
                }
            }

            update() {
                // Wave Motion (Random floating)
                this.waveAngle += 0.02;
                // Add sinusoidal wave to position
                this.x += Math.sin(this.waveAngle) * 0.5 + this.vx;
                this.y += Math.cos(this.waveAngle) * 0.5 + this.vy;
                this.angle += this.spinSpeed;

                // Repulsion Logic (Magnet Same Pole -> Repel)
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;

                    // Push away
                    const strength = 8; // Stronger repulsion
                    this.x -= forceDirectionX * force * strength;
                    this.y -= forceDirectionY * force * strength;
                }

                // Wrap around
                if (this.x < 0) this.x = canvas!.width;
                if (this.x > canvas!.width) this.x = 0;
                if (this.y < 0) this.y = canvas!.height;
                if (this.y > canvas!.height) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.save();
                ctx.globalAlpha = globalOpacity; // Fade in/out based on idle
                ctx.fillStyle = this.color;

                // Sync type
                if (theme === 'light' && (this.type === 'star' || this.type === 'moon')) {
                    this.randomizeType();
                } else if (theme !== 'light' && this.type === 'leaf') {
                    this.randomizeType();
                }

                if (this.type === 'star') {
                    drawStar(ctx, this.x, this.y, 5, this.size, this.size / 2);
                } else if (this.type === 'moon') {
                    drawMoon(ctx, this.x, this.y, this.size);
                } else {
                    drawLeaf(ctx, this.x, this.y, this.size, this.angle);
                }
                ctx.restore();
            }
        }

        const initParticles = () => {
            if (!canvas) return;
            particles = [];
            const count = window.innerWidth < 768 ? 50 : particleCount;
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const animate = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            updateTheme();

            // Idle Check
            const timeSinceMove = Date.now() - lastMouseMoveTime;

            // If scrolled past hero, force opacity to 0
            if (hasScrolledPast) {
                globalOpacity = 0;
            } else if (timeSinceMove > 1000) {
                // Fade out
                if (globalOpacity > 0) globalOpacity -= 0.02;
            } else {
                // Fade in
                if (globalOpacity < 1) globalOpacity += 0.05;
            }
            // Clamp
            if (globalOpacity < 0) globalOpacity = 0;
            if (globalOpacity > 1) globalOpacity = 1;

            if (globalOpacity > 0.01) {
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);

        const handleScroll = () => {
            // Hide particles after scrolling past ~100vh (hero + showcase section)
            // Re-enable when scrolling back up
            if (window.scrollY > window.innerHeight * 0.8) {
                hasScrolledPast = true;
            } else {
                hasScrolledPast = false;
            }
        };
        window.addEventListener('scroll', handleScroll);

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            lastMouseMoveTime = Date.now();
        };
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                background: 'transparent'
            }}
        />
    );
};

export default CursorParticles;
