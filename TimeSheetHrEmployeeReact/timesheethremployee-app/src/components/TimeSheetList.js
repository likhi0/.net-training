import React, { useState, useEffect } from "react";
import axios from "axios";

function TimeSheetList() {
  const UserName = localStorage.getItem('username');
  const [timeSheetList, setTimeSheetList] = useState([]);
  var getTimeSheet = (event)=>{
    event.preventDefault();
    console.log(UserName);
    axios.get("http://localhost:5191/api/TimeSheet",{
      params: {
        "UserName": UserName,
      },
        
       
    })
    .then((response)=>{
      const posts=response.data;
      //console.log(posts);
      setTimeSheetList(posts);
      //console.log(leaveRequestsList);

  
    })
    .catch((err)=>{
      console.log(err)
    })  

  }
  var checktimeSheet = timeSheetList.length>0?true:false;
  return(
    <div className="registerForm">
    <h1 className="alert alert-success">TimeSheet</h1>
    
    <form>      
      <br/>   
      <div class="row"> 
        <label className="form-control highlight-label">Username</label>
        <input id="pusername" type="text" class="form-control" value={UserName} placeholder="Enter the Email"
        />
      </div>
      <div class="row">
          <button className="btn btn-success" onClick={getTimeSheet}>Get All TimeSheets</button>
      </div>
      </form>
      {checktimeSheet? 
            <div >
                {timeSheetList.map((timeSheet)=>
                    <div key={timeSheet.id} className="alert alert-primary">
                        timeSheet Id:{timeSheet.timesheetID}
                        <br/>
                        timeSheet period: {timeSheet.period}
                        <br/>
                        timeSheet hoursWorked : {timeSheet.hoursWorked}
                        <br/>
                        timeSheet overtime: {timeSheet.overTime}
                </div>)}
            </div>
            :
            <div>No timesheet available yet</div>
            }
    </div>

  
  );
}
export default TimeSheetList;
