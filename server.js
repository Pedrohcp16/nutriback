const express = require('express');
const cors = require('cors');
const pacienteRoutes = require('./routes/pacienteRoutes');
const financeiroRoutes = require('./routes/financeiroRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');


const app = express(); 

app.use(cors());
app.use(express.json());

app.use('/api/pacientes', pacienteRoutes);
app.use('/api', financeiroRoutes);
app.use('/api/pagamentos', pagamentoRoutes);



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

