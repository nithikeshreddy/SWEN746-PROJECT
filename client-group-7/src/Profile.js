import React, { useState, useEffect } from 'react';
import './Profile.css'; // Import the stylesheet


const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch user profile data from the server
     setProfile(JSON.parse(localStorage.getItem('authToken')));

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    // Save updated profile data to the server
    fetch('http://localhost:4999/update/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(profile)
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('authToken',JSON.stringify(data.result));
        setProfile(data.result);
        setEditMode(false);
      })
      .catch(error => console.error('Error saving profile:', error));
  };

  return (
    <div>
      {/* <Navbar /> Add the Navbar component */}
      <div className="profile-container">
        <h1>Profile</h1>
        {editMode ? (
          <div className="profile-form">
            <label>
              Name:
              <input type="text" name="name" value={profile.name} onChange={handleInputChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={profile.email} onChange={handleInputChange} />
            </label>
            <label>
              Phone Number:
              <input type="text" name="phone_number" value={profile.phone_number} onChange={handleInputChange} />
            </label>
            <label>
              Gender:
              <input type="text" name="gender" value={profile.gender} onChange={handleInputChange} />
            </label>
            <label>
              Allergies:
              <input type="text" name="allergies" value={profile.allergies} onChange={handleInputChange} />
            </label>
            <label>
              Present Craving:
              <input type="text" name="present_craving" value={profile.present_craving} onChange={handleInputChange} />
            </label>
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div className="profile-details">
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Phone Number: {profile.phone_number}</p>
            <p>Gender: {profile.gender}</p>
            <p>Allergies: {profile.allergies}</p>
            <p>Present Craving: {profile.present_craving}</p>
            <button onClick={() => setEditMode(true)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
