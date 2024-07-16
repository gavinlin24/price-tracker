const scrape = require('./scraper');

const handleScrape = async (req, res) => {
    const results = await scrape(req.params.search);
    console.log(results);
    res.json(results);
}

module.exports = handleScrape;