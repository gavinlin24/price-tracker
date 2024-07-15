require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3500;
const scrape = require('./scraper')

app.use(cors(corsOptions))
app.use('/scrape', require('./scraperRoutes'));

app.listen(PORT, () => console.log(`The server is starting on port ${PORT}`))