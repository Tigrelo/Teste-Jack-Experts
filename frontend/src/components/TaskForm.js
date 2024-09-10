import React, { useState, useEffect, useCallback } from 'react';
import '../styles/tasks.css'; 
 // Certifique-se de que este caminho está correto

const TaskForm = ({ selectedTask, setSelectedTask, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const resetForm = useCallback(() => {
    setTitle('');
    setDescription('');
    setCompleted(false);
    setSelectedTask(null);
  }, [setSelectedTask]);

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setCompleted(selectedTask.completed);
    } else {
      resetForm();
    }
  }, [selectedTask, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, description, completed };

    if (selectedTask) {
      onUpdateTask({ ...selectedTask, ...task });
    } else {
      onAddTask(task);
    }

    resetForm();
  };

  const handleDelete = () => {
    if (selectedTask) {
      onDeleteTask(selectedTask.id);
      resetForm();
    }
  };

  return (
    <div className="task-form-container" role="form">
      <h2 className="task-form-title">{selectedTask ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="task-form-group">
          <label htmlFor="title" className="task-form-label">Título</label>
          <input
            id="title"
            type="text"
            className="task-form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            aria-label="Título da Tarefa"
          />
        </div>

        <div className="task-form-group">
          <label htmlFor="description" className="task-form-label">Descrição</label>
          <textarea
            id="description"
            className="task-form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-label="Descrição da Tarefa"
          />
        </div>

        <div className="task-form-checkbox">
          <input
            id="completed"
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            aria-label="Tarefa Concluída"
          />
          <label htmlFor="completed" className="task-form-checkbox-label">Concluída</label>
        </div>

        <div className="task-form-buttons">
          <button type="submit" className="task-form-button">
            {selectedTask ? 'Atualizar' : 'Adicionar'} Tarefa
          </button>
          {selectedTask && (
            <button type="button" className="task-form-delete-button" onClick={handleDelete}>
              Deletar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
