import { useState } from "react";
import './AddProfile.css';

function UpdateTimeSheet(){
    const[timesheetID,settimesheetID]= useState("");
    const [username,setUsername] = useState("");
    const [period,setperiod] = useState("");
    const [hoursWorked,setHoursWorked] = useState("");
    const [overTime,setoverTime] = useState("");
    const [comments,setcomments] = useState("");
    var timesheet;
    var clickAdd = ()=>{
        alert('You clicked the button');
       timesheet={
        "timesheetID":timesheetID,
        "username":username,
        "period":period,
        "hoursWorked":hoursWorked,
        "overTime":overTime,
        "comments":comments
        }
        console.log(timesheet);
        fetch('http://localhost:5191/api/TimeSheet', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(timesheet)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
        alert('Update Added');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating timesheet');
    });

    }
    return(
        <div className="inputcontainer">
            <label className="form-control" for="pusername">Id</label>
            <input id="pusername" type="text" className="form-control" value={timesheetID} onChange={(e)=>{settimesheetID(e.target.value)}}/>
            <label className="form-control" for="pusername">UserName</label>
            <input id="pusername" type="text" className="form-control" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <label className="form-control"  for="pfirstname">period</label>
            <input id="pfirstname" type="text" className="form-control" value={period} onChange={(e)=>{setperiod(e.target.value)}}/>
            <label className="form-control"  for="plastname">hoursWorked</label>
            <input id="plastname" type="text" className="form-control" value={hoursWorked} onChange={(e)=>{setHoursWorked(e.target.value)}}/>
            <label className="form-control" for="pcontact">overTime</label>
            <input id="pcontact" type="number" className="form-control" value={overTime} onChange={(e)=>{setoverTime(e.target.value)}}/>
            <label className="form-control"  for="ptitle">comments</label>
            <input id="ptitle" type="text" className="form-control" value={comments} onChange={(e)=>{setcomments(e.target.value)}}/>
            <button onClick={clickAdd} className="btn btn-primary">UpdateTimeSheet</button>
        </div>
    );

}
export default UpdateTimeSheet;