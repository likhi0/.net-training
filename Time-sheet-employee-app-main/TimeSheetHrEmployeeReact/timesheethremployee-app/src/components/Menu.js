import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Menu() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Simulate a function to check the user's login status and role (replace with your actual logic)
  const initializeLoginState = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setLoggedIn(!!token);
    setUserRole(role);
  };

  useEffect(() => {
    initializeLoginState(); // Initialize login state when the component mounts

    // ... (rest of the useEffect code)

  }, []);

  const handleLogout = () => {
    // Simulate a logout action (replace with your actual logout logic)
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setLoggedIn(false);
    setUserRole(null);
  };

  return (
    <div>
      <nav
        data-aos="slide-down"
        data-aos-duration="1000"
        className="navbar navbar-expand-md navbar-light fixed-top bg-lightgrey px-sm-5 shadow py-3"
      >
        <div className="container-fluid">
          <Link className="navbar-brand brand fw-bold" style={{ color: "#6600cc" }} to="/home">
            TimeSheetHREmployee
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse d-md-flex justify-content-end navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav navigations">
              <li className="nav-item">
                <Link className="nav-link" to="/Home"></Link>
              </li>

              {isLoggedIn && userRole === "Hr" ? (
                <>
                  {/* HR Role Menu Items */}
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Profile
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to="/AddProfiles">
                        Add Profile
                      </Link>
                      <Link className="dropdown-item" to="/UserProfile">
                        User Profile
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Tasks">
                      Task
                    </Link>
                  </li>
                  <li className="nav-item">
                  <Link className="dropdown-item" to="/EmployeeTimesheet">
                        EmployeeTimeSheets
                      </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Approval">
                      Approval
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/Logout" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : isLoggedIn && userRole === "Employee" ? (
                <>
                  {/* Employee Role Menu Items */}
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Profile
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to="/UserProfile">
                        User Details
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      TimeSheet
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to="/TimeSheet">
                        Timesheet
                      </Link>
                     
                      <Link className="dropdown-item" to="/TimeSheetList">
                        TimeSheetList
                      </Link>
                      <Link className="dropdown-item" to="/TaskList">
                        Tasks
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Leave
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to="/LeaveRequest">
                        LeaveRequest
                      </Link>
                      <Link className="dropdown-item" to="/LeaveList">
                        LeaveList
                      </Link>
                      
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link className="dropdown-item" to="/ApprovalList">
                      Approval
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Logout" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* Default Menu Items (when not logged in or role not determined) */}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
