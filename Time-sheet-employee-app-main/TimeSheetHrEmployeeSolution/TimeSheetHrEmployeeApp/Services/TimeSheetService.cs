using TimeSheetHrEmployeeApp.Exceptions;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Repositories;

namespace TimeSheetHrEmployeeApp.Services
{
    public class TimeSheetService : ITimeSheetService
    {
        private readonly IRepository<int, TimeSheet> _TimesheetRepository;

        public TimeSheetService(IRepository<int, TimeSheet> TimesheetRepository)
        {
            _TimesheetRepository = TimesheetRepository;
        }
        /// <summary>
        /// add the time sheet details
        /// </summary>
        /// <param name="timeSheet"></param>
        /// <returns></returns>

        public bool AddTimeSheet(TimeSheet timeSheet)
        {
            var TimeSheet = new TimeSheet
            {
                Username = timeSheet.Username,
                Period = timeSheet.Period,
                HoursWorked = timeSheet.HoursWorked,
                OverTime = timeSheet.OverTime,
                Comments =  timeSheet.Comments
            };
            var result = _TimesheetRepository.Add(timeSheet);
            if (timeSheet != null)
            {
                return true;
            }
            return false;

        }
        /// <summary>
        /// list of the timesheets 
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>

        public IList<TimeSheet> GetAllTimeSheets(string username)
        {
            var user = _TimesheetRepository.GetAll().Where(u => u.Username == username).ToList();

            if (user != null)
            {
                return user.ToList();
            }

            throw new NoTimeSheetAvaliableException();
        }
        public IList<TimeSheet> GetTimeSheets()
        {
            var timeSheets = _TimesheetRepository.GetAll();
            if (timeSheets != null)
            {
                return timeSheets.ToList();
            }
            throw new NoTimeSheetAvaliableException();
        }


    }
}
