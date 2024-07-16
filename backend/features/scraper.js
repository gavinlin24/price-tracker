const puppeteer = require('puppeteer');

const scrape = async (product) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.uniqlo.com/us/en/search?q=${product.replace(' ', '%20')}`);
    const results = await page.evaluate(() => Array.from(document.querySelectorAll('a.fr-ec-tile'), (e) => ({
        product: e.querySelector('h3.fr-ec-title').innerText,
        price: e.querySelector('p.fr-ec-price-text').innerText,
        link: e.href
    })));
    await browser.close()
    return results;
}

module.exports = scrape;