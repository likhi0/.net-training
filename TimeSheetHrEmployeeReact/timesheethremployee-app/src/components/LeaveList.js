import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LeaveRequests() {
  const [leaveRequestsList, setLeaveRequestsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5191/api/LeaveRequest/AllLeaves", {
       
      })
      .then((response) => {
        const posts = response.data;
        setLeaveRequestsList(posts);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const approve=(request)=>{
    navigate("/Approval" ,{state: {request}});
  }

  return (
    <div className="leave-list" style={styles.leaveList}>
      <h1 style={styles.alertSuccess}>Leaves</h1>

      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : (
        <div className="leave-request-container" style={styles.leaveRequestContainer}>
          {leaveRequestsList.length > 0 ? (
            <table className="table" style={styles.table}>
              <thead>
                <tr>
                  <th>Leave Request Start Date</th>
                  <th>Leave Request End Date</th>
                  <th>Leave Request Reason</th>
                </tr>
              </thead>
              <tbody>
              {leaveRequestsList.map((leaveRequest) => (
                <tr key={leaveRequest.id}>
                  <td>{leaveRequest.username}</td>
                  <td>{leaveRequest.startDate}</td>
                  <td>{leaveRequest.endDate}</td>
                  <td>{leaveRequest.status}</td>
                  <td class="btn btn-primary" onClick={() => approve(leaveRequest)}>click</td>
                </tr>
              ))}

              </tbody>
            </table>
          ) : (
            <div style={styles.noRequests}>No leave requests available yet</div>
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
    <div className="col-md-6 mt-5">
        <img src="Images/purple.jpg" style={{ width: "100%", height: "100%" }} alt="Timesheet" />
      </div>
    </div>
  );
}

const styles = {
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
};

export default LeaveRequests;