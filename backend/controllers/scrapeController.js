const scraper = require('../features/scraper');

const scrapeAll = async (req, res) => {
    const results = await scraper.scrape(req.params.search);
    res.json(results);
}

const updatePrice = async (req, res) => {
    const { link } = req.body
    const newPrice = await scraper.updatePrice(link);
    res.json(parseFloat(newPrice.replace('$', '')));
}

module.exports = {
    scrapeAll,
    updatePrice
};