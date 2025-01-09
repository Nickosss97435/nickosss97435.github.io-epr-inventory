import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '/Logo.svg';

const Login = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        navigate('/scanner-setup');
      } else {
        setError(data.message || 'Erreur inconnue');
      }
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  return (
    <>
    <img src={Logo} className='w-24 h-24 mx-auto' alt='Logo'/>
    <h1 className="text-center text-5xl p-8 font-extrabold text-blue-900">EPR Invrntaire</h1>
    <div className="max-h-screen flex items-center justify-center bg-gray-250">
      
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-blue-900">
          Connexion
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="current-username"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;