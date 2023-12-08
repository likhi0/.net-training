import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function LeaveRequest() {
  const UserName = localStorage.getItem('username');
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  var [usernameError, setUsernameError] = useState("");
  var checkUserData = () => {
    if (UserName === '') {
      setUsernameError("Username cannot be empty");
      return false;
    }
    if (status === 'select') {
      setUsernameError("Please select a status");
      return false;
    }
    if (startDate === '' || endDate === '') {
      setUsernameError("Please select start and end dates");
      return false;
    }
    setUsernameError("");
    return true;
  }

  const handleEnter = (event) => {
    event.preventDefault();
    var checkData = checkUserData();
    if (!checkData) {
      alert('Please check your data');
      return;
    }

    axios.post("http://localhost:5191/api/LeaveRequest", {
      username: UserName,
      startDate: startDate,
      endDate: endDate,
      status: status
    })
      .then((userData) => {
        console.log(userData)
        alert("Data added successfully");
      })
      .catch((err) => {
        console.log(err)
        alert("Error adding data");
      })
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Leave Request</h3>
      <table style={styles.table}>
        <tbody>
          <tr>
            <td>
              <label style={styles.label}>Username</label>
              <input type="text" style={styles.input} value={UserName} readOnly />
            </td>
          </tr>
          <tr>
            <td>
              <label style={styles.label}>StartDate</label>
              <input type="date" style={styles.input} value={startDate} onChange={(e) => { setStartDate(e.target.value) }} />
            </td>
          </tr>
          <tr>
            <td>
              <label style={styles.label}>EndDate</label>
              <input type="date" style={styles.input} value={endDate} onChange={(e) => { setEndDate(e.target.value) }} />
            </td>
          </tr>
          <tr>
            <td>
              <label style={styles.label}>Reason</label>
              <input style={styles.input} value={status} onChange={(e) => { setStatus(e.target.value) }} />
            </td>
          </tr>
          <tr>
            <td>
              <button style={styles.button} onClick={handleEnter}>Sumbit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={styles.linkContainer}>
        <Link to="/LeaveList" style={styles.link}>List</Link>
        <span style={styles.linkSeparator}>   </span>
        <Link to="/ApprovalList" style={styles.link}>Approvals</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    fontSize: "1.5em",
    marginBottom: "20px",
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
  select: {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "green",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
    textDecoration: "none",
  },
  linkContainer: {
    marginTop: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    cursor: "pointer",
  },
  linkSeparator: {
    margin: "0 5px",
  },
};

export default LeaveRequest;
