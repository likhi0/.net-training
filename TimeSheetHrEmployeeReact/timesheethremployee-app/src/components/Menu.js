import React from "react";
//import {NavLink} from "react-router-dom";


function Menu()
{
    return(
        <div>

<nav data-aos="slide-down" data-aos-duration="1000" class="navbar navbar-expand-md navbar-light fixed-top bg-white px-sm-5 shadow py-3">
            <div class="container-fluid">
              <a class="navbar-brand brand fw-bold" style={{color: '#6600cc'}} href="/home"> TimeSheetHREmployee</a>
          
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse d-md-flex justify-content-end navbar-collapse " id="navbarTogglerDemo02">
                <ul class="navbar-nav navigations">
                  <li class="nav-item "> <a class="nav-link active" aria-current="page" href="/Home">Home</a></li>
                 
                   <li class="nav-item "> <a class="nav-link" aria-current="page" href="/Login">Login</a></li>
                   
                  <li class="nav-item "> <a class="nav-link" aria-current="page" href="/Register">Sign Up</a></li>
                  <li class="nav-item "> <a class="nav-link" aria-current="page" href="/AddProfiles">Profile</a></li>
                  <li class="nav-item "> <a class="nav-link" aria-current="page" href="TimeSheet">TimeSheet</a></li>
                  <li class="nav-item "> <a class="nav-link" aria-current="page" href="/LeaveRequest">Leave</a></li>
                  <li class="nav-item "> <a class="nav-link" aria-current="page" href="/Tasks">Task</a></li>
                  <li class="nav-item "> <a class="nav-link" aria-current="page" href="/Approval">Approval</a></li>
                  <li class="nav-item "> <a class="nav-link" aria-current="page" href="/Logout">Logout</a></li>


          
                 
                </ul>
                
              </div>
            </div>
          </nav>
        
</div>
        
    )
}
export default Menu;