using System.Threading.Tasks;
using TimeSheetHrEmployeeApp.Exceptions;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Repositories;

namespace TimeSheetHrEmployeeApp.Services
{
    public class LeaveRequestService : ILeaveRequestService
    {
        private readonly IRepository<int, LeaveRequest> _leaverequestRepository;
        public LeaveRequestService(IRepository<int, LeaveRequest> leaverequestRepository)
        {
            _leaverequestRepository = leaverequestRepository;
        }
        /// <summary>
        /// adding leave
        /// </summary>
        /// <param name="leaverequest"></param>
        /// <returns></returns>

        public bool AddLeave(LeaveRequest leaverequest)
        {
            var Leaverequest = new LeaveRequest
            {
                Username = leaverequest.Username,
                StartDate = leaverequest.StartDate,
                EndDate = leaverequest.EndDate,
                Status = leaverequest.Status
                
            };
            var result = _leaverequestRepository.Add(leaverequest);
            if (leaverequest != null)
            {
                return true;
            }
            return false;
        }
        /// <summary>
        /// list of requests
        /// </summary>
        /// <returns></returns>

        public IList<LeaveRequest> GetAllLeaves(string username)
        {
            // Retrieve leaves based on the provided username
            var leaves = _leaverequestRepository.GetAll().Where(u => u.Username == username).ToList();
            return leaves.Any() ? leaves.ToList() : null;
        }


    }
}
