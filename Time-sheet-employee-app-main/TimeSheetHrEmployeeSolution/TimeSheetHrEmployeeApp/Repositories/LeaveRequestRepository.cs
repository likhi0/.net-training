using TimeSheetHrEmployeeApp.Context;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;

namespace TimeSheetHrEmployeeApp.Repositories
{
    public class LeaveRequestRepository : IRepository<int, LeaveRequest>
    {
        private readonly TimeSheetHrEmployeeContext _context;
        public LeaveRequestRepository(TimeSheetHrEmployeeContext context)
        {
            _context = context;
        }

        public LeaveRequest Add(LeaveRequest entity)
        {
            _context.LeaveRequests.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public LeaveRequest Delete(int key)
        {
            var leaverequests = _context.LeaveRequests.Find(key);
            if (leaverequests != null)
            {
                _context.LeaveRequests.Remove(leaverequests);
                _context.SaveChanges();
            }
            return leaverequests;
        }

        public IList<LeaveRequest> GetAll()
        {
            if (_context.LeaveRequests.Count() == 0)
                return null;

            return _context.LeaveRequests.ToList();
        }

        public LeaveRequest GetById(int key)
        {
            var leaverequests = _context.LeaveRequests.SingleOrDefault(t => t.LeaveRequestID == key);
            return leaverequests;
        }

        public LeaveRequest Update(LeaveRequest entity)
        {
            var existingleave = GetById(entity.LeaveRequestID);
            if (existingleave != null)
            {
                _context.Entry(existingleave).CurrentValues.SetValues(entity);
                _context.SaveChanges();
                return existingleave;
            }
            return null;
        }
    }
}
