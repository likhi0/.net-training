import React, { useState } from "react";
import axios from "axios";

const TimeSheet = ({ LeaveRequests }) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const rowHeadings = ["Hours Worked", "Overtime", "Comments"];
  const periods = ["Daily", "Weekly"];
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
 
  const getCurrentWeekDates = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)); // Start of the week (Monday)

    const weekDates = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDates.push({
        day: day.getDate(),
        month: day.toLocaleString('en-US', { month: 'short' }), // Display month as short name (e.g., Jan, Feb)
        year: day.getFullYear(),
      });
    }

    return weekDates;
  };
  const getCurrentDate = () => {
    const currentDate = new Date();
    return {
      day: currentDate.getDate(),
      month: currentDate.toLocaleString('en-US', { month: 'short' }),
      year: currentDate.getFullYear(),
    };
  };
  
  const storeDataInDatabase = () => {
    // Sum up hours worked and overtime for each day
    const totalHoursWorkedPerDay = {};
    const totalOvertimePerDay = {};
    var totalsumhoursWorked;
    var totalsumovertime;
  
    formData.dayData.forEach((data) => {
      // Ensure data is not undefined
      if (data) {
        var hours_Worked = [];
        var over_time = [];
        daysOfWeek.forEach((day) => {
          // Ensure data[day] is not undefined
          if (data[day]) {
            hours_Worked.push(parseFloat(data[day]["Hours Worked"]) || 0);
            over_time.push(parseFloat(data[day]["Overtime"]) || 0);
  
            totalHoursWorkedPerDay[day] = (totalHoursWorkedPerDay[day] || 0) + parseFloat(data[day]?.hoursWorked || 0);
            totalOvertimePerDay[day] = (totalOvertimePerDay[day] || 0) + parseFloat(data[day]?.overtime || 0);
          }
        });
        console.log(eval(hours_Worked.join("+")));
        totalsumhoursWorked = eval(hours_Worked.join("+"));
  
        totalsumovertime = eval(over_time.join("+"));
      }
    });
    const leaveRequestDates = LeaveRequests.map(
      (leaveRequest) => leaveRequest.startDate.toLocaleDateString()
    );
  
    axios
      .post('http://localhost:5191/api/TimeSheet', {
        username,
        period: formData.period,
        hoursWorked:
          leaveRequestDates.includes(getCurrentDate().toLocaleDateString())
            ? 0
            : totalsumhoursWorked || formData.hoursWorked,
        overtime:
          leaveRequestDates.includes(getCurrentDate().toLocaleDateString())
            ? 0
            : formData.overtime || totalsumovertime,
        comments: formData.comments,
      })
      .then((response) => {
        console.log(response.data);
  
        // Optionally, you can reset the form after successful submission
        setFormData({
          period: "",
          hoursWorked: "",
          overtime: "",
          comments: "no",
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

    // Validate if the input is a positive integer
    if ((name === "hoursWorked" || name === "overtime") && (!/^\d+$/.test(value) || parseInt(value) < 0)) {
      // If not a positive integer, do not update state
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDayDataChange = (day, field, e) => {
    const { value } = e.target;

    // Validate if the input is a positive integer
    if ((field === "Hours Worked" || field === "Overtime") && (!/^\d+$/.test(value) || parseInt(value) < 0)) {
      // If not a positive integer, do not update state
      return;
    }

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
          <th>Date</th>
          <th>Fields</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{`${getCurrentDate().day} ${getCurrentDate().month} ${getCurrentDate().year}`}</td>
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
          <td></td>
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
          <td></td>
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
          {daysOfWeek.map((day, index) => (
            <th key={day} style={styles.weeklyTableCell}>
              {`${day} - ${getCurrentWeekDates()[index].day} ${getCurrentWeekDates()[index].month} ${getCurrentWeekDates()[index].year}`}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowHeadings.map((field) => (
          <tr key={field}>
            <td style={styles.weeklyTableCell}>{field}</td>
            {daysOfWeek.map((day, index) => (
              <td key={day} style={styles.weeklyTableCell}>
                <input
                  type="text"
                  name={`dayData[${day}][${field}]`}
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
    <div style={styles.body}>
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
            {periods.map((p) => (
              <option value={p} key={p}>
                {p}
              </option>
            ))}
          </select>

        </div>

        {formData.period === "Daily" && renderDailyTable()}
        {formData.period === "Weekly" && renderWeeklyTable()}
        <div style={styles.buttonGroup}>
          <button className="btn btn-primary button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
    
  );
};

const styles = {
  body: {
    backgroundColor: '#f0f0f0', // Light grey background color for the entire page
    minHeight: '100vh', // Ensure the container takes at least the full height of the viewport
    display: 'flex',
    flexDirection: 'column', // Remove default padding
    fontFamily: 'Arial, sans-serif', // Adjust font if needed
  },
  form: {
    textAlign: "center",
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
   
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: '-1350px'
  },
  input: {
    marginLeft: '-1300px',
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
    borderRadius:"3px solid black",
    bordercolor:"black"
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  weeklyTable: {
    width: '100%',
    marginTop: '20px',
    borderCollapse: 'collapse',
    borderRadius:"3px solid black"
  },
  weeklyHeader: {
    whiteSpace: 'nowrap',  
  },
  weeklyTableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },
};
export default TimeSheet;