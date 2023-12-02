import React, { useState } from "react";


function TaskList(){
    const [taskList,setTaskList]=useState([])
    var getTasks = ()=>{
        fetch('http://localhost:5191/api/Tasks',{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
              
            }
        }).then(
            async (data)=>{
                var myData = await data.json();
                await console.log(myData);
                await setTaskList(myData);
            }
        ).catch((e)=>{
            console.log(e)
        })
    }
    var checktasks = taskList.length>0?true:false;
    return(
        <div>
            <h1 className="alert alert-success">Tasks</h1>
            <button className="btn btn-success" onClick={getTasks}>Get All Tasks</button>
            <hr/>
            {checktasks? 
                <div >
                    {taskList.map((tasks)=>
                        <div key={tasks.id} className="alert alert-primary">
                              TaskDescription  : {tasks.taskDescription} 
                           
                    </div>)}
                </div>
                :
                <div>No tasks available yet</div>
                }
        </div>
    );

}
export default TaskList;