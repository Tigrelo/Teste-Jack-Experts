// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { body, validationResult } = require('express-validator');
const authenticateToken = require('../middleware/auth');

// Middleware para autenticação
router.use(authenticateToken);

// Rota para criar uma task
router.post('/',
  body('title').notEmpty().withMessage('Título é obrigatório'),
  body('description').optional().isString().withMessage('Descrição deve ser uma string'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Erros de validação:', errors.array()); // Log para depuração
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, completed = false } = req.body;
    try {
      // Verifique o usuário
      console.log('Usuário autenticado:', req.user);

      // Criação da tarefa
      const task = await Task.create({
        title,
        description,
        completed,
        userId: req.user.id // Certifique-se de que req.user.id está definido
      });
      res.status(201).json(task);
    } catch (error) {
      console.error('Erro ao criar task:', error); // Log para depuração
      res.status(500).json({ error: 'Erro ao criar task' });
    }
  }
);

module.exports = router;
