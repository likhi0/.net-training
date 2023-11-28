import React, { useState, useEffect } from "react";
import axios from "axios";

function LeaveRequests() {
  const [username,setUsername] = useState("");
  const [leaveRequestsList, setLeaveRequestsList] = useState([]);
  var getLeaveRequest = (event)=>{
    event.preventDefault();
    console.log(username);
    axios.get("http://localhost:5191/api/LeaveRequest",{
      params: {
        username: username,
      },
        
       
    })
    .then((response)=>{
      const posts=response.data;
      //console.log(posts);
      setLeaveRequestsList(posts);
      //console.log(leaveRequestsList);

  
    })
    .catch((err)=>{
      console.log(err)
    })  

  }
  var checkleaverequest = leaveRequestsList.length>0?true:false;
  return(
    <div className="searchBox">
    <h1 className="alert alert-success">LeaveRequest</h1>
    
    <form>      
      <br/>   
      <div class="row"> 
        <label className="form-control highlight-label">Username</label>
        <input id="pusername" type="text" class="form-control" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
      </div>
      <div class="row">
          <button className="btn btn-success" onClick={getLeaveRequest}>Get All LeaveRequests</button>
      </div>
      </form>
      {checkleaverequest? 
            <div >
                {leaveRequestsList.map((leaveRequest)=>
                    <div key={leaveRequest.id} className="alert alert-primary">
                        leaveRequest startDate : {leaveRequest.startDate}
                        <br/>
                        leaveRequest endDate : {leaveRequest.endDate}
                        <br/>
                        leaveRequest status: {leaveRequest.status}
                </div>)}
            </div>
            :
            <div>No leaverequest available yet</div>
            }
    </div>

  
  );
}
export default LeaveRequests;
