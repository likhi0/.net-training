import { useState } from "react";

function UpdateProfile() {
  const profileId = localStorage.getItem('profileId');
  const username = localStorage.getItem('username');
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName'));
  const [lastName, setLastName] = useState(localStorage.getItem('lastName'));
  const [contactNumber, setContactNumber] = useState(localStorage.getItem('contactNumber'));
  const [jobTitle, setJobTitle] = useState(localStorage.getItem('jobTitle'));

  const clickAdd = () => {
    alert('You clicked the button');
    const profile = {
      "profileId": profileId,
      "username": username,
      "firstName": firstName,
      "lastName": lastName,
      "contactNumber": contactNumber,
      "jobTitle": jobTitle
    };
    console.log(profile);

    fetch('http://localhost:5191/api/Profile', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Server response:', data);
        alert('Update Added');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error updating profile');
      });
  };

  return (
    <div className="body">
    <div className="timesheet-list">
    <div className="inputcontainer" style={styles.inputContainer}>
      <div className="form-row" style={styles.formRow}>
        <label htmlFor="profileId" className="form-control-label" style={styles.label}>Id</label>
        <input id="profileId" type="text" className="form-control" value={profileId} readOnly />
      </div>

      <div className="form-row" style={styles.formRow}>
        <label htmlFor="username" className="form-control-label" style={styles.label}>UserName</label>
        <input id="username" type="text" className="form-control" value={username} readOnly />
      </div>

      <div className="form-row" style={styles.formRow}>
        <label htmlFor="firstName" className="form-control-label" style={styles.label}>FirstName</label>
        <input id="firstName" type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>

      <div className="form-row" style={styles.formRow}>
        <label htmlFor="lastName" className="form-control-label" style={styles.label}>LastName</label>
        <input id="lastName" type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>

      <div className="form-row" style={styles.formRow}>
        <label htmlFor="contactNumber" className="form-control-label" style={styles.label}>Contact Number:</label>
        <input id="contactNumber" type="number" className="form-control" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
      </div>

      <div className="form-row" style={styles.formRow}>
        <label htmlFor="jobTitle" className="form-control-label" style={styles.label}>JobTitle</label>
        <input id="jobTitle" type="text" className="form-control" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
      </div>

      <button onClick={clickAdd} className="btn btn-primary" style={styles.button}>Update Profile</button>
      <div className="col-sm-3 text-center"> 
      <a
        href="/UserProfile"
        className="text-decoration-black mb-3 text-info fw-bold"
        style={{ fontSize: '14px', color: 'black' }} 
      > 
         Back
      </a>
    </div>
    </div>
    </div>
    </div>
  );
}

const styles = {
  body: {
    backgroundColor: '#f0f0f0', // Light grey background color for the entire page
    minHeight: '100vh', // Ensure the container takes at least the full height of the viewport
    display: 'flex',
    flexDirection: 'column', // Remove default padding
    fontFamily: 'Arial, sans-serif', // Adjust font if needed
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    border:'3px solid black'
  },
  formRow: {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    marginRight: '20px',
    width: '80px',
    textAlign: 'left',
  },
  button: {
    marginTop: '20px',
  },
  profileContainer: {
    marginTop: '20px',
  },
  formcontrol: {
    marginbottom: '10px',
    width: '100%',
  },
  circularIcon: {
    position: 'absolute',
    top: '50%',
    right: '-10px', // Adjust the distance from the right side
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'red',
    // Add your circular icon styles here
  },
};

export default UpdateProfile;
