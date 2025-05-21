const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

router.get('/', pagamentoController.getPagamentos);
router.post('/', pagamentoController.criarPagamento);
router.get('/totais', pagamentoController.getTotaisPorDia);

module.exports = router;
