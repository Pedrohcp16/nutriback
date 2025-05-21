const db = require('../db');

// ✅ NOVA função que retorna pacientes com serviços
exports.listarPacientes = (req, res) => {
  const sql = `
    SELECT 
      pacientes.id,
      pacientes.nome,
      pacientes.data,
      servicos.servico,
      servicos.horario,
      servicos.preco
    FROM pacientes
    LEFT JOIN servicos ON pacientes.id = servicos.paciente_id
    ORDER BY pacientes.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao listar pacientes com serviços:', err);
      return res.status(500).json({ error: 'Erro ao listar pacientes com serviços' });
    }
    res.json(results);
  });
};

// ✅ Cadastrar novo paciente
exports.cadastrarPaciente = (req, res) => {
  const { nome, data } = req.body;
  const sql = 'INSERT INTO pacientes (nome, data) VALUES (?, ?)';
  db.query(sql, [nome, data], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar paciente:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar paciente' });
    }
    res.status(201).json({ id: result.insertId, nome, data });
  });
};

// ✅ Obter um paciente por ID
exports.obterPaciente = (req, res) => {
  const sql = 'SELECT * FROM pacientes WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar paciente' });
    if (results.length === 0) return res.status(404).json({ message: 'Paciente não encontrado' });
    res.json(results[0]);
  });
};

// ✅ Atualizar paciente
exports.atualizarPaciente = (req, res) => {
  const { nome, data } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE pacientes
    SET nome = ?, data = ?
    WHERE id = ?
  `;

  db.query(sql, [nome, data, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar paciente:', err);
      return res.status(500).json({ error: 'Erro ao atualizar paciente' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    res.json({ message: 'Paciente atualizado com sucesso' });
  });
};

// ✅ Deletar paciente
exports.deletarPaciente = (req, res) => {
  const sql = 'DELETE FROM pacientes WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao deletar paciente' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Paciente não encontrado' });
    res.json({ message: 'Paciente removido com sucesso' });
  });
};
