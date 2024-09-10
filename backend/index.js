require('dotenv').config();

const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const protectedRoutes = require('./routes/protectedRoutes');
const sequelize = require('./config/dbConfig');
const authenticateToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração CORS
app.use(cors({
  origin: 'http://localhost:3000', // URL do frontend
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(express.json());

// Definição de rotas públicas
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes); // Mova esta linha acima da rota protegida

// Definição de rotas protegidas
app.use('/api/tasks', authenticateToken, tasksRoutes); // Verifique a ordem aqui
app.use('/api/protected', authenticateToken, protectedRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro interno:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Inicie o servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    // Use 'force: true' para recriar as tabelas durante o desenvolvimento
    // Remova ou ajuste para produção
    await sequelize.sync({ force: process.env.NODE_ENV === 'development' });

    console.log('Database synchronized');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

startServer();

module.exports = app;
