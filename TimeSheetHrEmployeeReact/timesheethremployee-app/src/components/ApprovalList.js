import React, { useState, useEffect } from "react";
import axios from "axios";

function TimeSheetList() {
  const [timesheetid,setTimeSheetId] = useState("");
  const [approvalList, setApprovalList] = useState([]);
  var getApproval = (event)=>{
    event.preventDefault();
    console.log(timesheetid);
    axios.get("http://localhost:5191/api/Approval",{
      params: {
        timesheetid: timesheetid,
      },
        
       
    })
    .then((response)=>{
      const posts=response.data;
      //console.log(posts);
      setApprovalList(posts);
      //console.log(leaveRequestsList);

  
    })
    .catch((err)=>{
      console.log(err)
    })  

  }
  var checkapproval = approvalList.length>0?true:false;
  return(
    <div className="registerForm">
    <h1 className="alert alert-success">Approvals</h1>
    
    <form>      
      <br/>   
      <div class="row"> 
        <label className="form-control highlight-label">TimeSheetId</label>
        <input id="pusername" type="text" class="form-control" value={timesheetid} placeholder="Enter the Email"
         onChange={(e)=>{setTimeSheetId(e.target.value)}}/>
      </div>
      <div class="row">
          <button className="btn btn-success" onClick={getApproval}>Get All Appprovals</button>
      </div>
      </form>
      {checkapproval? 
            <div >
                {approvalList.map((approval)=>
                    <div key={approval.id} className="alert alert-primary">
                        approval Approvedby:{approval.approvedby}
                        <br/>
                        approval aprrovedDate: {approval.aprrovedDate}
                        <br/>
                        approval status : {approval.status}
                        <br/>
                        approval comment: {approval.comment}
                </div>)}
            </div>
            :
            <div>No Approvals available yet</div>
            }
    </div>

  
  );
}
export default TimeSheetList;
