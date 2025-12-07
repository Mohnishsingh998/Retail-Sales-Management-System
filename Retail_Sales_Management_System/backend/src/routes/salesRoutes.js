const express = require('express');
const router = express.Router();
const { getSalesData } = require('../controllers/salesController');

router.get('/', getSalesData);

module.exports = router;