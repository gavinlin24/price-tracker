const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrapeController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/update')
    .post(scrapeController.updatePrice)

router.route('/search/:search')
    .get(scrapeController.scrapeAll)

module.exports = router;

