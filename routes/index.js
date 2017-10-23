const express = require('express');
const webhooks = require('./webhooks');
const router = express.Router();

router.use('/webhooks', webhooks);

module.exports = router;