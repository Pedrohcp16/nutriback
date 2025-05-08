const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacientecontroller');


router.get('/', pacienteController.listarPacientes);        
router.post('/', pacienteController.cadastrarPaciente);    
router.get('/:id', pacienteController.obterPaciente);       
router.delete('/:id', pacienteController.deletarPaciente);   
router.put('/:id', pacienteController.atualizarPaciente);    

module.exports = router;


