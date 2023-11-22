using System.Threading.Tasks;
using TimeSheetHrEmployeeApp.Exceptions;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Repositories;

namespace TimeSheetHrEmployeeApp.Services
{
    public class ApprovalService : IApprovalService
    {
        private readonly IRepository<int, Approval> _approvalRepository;
        public ApprovalService(IRepository<int, Approval> approvalRepository)
        {
            _approvalRepository = approvalRepository;
        }
        /// <summary>
        /// adding approval
        /// </summary>
        /// <param name="approval"></param>
        /// <returns></returns>

        public bool AddApproval(Approval approval)
        {
            var Approval = new Approval
            {
                Approvedby = approval.Approvedby,
                AprrovedDate = approval.AprrovedDate,
                Status = approval.Status,
                Comment = approval.Comment
            };
            var result = _approvalRepository.Add(approval);
            if (approval != null)
            {
                return true;
            }
            return false;
        }
        /// <summary>
        /// list of approval
        /// </summary>
        /// <returns></returns>

        public IList<Approval> GetAllApprovals()
        {
            var approval = _approvalRepository.GetAll();
            if (approval != null)
            {
                return approval.ToList();
            }
            return null;
          
        }
    }
}
