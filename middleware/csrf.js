const { v4: uuidv4 } = require('uuid');

const csrfMiddleware = (req, res, next) => {
    if (req.method === 'GET') {
        if (!req.session) {
            console.error('Session not initialized');
            return res.status(500).json({ error: 'Session error' });
        }
        const csrfToken = uuidv4();
        req.session.csrfToken = csrfToken;
        console.log('Generated CSRF token:', csrfToken, 'Session ID:', req.sessionID);
        res.json({ csrfToken });
    } else {
        const clientToken = req.headers['x-csrf-token'];
        console.log('Client CSRF token:', clientToken, 'Server CSRF token:', req.session.csrfToken, 'Session ID:', req.sessionID);
        if (!req.session || !req.session.csrfToken || !clientToken || clientToken !== req.session.csrfToken) {
            console.error('CSRF validation failed');
            return res.status(403).json({ error: 'Invalid CSRF token' });
        }
        next();
    }
};

module.exports = { csrfMiddleware };
