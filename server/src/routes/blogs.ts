import { Router } from 'express';
import Blog from '../models/Blog';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

router.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create blog' });
    }
});

export default router;
