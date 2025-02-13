import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  //window.location.reload();
  return (
    <div>
      <nav
        data-aos="slide-down"
        data-aos-duration="1000"
        className="navbar navbar-expand-md navbar-light fixed-top bg-lightpurple px-sm-5 shadow py-3"
      >
        <div className="container-fluid">
          <a
            className="navbar-brand brand fw-bold"
            style={{ color: "#6600cc" }}
            href="/home"
          >
            TimeSheetHREmployee
          </a>

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
          <div
            className="collapse d-md-flex justify-content-end navbar-collapse "
            id="navbarTogglerDemo02"
          >
            <ul className="navbar-nav navigations">
              <li className="nav-item ">
                <a className="nav-link active" aria-current="page" href="/Home">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Profile
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                >
                  <Link className="dropdown-item" to="/AddProfiles">
                    Add Profile
                  </Link>
                  <Link className="dropdown-item" to="/UserProfile">
                    User Profile
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  TimeSheet
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                >
                  <Link className="dropdown-item" to="TimeSheet">
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
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Leave
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                >
                  <Link className="dropdown-item" to="/LeaveRequest">
                    LeaveRequest
                  </Link>
                  <Link className="dropdown-item" to="/LeaveList">
                    LeaveList
                  </Link>
                  <Link className="dropdown-item" to="/ApprovalList">
                    Approval
                  </Link>
                </div>
              </li>
              <li className="nav-item ">
                <a className="nav-link" aria-current="page" href="/Tasks">
                  Task
                </a>{" "}
              </li>
              <li className="nav-item ">
                <a
                  className="nav-link"
                  aria-current="page"
                  href="/Approval"
                >
                  Approval
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" aria-current="page" href="/Logout">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Menu;