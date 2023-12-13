import { useState } from "react";
import axios from "axios";
import './Login.css'; // Import any external CSS file if needed

function LoginUser() {
  //const roles = ["Employee", "HR"];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [role, setRole] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const checkUserData = () => {
    if (username === '') {
      setUsernameError("Username cannot be empty");
      return false;
    }
    if (password === '') {
      setPasswordError("Password cannot be empty");
      return false;
    }
    // if (role === 'select') {
    //   setLoginError("Please select a role");
    //   return false;
    // }
    // return true;
  }

  const login = (event) => {
    event.preventDefault();
    

    axios.post("http://localhost:5191/api/HrEmployee/Login", {
      username: username,
      //role: role,
      password: password
    })
    .then((response) => {
      console.log(response);
      const userData = response.data;
      localStorage.setItem('username', username);
      const role = userData.role;
      localStorage.setItem('role', role);
      const token = userData.token;
      localStorage.setItem("token", token);
      setLoginError(""); // Clear any previous login errors
      alert("Login successful");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
      setLoginError("Invalid username, password, or role"); 
    });
  }

  return (
    <div className='login-root'>
      <div className='box-root padding-top--24 flex-flex flex-direction--column' style={{ flexGrow: 1, zIndex: 9 }}>
        <div className='formbg-outer'>
          <div className='formbg'>
            <div className='formbg-inner padding-horizontal--48'>
              <span className='padding-bottom--15'>Sign in to your account</span>
              <form id='stripe-login' onSubmit={login}>
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
                  <div className='grid--50-50'>
                    <label htmlFor='password'>Password</label>
                  </div>
                  <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='field input'
                  />
                  <label className='alert alert-danger'>{passwordError}</label>
                </div>
                <div className='footer-link padding-top--24'>
                  <span>Don't have an account? <a href='/Register'>Sign up</a></span>
                </div>
                <div className='field padding-bottom--24'>
                  <input type='submit' name='submit' value='Continue' className='field input' />
                </div>
                <div className="col-md-6 mt-5">
                  <img
                    src="Images/purple.jpg"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    alt="Timesheet"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }


export default LoginUser;
