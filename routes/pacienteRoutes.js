const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');


router.get('/', pacienteController.listarPacientesComServicos);        
router.post('/', pacienteController.cadastrarPaciente);    
router.get('/:id', pacienteController.obterPaciente);       
router.delete('/:id', pacienteController.deletarPaciente);   
router.put('/:id', pacienteController.atualizarPaciente);    

module.exports = router;


