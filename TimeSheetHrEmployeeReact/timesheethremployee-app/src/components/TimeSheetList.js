import React, { useState, useEffect } from "react";
import axios from "axios";

function TimeSheetList() {
  const userName = localStorage.getItem("username");
  const [timeSheetList, setTimeSheetList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5191/api/TimeSheet", {
        params: {
          UserName: userName,
        },
      })
      .then((response) => {
        const timesheets = response.data;
        localStorage.setItem('timesheetID', timesheets[0].timesheetID); // Assuming you want the first timesheet ID
        setTimeSheetList(timesheets);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userName]);

  return (
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
  );
}
const styles = {
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
    backgroundColor: "",
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
