import { useState } from "react";
//import './DeleteProfile.css';

function DeleteProfiles(){
    const [id,setProfileId] = useState("");
    var profile;
    var clickDelete = ()=>{
        alert('You clicked the button');
       profile={
        "ProfileId":id,
        }
        console.log(profile);
        fetch('http://localhost:5191/api/Profile',
        {
            method:'Delete',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
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
            <input id="pProfileId" type="text" className="form-control" value={id} onChange={(e)=>{setProfileId(e.target.value)}}/>
            <button onClick={clickDelete} className="btn btn-primary">DeleteProfiles</button>
        </div>
    );

}
export default DeleteProfiles;