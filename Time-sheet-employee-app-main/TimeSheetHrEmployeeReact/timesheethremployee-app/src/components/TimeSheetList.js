import React, { useState, useEffect } from "react";
import axios from "axios";

function TimeSheetList() {
  const userName = localStorage.getItem("username");
  const [timeSheetList, setTimeSheetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleWorkEntries, setVisibleWorkEntries] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5191/api/TimeSheet", {
        params: {
          UserName: userName,
        },
      })
      .then((response) => {
        const timesheets = response.data;
        if (timesheets.length > 0) {
          localStorage.setItem('timesheetID', timesheets[0].timesheetID);
          setTimeSheetList(timesheets);
          // Initialize visibility state for each timesheet
          const initialVisibility = timesheets.reduce((acc, timesheet) => {
            acc[timesheet.timesheetID] = false;
            return acc;
          }, {});
          setVisibleWorkEntries(initialVisibility);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userName]);

  const toggleWorkEntriesVisibility = (timesheetID) => {
    setVisibleWorkEntries((prevVisibility) => ({
      ...prevVisibility,
      [timesheetID]: !prevVisibility[timesheetID],
    }));
  };

  return (
   
    
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ color: "#28a745", fontSize: "24px", marginBottom: "20px", marginTop:"70px"}}>TimeSheet Details</h1>
  
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {timeSheetList.length > 0 && (
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
              <thead>
                <tr>
                  <th style={tableHeader}>TimeSheet ID</th>
                  <th style={tableHeader}>Period</th>
                  <th style={tableHeader}>Total Hours Worked</th>
                  <th style={tableHeader}>Action</th>
                </tr>
              </thead>
              <tbody>
                {timeSheetList.map((timeSheet) => (
                  <React.Fragment key={timeSheet.timesheetID}>
                    <tr>
                      <td style={tableCell}>{timeSheet.timesheetID}</td>
                      <td style={tableCell}>{timeSheet.period}</td>
                      <td style={tableCell}>{timeSheet.totalHoursWorked}</td>
                      <td style={tableCell}>
                        <button
                          onClick={() => toggleWorkEntriesVisibility(timeSheet.timesheetID)}
                          style={toggleButton}
                        >
                          {visibleWorkEntries[timeSheet.timesheetID] ? 'Hide Work Entries' : 'Show Work Entries'}
                        </button>
                      </td>
                    </tr>
                    {visibleWorkEntries[timeSheet.timesheetID] && (
                      <tr>
                        <td colSpan="3">
                          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                            <thead>
                              <tr>
                                <th style={tableHeader}>Date</th>
                                <th style={tableHeader}>Day of Week</th>
                                <th style={tableHeader}>Hours Worked</th>
                                <th style={tableHeader}>Overtime</th>
                                <th style={tableHeader}>Comments</th>
                              </tr>
                            </thead>
                            <tbody>
                              {timeSheet.workEntries.map((entry) => (
                                <tr key={entry.workEntryRequestID}>
                                  <td style={tableCell}>{entry.date}</td>
                                  <td style={tableCell}>{entry.dayOfWeek}</td>
                                  <td style={tableCell}>{entry.hoursWorked}</td>
                                  <td style={tableCell}>{entry.overtime}</td>
                                  <td style={tableCell}>{entry.comments}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
          {timeSheetList.length === 0 && <div style={noTimesheetMessage}>No timesheet available yet</div>}
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <a
          href="TimeSheet"
          className="text-decoration-black mb-3 text-info fw-bold"
          style={{ fontSize: '14px', color: 'black' }}
        >
          Back
        </a>
      </div>
    </div>
    
  );
};

const tableHeader = {
  backgroundColor: "#007bff",
  color: "white",
  fontWeight: "bold",
  padding: "10px",
  textAlign: "left",
};

const tableCell = {
  border: "1px solid #dee2e6",
  padding: "10px",
};

const toggleButton = {
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
};

const noTimesheetMessage = {
  marginTop: "20px",
};

export default TimeSheetList;
