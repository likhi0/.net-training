using TimeSheetHrEmployeeApp.Models;

namespace TimeSheetHrEmployeeApp.Interface
{
    public interface ILeaveRequestService
    {
        bool AddLeave(LeaveRequest leaverequest);

        IList<LeaveRequest> GetAllLeaves(string username);
    }
}
