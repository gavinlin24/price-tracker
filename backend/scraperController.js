const asyncHandler = require('express-async-handler');
const scrape = require('./scraper');

const handleScrape = asyncHandler(async (req, res) => {
    const results = await scrape(req.params.search);
    console.log(results);
    res.json(results);
})

module.exports = handleScrape;