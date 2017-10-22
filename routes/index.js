const express = require('express');
const parseWebhooks = require('./parseWebhooks');
const router = express.Router();
router.use('/parseWebhooks', parseWebhooks);

module.exports = router;