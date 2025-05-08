const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(__dirname, '..', 'pacientes.json');

// Função auxiliar para ler e salvar pacientes
const lerPacientes = () => {
  if (!fs.existsSync(DB_PATH)) return [];
  return JSON.parse(fs.readFileSync(DB_PATH));
};

const salvarPacientes = (pacientes) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(pacientes, null, 2));
};

exports.listarPacientes = (req, res) => {
  const pacientes = lerPacientes();
  res.json(pacientes);
};

exports.cadastrarPaciente = (req, res) => {
  const novoPaciente = { id: Date.now().toString(), ...req.body };
  const pacientes = lerPacientes();
  pacientes.push(novoPaciente);
  salvarPacientes(pacientes);
  res.status(201).json(novoPaciente);
};

exports.obterPaciente = (req, res) => {
  const pacientes = lerPacientes();
  const paciente = pacientes.find(p => p.id === req.params.id);
  if (paciente) {
    res.json(paciente);
  } else {
    res.status(404).json({ message: 'Paciente não encontrado' });
  }
};

exports.deletarPaciente = (req, res) => {
  let pacientes = lerPacientes();
  const novoArray = pacientes.filter(p => p.id !== req.params.id);
  if (novoArray.length === pacientes.length) {
    return res.status(404).json({ message: 'Paciente não encontrado' });
  }
  salvarPacientes(novoArray);
  res.json({ message: 'Paciente removido' });
};

exports.atualizarPaciente = (req, res) => {
  let pacientes = lerPacientes();
  const index = pacientes.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Paciente não encontrado' });
  }
  pacientes[index] = { ...pacientes[index], ...req.body };
  salvarPacientes(pacientes);
  res.json(pacientes[index]);
};


