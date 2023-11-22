using System.Threading.Tasks;
using TimeSheetHrEmployeeApp.Exceptions;
using TimeSheetHrEmployeeApp.Interface;
using TimeSheetHrEmployeeApp.Models;
using TimeSheetHrEmployeeApp.Repositories;

namespace TimeSheetHrEmployeeApp.Services
{
    public class TimeSheetDetailsService : ITimeSheetDetailsService
    {
        private readonly IRepository<int, TimeSheetDetails> _timesheetdetailsRepository;
        public TimeSheetDetailsService(IRepository<int, TimeSheetDetails> timesheetdetailsRepository)
        {
            _timesheetdetailsRepository = timesheetdetailsRepository;
        }
        /// <summary>
        /// addig timesheetdetails
        /// </summary>
        /// <param name="timeSheetDetails"></param>
        /// <returns></returns>
        public bool AddTimesheetDetails(TimeSheetDetails timeSheetDetails)
        {
            var TimeSheetDetails = new TimeSheetDetails
            {
                TimesheetID = timeSheetDetails.TimesheetID,
                TaskID = timeSheetDetails.TaskID,
                NoofHours = timeSheetDetails.NoofHours,
                Date = timeSheetDetails.Date
                
            };
            var result = _timesheetdetailsRepository.Add(timeSheetDetails);
            if (timeSheetDetails != null)
            {
                return true;
            }
            return false;
        }
        /// <summary>
        /// list of timesheet details
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NoDetailsFoundException"></exception>

        public IList<TimeSheetDetails> GetAllDetails()
        {
            var timeSheetDetails = _timesheetdetailsRepository.GetAll();
            if (timeSheetDetails != null)
            {
                return timeSheetDetails.ToList();
            }
            throw new NoDetailsFoundException();
        }
    }
}
