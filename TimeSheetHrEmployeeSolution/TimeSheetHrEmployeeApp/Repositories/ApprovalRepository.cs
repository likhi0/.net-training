using Microsoft.EntityFrameworkCore;
using TimeSheetHrEmployeeApp.Context;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;

namespace TimeSheetHrEmployeeApp.Repositories
{
    public class ApprovalRepository : IRepository<int, Approval>

    {
        private readonly TimeSheetHrEmployeeContext _context;
        public ApprovalRepository(TimeSheetHrEmployeeContext context)
        {
            _context = context;
        }

       
        public Approval Add(Approval entity)
        {
            _context.Approvals.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public Approval Delete(int key)
        {
            var approvals = _context.Approvals.Find(key);
            if (approvals != null)
            {
                _context.Approvals.Remove(approvals);
                _context.SaveChanges();
            }
            return approvals;
        }

        public IList<Approval> GetAll()
        {
            return _context.Approvals.ToList();
        }

        public Approval GetById(int key)
        {
            var approvals = _context.Approvals.SingleOrDefault(t => t.ApprovalID == key);
            return approvals;
        }


        public Approval Update(Approval entity)
        {
            var existingapproval = GetById(entity.ApprovalID);
            if (existingapproval != null)
            {
                _context.Entry(existingapproval).CurrentValues.SetValues(entity);
                _context.SaveChanges();
                return existingapproval;
            }
            return null;
        }
    }
}
