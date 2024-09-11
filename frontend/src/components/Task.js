import React from 'react';

const Task = ({ task, onUpdateTask, onDeleteTask }) => {
  const handleToggleCompleted = () => {
    onUpdateTask({ ...task, completed: !task.completed });
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <li>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}: {task.description}
      </span>
      <button onClick={handleToggleCompleted}>
        {task.completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default Task;
