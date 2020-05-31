const express = require('express');
const router = express.Router();
const { makePayment } = require('../controllers/payment');

router.post('/pay', makePayment);

module.exports = router;
