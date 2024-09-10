const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth'); // Certifique-se de que o caminho está correto

// Exemplo de rota protegida
router.get('/secret', authenticateToken, (req, res) => {
  try {
    res.json({ message: 'Esta é uma rota protegida.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao acessar a rota protegida' });
  }
});

module.exports = router;
