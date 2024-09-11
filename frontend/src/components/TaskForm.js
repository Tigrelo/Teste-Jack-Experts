import React, { useState } from 'react';
import { addTask } from '../services/services'; // Ajuste o caminho conforme necessário

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addTask({ title, description });
      // Sucesso - faça algo como limpar o formulário ou mostrar uma mensagem
    } catch (error) {
      // Erro - trate o erro, exiba uma mensagem
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Descrição
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default TaskForm;
