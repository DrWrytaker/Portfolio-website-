// Search Index - All searchable content across the site
export interface SearchItem {
    id: string;
    title: string;
    category: 'Section' | 'Project' | 'Blog' | 'Achievement';
    path: string; // URL path
    scrollTo?: string; // Section ID to scroll to
    keywords?: string[]; // Additional searchable terms
}

export const searchIndex: SearchItem[] = [
    // Main Sections
    { id: 'hero', title: 'Hero', category: 'Section', path: '/', scrollTo: 'hero-section' },
    { id: 'about', title: 'About Me', category: 'Section', path: '/', scrollTo: 'about-section', keywords: ['story', 'background', 'introduction'] },
    { id: 'projects', title: 'Projects', category: 'Section', path: '/', scrollTo: 'timeline-section', keywords: ['work', 'portfolio'] },
    { id: 'techstack', title: 'Tech Stack', category: 'Section', path: '/', scrollTo: 'techstack-section', keywords: ['skills', 'tools', 'technologies'] },
    { id: 'blogs', title: 'Blogs', category: 'Section', path: '/', scrollTo: 'blogs-section', keywords: ['writing', 'articles'] },
    { id: 'achievements', title: 'Achievements', category: 'Section', path: '/achievements', keywords: ['accomplishments', 'awards', 'qualifications'] },
    { id: 'contact', title: 'Connect', category: 'Section', path: '/', scrollTo: 'footer-section', keywords: ['contact', 'email', 'linkedin'] },

    // Projects
    { id: 'project-1', title: 'Market Entry Strategy for EV Charging Startup', category: 'Project', path: '/project/1', keywords: ['EV', 'electric vehicle', 'strategy', 'startup'] },
    { id: 'project-2', title: 'JID1.0', category: 'Project', path: '/project/2', keywords: ['web development'] },
    { id: 'project-3', title: 'Student Data Management Portal', category: 'Project', path: '/project/3', keywords: ['database', 'management', 'student'] },
    { id: 'project-4', title: 'Financial Data Visualization Tool', category: 'Project', path: '/project/4', keywords: ['finance', 'visualization', 'analytics'] },
    { id: 'project-5', title: 'UDA-Sanskrit', category: 'Project', path: '/project/5', keywords: ['language', 'sanskrit', 'NLP'] },
    { id: 'project-6', title: 'EE655 Course Project', category: 'Project', path: '/project/6', keywords: ['electrical', 'engineering'] },
    { id: 'project-7', title: 'Simulation of 3D Robotic Arm', category: 'Project', path: '/project/7', keywords: ['robotics', '3D', 'simulation'] },

    // Achievements
    { id: 'jee-adv', title: 'JEE Advanced – AIR 2864', category: 'Achievement', path: '/achievements', keywords: ['exam', 'competitive', 'engineering'] },
    { id: 'jee-mains', title: 'JEE Mains – AIR 11403', category: 'Achievement', path: '/achievements', keywords: ['exam', 'competitive'] },
    { id: 'kvpy', title: 'KVPY-SA – AIR 1688', category: 'Achievement', path: '/achievements', keywords: ['scholarship', 'science'] },
    { id: 'ioqm', title: 'IOQM-A Certificate of Merit', category: 'Achievement', path: '/achievements', keywords: ['olympiad', 'mathematics'] },
    { id: 'ics', title: 'Core Team Member — ICS', category: 'Achievement', path: '/achievements', keywords: ['leadership', 'counseling'] },
    { id: 'orientation', title: 'Orientation\'25 Operations Lead', category: 'Achievement', path: '/achievements', keywords: ['leadership', 'event management'] },
    { id: 'udghosh', title: 'Udghosh IITK — Senior Executive', category: 'Achievement', path: '/achievements', keywords: ['sports', 'events'] },
    { id: 'music-club', title: 'Secretary — Music Club', category: 'Achievement', path: '/achievements', keywords: ['music', 'arts', 'club'] },
    { id: 'fine-arts', title: 'Secretary — Fine Arts', category: 'Achievement', path: '/achievements', keywords: ['arts', 'creative', 'club'] },
    { id: 'solar', title: 'Solar Rooftop Installation Certification', category: 'Achievement', path: '/achievements', keywords: ['solar', 'energy', 'certification'] },
    { id: 'keyboard', title: 'Trinity College London — Keyboard Grade 4', category: 'Achievement', path: '/achievements', keywords: ['music', 'piano', 'certification'] },
];

// Fuzzy search function
export function fuzzySearch(query: string, items: SearchItem[]): SearchItem[] {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const words = lowerQuery.split(/\s+/);

    return items
        .map(item => {
            let score = 0;
            const titleLower = item.title.toLowerCase();
            const categoryLower = item.category.toLowerCase();
            const keywordsLower = (item.keywords || []).join(' ').toLowerCase();

            // Exact title match (highest priority)
            if (titleLower === lowerQuery) score += 100;

            // Title contains query
            if (titleLower.includes(lowerQuery)) score += 50;

            // Category match
            if (categoryLower.includes(lowerQuery)) score += 30;

            // Keyword matches
            words.forEach(word => {
                if (titleLower.includes(word)) score += 20;
                if (keywordsLower.includes(word)) score += 10;
            });

            // Partial character matching (fuzzy)
            let matchCount = 0;
            let lastIndex = -1;
            for (const char of lowerQuery) {
                const index = titleLower.indexOf(char, lastIndex + 1);
                if (index > lastIndex) {
                    matchCount++;
                    lastIndex = index;
                }
            }
            if (matchCount === lowerQuery.length) score += 15;

            return { item, score };
        })
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8) // Top 8 results
        .map(result => result.item);
}
