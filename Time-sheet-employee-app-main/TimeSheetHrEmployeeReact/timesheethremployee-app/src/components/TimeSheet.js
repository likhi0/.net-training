import React, { useState } from "react";
import axios from "axios";

const TimeSheet = ({ leaveRequestsList }) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const rowHeadings = ["Hours Worked", "Overtime", "Comments"];
  const periods = ["Weekly"];
  const [formData, setFormData] = useState({
    period: "",
    dayData: Array(5).fill(null).map(() => ({})),
  });

  const username = localStorage.getItem("username");

  const getCurrentWeekDates = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

    const weekDates = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const formattedDate = `${day.getFullYear()}-${(day.getMonth() + 1).toString().padStart(2, '0')}-${day.getDate().toString().padStart(2, '0')}`;
      weekDates.push(formattedDate);
    }

    return weekDates;
  };

  const calculateTotalHoursWorked = () => {
    const totalHours = formData.dayData.reduce(
      (total, day) => total + (parseFloat(day["Hours Worked"]) || 0),
      0
    );
    return totalHours.toFixed(2);
  };

  const storeDataInDatabase = () => {
    const totalHoursWorked = calculateTotalHoursWorked();
    const postData = {
      username,
      period: formData.period,
      totalHoursWorked,
      workEntries: formData.dayData.map((day, index) => ({
        date: getCurrentWeekDates()[index],
        dayOfWeek: daysOfWeek[index],
        hoursWorked: day["Hours Worked"] || 0,
        overtime: day["Overtime"] || 0,
        comments: day["Comments"] || "",
      })),
    };

    console.log("Data being posted:", postData);

    axios.post('http://localhost:5191/api/TimeSheet', postData)
      .then((response) => {
        console.log(response.data);
        setFormData({
          period: "",
          totalHoursWorked: 0,
          dayData: Array(5).fill({}),
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
      newDayData[day] = { ...newDayData[day], [field]: value };
      return {
        ...prevData,
        dayData: newDayData,
      };
    });
  };

  const renderWeeklyTable = () => (
    <table style={styles.table}>
      <thead>
        <tr style={styles.weeklyHeader}>
          <th></th>
          {daysOfWeek.map((day, index) => (
            <th key={day} style={styles.weeklyTableCell}>
              {`${day} - ${getCurrentWeekDates()[index]}`}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowHeadings.map((field) => (
          <tr key={field}>
            <td style={styles.weeklyTableCell}>{field}</td>
            {daysOfWeek.map((day, index) => {
              const currentDate = getCurrentWeekDates()[index];
              const isLeaveDate =
                leaveRequestsList && leaveRequestsList.includes(currentDate);
              const defaultValue =
                isLeaveDate ? 0 : formData.dayData[index][field] || "";

              return (
                <td key={day} style={styles.weeklyTableCell}>
                  <input
                    type="text"
                    name={`${day}_${field}`}
                    value={defaultValue}
                    onChange={(e) => handleDayDataChange(index, field, e)}
                    style={styles.input}
                  />
                </td>
              );
            })}
          </tr>
        ))}
        <tr>
          <td>Total Hours Worked</td>
          {daysOfWeek.map((day, index) => (
            <td key={day} style={styles.weeklyTableCell}>
              {calculateTotalHoursWorked()}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );

  return (
    
    <div style={styles.body}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input type="text" style={styles.input} value={username} disabled />
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
              <option value={p} key={p} style={styles.option}>
                {p}
              </option>
            ))}
          </select>
        </div>
        {formData.period === "Weekly" && renderWeeklyTable()}
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arial, sans-serif',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    textAlign: "center",
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
  },
  input: {
    width: '300px',
    padding: '8px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    whiteSpace: 'nowrap',
  },
  select: {
    width: '300px',
    padding: '8px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '3px',
    backgroundColor: '#f9f9f9',
  },
  option: {
    fontSize: '14px',
  },
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
    borderRadius: "3px solid black",
  },
  weeklyHeader: {
    whiteSpace: 'nowrap',
  },
  weeklyTableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },
  buttonGroup: {
    display: "flex",
    flexDirection: 'column',
    marginTop: "10px",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    width: '150px',
    margin: '5px 0',
  },
};

export default TimeSheet;
