using TimeSheetHrEmployeeApp.Models;

namespace TimeSheetHrEmployeeApp.Interface
{
    public interface IApprovalService
    {
        bool AddApproval(Approval approval);

        IList<Approval> GetAllApprovals();
    }
}
