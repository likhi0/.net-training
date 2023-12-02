import React, { useState } from 'react';
import axios from 'axios';

const ProfileDeleteComponent = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5191/api/Profile/DeleteProfile?username=${username}`);

      if (response.status === 200) {
        setMessage('Profile deleted successfully');
      } else {
        setMessage('Failed to delete profile');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('Profile not found. Please check the username and try again.');
      } else {
        console.error('Error deleting profile:', error);
        setMessage('Failed to delete profile');
      }
    }
  };

  return (
    <div>
      <h2>Delete Profile</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <button onClick={handleDelete}>Delete Profile</button>
      <p>{message}</p>
    </div>
  );
};

export default ProfileDeleteComponent;
