const db = require('../db');

// Listar todos os serviços
exports.listarServicos = (req, res) => {
  const sql = `
    SELECT servicos.*, pacientes.nome AS paciente_nome
    FROM servicos
    JOIN pacientes ON servicos.paciente_id = pacientes.id
    ORDER BY servicos.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao listar serviços:', err);
      return res.status(500).json({ error: 'Erro ao listar serviços' });
    }
    res.json(results);
  });
};

// Cadastrar novo serviço
exports.cadastrarServico = (req, res) => {
  const { paciente_id, servico, data, horario, preco } = req.body;

  const sql = 'INSERT INTO servicos (paciente_id, servico, data, horario, preco) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [paciente_id, servico, data, horario, preco], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar serviço:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar serviço' });
    }

    res.status(201).json({
      id: result.insertId,
      paciente_id,
      servico,
      data,
      horario,
      preco
    });
  });
};



// Obter um serviço por ID
exports.obterServico = (req, res) => {
  const sql = 'SELECT * FROM servicos WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar serviço' });
    if (results.length === 0) return res.status(404).json({ message: 'Serviço não encontrado' });
    res.json(results[0]);
  });
};

// Atualizar serviço
exports.atualizarServico = (req, res) => {
  const { paciente_id, servico, horario, preco } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE servicos
    SET paciente_id = ?, servico = ?, horario = ?, preco = ?
    WHERE id = ?
  `;

  db.query(sql, [paciente_id, servico, horario, preco, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar serviço:', err);
      return res.status(500).json({ error: 'Erro ao atualizar serviço' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    res.json({ message: 'Serviço atualizado com sucesso' });
  });
};

// Deletar serviço
exports.deletarServico = (req, res) => {
  const sql = 'DELETE FROM servicos WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao deletar serviço' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Serviço não encontrado' });
    res.json({ message: 'Serviço removido com sucesso' });
  });
};

