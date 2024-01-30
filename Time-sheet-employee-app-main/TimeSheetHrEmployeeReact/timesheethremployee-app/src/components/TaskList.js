import React, { useState, useEffect } from "react";

function TaskList() {
    const [taskList, setTaskList] = useState([]);
  
    useEffect(() => {
      const getTasks = async () => {
        try {
          const response = await fetch("http://localhost:5191/api/Tasks", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setTaskList(data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
  
      getTasks();
    }, []);
  
    const checkTasks = taskList.length > 0;
  
    return (
      <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.alertSuccess}>Tasks</h1>
        {checkTasks ? (
          <form>
            {taskList.map((task, index) => (
              <div key={task.id} style={styles.formGroup}>
                <label htmlFor={`taskDescription-${task.id}`} style={styles.label}>
                  Task {index + 1} Description:
                </label>
                <input
                  id={`taskDescription-${task.id}`}
                  type="text"
                  style={styles.formControl}
                  value={task.taskDescription}
                  readOnly
                />
              </div>
            ))}
          </form>
        ) : (
          <div style={styles.noTasksMessage}>No tasks available yet</div>
        )}
        <div className="col-sm-15 " > 
      <a
        href="TimeSheet"
        className="text-decoration-black mb-3 text-info fw-bold"
        style={{ fontSize: '14px', color: 'black' }} 
      > 
        Back
      </a>
    </div>
      </div>
      </div>
    );
  }

  const styles = {
    alertSuccess: {
      backgroundColor: "#28a745",
      color: "#fff",
      padding: "5px",
      marginBottom: "20px",
      marginTop: "70px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    formControl: {
      width: "50%",
      padding: "10px",
      boxSizing: "border-box",
    },
    noTasksMessage: {
      color: "#999",
      fontStyle: "italic",
    },
    container: {
      maxWidth: "800px",
      margin: "50 auto",
      padding: "20px",
    
    },
  };
export default TaskList;
