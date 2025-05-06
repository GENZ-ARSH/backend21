const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { csrfMiddleware } = require('../../middleware/csrf');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

router.get('/', async (req, res) => {
    try {
        const books = [
            { id: 1, title: 'Sample Book', author: 'John Doe' }
        ]; // Replace with MongoDB query later
        res.json({ books });
    } catch (error) {
        console.error('Books error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', csrfMiddleware, authMiddleware, async (req, res) => {
    try {
        const { title, author } = req.body;
        if (!title || !author) {
            return res.status(400).json({ error: 'Title and author are required' });
        }
        const newBook = { title, author }; // Replace with MongoDB save later
        res.json({ message: 'Book added', book: newBook });
    } catch (error) {
        console.error('Add book error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
