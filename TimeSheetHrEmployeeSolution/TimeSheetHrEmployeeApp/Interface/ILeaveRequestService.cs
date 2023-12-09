using TimeSheetHrEmployeeApp.Models;

namespace TimeSheetHrEmployeeApp.Interface
{
    public interface ILeaveRequestService
    {
        bool AddLeave(LeaveRequest leaverequest);

        LeaveRequest GetAllLeaves(string username);
    }
}
