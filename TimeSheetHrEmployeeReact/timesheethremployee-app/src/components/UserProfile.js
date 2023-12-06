import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserProfile.css';
function UserProfile() {
  const [userData, setUserData] = useState(null);
  const UserName = localStorage.getItem("username");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //const UserName = localStorage.getItem("username");


        if (UserName) {
          const response = await axios.get("http://localhost:5191/api/Profile", {
            params: {
              UserName: UserName,
            },
          });

          const user = response.data;
          setUserData(user);
        } else {
          console.error("No authentication token found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="userProfile">
      <h1 className="alert alert-success">Profile</h1>

      {userData ? (
        <div className="alert alert-primary">
          <p>Email: {UserName}</p>
          <p>Profile Id: {userData.profileId}</p>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Contact Number: {userData.contactNumber}</p>
          <p>Job Title: {userData.jobTitle}</p>
          {/* Include other user data fields as needed */}
        </div>
      ) : (
        <div className="alert alert-warning">
          Error loading user data.
        </div>
      )}
      <button className="btn btn-danger button">
            <a class="nav-link" aria-current="page" href="/UpdateProfile">Update</a>            
            </button>
            <button className="btn btn-danger button">
            <a class="nav-link" aria-current="page" href="/DeleteProfiles">Delete</a>            
            </button>
    </div>
  );
}

export default UserProfile;
