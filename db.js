const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          
  password: 'abcd1020',  
  database: 'backnutri'   
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados!');
});

module.exports = db;

