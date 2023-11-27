import { useState } from "react";
import axios from "axios";

function Approval(){
    const statuses=["Approved","Pending"];
    const [username,setUsername] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [status,setStatus] = useState("");
    
    var [usernameError,setUsernameError]=useState("");
    var checkUSerData = ()=>{
        if(username=='')
        {
            setUsernameError("Username cannot be empty");
            return false;
        }
        if(status=='Select Status')
            return false;
        if(startDate=='')
            return false;
        if(endDate=='')
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
        axios.post("http://localhost:5191/api/LeaveRequest",{
            username:username,
            startDate:startDate,
            endDate:endDate,
            status:status
        
           
    })
        .then((userData)=>{
            console.log(userData)
            alert("Data added successfully");
            //toast.success("Data added successfully");
        })
        .catch((err)=>{
            console.log(err)
            alert("Error adding data");
            //toast.error("Error adding data");
        })
    }
    return(
        <form className="registerForm">
            <h3>Leave Request</h3>
            <label className="form-control highlight-label">Username</label>
            <input type="text" className="form-control" value={username} 
                    onChange={(e)=>{setUsername(e.target.value)}}/>
            <label className="alert alert-danger">{usernameError}</label>
            <label className="form-control highlight-label">StartDate</label>
            <input type="date" className="form-control" value={startDate} 
                    onChange={(e)=>{setStartDate(e.target.value)}}/>
            <label className="form-control highlight-label">EndDate</label>
            <input type="date" className="form-control" value={endDate} 
                    onChange={(e)=>{setEndDate(e.target.value)}}/>
            <label className="form-control highlight-label">Status</label>
            <select className="form-select highlight-label" onChange={(e)=>{setStatus(e.target.value)}}>
                <option value="select">Select Status</option>
                {statuses.map((r)=>
                    <option value={r} key={r}>{r}</option>
                )}
            </select>
            <br/>
            <button className="btn btn-primary button" onClick={Enter}>Enter</button>
            
            <button className="btn btn-danger button">Cancel</button>
        </form>
    );
        

}
export default Approval;
