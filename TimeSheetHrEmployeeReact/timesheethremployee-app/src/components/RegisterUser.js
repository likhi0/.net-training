import React, { useState } from "react";
import axios from "axios";
import './RegisterUser.css';

function RegisterUser() {
  const roles = ["Employee", "HR"];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const checkUserData = () => {
    if (username === '') {
      setUsernameError("Username cannot be empty");
      return false;
    }

    if (password === '') {
      setPasswordError("Password cannot be empty");
      return false;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must meet the criteria: at least 8 characters, one number, one special character, and one uppercase letter.");
      return false;
    }

    if (role === 'select') {
      return false;
    }

    return true;
  }

  const validatePassword = (inputPassword) => {
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(inputPassword);
  }

  const signUp = (event) => {
    event.preventDefault();

    const isValidData = checkUserData();

    if (!isValidData) {
      alert('Please check your data');
      return;
    }

    axios.post("http://localhost:5191/api/HrEmployee", {
      username: username,
      role: role,
      password: password
    })
      .then((userData) => {
        console.log(userData);
        alert("Register successful");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='login-roots'>
      <div className='box-root padding-top--20 flex-flex flex-direction--column' style={{ flexGrow: 1, zIndex: 9 }}>
        <div className='formbg-outer'>
          <div className='formbgs'>
            <div className='formbg-inner padding-horizontal--48'>
              <span className='padding-bottom--15'>Register the account</span>
              <form id='stripe-login' onSubmit={signUp}>
                <div className='field padding-bottom--24'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='field input'
                  />
                  <label className='alert alert-danger'>{usernameError}</label>
                </div>
                <div className='field padding-bottom--24'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='field input'
                    pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$"
                    title="Password must contain at least 8 characters, one number, one special character, and one uppercase letter."
                  />
                  <label className='alert alert-danger'>{passwordError}</label>
                </div>
                <div className='field padding-bottom--24'>
                  <label htmlFor='role'>Role</label>
                  <select
                    className='field select'
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                  >
                    <option value=''>Select Role</option>
                    {roles.map((r) => (
                      <option value={r} key={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='footer-link padding-top--24'>
                  <span>Already have an account? <a href='/Login'>Login</a></span>
                </div>
                <div className='field padding-bottom--24'>
                  <input type='submit' name='submit' value='Register' className='field input' />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
