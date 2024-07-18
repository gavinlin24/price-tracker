const puppeteer = require('puppeteer');

const scrape = async (searchTerm) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const BASE_URL = 'https://www.amazon.com/';
    
    // Navigate to Amazon
    await page.goto(BASE_URL);
  
    // Search for the item
    await page.type('#twotabsearchtextbox', searchTerm);
    await page.click('input.nav-input[type="submit"]');
    await page.waitForNavigation();
  
    // Scrape the product details from the search results
    const products = await page.evaluate(() => {
      // Select product containers
      const productElements = document.querySelectorAll('.s-main-slot .s-result-item');
      
      const productList = [];
      let id = 1;
      productElements.forEach(productElement => {
        const nameElement = productElement.querySelector('h2 a span');
        const priceElement = productElement.querySelector('.a-offscreen');
        const linkElement = productElement.querySelector('h2 a');
  
        if (nameElement && priceElement && linkElement) {
          const name = nameElement.innerText;
          const price = priceElement.innerText;
          const link = linkElement.href;
          
          productList.push({ id: id++, name, price, link });
        }
      });
      
      return productList;
    });
  
    await browser.close();

    console.log(products);

    return products;
}

module.exports = scrape;