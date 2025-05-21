const express = require('express');
const router = express.Router();
const financeiroController = require('../controllers/financeiroController');

// Listar todos os serviços
router.get('/servicos', financeiroController.listarServicos);

// Obter um serviço específico
router.get('/servicos/:id', financeiroController.obterServico);

// Cadastrar um novo serviço
router.post('/servicos', financeiroController.cadastrarServico);

// Atualizar um serviço existente
router.put('/servicos/:id', financeiroController.atualizarServico);

// Deletar um serviço
router.delete('/servicos/:id', financeiroController.deletarServico);

module.exports = router;


