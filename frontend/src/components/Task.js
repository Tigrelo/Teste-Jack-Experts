import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Importa a biblioteca de notificações
import Task from '../components/Task'; // Importa o componente para exibir uma única tarefa
import TaskForm from '../components/TaskForm'; // Importa o componente de formulário de tarefas

// Componente principal para gerenciar tarefas
const Tasks = () => {
  const [tasks, setTasks] = useState([]); // Estado para armazenar a lista de tarefas

  // useEffect para buscar tarefas ao montar o componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } // Adiciona o token de autenticação nos cabeçalhos
        });
        console.log('Response:', response); // Log da resposta
        if (!response.ok) throw new Error('Erro ao buscar tarefas'); // Verifica se houve erro na resposta
        
        const text = await response.text(); // Primeiro, obtenha a resposta como texto
        console.log('Response Text:', text); // Log do texto da resposta
        
        const data = JSON.parse(text); // Tente converter o texto para JSON
        setTasks(data); // Atualiza o estado com as tarefas recebidas
        toast.success('Tarefas carregadas com sucesso!'); // Notificação de sucesso
      } catch (error) {
        console.error('Error:', error); // Log do erro completo
        toast.error(error.message); // Notificação de erro em caso de falha
      }
    };
    fetchTasks(); // Chama a função para buscar tarefas
  }, []); // Executa uma vez ao montar o componente

  // Função para adicionar uma nova tarefa
  const handleAddTask = async (task) => {
    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Adiciona o token de autenticação
        },
        body: JSON.stringify(task), // Envia a tarefa como JSON no corpo da requisição
      });
      if (!response.ok) throw new Error('Erro ao adicionar tarefa'); // Verifica se houve erro na resposta
      const newTask = await response.json(); // Converte a resposta para JSON
      setTasks([...tasks, newTask]); // Adiciona a nova tarefa ao estado
      toast.success('Tarefa adicionada com sucesso!'); // Notificação de sucesso
    } catch (error) {
      toast.error(error.message); // Notificação de erro em caso de falha
    }
  };

  // Função para atualizar uma tarefa existente
  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Adiciona o token de autenticação
        },
        body: JSON.stringify(updatedTask), // Envia a tarefa atualizada como JSON no corpo da requisição
      });
      if (!response.ok) throw new Error('Erro ao atualizar tarefa'); // Verifica se houve erro na resposta
      const task = await response.json(); // Converte a resposta para JSON
      setTasks(tasks.map(t => t.id === task.id ? task : t)); // Atualiza a tarefa no estado
      toast.success('Tarefa atualizada com sucesso!'); // Notificação de sucesso
    } catch (error) {
      toast.error(error.message); // Notificação de erro em caso de falha
    }
  };

  // Função para deletar uma tarefa
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } // Adiciona o token de autenticação
      });
      if (!response.ok) throw new Error('Erro ao deletar tarefa'); // Verifica se houve erro na resposta
      setTasks(tasks.filter(t => t.id !== id)); // Remove a tarefa deletada do estado
      toast.success('Tarefa deletada com sucesso!'); // Notificação de sucesso
    } catch (error) {
      toast.error(error.message); // Notificação de erro em caso de falha
    }
  };

  // Renderiza o componente
  return (
    <div>
      <h2>Tasks</h2>
      <TaskForm onAddTask={handleAddTask} /> {/* Componente de formulário para adicionar ou editar tarefas */}
      <ul>
        {tasks.map(task => ( // Mapeia e renderiza cada tarefa
          <Task
            key={task.id}
            task={task}
            onUpdateTask={handleUpdateTask} // Passa a função de atualização de tarefa
            onDeleteTask={handleDeleteTask} // Passa a função de deleção de tarefa
          />
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
