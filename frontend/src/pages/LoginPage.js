import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const normalUserResponse = await axios.get(`http://127.0.0.1:8000/api/users/normal-user/?email=${formData.email}`);
      const gameDeveloperResponse = await axios.get(`http://127.0.0.1:8000/api/users/game-developer/?email=${formData.email}`);

      const normalUserExists = normalUserResponse.data.length > 0;
      const gameDeveloperExists = gameDeveloperResponse.data.length > 0;

      if (normalUserExists || gameDeveloperExists) {
        let user = null;
        let role = null;

        if (normalUserExists) {
          user = normalUserResponse.data[0];
          role = 'Normal User';
        } else if (gameDeveloperExists) {
          user = gameDeveloperResponse.data[0];
          role = 'Game Developer';
        }

        if (user.password === formData.password) {
          alert(`Login successful! Role: ${role}, Name: ${user.name}, Email: ${user.email}`);

          if (role === 'Normal User') {
            navigate(`/UserDashboard/${user.email}`);
          } else if (role === 'Game Developer') {
            navigate(`/DeveloperDashboard/${user.email}`);
          }
        } else {
          alert('Invalid email or password. Please try again.');
        }
      } else {
        alert('User not found. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in. Please try again later.');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  form: {
    width: '300px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Login;
