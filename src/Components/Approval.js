import { useState } from "react";
import axios from "axios";

function Approval(){
    const statuses=["Approved","Disapproved"];
    const [timesheetID,setTimeSheetID] = useState("");
    const [approvedby,setApprovedBy] = useState("");
    const [aprrovedDate,setApprovedDate] = useState("");
    const [status,setStatus] = useState("");
    const [comment,setComment] = useState("");
    
    var [timesheetIDError,setTimeSheetIDError]=useState("");
    var checkUSerData = ()=>{
        if(timesheetID=='')
        {
            setTimeSheetIDError("TimesheetId cannot be empty");
            return false;
        }
        if(status=='Select Status')
            return false;
        if(approvedby=='')
            return false;
        if(aprrovedDate=='')
            return false;
        if(comment=='')
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
        axios.post("http://localhost:5191/api/Approval",{
            timesheetID:timesheetID,
            approvedby:approvedby,
            aprrovedDate:aprrovedDate,
            status:status,
            comment:comment
           
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
            <label className="form-control highlight-label">TimeSheetID</label>
            <input type="number" className="form-control" value={timesheetID} 
                    onChange={(e)=>{setTimeSheetID(e.target.value)}}/>
           <label className="alert alert-danger">{timesheetIDError}</label>
            <label className="form-control highlight-label">ApprovedBy</label>
            <input type="approvedby" className="form-control" value={approvedby} 
                    onChange={(e)=>{setApprovedBy(e.target.value)}}/>
            <label className="form-control highlight-label">ApprovedDate</label>
            <input type="date" className="form-control" value={aprrovedDate} 
                    onChange={(e)=>{setApprovedDate(e.target.value)}}/>
                     <label className="form-control highlight-label">Comment</label>
            <input type="text" className="form-control" value={comment} 
                    onChange={(e)=>{setComment(e.target.value)}}/>
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
