import React from "react";
import './Home.css';

export default function Home() {
  const backgroundStyle = {
    backgroundImage: `url('Images/timesheet1.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '90vh',
   // Adjust the height as needed
  };

  return (
    <div className="container-fluid p-0" style={backgroundStyle}>
      <div className="row pt-5 mt-5 justify-content-center align-items-center">
        <div className="col-md-6 mt-5 p-5 text-center">
          <a className="btn btn-warning px-5 py-3 fw-bold mb-3" href="/Register">
            Sign up
          </a>
          <a className="btn btn-warning px-5 py-3 fw-bold" href="/login">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
