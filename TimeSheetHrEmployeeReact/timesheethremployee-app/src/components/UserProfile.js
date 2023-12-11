import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const userName = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userName) {
          const response = await axios.get("http://localhost:5191/api/Profile", {
            params: {
              UserName: userName,
            },
          });

          const user = response.data;
          localStorage.setItem('profileId', user.profileId);
          localStorage.setItem('firstName', user.firstName);
          localStorage.setItem('lastName', user.lastName);
          localStorage.setItem('contactNumber', user.contactNumber);
          localStorage.setItem('jobTitle', user.jobTitle);

          setUserData(user);
        } else {
          console.error("No authentication token found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      
        if (error.response &&
          error.response.status === 500 &&
          error.response.data &&
          error.response.data.includes("No such profile found")) {
         
          console.error("Profile not found.");
       
          navigate("/AddProfiles");
        } else {
          // Handle other errors
          console.error("Unexpected error:", error);
         
        }
      }
    };

    fetchUserData();
  }, [userName, navigate]);


  const styles = {
    userProfile: {
      textAlign: 'center',
      maxWidth: '500px',
      margin: 'auto',
      marginTop: "75px",
    marginBottom: "20px",
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#28a745', 
      margin: '20px 3',
    },
    profileDetails: {
      padding: '20px',
      border: '1px solid black',
      borderRadius: '5px',
      marginBottom: '20px',
    },
    profileDetailsItem: {
      marginBottom: '10px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      
    },
    button: {
      margin: '0 10px',
      padding: '10px 20px',
      fontSize: '10px',
      backgroundColor: 'blue'
    },
    updateButton: {
      backgroundColor: 'Teal', 
    },
    deleteButton: {
      backgroundColor: 'red', 
    },
    highlightLabel: {
      fontWeight: 'bold', 
      color: 'black', 
      // Add more styles as needed
    }
  };

  return (
    <div style={styles.userProfile}>
      <h1 style={styles.heading}>User Profile</h1>

      {userData ? (
        <div style={styles.profileDetails} className="profile-details">
        <p style={styles.highlightLabel}>Email: {userName}</p>
        <p style={styles.highlightLabel}>Profile ID: {userData.profileId}</p>
        <p style={styles.highlightLabel}>First Name: {userData.firstName}</p>
        <p style={styles.highlightLabel}>Last Name: {userData.lastName}</p>
        <p style={styles.highlightLabel}>Contact Number: {userData.contactNumber}</p>
        <p style={styles.highlightLabel}>Job Title: {userData.jobTitle}</p>
      </div>
      ) : (
        <div className="alert alert-warning">
          Error loading user data.
        </div>
      )}

      <div style={styles.buttonContainer} className="button-container">
      <button style={{ ...styles.button, ...styles.updateButton }} className="btn btn-danger button">
        <a style={{ color: 'white', textDecoration: 'none' }} href="/UpdateProfile">Edit</a>
      </button>
      <button style={{ ...styles.button, ...styles.deleteButton }} className="btn btn-danger button">
        <a style={{ color: 'white', textDecoration: 'none' }} href="/DeleteProfiles">Delete </a>
      </button>

      </div>
      <div className="col-md-6 mt-5">
        <img src="Images/purple.jpg" style={{ width: "100%", height: "100%" }} alt="Timesheet" />
      </div>
    </div>
  );
}

export default UserProfile;
