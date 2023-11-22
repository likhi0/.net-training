using Microsoft.EntityFrameworkCore;
using TimeSheetHrEmployeeApp.Context;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;

namespace TimeSheetHrEmployeeApp.Repositories
{
    public class TimeSheetRepository : IRepository<int, TimeSheet>
    {
        private readonly TimeSheetHrEmployeeContext _context;
        public TimeSheetRepository(TimeSheetHrEmployeeContext context)
        {
            _context = context;
        }

        public TimeSheet Add(TimeSheet entity)
        {
            _context.TimeSheets.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public TimeSheet Delete(int key)
        {
            var timeSheet = _context.TimeSheets.Find(key);
            if (timeSheet != null)
            {
                _context.TimeSheets.Remove(timeSheet);
                _context.SaveChanges();
            }
            return timeSheet;
        }

        public IList<TimeSheet> GetAll()
        {
            if (_context.TimeSheets.Count() == 0)
                return null;

            return _context.TimeSheets.ToList();
        }

        public TimeSheet GetById(int key)
        {
            var Timesheet = _context.TimeSheets.SingleOrDefault(t => t.TimesheetID == key);
            return Timesheet;
        }

        public TimeSheet Update(TimeSheet entity)
        {
            var existingTimeSheet = GetById(entity.TimesheetID);
            if (existingTimeSheet != null)
            {
                _context.Entry(existingTimeSheet).CurrentValues.SetValues(entity);
                _context.SaveChanges();
                return existingTimeSheet;
            }
            return null;
        }
    }
}
