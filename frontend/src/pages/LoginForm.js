import React, { useState } from 'react';
import axios from '../axiosConfig'; // Importe a instância configurada
import '../styles/LoginForm.css'; // Importe o CSS

const LoginForm = () => {
  const [username, setUsername] = useState(''); // Estado para o username
  const [email, setEmail] = useState(''); // Estado para o email
  const [password, setPassword] = useState(''); // Estado para o password
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpa a mensagem antes de enviar o formulário
    try {
      const response = await axios.post('/api/auth/login', {
        username, // Envia o username
        email,    // Envia o email
        password, // Envia o password
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
          id="username"
          name="username"
          placeholder="Nome de Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit">Logar</button>
        {message && <p className="message">{message}</p>}
        <div className="social"></div>
      </form>
    </div>
  );
};

export default LoginForm;
