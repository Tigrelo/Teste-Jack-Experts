const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

const saltRounds = 10; // Número de rounds para gerar o salt

// Rota para registro de usuário
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validação de dados de entrada
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email e password são obrigatórios' });
  }

  try {
    // Verifica se o email já está registrado
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email já registrado' });
    }

    // Verifica se o nome de usuário já está registrado
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ error: 'Nome de usuário já existe' });
    }

    // Criptografa a senha usando bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Cria o novo usuário
    const user = await User.create({ username, email, password: hashedPassword });

    // Remove a senha da resposta antes de enviá-la
    const { password: _, ...userWithoutPassword } = user.toJSON();
    
    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
