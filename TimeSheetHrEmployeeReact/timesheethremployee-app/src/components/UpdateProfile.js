import { useState } from "react";
import './AddProfile.css';

function UpdateProfile(){
    const[profileId,setProfileId]= useState("");
    const [username,setUsername] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [contactNumber,setContactNumber] = useState("");
    const [jobTitle,setJobTitle] = useState("");
    var profile;
    var clickAdd = ()=>{
        alert('You clicked the button');
       profile={
        "profileId":profileId,
        "username":username,
        "firstName":firstName,
        "lastName":lastName,
        "contactNumber":contactNumber,
        "jobTitle":jobTitle
        }
        console.log(profile);
        fetch('http://localhost:5191/api/Profile', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
        alert('Update Added');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating profile');
    });

    }
    return(
        <div className="inputcontainer">
            <label className="form-control" for="pusername">Id</label>
            <input id="pusername" type="text" className="form-control" value={profileId} onChange={(e)=>{setProfileId(e.target.value)}}/>
            <label className="form-control" for="pusername">UserName</label>
            <input id="pusername" type="text" className="form-control" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <label className="form-control"  for="pfirstname">FirstName</label>
            <input id="pfirstname" type="text" className="form-control" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
            <label className="form-control"  for="plastname">LastName</label>
            <input id="plastname" type="text" className="form-control" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
            <label className="form-control" for="pcontact">ContactNumber</label>
            <input id="pcontact" type="number" className="form-control" value={contactNumber} onChange={(e)=>{setContactNumber(e.target.value)}}/>
            <label className="form-control"  for="ptitle">JobTitle</label>
            <input id="ptitle" type="text" className="form-control" value={jobTitle} onChange={(e)=>{setJobTitle(e.target.value)}}/>
            <button onClick={clickAdd} className="btn btn-primary">UpdateProfiles</button>
        </div>
    );

}
export default UpdateProfile;