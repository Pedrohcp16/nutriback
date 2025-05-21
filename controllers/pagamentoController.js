const db = require('../db');

exports.getPagamentos = (req, res) => {
  const query = 'SELECT * FROM pagamentos ORDER BY data_pagamento DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar pagamentos:', err);
      return res.status(500).json({ error: 'Erro ao buscar pagamentos' });
    }
    res.json(results);
  });
};

exports.criarPagamento = (req, res) => {
  const { paciente_id, valor, data_pagamento, metodo_pagamento, status_pagamento } = req.body;
  const query = `
    INSERT INTO pagamentos (paciente_id, valor, data_pagamento, metodo_pagamento, status_pagamento)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [paciente_id || null, valor, data_pagamento, metodo_pagamento, status_pagamento || 'pago'], (err, result) => {
    if (err) {
      console.error('Erro ao criar pagamento:', err);
      return res.status(500).json({ error: 'Erro ao criar pagamento' });
    }
    res.status(201).json({ id: result.insertId });
  });
};

exports.getTotaisPorDia = (req, res) => {
  const query = `
    SELECT 
      DATE_FORMAT(data_pagamento, '%d/%m') AS dia,
      SUM(valor) AS total
    FROM pagamentos
    WHERE status_pagamento = 'pago'
    GROUP BY dia
    ORDER BY data_pagamento ASC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar totais por dia:', err);
      return res.status(500).json({ error: 'Erro ao buscar totais por dia' });
    }
    res.json(results);
  });
};
