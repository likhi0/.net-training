import logo from './logo.svg';
import './App.css';
import AddProfiles from './components/AddProfiles';
import RegisterUser from './components/RegisterUser';
import TimeSheet from './components/TimeSheet';
import UpdateTimeSheet from './components/UpdateTimeSheet';
import LoginUser from './components/LoginUser';
import Tasks from './components/Tasks';
import TaskList from './components/TaskList';
import Approval from './components/Approval';
import ApprovalList from './components/ApprovalList';
import LeaveRequests from './components/LeaveRequests';
import TimeSheetList from './components/TimeSheetList';
import DeleteProfiles from './components/DeleteProfiles';
import UpdateProfile from './components/UpdateProfile';
import LeaveRequest from './components/LeaveRequest';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './components/Home';
import Logout from './components/Logout';
//import App1 from'./components/App1';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Register" element={<RegisterUser/>}/>
        <Route path="/Login" element={<LoginUser/>}/>
        <Route path="/AddProfiles" element={<AddProfiles />} />
        <Route path="/UpdateProfile" element={<UpdateProfile/>}/>
        <Route path="/DeleteProfiles" element={<DeleteProfiles />} />
        <Route path="/Logout" element={<Logout/>}/>
        <Route path="TimeSheet" element={<TimeSheet/>}/>
        <Route path="/TimeSheetList" element={<TimeSheetList/>}/>
        <Route path="/UpdateTimeSheet" element={<UpdateTimeSheet/>}/>
        <Route path="/LeaveRequest" element={<LeaveRequest/>}/>
        <Route path="/LeaveList" element={<LeaveRequests/>}/>
        <Route path="/Approval" element={<Approval/>}/>
        <Route path="/ApprovalList" element={<ApprovalList/>}/>
        <Route path="/Tasks" element={<Tasks/>}/>
        <Route path="/TaskList" element={<TaskList/>}/>
        
        
      </Routes>
    </BrowserRouter>  
    
    
  </div>
   
  );
}

export default App;
