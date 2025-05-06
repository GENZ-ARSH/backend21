require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const jwt = require('jsonwebtoken');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { protectHomePage } = require('./middleware/auth');
const { shortenUrl } = require('./utils/linkcents');

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    store: new FileStore({ path: './sessions' }),
    secret: process.env.JWT_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
}));

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/', protectHomePage, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/api/shorten', async (req, res) => {
    try {
        const homeUrl = `${process.env.FRONTEND_URL}/home` || 'https://localhost:5000/home';
        const shortenedUrl = await shortenUrl(homeUrl);
        res.json({ shortenedUrl });
    } catch (error) {
        console.error('Shorten API error:', error.message);
        res.status(500).json({ error: 'Failed to shorten URL' });
    }
});

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/books', require('./routes/api/books'));
app.use('/api/reviews', require('./routes/api/reviews'));

console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const options = {
    key: fs.readFileSync('certs/key.pem'),
    cert: fs.readFileSync('certs/cert.pem')
};

https.createServer(options, app).listen(process.env.PORT || 5000, () => {
    console.log(`HTTPS Server running on port ${process.env.PORT || 5000}`);
});
