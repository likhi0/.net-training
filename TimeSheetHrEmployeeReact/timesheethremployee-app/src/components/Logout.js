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
  );
}

export default Logout;