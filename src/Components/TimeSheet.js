import { useState } from "react";
import './TimeSheet.css';
import axios from "axios";

function TimeSheet(){
    const periods=["Daily","Weekly","Monthly"];
    const [username,setUsername] = useState("");
    const [period,setPeriod] = useState("");
    const [hoursWorked,setHoursWorked] = useState("");
    const [overtime,setOverTime] = useState("");
    var [usernameError,setUsernameError]=useState("");
    var checkUSerData = ()=>{
        if(username=='')
        {
            setUsernameError("Username cannot be empty");
            return false;
        }
        if(period=='Select Period')
            return false;
        if(hoursWorked=='')
            return false;
        if(overtime=='')
            return false;
        return true;
    }
    const Enter = (event)=>{
        event.preventDefault();
        var checkData = checkUSerData();
        if(checkData==false)
        {
            alert('please check yor data')
            return;
        }
        axios.post("http://localhost:5191/api/TimeSheet",{
            username: username,
            period:	period,
            hoursWorked:hoursWorked,
            overtime:overtime
    })
        .then((userData)=>{
            console.log(userData)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return(
        <form className="registerForm">
            <label className="form-control">Username</label>
            <input type="text" className="form-control" value={username} 
                    onChange={(e)=>{setUsername(e.target.value)}}/>
           <label className="alert alert-danger">{usernameError}</label>
            <label className="form-control">HoursWorked</label>
            <input type="hoursWorked" className="form-control" value={hoursWorked} 
                    onChange={(e)=>{setHoursWorked(e.target.value)}}/>
            <label className="form-control">OverTime</label>
            <input type="number" className="form-control" value={overtime} 
                    onChange={(e)=>{setOverTime(e.target.value)}}/>
            <label className="form-control">Period</label>
            <select className="form-select" onChange={(e)=>{setPeriod(e.target.value)}}>
                <option value="select">Select Period</option>
                {periods.map((r)=>
                    <option value={r} key={r}>{r}</option>
                )}
            </select>
            <br/>
            <button className="btn btn-primary button" onClick={Enter}>Enter</button>
            
            <button className="btn btn-danger button">Cancel</button>
        </form>
    );
        

}
export default TimeSheet;
