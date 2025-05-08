const express = require('express');
const router = express.Router();
const { getFinanceiro } = require('../controllers/financeiroController');

router.get('/', getFinanceiro);

module.exports = router;
