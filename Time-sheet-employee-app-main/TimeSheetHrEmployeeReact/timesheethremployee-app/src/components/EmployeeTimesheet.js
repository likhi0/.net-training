import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeeTimesheet() {
  const [EmployeeTimesheetList, setEmployeeTimesheetList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5191/api/Profile/AllProfiles", {
       
      })
      .then((response) => {
        const posts = response.data;
        setEmployeeTimesheetList(posts);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const approve=(request)=>{
    navigate("/Listoftimesheets" ,{state: {request}});
  }
  return (
    <div style={styles.body}>
    <div className="leave-list" style={styles.leaveList}>
      <h1 style={styles.alertSuccess}>EmployeeTimesheets</h1>

      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : (
        <div className="leave-request-container" style={styles.leaveRequestContainer}>
          {EmployeeTimesheetList.length > 0 ? (
            <table className="table" style={styles.table}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Employee Name</th>
                </tr>
              </thead>
              <tbody>
              {EmployeeTimesheetList.map((profile) => (
                <tr key={profile.id}>
                  <td>{profile.username}</td>
                  <td>{profile.firstName}</td>
        
                  <td class="btn btn-primary" onClick={() => approve(profile)}>click</td>
                </tr>
              ))}

              </tbody>
            </table>
          ) : (
            <div style={styles.noRequests}>No EmployeeTimesheets available yet</div>
          )}
        </div>
      )}
      <div className="col-sm-15 " > 
      <a
        href="/LeaveRequest"
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
  leaveList: {
    maxWidth: "700px",
    margin: "50 auto",
    padding: "20px",
    
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
    backgroundColor: "",
    color: " ",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  loading: {
    // Your loading styles here
  },
  leaveRequestContainer: {
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  alertSuccess: {
    backgroundColor: "",
    color: "#fff",
    padding: "10px",
    marginTop: "70px",
    marginBottom: "20px",
    textAlign: "center",
    maxWidth: "500px",
    border: "3px solid black",
  },
}
  export default EmployeeTimesheet;