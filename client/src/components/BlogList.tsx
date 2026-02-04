import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Blog {
    id: number;
    title: string;
    summary: string;
    date: string;
}

const BlogList: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(err => console.error('Failed to fetch blogs', err));
    }, []);

    const placeholderBlogs: Blog[] = [
        { id: 101, title: 'Blog 1', summary: 'Coming soon. Thoughts on tech and life.', date: new Date().toISOString() },
        { id: 102, title: 'Blog 2', summary: 'Coming soon. Engineering adventures.', date: new Date().toISOString() },
        { id: 103, title: 'Blog 3', summary: 'Coming soon. Future milestones.', date: new Date().toISOString() },
    ];

    const displayBlogs = blogs.length > 0 ? blogs : placeholderBlogs;

    return (
        <section style={{ padding: '80px 0', overflow: 'hidden' }}>
            <div style={{ padding: '0 10%', margin: '0 0 40px 0', textAlign: 'center' }}>
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--highlight-color)' }}
                >
                    04. Written Thoughts
                </motion.h2>
            </div>

            <div
                style={{
                    display: 'flex',
                    gap: '40px',
                    overflowX: 'auto',
                    padding: '20px 10%',
                    scrollSnapType: 'x mandatory',
                    paddingBottom: '60px'
                }}
            >
                {displayBlogs.slice(0, 3).map((blog, index) => (
                    <motion.article
                        key={blog.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        style={{
                            flex: '0 0 350px',
                            scrollSnapAlign: 'start',
                            background: 'var(--card-bg)',
                            padding: '40px',
                            borderRadius: '24px',
                            borderLeft: '6px solid var(--highlight-color)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '15px', color: 'var(--text-color)' }}>{blog.title}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--secondary-text)', marginBottom: '20px' }}>
                            {new Date(blog.date).toLocaleDateString()}
                        </p>
                        <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>{blog.summary}</p>
                    </motion.article>
                ))
                }
            </div>
        </section>
    );
};

export default BlogList;
