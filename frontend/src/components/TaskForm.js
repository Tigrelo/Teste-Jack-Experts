// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';

const TaskForm = ({ selectedTask, setSelectedTask, onAddTask, onUpdateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setCompleted(selectedTask.completed);
    } else {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, description, completed };
    if (selectedTask) {
      onUpdateTask({ ...selectedTask, title, description, completed });
    } else {
      onAddTask(task);
    }
    setTitle('');
    setDescription('');
    setCompleted(false);
    setSelectedTask(null);
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
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>
        Concluída
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
      </label>
      <button type="submit">{selectedTask ? 'Atualizar' : 'Adicionar'} Tarefa</button>
    </form>
  );
};

export default TaskForm;
