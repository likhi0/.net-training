import { useState } from "react";
import './AddProfile.css';

function DeleteProfiles(){
    const [ProfileId,setProfileId] = useState("");
    var profile;
    var clickDelete = ()=>{
        alert('You clicked the button');
       profile={
        "ProfileId":ProfileId,
        }
        console.log(profile);
        fetch('http://localhost:5191/api/Profile',
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                //'Authorization':'Bearer '+localStorage.getItem("token"),
            },
            body:JSON.stringify(profile)
        }).then(
            ()=>{
                alert("Profile Deleted");
            }
        ).catch((e)=>{
            console.log(e)
        })
    }
    return(
        <div className="inputcontainer">
            <label className="form-control" for="ProfileId">ProfileId</label>
            <input id="pProfileId" type="text" className="form-control" value={ProfileId} onChange={(e)=>{setProfileId(e.target.value)}}/>
            <button onClick={clickDelete} className="btn btn-primary">DeleteProfiles</button>
        </div>
    );

}
export default DeleteProfiles;
