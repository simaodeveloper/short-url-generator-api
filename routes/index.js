const express = require('express');
const ShortUrl = require('../models/ShortUrl');
const router = express.Router();

router
  .get('/', async (req, res) => {
    const urls = await ShortUrl.find();

    res.render('index', { urls });
  });

router
  .post('/shortUrls', async (req, res) => {
    const { full } = req.body;
    const url = await ShortUrl.create({ full });
  });

router
  .get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params.shortUrl;
    const url = await ShortUrl.find({ short: shortUrl });

    if (!url) {
      return res.status(404);
    }

    res.redirect(url.full);
  });

module.exports = router;
