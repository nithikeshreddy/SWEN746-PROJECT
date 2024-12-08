import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Button, Alert } from 'reactstrap';
import backgroundImage from './image.png';
import logo from './logo1.png';


const Cravemates_Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginClick = async () => {
    // Send login request
    try {
      const response = await fetch('http://127.0.0.1:4999/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        const authToken = data.result; // Assuming the API sends back an auth token

        // Store auth token in localStorage
        localStorage.setItem('authToken', JSON.stringify(authToken));

        // If login is successful, navigate to dashboard
        alert("Login successful!");

        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        const dat = await response.json();
        // If login fails, show an error message
        alert("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error('Login error:', error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <center>
          <h1>Cravemates</h1>
          <img src={logo} alt="Cravemates Logo" style={styles.logo} />
        </center>
        <h2 style={styles.loginTitle}>Login</h2>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Username:</label>
          <input
            style={styles.input}
            type="text"
            id="email"
            name="email"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">Enter Password:</label>
          <input
            style={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.loginLink}>
          <button style={styles.loginButton} onClick={handleLoginClick}>
          Login
          </button>
        
        </div>

        <div style={styles.loginLink}>
          <Link to="/signup">
            <a href="#">Already have an Account? Sign Up</a>
          </Link>
        </div>
      </div>
    </div>
  );
};


const styles = {
  loginContainer: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#f4f4f4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  loginCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '400px',
    maxWidth: '100%',
    padding: '20px',
    boxSizing: 'border-box',
  },
  loginTitle: {
    textAlign: 'center',
    color: '#333',
  },
  logo: {
    width: '150px',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    margin: '10px 0 5px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  loginButton: {
    backgroundColor: '#ff5900',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
  },
  loginLink: {
    textAlign: 'center',
    marginTop: '15px',
  },
};


export default Cravemates_Login;
