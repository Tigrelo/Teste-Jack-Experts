const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Log para verificar a variável de ambiente do JWT
console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET);

// Middleware para validação e cadastro de usuário
router.post(
  '/register',
  // Validações
  body('username').notEmpty().withMessage('Nome de usuário é obrigatório'),
  body('email').isEmail().withMessage('Endereço de e-mail inválido'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Verifica se o usuário já existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Já existe um usuário com este e-mail' });
      }

      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });

      // Retorna o usuário criado (sem a senha)
      res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err); // Adiciona log de erro para depuração
      if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map(e => e.message);
        res.status(400).json({ error: 'Erro de validação', details: errors });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  }
);

// Rota de Login
router.post(
  '/login',
  // Validações
  body('username').notEmpty().withMessage('Nome de usuário é obrigatório'),
  body('password').notEmpty().withMessage('A senha é obrigatória'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Busca o usuário pelo username
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ error: 'Credenciais inválidas' });
      }

      // Verifica se a senha está correta
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Credenciais inválidas' });
      }

      // Gera o token JWT
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login bem-sucedido', token });
    } catch (err) {
      console.error('Erro ao fazer login:', err); // Adiciona log de erro para depuração
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
);

module.exports = router;
