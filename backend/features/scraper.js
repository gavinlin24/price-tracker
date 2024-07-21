const puppeteer = require('puppeteer');

const scrape = async (searchTerm) => {

  const browser = await puppeteer.launch({ headless: true }); 
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
    'upgrade-insecure-requests': '1',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,en;q=0.8'
  })

  // Navigate to Amazon
  await page.goto('https://www.amazon.com/');

  // Search for the item
  try {
    await page.waitForSelector('#twotabsearchtextbox', { timeout: 60000 }); // Increase timeout
    await page.type('#twotabsearchtextbox', searchTerm);
    await page.click('input.nav-input[type="submit"]');
    await page.waitForNavigation();
  } catch (error) {
    console.error('Error interacting with the search box:', error);
    await browser.close();
  }
  
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