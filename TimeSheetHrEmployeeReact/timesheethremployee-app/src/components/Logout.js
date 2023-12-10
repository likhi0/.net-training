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
    style={{ backgroundColor: '#f0f0f0', padding: '200px' }}
   
    >
      <h1 style={{fontSize:'100px',color:'Black',marginTop:'10px', align: 'center'}}>Thank You!</h1>
      <br></br>
      <a href="/Home" onClick={handleLogout} className="Logout">
      
      <strong>Logout</strong>
       
      </a>
      <div className="col-md-6 mt-5">
        <img src="Images/purple.jpg" style={{ width: "100%", height: "100%" }} alt="Timesheet" />
      </div>
    </div>
  );
}

export default Logout;