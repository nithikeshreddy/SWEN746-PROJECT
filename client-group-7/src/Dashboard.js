import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Check for user authentication
  const isAuthenticated = localStorage.getItem('authToken'); // Example authentication check

  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null; // Prevents the dashboard from rendering
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the authentication token
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.header}>
        <h1>Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </header>
      <main style={styles.mainContent}>
        <h2>Welcome to Cravemates Dashboard!</h2>
        <p>This is your central hub for managing tasks and accessing resources.</p>
        <div style={styles.cardContainer}>
          <div style={styles.card} onClick={() => navigate('/profile')}>
            <h3>Profile</h3>
            <p>View and edit your profile information.</p>
          </div>
          <div style={styles.card} onClick={() => navigate('/workshop')}>
            <h3>Workshop</h3>
            <p>Explore and register for available workshops.</p>
          </div>
          <div style={styles.card} onClick={() => navigate('/recipesharing')}>
            <h3>Recipe Sharing</h3>
            <p>Share and explore recipes with the community.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

// Styles
const styles = {
  dashboardContainer: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#ff5900',
    color: '#fff',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#fff',
    color: '#ff5900',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    textAlign: 'center',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    width: '200px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'transform 0.2s ease-in-out',
  },
  cardHover: {
    transform: 'scale(1.05)',
  },
};

export default Dashboard;