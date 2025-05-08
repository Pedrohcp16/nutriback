const db = require('../db');

const getFinanceiro = (req, res) => {
  const query = `
    SELECT 
      DATE(dataNascimento) as data,
      SUM(preco) as total
    FROM pacientes
    GROUP BY DATE(dataNascimento)
    ORDER BY DATE(dataNascimento)
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados financeiros:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    res.json(results);
  });
};

module.exports = { getFinanceiro };
