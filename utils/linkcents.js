const shortenUrl = async (url) => {
    try {
        const targetUrl = url || `${process.env.FRONTEND_URL}/home` || 'https://localhost:5000/home';
        console.log('Shortening URL:', targetUrl);
        const LINKCENTS_API_KEY = 'bb22911fe37d3daa0c26c1f50b43a7a8804b80d4';
        console.log('LINKCENTS_API_KEY:', LINKCENTS_API_KEY);
        const apiUrl = `https://linkcents.com/api?api=${LINKCENTS_API_KEY}&url=${encodeURIComponent(targetUrl)}`;
        console.log('Linkcents API URL:', apiUrl);
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Linkcents response:', data);
        if (data.status === 'success') {
            return data.shortenedUrl;
        }
        console.error('Shortening failed:', data.message);
        return targetUrl;
    } catch (error) {
        console.error('Linkcents error:', error.message);
        return url || process.env.FRONTEND_URL || 'https://localhost:5000/home';
    }
};

module.exports = { shortenUrl };
