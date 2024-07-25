const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrapeController')

router.route('/update')
    .get(scrapeController.updatePrice)

router.route('/search/:search')
    .get(scrapeController.scrapeAll)

module.exports = router;

