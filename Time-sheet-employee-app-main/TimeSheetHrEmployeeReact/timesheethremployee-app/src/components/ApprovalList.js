import React, { useState, useEffect } from "react";
import axios from "axios";

function Approval() {
  const userName = localStorage.getItem("username");
  const [approvalList, setApprovalList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5191/api/Approval", {
        params: {
          UserName: userName,
        },
      })
    .then((response) => {
      const approvals = response.data;
      setApprovalList(approvals);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
    });
  });

  const hasApprovals = approvalList.length > 0;

  return (
    <div style={styles.body}>
    <div style={styles.registerForm}>
      <h1 style={styles.alertSuccess}>Approvals</h1>
      <br />
      {loading ? (
        <div>Loading...</div>
      ) : (
        hasApprovals ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Approved by</th>
                <th>Approved Date</th>
                <th>Status</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {approvalList.map((approval) => (
                <tr key={approval.id}>
                  <td>{approval.approvedby}</td>
                  <td>{approval.aprrovedDate}</td>
                  <td>{approval.status}</td>
                  <td>{approval.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No Approvals available yet</div>
        )
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
  registerForm: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  alertSuccess: {
    backgroundColor: "",
    color: "#28a745",
    padding: "10px",
    marginTop: "50px",
    marginBottom: "20px",
    textAlign: "center",
    maxWidth: "500px",
    border: "3px solid black",
  },
  timesheetContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  timesheetLabel: {
    marginRight: "10px",
    fontWeight: "bold",
  },
  highlightedTimesheet: {
    fontSize: "1.2em",
    backgroundColor: "",
    color: "",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
};

export default Approval;
