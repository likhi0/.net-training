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

       // public IList<TimeSheet> GetAllTimeSheets()
        //{
            //throw new NotImplementedException();
        //}

        public TimeSheet UpdateTimeSheet(TimeSheet timeSheet)
        {
            if (timeSheet != null)
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
            }

            return null;
        }
    }
}
