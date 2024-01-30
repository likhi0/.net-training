import React from "react";


function Logout() {
  function handleLogout() {

    localStorage.removeItem("username");
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('profileId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('contactNumber');
    localStorage.removeItem('jobTitle');
    localStorage.removeItem('timesheetID');
    
  }

  return (
    <div style={styles.body}>
    <div
    className="logout-container"
    style={{ padding: '200px' }}
   
    >
      <h1 style={{fontSize:'100px',color:'Black',marginTop:'10px', align: 'center'}}>Thank You!</h1>
      <br></br>
      <a href="/Home" onClick={handleLogout} className="Logout">
      
      <strong>Logout</strong>
       
      </a>
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
}

export default Logout;