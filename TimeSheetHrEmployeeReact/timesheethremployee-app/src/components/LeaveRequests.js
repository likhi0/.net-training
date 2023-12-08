import React, { useState, useEffect } from "react";
import axios from "axios";

function LeaveRequests() {
  const UserName = localStorage.getItem("username");
  const [leaveRequestsList, setLeaveRequestsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5191/api/LeaveRequest", {
        params: {
          UserName: UserName,
        },
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
  },[UserName]);

  return (
    <div className="leave-list" style={styles.leaveList}>
      <h1 style={styles.alertSuccess}>Leave</h1>

      <div style={styles.usernameContainer}>
        <span style={styles.usernameLabel}>Username:</span>
        <span style={styles.highlightedUsername}>{UserName}</span>
      </div>

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
                    <td>{leaveRequest.startDate}</td>
                    <td>{leaveRequest.endDate}</td>
                    <td>{leaveRequest.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={styles.noRequests}>No leave requests available yet</div>
          )}
        </div>
      )}
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
    backgroundColor: "#28a745",
    color: "#fff",
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
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px",
    marginTop: "70px",
    marginBottom: "20px",
    textAlign: "center",
    maxWidth: "500px",
  },
};

export default LeaveRequests;
