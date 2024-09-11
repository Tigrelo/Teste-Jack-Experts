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
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, completed = false } = req.body;
    try {
      const task = await Task.create({
        title,
        description,
        completed,
        userId: req.user.id // Certifique-se de que req.user.id está definido
      });
      res.status(201).json(task);
    } catch (error) {
      console.error('Erro ao criar task:', error);
      res.status(500).json({ error: 'Erro ao criar task' });
    }
  }
);

// Rota para obter todas as tasks do usuário
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (error) {
    console.error('Erro ao obter tasks:', error);
    res.status(500).json({ error: 'Erro ao obter tasks' });
  }
});

// Rota para atualizar uma task
router.put('/:id',
  body('title').optional().notEmpty().withMessage('Título não pode ser vazio'),
  body('description').optional().isString().withMessage('Descrição deve ser uma string'),
  body('completed').optional().isBoolean().withMessage('Completed deve ser um booleano'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, completed } = req.body;
    try {
      const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
      if (!task) {
        return res.status(404).json({ error: 'Task não encontrada' });
      }
      await task.update({ title, description, completed });
      res.json(task);
    } catch (error) {
      console.error('Erro ao atualizar task:', error);
      res.status(500).json({ error: 'Erro ao atualizar task' });
    }
  }
);

// Rota para excluir uma task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ error: 'Task não encontrada' });
    }
    await task.destroy();
    res.json({ message: 'Task excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir task:', error);
    res.status(500).json({ error: 'Erro ao excluir task' });
  }
});

module.exports = router;
