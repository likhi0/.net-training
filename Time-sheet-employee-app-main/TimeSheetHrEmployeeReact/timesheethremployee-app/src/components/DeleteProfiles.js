import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const ProfileDeleteComponent = () => {
  const UserName = localStorage.getItem('username');
  const role = localStorage.getItem("role");

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
      const [error, setError] = useState("");
      if (role !== "HR") {
        alert("You don't have access to this page");
        setTimeout(() => {
          navigate("/Home");
        }, 0);
        return null;
      } 

      const handleDelete = async () => {
        try {
          const response = await axios.delete(
            `http://localhost:5191/api/Profile/DeleteProfile?username=${UserName}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
    
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
    <div style={{ textAlign: 'center', margin: '80px auto', maxWidth: '400px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>Delete Profile</h2>
      <label style={{ display: 'block', marginBottom: '10px' ,fontWeight: 'bold',}}>
        Email:
        <input type="text" value={UserName} style ={{border: '10px solid #ccc',borderRadius: '3px',}}/>
      </label>
      <button style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={handleDelete}>
        Delete Profile
      </button>
      <p style={{ marginTop: '10px' }}>{message}</p>
        <div className="row mt-9">
        <div className="col-sm-3"></div>
        <div className="col-sm-3 text-center">
      <a
        href="/Home"
        className="text-decoration-black mb-3 text-info fw-bold"
        style={{ fontSize: '14px', color: 'black' }} 
      > 
         Back
      </a>
    </div>
  </div>

  </div>
    
  );
  
};

export default ProfileDeleteComponent;
