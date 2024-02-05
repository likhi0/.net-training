import { useState } from "react";
import axios from "axios";
import './Login.css'; // Import any external CSS file if needed
import { useNavigate } from "react-router-dom";
 
function LoginUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
 
  const checkUserData = () => {
    if (username === '') {
      setUsernameError("Username cannot be empty");
      return false;
    }
    if (password === '') {
      setPasswordError("Password cannot be empty");
      return false;
    }
    return true;
  }
 
  const login = (event) => {
    event.preventDefault();
 
    if (!checkUserData()) {
      return;
    }
 
    axios.post("http://localhost:5191/api/HrEmployee/Login", {
      username: username, // Ensure this matches your backend API expectations
      password: password // Ensure this matches your backend API expectations
    })
    .then((response) => {
      const userData = response.data;
      localStorage.setItem('username', username);
      const role = userData.role;
      localStorage.setItem('role', role);
      const token = userData.token;
      localStorage.setItem("token", token);
      setLoginError(""); // Clear any previous login errors
      alert("Login successful");
      // Navigate to welcome page
      navigate('/Welcome');
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
     alert("Invalid username or password"); // Use window.alert for a native alert
    });
  }
 
  return (
  <div className='body'>
    <div className='login-root'>
      <div className='box-root padding-top--24 flex-flex flex-direction--column' style={{ flexGrow: 1, zIndex: 9 }}>
        <div className='formbg-outer'>
          <div className='formbg'>
            <div className='formbg-inner padding-horizontal--48'>
              <span className='padding-bottom--15'>Sign in to your account</span>
              <form id='stripe-login' onSubmit={login}>
                <div className='field padding-bottom--24'>
                  <label htmlFor='username'>Username</label>
                  <input
                    type='text'
                    name='username'
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
 
export default LoginUser;