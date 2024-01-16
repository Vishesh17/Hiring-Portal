// src/components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate('/create-job');
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to the Hiring Portal</h2>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <br />

        <button type="button" onClick={handleLogin} className="login-button">
          Login
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
