import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Approval() {
  const statuses = ["Approved", "Disapproved"];
  const [timesheetID, setTimeSheetID] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [approvedDate, setApprovedDate] = useState("");
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();
  var [error, setError] = useState("");
  if (role !== "HR") {
    alert("You don't have access to this page");
    setTimeout(() => {
        navigate("/Home");
    }, 0);
    return null;
}

  var checkUserData = () => {
    if (timesheetID === "") {
      setError("TimesheetID cannot be empty");
      return false;
    }
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
    var checkData = checkUserData();
    if (!checkData) {
      alert("Please check your data");
      return;
    }

    axios
      .post(
        "http://localhost:5191/api/Approval",
        {
          timesheetID: timesheetID,
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
    <div style={styles.container}>
      <h3 style={styles.heading}>Approval</h3>
      <table style={styles.table}>
        <tbody>
          <tr>
            <td>
              <label style={styles.label}>TimesheetID</label>
              <input
                type="number"
                style={styles.input}
                value={timesheetID}
                onChange={(e) => {
                  setTimeSheetID(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label style={styles.label}>ApprovedBy</label>
              <input
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
              <input
                type="date"
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
                  >
                    {s}
                  </button>
                ))}
              </div>
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
    color: "#fff",
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
  },
  activeStatusButton: {
    padding: "10px 15px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
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
  error: {
    color: "red",
    margin: "10px 0",
  },
};

export default Approval;
