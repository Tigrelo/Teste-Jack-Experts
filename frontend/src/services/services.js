import axios from 'axios';

// Defina a URL base da sua API
const api = axios.create({
  baseURL: '/api', // Ajuste conforme a configuração do proxy
});

// Função para obter tarefas
export const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw error;
  }
};

// Função para adicionar uma nova tarefa
export const addTask = async (task) => {
  try {
    const response = await api.post('/tasks', task);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
    throw error;
  }
};

// Outras funções podem ser adicionadas aqui

export default api;
