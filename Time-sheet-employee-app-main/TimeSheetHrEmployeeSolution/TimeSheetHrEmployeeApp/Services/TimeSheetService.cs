using TimeSheetHrEmployeeApp.Exceptions;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Repositories;

namespace TimeSheetHrEmployeeApp.Services
{
    public class TimeSheetService : ITimeSheetService
    {
        private readonly IRepository<int, TimeSheet> _timesheetRepository;

        public TimeSheetService(IRepository<int, TimeSheet> timesheetRepository)
        {
            _timesheetRepository = timesheetRepository;
        }

        public bool AddTimeSheet(TimeSheet timeSheetRequest)
        {
            var newTimeSheet = new TimeSheet
            {
                Username = timeSheetRequest.Username,
                Period = timeSheetRequest.Period,
                TotalHoursWorked = timeSheetRequest.TotalHoursWorked,
                WorkEntries = timeSheetRequest.WorkEntries.Select(workEntryRequest => new WorkEntryRequest
                {
                    Date = workEntryRequest.Date,
                    DayOfWeek = workEntryRequest.DayOfWeek,
                    HoursWorked = workEntryRequest.HoursWorked,
                    Overtime = workEntryRequest.Overtime,
                    Comments = workEntryRequest.Comments
                }).ToList()
            };

            var result = _timesheetRepository.Add(newTimeSheet);
            return result != null;
        }

        public IList<TimeSheet> GetAllTimeSheets(string username)
        {
            var userTimeSheets = _timesheetRepository
                .GetAll()
                .Where(u => u.Username == username)
                .ToList();

            if (userTimeSheets.Any())
            {
                return userTimeSheets;
            }

            throw new NoTimeSheetAvaliableException();
        }
    }
}