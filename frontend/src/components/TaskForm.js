import React, { useState } from 'react';
import axios from '../axiosConfig'; // Importe a instância configurada

const TaskForm = ({ onAddTask }) => { // Adicione a prop `onAddTask` para callback de adição
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia a tarefa para o backend
      const response = await axios.post('/tasks', {
        title,
        description,
        completed: false
      });
      setTitle('');
      setDescription('');
      alert('Tarefa adicionada com sucesso');
      if (onAddTask) onAddTask(response.data); // Chama a função `onAddTask` se fornecida
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      alert('Erro ao adicionar tarefa');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default TaskForm;
