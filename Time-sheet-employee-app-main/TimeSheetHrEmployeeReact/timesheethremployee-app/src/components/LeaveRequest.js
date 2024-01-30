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


   const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    const day = today.getDate();
    return `${year}-${month}-${day}`;
  };

  return (
    <div style={styles.body}>
    <div style={styles.container}>
      <h3 style={styles.heading}>Leave Request</h3>
      <table style={styles.table}>
        <tbody>
          <tr>
            <td>
              <label style={styles.label}>StartDate</label>
              <input
                type="date"
                style={styles.input}
                value={startDate}
                min={getCurrentDate()} // Set minimum date to the current date
                onChange={(e) => { setStartDate(e.target.value) }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label style={styles.label}>EndDate</label>
              <input
                type="date"
                style={styles.input}
                value={endDate}
                min={getCurrentDate()} // Set minimum date to the current date
                onChange={(e) => { setEndDate(e.target.value) }}
              />
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
