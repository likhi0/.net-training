using TimeSheetHrEmployeeApp.Context;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;

namespace TimeSheetHrEmployeeApp.Repositories
{
    public class TimeSheetDetailsRepository : IRepository<int, TimeSheetDetails>
    {
        private readonly TimeSheetHrEmployeeContext _context;
        public TimeSheetDetailsRepository(TimeSheetHrEmployeeContext context)
        {
            _context = context;
        }
        public TimeSheetDetails Add(TimeSheetDetails entity)
        {
            _context.TimesheetDetails.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public TimeSheetDetails Delete(int key)
        {
            var timesheetDetails = _context.TimesheetDetails.Find(key);
            if (timesheetDetails != null)
            {
                _context.TimesheetDetails.Remove(timesheetDetails);
                _context.SaveChanges();
            }
            return timesheetDetails;
        }

        public IList<TimeSheetDetails> GetAll()
        {
            return _context.TimesheetDetails.ToList();
        }

        public TimeSheetDetails GetById(int key)
        {
            var timesheetDetails = _context.TimesheetDetails.SingleOrDefault(t => t.TaskID == key);
            return timesheetDetails;
        }

        public TimeSheetDetails Update(TimeSheetDetails entity)
        {
            var existingTimesheetDetails = GetById(entity.TaskID);
            if (existingTimesheetDetails != null)
            {
                _context.Entry(existingTimesheetDetails).CurrentValues.SetValues(entity);
                _context.SaveChanges();
                return existingTimesheetDetails;
            }
            return null;
        }
    }
}
