import React, {useState} from 'react';
import {useNavigate, Link} from "react-router-dom"
import { Button, Alert } from 'reactstrap';
import backgroundImage from './image.png';
import logo from './logo1.png';



const Cravemates_SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    dateOfBirth: '', // Added DOB field
    gender: '', // Added Gender field
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);

    console.log(formData);

    try {
      const response = await fetch('http://localhost:4999/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Account created successfully! Welcome to Cravemates.');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.signUpContainer}>
      <div style={styles.signUpCard}>
        <center>
          <h1>Cravemates</h1>
          <img src={logo} alt="Cravemates Logo" style={styles.logo} />
        </center>
        <h2 style={styles.signUpTitle}>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="username">Enter Username:</label>
            <input
              style={styles.input}
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Create Password:</label>
            <input
              style={styles.input}
              type="password"
              id="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="confirmPassword">Confirm Password:</label>
            <input
              style={styles.input}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {passwordMatchError && (
            <Alert color="danger" className="mt-3">Passwords do not match</Alert>
          )}

          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email:</label>
            <input
              style={styles.input}
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile Number */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="mobile">Mobile Number:</label>
            <input
              style={styles.input}
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date of Birth */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              style={styles.input}
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="gender">Gender:</label>
            <select
              style={styles.input}
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <div style={styles.signUpLink}>
            <button style={styles.signUpButton} type="submit">Sign Up</button>
          </div>
        </form>

        <div style={styles.signUpLink}>
          <Link to="/login">
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </div>
  );
};



const styles = {
  signUpContainer: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#f4f4f4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  signUpCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '400px',
    maxWidth: '100%',
    padding: '20px',
    boxSizing: 'border-box',
  },
  logo: {
    width: '150px',
    marginBottom: '20px',
  },
  signUpTitle: {
    textAlign: 'center',
    color: '#333',
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
  signUpButton: {
    backgroundColor: '#ff5900',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
  },
  signUpButtonHover: {
    backgroundColor: '#45a049',
  },
  signUpLink: {
    textAlign: 'center',
    marginTop: '15px',
  },
};

export default Cravemates_SignUp;
