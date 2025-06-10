const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(express.static('.'));

app.get('/search', async (req, res) => {
    const searchTerm = req.query.q;

    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    const deezerUrl = `https://api.deezer.com/search?q=${encodeURIComponent(searchTerm)}`;

    try {
        const deezerResponse = await fetch(deezerUrl);
        const data = await deezerResponse.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching from Deezer API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Deezer' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log('Open this URL in your browser to see your project!');
});