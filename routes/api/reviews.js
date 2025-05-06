const express = require('express');
const router = express.Router();
const { csrfMiddleware } = require('../../middleware/csrf');
const { shortenUrl } = require('../../utils/linkcents');

router.post('/', csrfMiddleware, async (req, res) => {
    try {
        const { name, message } = req.body;
        if (!name || !message) {
            return res.status(400).json({ error: 'Name and message are required' });
        }

        let reviewUrl = `${process.env.FRONTEND_URL}/home` || 'https://localhost:5000/home';
        try {
            const shortenedUrl = await shortenUrl(reviewUrl);
            reviewUrl = shortenedUrl;
        } catch (error) {
            console.error('Failed to shorten URL for review:', error.message);
        }

        const telegramMessage = `New Review:\nName: ${name}\nMessage: ${message}\nLink: ${reviewUrl}`;
        const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
        console.log('Telegram API URL:', telegramUrl);
        console.log('Telegram message:', telegramMessage);

        const telegramResponse = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: telegramMessage
            })
        });
        const telegramData = await telegramResponse.json();
        console.log('Telegram response:', telegramData);

        if (!telegramData.ok) {
            console.error('Telegram send failed:', telegramData);
            return res.status(500).json({ error: 'Failed to send review to Telegram' });
        }

        res.json({ message: 'Review submitted successfully', shortenedUrl: reviewUrl });
    } catch (error) {
        console.error('Review submission error:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
