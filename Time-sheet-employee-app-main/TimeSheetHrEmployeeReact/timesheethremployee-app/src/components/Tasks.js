import { useState } from "react";
import './AddProfile.css';
import { useNavigate } from "react-router-dom";

function Tasks() {
    const [taskDescription, setTaskDescription] = useState("");
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    if (role !== "Hr") {
        alert("You don't have access to this page");
        
        return null;
    }

    var tasks;
    var clickAdd = () => {
        alert('You clicked the button');
        tasks = {
            "taskDescription": taskDescription,
        };
        console.log(tasks);
        fetch('http://localhost:5191/api/Tasks', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify(tasks),
        })
            .then(() => {
                alert("Task Added");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="body">
        <div className="inputcontainer">
            <label className="form-control" htmlFor="ttaskDescription">Task Description</label>
            <input id="ttaskDescription" type="text" className="form-control" value={taskDescription} onChange={(e) => { setTaskDescription(e.target.value) }} />
            <button className="btn btn-primary button" onClick={clickAdd}>Enter</button>
        </div>
        </div>
    );
}

export default Tasks;
