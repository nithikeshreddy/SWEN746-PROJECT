import React, { useState, useEffect } from 'react';
import './Settings.css'; // Import the stylesheet
import Navbar from './Navbar'; // Import the Navbar component

const Settings = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    // Fetch user settings from the server
    fetch('http://localhost:4999/settings', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => response.json())
      .then(data => setSettings(data))
      .catch(error => console.error('Error fetching settings:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSave = () => {
    // Save updated settings to the server
    fetch('http://localhost:4999/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(settings)
    })
      .then(response => response.json())
      .then(data => setSettings(data))
      .catch(error => console.error('Error saving settings:', error));
  };

  return (
    <div>
      <Navbar /> {/* Add the Navbar component */}
      <div className="settings-container">
        <h1>Settings</h1>
        <label>
          Notification Preferences:
          <input type="text" name="notification_preferences" value={settings.notification_preferences} onChange={handleInputChange} />
        </label>
        <label>
          Privacy Settings:
          <input type="text" name="privacy_settings" value={settings.privacy_settings} onChange={handleInputChange} />
        </label>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Settings;
