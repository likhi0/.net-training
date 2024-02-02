import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Approval() {
  const location = useLocation();
  const { request } = location.state || {};

  // Use optional chaining to handle potential undefined values
  const statuses = ["Approved", "Disapproved"];
  //const timesheetIDInitial = request?.leaveRequestID || '';
  //const userName = localStorage.getItem("username");
  const [approvedBy, setApprovedBy] = useState(localStorage.getItem("firstName") || '');
  const [approvedDate, setApprovedDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const username = request?.username || '';
  const role = localStorage.getItem("role");

  const navigate = useNavigate();
  const [error, setError] = useState("");
  if (role !== "Hr") {
    alert("You don't have access to this page");
    
    return null;
}

  var checkUserData = () => {

    if (status === "") {
      setError("Please select a status");
      return false;
    }
    if (approvedBy === "") {
      setError("ApprovedBy cannot be empty");
      return false;
    }
    if (approvedDate === "") {
      setError("ApprovedDate cannot be empty");
      return false;
    }
    if (comment === "") {
      setError("Comment cannot be empty");
      return false;
    }
    setError("");
    return true;
  };

  const handleStatusClick = (selectedStatus) => {
    setStatus(selectedStatus);

    // Automatically submit data when Approved or Disapproved is clicked
    handleSubmit();
  };

  const handleSubmit = () => {
    // var checkData = checkUserData();
    // if (!checkData) {
    //   alert("Please check your data");
    //   return;
    // }

    axios
      .post(
        "http://localhost:5191/api/Approval",
        {
          Username: username,
          approvedBy: approvedBy,
          approvedDate: approvedDate,
          status: status,
          comment: comment,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((userData) => {
        console.log(userData);
        alert("Data added successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding data");
      });
  };

  return (
    <div style={styles.body}>
    <div style={styles.container}>
      <h3 style={styles.heading}>Approval</h3>
      <table style={styles.table}>
        <tbody>
        <tr>
            <td>
              <label style={styles.label}>Username</label>
              <input disabled
                type="text"
                style={styles.input}
                value={username}
                
              />
            </td>
          </tr>
          <tr>
            <td>
              <label style={styles.label}>ApprovedBy</label>
              <input disabled
                type="text"
                style={styles.input}
                value={approvedBy}
                onChange={(e) => {
                  setApprovedBy(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label style={styles.label}>ApprovedDate</label>
              <input disabled
                type="te"
                style={styles.input}
                value={approvedDate}
                onChange={(e) => {
                  setApprovedDate(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label style={styles.label}>Comment</label>
              <input
                type="text"
                style={styles.input}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
            <div style={styles.statusButtonsContainer}>
                {statuses.map((s) => (
                  <button
                    key={s}
                    style={status === s ? styles.activeStatusButton : styles.statusButton}
                    onClick={() => handleStatusClick(s)}
                    data-value={s}
                  >
                    {s}
                  </button>
                ))}
              </div>

            </td>
          </tr>
        </tbody>
      </table>
      <div style={styles.linkContainer}>
      <Link to="/LeaveLists" style={styles.buttonLink}>
        <button style={styles.buttonLink}>Leave List</button>
      </Link>
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
  container: {
    padding: "20px",
  },
  heading: {
    fontSize: "1.5em",
    marginBottom: "20px",
    marginTop:"70px",
  },
  table: {
    width: "100%",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "50%",
    padding: "10px",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "green",
    color: "green",
    padding: "10px 15px",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
    textDecoration: "none",
  },
  statusButtonsContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    
  },
  statusButton: {
    padding: "10px 15px",
    cursor: "pointer",
    backgroundColor: "green",
  },
  activeStatusButton: {
    padding: "10px 15px",
    cursor: "pointer",
    color: "blue",
  },
  linkContainer: {
    marginTop: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    cursor: "pointer",
    fontSize:"30px",
  },
  linkSeparator: {
    margin: "0 5px",
  },
  error: {
    color: "red",
    margin: "10px 0",
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
  
};

export default Approval;