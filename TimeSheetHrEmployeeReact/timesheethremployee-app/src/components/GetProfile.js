import React, { useState, useEffect } from "react";
import axios from "axios";

function GetProfile() {
  const UserName = localStorage.getItem("username");
  const [getprofile, setGetProfile] = useState(null); // Initialize with null

  useEffect(() => {
    if (UserName) {
      axios
        .get("http://localhost:5191/api/Profile", {
          params: {
            UserName: UserName,
          },
        })
        .then((response) => {
          const profile = response.data;
          setGetProfile(profile);
        })
        .catch((err) => {
          console.log("Error fetching profile:", err);
        });
    }
  }, [UserName]);

  return (
    <div className="registerForm">
      <h1 className="alert alert-success">Profile</h1>

      <form>
        <br />
        <div className="row">
          <label className="form-control highlight-label">Username</label>
          <input
            id="pusername"
            type="text"
            className="form-control"
            value={UserName}
            placeholder="Enter the Email"
          />
        </div>
        <div className="row">
          <button className="btn btn-success" onClick={(e) => e.preventDefault()}>
            Get profile
          </button>
        </div>
      </form>

      {getprofile ? (
        <div className="alert alert-primary">
          Profile Id: {getprofile.profileId}
          <br />
          Email: {getprofile.username}
          <br />
          First Name: {getprofile.firstName}
          <br />
          Last Name: {getprofile.lastName}
          <br />
          Contact Number: {getprofile.contactNumber}
          <br />
          Job Title: {getprofile.jobTitle}
        </div>
      ) : (
        <div>No profile available yet</div>
      )}
    </div>
  );
}

export default GetProfile;
