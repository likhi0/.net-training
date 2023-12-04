import React from "react";


function Logout() {
  function handleLogout() {
  
  }

  return (
    <div
    className="logout-container"
   
    >
      <h1 style={{fontSize:'80px',color:'Blue',marginTop:'-30px'}}>Thank You!</h1>
      <br></br>
      <a href="/" onClick={handleLogout} className="Logout">
      <strong>Logout</strong>
       
      </a>
    </div>
  );
}

export default Logout;