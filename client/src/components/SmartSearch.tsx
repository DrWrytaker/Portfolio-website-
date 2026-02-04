import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { fuzzySearch, searchIndex, type SearchItem } from '../utils/searchIndex';

const SmartSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.trim()) {
            const searchResults = fuzzySearch(query, searchIndex);
            setResults(searchResults);
            setSelectedIndex(0);
        } else {
            setResults([]);
        }
    }, [query]);

    const handleSelect = (item: SearchItem) => {
        // Navigate to path
        navigate(item.path);

        // Scroll to section if specified
        if (item.scrollTo) {
            setTimeout(() => {
                const element = document.getElementById(item.scrollTo!);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }

        // Close search
        setQuery('');
        setIsOpen(false);
        inputRef.current?.blur();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && results[selectedIndex]) {
            e.preventDefault();
            handleSelect(results[selectedIndex]);
        } else if (e.key === 'Escape') {
            setQuery('');
            setIsOpen(false);
            inputRef.current?.blur();
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2500, // Above everything including modals
            width: '85%',
            maxWidth: '500px'
        }}>
            <motion.div
                initial={{ scale: 1 }}
                whileFocus={{ scale: 1.02 }}
                style={{
                    position: 'relative'
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 24px',
                    backgroundColor: 'var(--card-bg)',
                    backdropFilter: 'blur(30px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(150%)',
                    borderRadius: '50px',
                    border: '1px solid rgba(128, 128, 128, 0.2)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'all 0.4s ease'
                }}>
                    <Search size={18} color="var(--text-color)" style={{ opacity: 0.7 }} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                        onKeyDown={handleKeyDown}
                        style={{
                            flex: 1,
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            fontSize: '0.95rem',
                            color: 'var(--text-color)',
                            fontFamily: 'var(--font-main)',
                            fontWeight: 500
                        }}
                    />
                    <style>{`
                        input::placeholder {
                            color: var(--secondary-text);
                            opacity: 0.6;
                        }
                    `}</style>
                </div>

                {/* Results Dropdown */}
                <AnimatePresence>
                    {isOpen && results.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'absolute',
                                top: '70px',
                                left: 0,
                                right: 0,
                                background: 'var(--card-bg)',
                                backdropFilter: 'blur(30px) saturate(150%)',
                                WebkitBackdropFilter: 'blur(30px) saturate(150%)',
                                borderRadius: '20px',
                                border: '1px solid rgba(128, 128, 128, 0.2)',
                                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
                                overflow: 'hidden',
                                maxHeight: '400px',
                                overflowY: 'auto'
                            }}
                        >
                            {results.map((item, index) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleSelect(item)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    style={{
                                        padding: '14px 20px',
                                        cursor: 'pointer',
                                        background: selectedIndex === index ? 'rgba(128, 128, 128, 0.1)' : 'transparent',
                                        borderBottom: index < results.length - 1 ? '1px solid rgba(128, 128, 128, 0.1)' : 'none',
                                        transition: 'background 0.2s ease'
                                    }}
                                >
                                    <div style={{
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        color: 'var(--text-color)',
                                        marginBottom: '4px',
                                        fontFamily: 'var(--font-main)'
                                    }}>
                                        {item.title}
                                    </div>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        color: 'var(--secondary-text)',
                                        fontFamily: 'var(--font-main)'
                                    }}>
                                        {item.category}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default SmartSearch;
