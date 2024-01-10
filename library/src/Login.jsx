import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      const data = await response.json();
     

      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data)); // Save user data

        if (data.isAdmin) {
          navigate('/admin'); // Redirect to admin page
        } else {
          navigate('/home'); // Redirect to home page for non-admins or if isAdmin is false
        }
      } else {
        console.error('Login failed:', data.message); // Handle error message
        setErrorMessage(data.message || 'Login failed'); // Set error message
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message || 'An error occurred'); // Set error message
    }
  };

  const redirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-box">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Login</button>
            <button type="button" onClick={redirect}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
