import React from "react";
import './Home.css';

export default function Home() {
  return (
    <div className="row pt-5 mt-5 justify-content-center align-items-center">
      <div className="col-md-6 mt-5 p-5">
        <div className="row mt-5 text-center">
          <a className="col-md-9 btn btn-warning px-5 py-3 fw-bold" href="/Register">
            sign up
          </a>
          <a className="col-md-9 btn btn-warning mt-3 px-5 py-3 fw-bold" href="/login">
            login
          </a>
        </div>
      </div>

      <div className="col-md-6 mt-5">
        <img src="Images/timesheet1.png" style={{ width: "100%", height:"180%" }} alt="Timesheet" />
      </div>
    </div>
  );
}
