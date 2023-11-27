import { useState } from "react";
import './AddProfile.css';

//import axios from "axios";

function Tasks(){
    const [taskDescription,setTaskDescription] = useState("")
    var tasks;
    var clickAdd = ()=>{
        alert('You clicked the button');
       tasks={
        "taskDescription":taskDescription,
        
        }
        console.log(tasks);
        fetch('http://localhost:5191/api/Tasks',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(tasks)
        }).then(
            ()=>{
                alert("Task Added");
            }
        ).catch((e)=>{
            console.log(e)
        })
    }
    return(
        <div className="inputcontainer">
            <label className="form-control" for="ttaskDescription">TaskDescription</label>
            <input id="ttaskDescription" type="text" className="form-control" value={taskDescription} onChange={(e)=>{setTaskDescription(e.target.value)}}/>
        </div>
    );
}
export default Tasks;