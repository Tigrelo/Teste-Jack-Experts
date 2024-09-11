import React, { useState, useEffect } from 'react';
import Task from '../components/Task';  // Verifique se o caminho está correto
import TaskForm from '../components/TaskForm';  // Verifique se o caminho está correto

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:5000/tasks', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (task) => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = async (updatedTask) => {
    const response = await fetch(`http://localhost:5000/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updatedTask),
    });
    const task = await response.json();
    setTasks(tasks.map(t => t.id === task.id ? task : t));
  };

  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div>
      <h2>Tasks</h2>
      <TaskForm onAddTask={handleAddTask} />
      <ul>
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default Tasks;