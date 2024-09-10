import React, { useState } from 'react';
import axios from '../axiosConfig'; // Importe a instância configurada


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpa a mensagem antes de enviar o formulário
    try {
      const response = await axios.post('/api/auth/login', { // Use a URL relativa
        username,
        password,
      });
      console.log('Login bem-sucedido:', response.data);
      localStorage.setItem('token', response.data.token);
      setMessage('Login bem-sucedido!');
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form onSubmit={handleSubmit}>
        <h3>Bem Vindo</h3>
        <label htmlFor="username">Nome de Usuário</label>
        <input
          type="text"
          placeholder="Nome de Usuário"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          placeholder="Senha"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit">Logar</button>
        {message && <p className="message">{message}</p>}
        <div className="social">
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
