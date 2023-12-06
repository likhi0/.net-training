import React, { useState } from "react";
import axios from "axios";
import './RegisterUser.css';

function RegisterUser() {
    const roles = ["Employee", "HR"];
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const checkUserData = () => {
        if (username === '') {
            setUsernameError("Username cannot be empty");
            return false;
        }

        if (password === '') {
            return false;
        }

        if (role === 'select') { // Change 'Select Role' to 'select'
            return false;
        }

        return true;
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
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (

        <form className="registerForm">
            <label className="form-control">Username</label>
            <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => { setUsername(e.target.value) }}
            />
            <label className="alert alert-danger">{usernameError}</label>
            <label className="form-control">Password</label>
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
            />

            <select
                className="form-select"
                onChange={(e) => { setRole(e.target.value) }}
                value={role}
            >
                <option value="select">Select Role</option>
                {roles.map((r) => (
                    <option value={r} key={r}>{r}</option>
                ))}
            </select>
            <br />
            <button className="btn btn-primary button" onClick={signUp}>Sign Up</button>
            
        </form>
    );
}

export default RegisterUser;
