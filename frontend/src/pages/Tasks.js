// src/pages/Tasks.js
import React, { useState } from 'react';
import Task from '../components/Task';
import TaskForm from '../components/TaskForm';


const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Test Task', description: 'This is a test task' }
  ]); // Dados mock para teste
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setSelectedTask(null);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div>
      <h2>Tasks</h2>
      <TaskForm 
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
      />
      <ul>
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            setSelectedTask={setSelectedTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
