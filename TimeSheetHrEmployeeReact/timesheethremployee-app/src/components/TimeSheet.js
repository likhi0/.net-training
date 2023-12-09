import React, { useState } from "react";
import axios from "axios";

const TimeSheet = () => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const rowHeadings = ["Hours Worked", "Overtime", "Comments"];
  const [formData, setFormData] = useState({
    period: "",
    hoursWorked: "",
    overtime: "",
    comments: "",
    dayData: Array(3).fill({}),
  });
  const username = localStorage.getItem("username");

  const checkUserData = () => {
    // ... (unchanged validation logic)
    return true; 
  };

  const storeDataInDatabase = () => {
    // Sum up hours worked and overtime for each day
    const totalHoursWorkedPerDay = {};
    const totalOvertimePerDay = {};
  
    formData.dayData.forEach((data) => {
      daysOfWeek.forEach((day) => {
        totalHoursWorkedPerDay[day] = (totalHoursWorkedPerDay[day] || 0) + parseFloat(data[day]?.hoursWorked || 0);
        totalOvertimePerDay[day] = (totalOvertimePerDay[day] || 0) + parseFloat(data[day]?.overtime || 0);
      });
    });
  
    axios
      .post("http://localhost:5191/api/TimeSheet", {
        username,
        period: formData.period,
        totalHoursWorkedPerDay,
        totalOvertimePerDay,
        comments: formData.comments,
      })
      .then((response) => {
        console.log(response.data);
        // Optionally, you can reset the form after successful submission
        setFormData({
          period: "",
          hoursWorked: "",
          overtime: "",
          comments: "",
          dayData: Array(3).fill({}),
        });
        alert("Data submitted successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to submit data. Please try again.");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isUserDataValid = checkUserData();

    if (!isUserDataValid) {
      alert("Please check your data");
      return;
    }

    storeDataInDatabase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDayDataChange = (day, field, e) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const newDayData = [...prevData.dayData];
      newDayData.forEach((data) => {
        data[day] = { ...data[day], [field]: value };
      });
      return {
        ...prevData,
        dayData: newDayData,
      };
    });
  };

  const renderDailyTable = () => (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Fields</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hours Worked</td>
          <td>
            <input
              type="number"
              name="hoursWorked"
              value={formData.hoursWorked}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td>Overtime</td>
          <td>
            <input
              type="number"
              name="overtime"
              value={formData.overtime}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td>Comments</td>
          <td>
            <input
              type="text"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );

  const renderWeeklyTable = () => (
    <table style={styles.weeklyTable}>
      <thead>
        <tr style={styles.weeklyHeader}>
          <th></th>
          {daysOfWeek.map((day) => (
            <th key={day} style={styles.weeklyTableCell}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowHeadings.map((field) => (
          <tr key={field}>
            <td style={styles.weeklyTableCell}>{field}</td>
            {daysOfWeek.map((day) => (
              <td key={day} style={styles.weeklyTableCell}>
                <input
                  type="text"
                  name={'dayData[${day}][${field}]'}
                  value={formData.dayData[0]?.[day]?.[field] || ""}
                  onChange={(e) => handleDayDataChange(day, field, e)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="back">
      <form className="registerForm" style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input type="text" style={styles.input} value={username} readOnly />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Period</label>
          <select
            style={styles.select}
            name="period"
            value={formData.period}
            onChange={handleChange}
          >
            <option value="">Select Period</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
          </select>
        </div>

        {formData.period === "Daily" ? renderDailyTable() : renderWeeklyTable()}

        <div style={styles.buttonGroup}>
          <button className="btn btn-primary button" onClick={handleSubmit}>
            Submit
          </button>
          {/* Other buttons go here */}
        </div>
      </form>
      {/* Other elements go here */}
    </div>
  );
};

const styles = {
  form: {
    textAlign: "center",
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "mediumpurple",
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
    marginLeft: '-1350px'
  },
  input: {
    marginLeft: '-1350px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    whiteSpace: 'nowrap', // Prevent text from breaking
  },
  select: {
    marginLeft: "-1350px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    backgroundColor: "#f9f9f9",
  },
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  weeklyTable: {
    width: '100%',
    marginTop: '20px',
    borderCollapse: 'collapse',
  },
  weeklyHeader: {
    whiteSpace: 'nowrap',  // Prevent line breaks in headers
  },
  weeklyTableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },
};

export default TimeSheet;