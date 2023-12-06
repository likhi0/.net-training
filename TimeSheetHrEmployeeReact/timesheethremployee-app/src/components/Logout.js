import React from "react";


function Logout() {
  function handleLogout() {

    localStorage.removeItem("username");
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    
  }

  return (
    <div
    className="logout-container"
    style={{ backgroundColor: '#f0f0f0', padding: '200px' }}
   
    >
      <h1 style={{fontSize:'100px',color:'Blue',marginTop:'10px', align: 'center'}}>Thank You!</h1>
      <br></br>
      <a href="/Home" onClick={handleLogout} className="Logout">
      
      <strong>Logout</strong>
       
      </a>
    </div>
  );
}

export default Logout;