import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Logo_Aerocode.jpg';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Estados para controlar os inputs e a mensagem de erro
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Pega a rota de origem para redirecionar o usuário após o login
  const from = location.state?.from?.pathname || '/';

  // 2. Função para lidar com o submit do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    setError('');

    // Tenta fazer o login com os dados do formulário
    const loginSuccess = login(username, password);

    if (loginSuccess) {
      // Se o login for bem-sucedido, navega para a página de origem ou dashboard
      navigate(from, { replace: true });
    } else {
      // Se falhar, exibe uma mensagem de erro
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <img src={logo} alt="Aerocode Logo" className="h-20 w-auto mb-12" />

      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-8">
          Acessar Sistema Aerocode
        </h1>

        {/* 3. Formulário de Login */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Exibe a mensagem de erro, se houver */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full p-4 bg-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-500 transition-colors mt-2"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;