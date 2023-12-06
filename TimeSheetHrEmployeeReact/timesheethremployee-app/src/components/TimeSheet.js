import { useState } from "react";
import axios from "axios";

function TimeSheet() {
  const periods = ["Daily", "Weekly", "Monthly"];
  const UserName = localStorage.getItem('username');
  const [period, setPeriod] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [overtime, setOverTime] = useState("");
  const [comments, setComments] = useState("");
  var [usernameError, setUsernameError] = useState("");
  
  var checkUSerData = () => {
    // ... (unchanged validation logic)
  }

  const Enter = (event) => {
    event.preventDefault();
    var checkData = checkUSerData();
    if (checkData === false) {
      alert('please check your data')
      return;
    }
    axios.post("http://localhost:5191/api/TimeSheet", {
      username: UserName,
      period: period,
      hoursWorked: hoursWorked,
      overtime: overtime,
      comments: comments
    })
      .then((userData) => {
        console.log(userData)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <form className="registerForm" style={styles.form}>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Username</label>
        <input type="text" style={styles.input} value={UserName} readOnly />
        
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Hours Worked</label>
        <input
          type="number"
          style={styles.input}
          value={hoursWorked}
          onChange={(e) => { setHoursWorked(e.target.value) }}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Overtime</label>
        <input
          type="number"
          style={styles.input}
          value={overtime}
          onChange={(e) => { setOverTime(e.target.value) }}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Period</label>
        <select
          style={styles.select}
          onChange={(e) => { setPeriod(e.target.value) }}
        >
          <option value="select">Select Period</option>
          {periods.map((r) =>
            <option value={r} key={r}>{r}</option>
          )}
        </select>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Comments</label>
        <input
          type="text"
          style={styles.input}
          value={comments}
          onChange={(e) => { setComments(e.target.value) }}
        />
      </div>

      <div style={styles.buttonGroup}>
        <button className="btn btn-primary button" onClick={Enter}>Enter</button>
        <button className="btn btn-danger button">Cancel</button>
        <button className="btn btn-danger button">
          <a className="nav-link" aria-current="page" href="/TimeSheetList">List</a>
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    textAlign: 'center',
    margin: '90px auto',
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'mediumpurple'
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    marginLeft: '5px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  select: {
    marginLeft: '5px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    backgroundColor: '#f9f9f9',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export default TimeSheet;
