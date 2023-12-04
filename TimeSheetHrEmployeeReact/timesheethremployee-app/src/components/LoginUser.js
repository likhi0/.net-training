import { useState } from "react";
import './Login.css';
import axios from "axios";

function LoginUser(){
    const roles =["Employee","HR"];
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    //const [repassword,setrePassword] = useState("");
    const [role,setRole] = useState("");
    var [usernameError,setUsernameError]=useState("");
    var [passwordError,setPasswordError]=useState("");
    var checkUSerData = ()=>{
        if(username=='')
        {
            setUsernameError("Username cannot be empty");
            return false;
        }
        if(password=='')
        {
            setPasswordError("Password cannot be empty");
            return false;
        }
        if(role=='Select Role')
            return false;
        return true;
    }
    const Login = (event)=>{
        event.preventDefault();
        var checkData = checkUSerData();
        if(checkData==false)
        {
            alert('please check yor data')
            return;
        }
        
        axios.post("http://localhost:5191/api/HrEmployee/Login",{
            username: username,
            role:	role,
            password:password
    })
        .then((userData)=>{
            console.log(userData)
            localStorage.setItem('username', username);
            localStorage.setItem('role', role);
      
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return(
        <form className="registerForm">
            <label className="form-control">Username</label>
            <input type="text" className="form-control" value={username} placeholder="Enter the email"
                    onChange={(e)=>{setUsername(e.target.value)}}/>
           <label className="alert alert-danger">{usernameError}</label>
            <label className="form-control">Password</label>
            <input type="password" className="form-control" value={password} placeholder="Enter password"
                    onChange={(e)=>{setPassword(e.target.value)}}/>
            <label className="alert alert-danger">{passwordError}</label>
            <label className="form-control">Role</label>
            <select className="form-select" onChange={(e)=>{setRole(e.target.value)}}>
                <option value="select">Select Role</option>
                {roles.map((r)=>
                    <option value={r} key={r}>{r}</option>
                )}
            </select>
            <br/>
            <button className="btn btn-primary button" onClick={Login}>Login</button>
            
            <button className="btn btn-danger button">Cancel</button>
            <div className="row mt-9 ">
                      <div class="col-sm-3"></div>
                      <div class="col-sm-3">
                        <a
                          href="/Register"
                          className="text-decoration-black mb-3 text-info fw-bold "
                        >
                          NewUser?
                        </a>
                      </div>
            </div>
        </form>
    );
}
export default LoginUser;
