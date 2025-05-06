const express = require('express');
const router = express.Router();
const authRoutes = require('./api/auth');
const booksRoutes = require('./api/books');
const reviewsRoutes = require('./api/reviews');

router.use('/auth', authRoutes);
router.use('/books', booksRoutes);
router.use('/reviews', reviewsRoutes);

module.exports = router;
