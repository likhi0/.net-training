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

        public TimeSheet GetAllTimeSheets(string username)
        {
            var user = _TimesheetRepository.GetAll().FirstOrDefault(u => u.Username == username);

            if (user != null)
            {
                return user;
            }

            throw new NoTimeSheetAvaliableException();
        }


        /// <summary>
        /// updating the timeshhet
        /// </summary>
        /// <param name="id"></param>
        /// <param name="timeSheet"></param>
        /// <returns></returns>
        public TimeSheet UpdateTimeSheet(TimeSheet timeSheet)
        {
           
            
                var existingTimeSheet = _TimesheetRepository.GetById(timeSheet.TimesheetID);
                if (existingTimeSheet != null)
                {
                    existingTimeSheet.Username = timeSheet.Username;
                    existingTimeSheet.Period = timeSheet.Period;
                    existingTimeSheet.HoursWorked = timeSheet.HoursWorked;
                    existingTimeSheet.OverTime = timeSheet.OverTime;
                    existingTimeSheet.Comments = timeSheet.Comments;

                    var result = _TimesheetRepository.Update(timeSheet);
                    return result;
                }


            throw new NoTimeSheetAvaliableException();
        }
    }
}
