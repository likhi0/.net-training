// In the parent component where you use TimeSheet
import React, { useState, useEffect } from 'react';
import TimeSheet from './TimeSheet';
import axios from 'axios'; // Import axios if not already imported

const ParentComponent = () => {
  const [leaveRequestsList, setLeaveRequestsList] = useState([]);

  useEffect(() => {
    // Fetch or set leaveRequestsList as needed
    // Example: Fetch leave requests from an API
    axios.get('http://localhost:5191/api/LeaveRequests')
      .then(response => {
        setLeaveRequestsList(response.data);
      })
      .catch(error => {
        console.error('Error fetching leave requests:', error);
      });
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <TimeSheet leaveRequestsList={leaveRequestsList} />
    // ... (other components or code)
  );
};

export default ParentComponent;
