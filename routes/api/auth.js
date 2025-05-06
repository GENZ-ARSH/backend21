const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { csrfMiddleware } = require('../../middleware/csrf');

router.get('/csrf-token', csrfMiddleware, (req, res) => {
    res.json({ csrfToken: req.session.csrfToken });
});

router.post('/admin-login', csrfMiddleware, (req, res) => {
    const { password } = req.body;
    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
