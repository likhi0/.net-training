import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function TimeSheetList() {
  //const userName = localStorage.getItem("username");
  const [timeSheetList, setTimeSheetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { request } = location.state || {};
  const username = request?.username || '';

  useEffect(() => {
    axios
      .get("http://localhost:5191/api/TimeSheet", {
        params: {
          userName: username,
        },
      })
      .then((response) => {
        const timesheets = response.data;
         // Assuming you want the first timesheet ID
        setTimeSheetList(timesheets);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  return (
    <div style={styles.body}>
    <div className="timesheet-list">
      <h1 style={styles.alertSuccess}>TimeSheet</h1>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="timesheet-container">
          {timeSheetList.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>TimeSheet ID</th>
                  <th>Period</th>
                  <th>Hours Worked</th>
                  <th>Overtime</th>
                </tr>
              </thead>
              <tbody>
                {timeSheetList.map((timeSheet) => (
                  <tr key={timeSheet.id}>
                    <td>{timeSheet.timesheetID}</td>
                    <td>{timeSheet.period}</td>
                    <td>{timeSheet.hoursWorked}</td>
                    <td>{timeSheet.overTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No timesheet available yet</div>
          )}
        </div>
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
  body: {
    backgroundColor: '#f0f0f0', // Light grey background color for the entire page
    minHeight: '100vh', // Ensure the container takes at least the full height of the viewport
    display: 'flex',
    flexDirection: 'column', // Remove default padding
    fontFamily: 'Arial, sans-serif', // Adjust font if needed
  },
  timesheetList: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor:"yellow"
  },
  row: {
    marginBottom: "15px",
  },
  usernameContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  usernameLabel: {
    marginRight: "10px",
    fontWeight: "bold",
  },
  highlightedUsername: {
    fontSize: "1.2em",
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  formControl: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    boxSizing: "border-box",
  },
  btnSuccess: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    cursor: "pointer",
  },
  timesheetContainer: {
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  thTd: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  th: {
    backgroundColor: "#28a745",
    color: "#fff",
  },
  alertSuccess: {
    backgroundColor: "black",
    color: "#fff",
    padding: "10px",
    marginTop: "80px",
    marginBottom: "20px",
    textAlign: "center",
    maxWidth: "500px",
    border :"3px solid black",
  },
  
  
};


export default TimeSheetList;
