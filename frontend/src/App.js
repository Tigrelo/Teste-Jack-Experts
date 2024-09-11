// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Importe o ToastContainer
import LoginForm from './pages/LoginForm'; // Importe o LoginForm
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import './styles/combined.css';
import 'react-toastify/dist/ReactToastify.css'; // Importe o CSS para o ToastContainer

function App() {
  return (
    <Router>
      <div className="App">

        {/* Configuração do ToastContainer para notificações */}
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
