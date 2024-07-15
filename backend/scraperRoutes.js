const express = require('express');
const router = express();
const scrape = require('./scraper');

router.get('/:search', async (req, res) => {
    const results = await scrape(req.params.search);
    res.json(results);
});

module.exports = router;

