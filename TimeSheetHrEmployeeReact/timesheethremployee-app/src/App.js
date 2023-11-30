import logo from './logo.svg';
import './App.css';
import AddProfiles from './components/AddProfiles';
import RegisterUser from './components/RegisterUser';
import TimeSheet from './components/TimeSheet';
import LoginUser from './components/LoginUser';
import Tasks from './components/Tasks';
import Approval from './components/Approval';
import LeaveRequests from './components/LeaveRequests';
import TimeSheetList from './components/TimeSheetList';
import DeleteProfiles from './components/DeleteProfiles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
//import App1 from'./components/App1';
function App() {
  return (
    <div>
    <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path="/Register" element={<RegisterUser/>}/>
        <Route path="/AddProfiles" element={<AddProfiles />} />
        <Route path="/DeleteProfiles" element={<DeleteProfiles />} />
        
        <Route path="TimeSheet" element={<TimeSheet/>}/>
        
      </Routes>
    </BrowserRouter>
  </div>
   
  );
}

export default App;
