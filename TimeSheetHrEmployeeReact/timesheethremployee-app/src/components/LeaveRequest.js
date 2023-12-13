import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// ... (previous imports and code)

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
              <select style={styles.select} value={status} onChange={(e) => { setStatus(e.target.value) }}>
              <option value="Select a value">Select a value</option>
                <option value="Accident">Accident</option>
                <option value="Death of Relative">Death of Relative</option>
                <option value="Examination">Examination</option>
                <option value="Hospitalization">Hospitalization</option>
                <option value="MAT Leave">MAT Leave</option>
                <option value="Marriage">Marriage</option>
                <option value="Sickness">Sickness</option>
                <option value="Self Marriage">Self Marriage</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <button style={styles.button} onClick={handleEnter}>Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="col-md-6 mt-5">
        <img src="Images/purple.jpg" style={{ width: "100%", height: "100%" }} alt="Timesheet" />
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
  select: {
    width: "50%",
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
    color: "black",
    cursor: "pointer",
  },
  linkSeparator: {
    margin: "0 5px",
  },
};

export default LeaveRequest;
