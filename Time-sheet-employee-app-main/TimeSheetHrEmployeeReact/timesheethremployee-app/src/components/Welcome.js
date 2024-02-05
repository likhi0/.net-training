import React from "react";
import "./Welcome.css";
import Menu from "./Menu"; 
import { useEffect } from "react";
function Welcome() {
  var username="new";
   useEffect(()=>{
    const fetchcNew=()=>{
      username = localStorage.getItem("username");
    };
    
    fetchcNew();
   },[username]);
  return (
    <div className="welcome-root">
      
      <h1>WELCOME TO TIMESHEET HR EMPLOYEE APP</h1>
    </div>
  );
}
 
export default Welcome;